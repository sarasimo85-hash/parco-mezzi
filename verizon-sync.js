// =============================================================
//  Sincronizzazione km da Verizon Connect (Reveal) - REST API
// =============================================================
// Legge il contachilometri (odometer) dei mezzi da Verizon e aggiorna
// il campo "kmAttuali" nell'app, abbinando i mezzi tramite TARGA.
//
// COSA SERVE PER ATTIVARLO (dal vostro account Verizon Connect):
//   VERIZON_APP_ID   -> "atmosphere_app_id" fornito da Verizon
//   VERIZON_USER     -> utente integrazione REST (es. REST@vostrodominio.com)
//   VERIZON_PASS     -> password dell'utente integrazione
//   VERIZON_BASE_URL -> base URL dell'API REST del vostro Developer Portal
//                       (Verizon ve lo indica; tipicamente un dominio fleetmatics/verizonconnect)
//
// NOTA: i nomi esatti degli endpoint e dei campi (es. "odometer", "registrationNumber")
// vanno confermati sulla documentazione Swagger del VOSTRO Developer Portal Verizon.
// I punti da verificare sono segnalati con  >>> DA CONFERMARE <<<
// =============================================================

const db = require('./db');

const APP_ID = process.env.VERIZON_APP_ID;
const USER = process.env.VERIZON_USER;
const PASS = process.env.VERIZON_PASS;
const BASE_URL = (process.env.VERIZON_BASE_URL || '').replace(/\/+$/, '');

function configurato() {
  return Boolean(APP_ID && USER && PASS && BASE_URL);
}

// 1) Ottiene il token Bearer autenticandosi con utente/password integrazione.
//    >>> DA CONFERMARE <<< percorso del token sul vostro portale (qui: /token)
async function getToken() {
  const url = `${BASE_URL}/token`;
  const basic = Buffer.from(`${USER}:${PASS}`).toString('base64');
  const res = await fetch(url, {
    method: 'GET',
    headers: { Authorization: `Basic ${basic}` },
  });
  if (!res.ok) throw new Error(`Verizon token HTTP ${res.status}`);
  // Verizon restituisce il token come testo o JSON a seconda dell'ambiente.
  const txt = (await res.text()).trim().replace(/^"|"$/g, '');
  return txt;
}

// 2) Scarica l'elenco mezzi con il contachilometri.
//    >>> DA CONFERMARE <<< endpoint elenco mezzi (qui: /rad/v1/vehicles)
async function fetchVehicles(token) {
  const url = `${BASE_URL}/rad/v1/vehicles`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      // Header di autorizzazione documentato da Verizon Connect:
      Authorization: `Atmosphere atmosphere_app_id=${APP_ID}, Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (!res.ok) throw new Error(`Verizon vehicles HTTP ${res.status}`);
  return res.json();
}

// 3) Normalizza un record Verizon -> { targa, odometerKm }
//    >>> DA CONFERMARE <<< nomi dei campi nel vostro payload
function normalizza(v) {
  const targa = (v.registrationNumber || v.RegistrationNumber || v.plate || '')
    .toString().toUpperCase().replace(/\s+/g, '');
  // L'odometer Verizon è spesso in metri o miglia: qui assumiamo km.
  // Se arriva in metri -> dividere per 1000; se in miglia -> * 1.60934.
  let odo = Number(v.odometer ?? v.Odometer ?? v.odometerKm ?? 0);
  return { targa, odometerKm: Math.round(odo) };
}

// 4) Sincronizza: per ogni mezzo Verizon, se la targa esiste nell'app aggiorna i km.
async function syncKmDaVerizon() {
  if (!configurato()) {
    return { ok: false, reason: 'Credenziali Verizon non configurate' };
  }
  const token = await getToken();
  const raw = await fetchVehicles(token);
  const lista = Array.isArray(raw) ? raw : (raw.vehicles || raw.data || []);

  const mezzi = db.listMezzi(0);
  let aggiornati = 0;
  let nonTrovati = [];

  for (const v of lista) {
    const { targa, odometerKm } = normalizza(v);
    if (!targa || !odometerKm) continue;
    const mezzo = mezzi.find(
      (m) => (m.targa || '').toUpperCase().replace(/\s+/g, '') === targa
    );
    if (mezzo) {
      // aggiorna solo se il km Verizon è maggiore di quello salvato
      if (odometerKm > (mezzo.kmAttuali || 0)) {
        db.updateMezzo(mezzo.id, { kmAttuali: odometerKm }, 'Verizon');
        aggiornati++;
      }
    } else {
      nonTrovati.push(targa);
    }
  }
  return { ok: true, aggiornati, nonTrovati };
}

module.exports = { syncKmDaVerizon, configurato };
