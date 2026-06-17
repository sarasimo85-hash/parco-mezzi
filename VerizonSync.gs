// ===== Verizon Connect - sincronizzazione km (Reveal REST API, EU) =====
// Credenziali da impostare in: Impostazioni progetto > Proprieta script
//   VZ_APPID  = App ID della tua app (es. fleetmatics-p-eu-....)
//   VZ_USER   = utente di integrazione (per il token)
//   VZ_PASS   = password utente di integrazione  (SEGRETA)
//   VZ_KM_MULT (opz.) = 1 se l'odometro e' in km; 0.001 se in metri; 1.60934 se in miglia
var VZ_BASE = "https://fim.api.eu.fleetmatics.com";

function vzP_(k){ return PropertiesService.getScriptProperties().getProperty(k); }

function vzToken_() {
  var user = vzP_("VZ_USER"), pass = vzP_("VZ_PASS");
  if (!user || !pass) throw new Error("Imposta VZ_USER e VZ_PASS nelle Proprieta script.");
  var res = UrlFetchApp.fetch(VZ_BASE + "/token", {
    method: "get",
    headers: { Authorization: "Basic " + Utilities.base64Encode(user + ":" + pass) },
    muteHttpExceptions: true
  });
  if (res.getResponseCode() !== 200) throw new Error("Token HTTP " + res.getResponseCode() + ": " + res.getContentText());
  return res.getContentText().trim().replace(/^"|"$/g, "");
}

function vzHeaders_(token) {
  var appid = vzP_("VZ_APPID");
  if (!appid) throw new Error("Imposta VZ_APPID nelle Proprieta script.");
  return {
    Authorization: 'Atmosphere atmosphere_app_id="' + appid + '", Bearer ' + token,
    Accept: "application/json",
    "Content-Type": "application/json"
  };
}

function vzVehicles_(token) {
  var res = UrlFetchApp.fetch(VZ_BASE + "/cmd/v1/vehicles", { method: "get", headers: vzHeaders_(token), muteHttpExceptions: true });
  if (res.getResponseCode() !== 200) throw new Error("Vehicles HTTP " + res.getResponseCode() + ": " + res.getContentText());
  return JSON.parse(res.getContentText());
}

function vzOdometers_(token, numbers) {
  var out = {};
  for (var i = 0; i < numbers.length; i += 50) {
    var chunk = numbers.slice(i, i + 50);
    var res = UrlFetchApp.fetch(VZ_BASE + "/rad/v1/vehicles/statuses", {
      method: "post", headers: vzHeaders_(token), payload: JSON.stringify(chunk), muteHttpExceptions: true
    });
    if (res.getResponseCode() !== 200) { Logger.log("statuses HTTP " + res.getResponseCode() + ": " + res.getContentText()); continue; }
    var arr = JSON.parse(res.getContentText());
    arr.forEach(function (r) {
      var num = r.VehicleNumber;
      var val = r.ContentResource && r.ContentResource.Value;
      if (num && val && val.CurrentOdometer != null) out[num] = val.CurrentOdometer;
    });
  }
  return out;
}

function vzNorm_(s) { return String(s || "").toUpperCase().replace(/\s+/g, ""); }

function sincronizzaVerizon() {
  var mult = Number(vzP_("VZ_KM_MULT")) || 1;
  var token = vzToken_();
  var veicoli = vzVehicles_(token);
  var perTarga = {}, numbers = [];
  veicoli.forEach(function (v) {
    var num = v.Number || v.VehicleNumber;
    var targa = v.RegistrationNumber || v.Registration || v.LicensePlate || "";
    if (num) { numbers.push(num); if (targa) perTarga[vzNorm_(targa)] = num; }
  });
  var odo = vzOdometers_(token, numbers);
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Parco Mezzi");
  var data = sh.getDataRange().getValues();
  var agg = 0, nonTrovati = [];
  for (var r = 1; r < data.length; r++) {
    var t = vzNorm_(data[r][0]);
    var num = perTarga[t];
    if (num && odo[num] != null) { sh.getRange(r + 1, 4).setValue(Math.round(odo[num] * mult)); agg++; }
    else if (t) nonTrovati.push(data[r][0]);
  }
  Logger.log("Verizon: km aggiornati su " + agg + " mezzi; senza corrispondenza " + nonTrovati.length);
  return { aggiornati: agg, nonTrovati: nonTrovati };
}

// Esegui UNA volta per attivare la sincronizzazione automatica ogni notte (ore 3)
function attivaSyncVerizonNotturno() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === "sincronizzaVerizon") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("sincronizzaVerizon").timeBased().everyDays(1).atHour(3).create();
}
