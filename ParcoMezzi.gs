// === Gestione Parco Mezzi - script automatico ===
var EMAIL = "sarasimo85@gmail.com"; // destinatari email (separati da virgola)
var SOGLIA = 1000; // km di preavviso "in scadenza"

var VEICOLI = [["AB78502", "CTC (CARRELLONE) SPA SRT36G", "CAMION PIANALE", "Anno 2001 | Telaio ZA9SRT36GA2A02154"], ["AE76055", "ADIGE SR3GP/T CTG 04", "SEMIRIMORCHIO CASSONE RIBALTABILE TRILATERALE", "Anno 2008 | Telaio ZFNSR3GPT00000231"], ["AHY079", "IVECO LA1J1843P31", "CAMION CASSONE RIBALTABILE TRILATERALE", "Anno 2011 | Telaio ZCFA1JD0402555261"], ["AM700TG", "IVECO 100 E18 100KE236", "CAMION CASSONE RIBALTABILE TRILATERALE", "Anno 1997 | Telaio ZCFA1AD0002214105"], ["AS216BJ", "ISUZU LIMITED NPR 69 L", "FURGONE APERTO CASSONE FISSO", "Anno 1997 | Telaio JAANPR69LV7100391"], ["BC313GD", "IVECO 110E21/120", "CAMION CASSONE RIBALTABILE TRILATERALE", "Anno 1999 | Telaio ZCFA1DF0002264601"], ["BE951BE", "CITROEN 231A62", "FURGONE CHIUSO", "Anno 1999 | Telaio VF7231A6215424144"], ["BG362KN", "IVECO (3 ASSI BIANCO) MAGIURIUS", "CAMION CASSONE RIBALTABILE TRILATERALE", "Anno 1999 | Telaio WJMA1VN0004218492"], ["BOB65863", "IVECO 10914132 CTG N2", "CAMION GRU", "Anno 1987 | Telaio ZCFA1BA0002355332"], ["BP409LA", "MITSUBISHI MMC SITTIPOL K74TG", "FURGONE APERTO CASSONE FISSO", "Anno 2000 | Telaio MMBJNK7401D022425"], ["BR495LK", "IVECO (ROSSO) MT180E27 L 3.7 CTG N3", "CAMION ASFALTI", "Anno 1997 | Telaio ZCFA1TLK004191014"], ["BSE46488", "IVECO 150E18 36 CTG", "CAMION GRU", "Anno 1992 | Telaio ZCFA1LD0002055895"], ["BV933PD", "IVECO MAGIRUS A260S 80 ST 4C0552", "CAMION CASSONE RIBALTABILE POSTERIORE", "Anno 2004 | Telaio WJME2NSJ004272901"], ["BZ638WY", "IVECO MAGIRUS 260E35/E3/75", "CARRELLINO", "Anno 2002 | Telaio WJME2NP0004250413"], ["CC528SY", "IVECO 35C9A", "FURGONE APERTO CASSONE FISSO", "Anno 2002 | Telaio ZCFC3563105386476"], ["CC712WH", "IVECO 35S15", "FURGONE CHIUSO", "Anno 2002 | Telaio ZCFC35A0005393325"], ["CD400RY", "IVECO 90E21NA", "CAMION CASSONE RIBALTABILE TRILATERALE", "Anno 2002 | Telaio ZCFA90F0102362732"], ["CD978CV", "RENAULT V. I. 22 CVA1- 370.8", "CAMION CASSONE RIBALTABILE TRILATERALE", "Anno 2003 | Telaio VF622CVA000104725"], ["CJ585SY", "FORD W.A.G. FNCYDOFARA/1", "FURGONE APERTO CASSONE FISSO", "Anno 2003 | Telaio WF0CXXTTFC3E88070"], ["CT769NE", "IVECO MT 400E34 T/P", "CAMION CASSONE RIBALTABILE TRILATERALE", "Anno 2005 | Telaio ZCFM1TPJ004195082"], ["CX643ET", "RENAULT HDCMK6", "FURGONE APERTO CASSONE FISSO", "Anno 2006 | Telaio VF1HDCMK636352940"], ["CY740GV", "FORD WGMBH TRANSIT 350L", "FURGONE APERTO CASSONE FISSO", "Anno 2006 | Telaio WF0CXXTTFC5C05826"], ["CZ525CG", "MERCEDES DAIMLERCHRYSLER 1.6  C", "FURGONE APERTO CASSONE FISSO", "Anno 2006 | Telaio WDB9036221R857682"], ["DB423XD", "IVECO 35/E4", "FURGONE APERTO CASSONE FISSO", "Anno 2006 | Telaio ZCFC3576005629069"], ["DD425RM", "FIAT DUCATO", "FURGONE CHIUSO", "Anno 2006 | Telaio ZFA25000001061652"], ["DE265AW", "IVECO 180/E4", "CAMION CASSONE RIBALTABILE TRILATERALE", "Anno 2007 | Telaio ZCFA1TM0302504980"], ["DF272JD", "DAF TRUCKS N.V.AD85MC/E5", "CAMION CASSONE RIBALTABILE POSTERIORE", "Anno 2007 | Telaio XLRAD85MC0E7151286"], ["DF891JC", "IVECO MAGIRUS 190E42 51 CTG N3", "CAMION GRU", "Anno 1994 | Telaio WJMA1VSJ00C007208"], ["HC019XJ", "IVECO 110 MAGIRUS A410T/E4 (BIANCO)", "CAMION CASSONE RIBALTABILE TRILATERALE", "Anno 2007 | Telaio WJMJ4CUS40C177771 | Targa alt.: HC019XJ (DG413PD)"], ["DK554ZK", "IVECO MAGIRUS 440 E 35", "CAMION CASSONE RIBALTABILE TRILATERALE", "Anno 2001 | Telaio WJMM1VPN004230150"], ["DL156CD", "IVECO ML120E18", "CAMION CASSONE RIBALTABILE TRILATERALE", "Anno 2002 | Telaio ZCFA1ED1102392356"], ["DP632SE", "RENAULT MASTER", "FURGONE APERTO CASSONE RIBALTABILE TRILATERALE", "Anno 2008 | Telaio VF1UDC2G639729418"], ["DR147HS", "FIAT DUCATO", "FURGONE APERTO CASSONE FISSO", "Anno 2009 | Telaio ZFA2500000161292890"], ["DR599HS", "FIAT DUCATO", "FURGONE APERTO CASSONE FISSO", "Anno 2010 | Telaio ZFA25000001551480"], ["DS350GD", "FORD WERKE GMBH SCATTOLINI SCFT06", "FURGONE APERTO CASSONE FISSO", "Anno 2008 | Telaio WF0FXXBDFF7M51147"], ["DS817RG", "FIAT DUCATO 250", "FURGONE CHIUSO", "Anno 2009 | Telaio ZFA25000001596754"], ["DT728SN", "FIAT DUCATO", "FURGONE CHIUSO", "Anno 2008 | Telaio ZFA25000001595363"], ["DY242CV", "FIAT DUCATO", "FURGONE APERTO CASSONE FISSO", "Anno 2009 | Telaio ZFA25000001606142"], ["EA372HY", "IVECO A1RA0030", "CAMION CASSONE RIBALTABILE TRILATERALE", "Anno 2001 | Telaio ZCFA1EA0002359036"], ["EA933ZE", "ADAM OPEL VIVARO VAN", "FURGONE CHIUSO", "Anno 2010 | Telaio WOLF7AHA6AV619274"], ["EC877CY", "PEUGEOT YBBMDA AX", "FURGONE APERTO CASSONE FISSO", "Anno 2010 | Telaio VF3YBBMDA11826294"], ["ED112PM", "IVECO 35/E4", "FURGONE APERTO CASSONE FISSO", "Anno 2010 | Telaio ZCFC35A3705823749"], ["EF747TS", "FIAT SCATTOLINI SCD", "FURGONE APERTO CASSONE FISSO", "Anno 2011 | Telaio ZFA25000001250281"], ["EG393DD", "IVECO 35/E4", "FURGONE APERTO CASSONE FISSO", "Anno 2011 | Telaio ZCFC35A370D433900"], ["EH089DD", "IVECO 35C15", "FURGONE APERTO CASSONE FISSO", "Anno 2012 | Telaio ZCFC35A7805915392"], ["EK156YX", "FIAT DUCATO", "FURGONE APERTO CASSONE FISSO", "Anno 2012 | Telaio ZFA25000002135140"], ["EL728MM", "IVECO IS35SC2AA", "FURGONE CHIUSO", "Anno 2011 | Telaio ZCFC3571605900653"], ["EN143SR", "IVECO 100 E18 100 A36 CTG", "CAMION CASSONE RIBALTABILE TRILATERALE", "Anno 1995 | Telaio ZCFA1AD0002152638"], ["EP519XT", "ISUZU N-MENTA MEN NNR85 D5A", "FURGONE APERTO CASSONE RIBALTABILE TRILATERALE", "Anno 2013 | Telaio JAANNR85FA7100414"], ["ER072PY", "IVECO IS35CC2AA", "FURGONE CHIUSO", "Anno 2013 | Telaio ZCFC359300D494317"], ["ER179LK", "NISSAN M1 FED C NISSAN NV400", "FURGONE CHIUSO", "Anno 2013 | Telaio VNVM1FEDC46820443"], ["ES552PX", "FORD W TRANSIT 350L CAB RD 2.4", "FURGONE CHIUSO", "Anno 2011 | Telaio WF0FXXTTFFAA67425"], ["ET115TZ", "FIAT DUCATO", "FURGONE CHIUSO", "Anno 2014 | Telaio ZFA25000002514170"], ["EV038PR", "FIAT DOBLO'", "FURGONE CHIUSO", "Anno 2014 | Telaio ZFA263000006149117"], ["EW085NN", "FIAT DUCATO", "FURGONE CHIUSO", "Anno 2014 | Telaio ZFA25000002644938"], ["EX425XN", "IVECO 35C13", "FURGONE APERTO CASSONE FISSO", "Anno 2015 | Telaio ZCFC2359405992087"], ["FA643YY", "FIAT FIORINO", "FURGONE CHIUSO", "Anno 2015 | Telaio ZFA22500006A47452"], ["FA932XY", "SCANIA CV R 420", "CAMION GRU", "Anno 2005 | Telaio YS2PBX20007688"], ["FD016PJ", "RENAULT MASTER", "FURGONE APERTO CASSONE FISSO", "Anno 2016 | Telaio VF1VBH4Z254842918"], ["FD052HA", "IVECO 35C13", "FURGONE CHIUSO", "Anno 2012 | Telaio ZCFC3593005923981"], ["FE551941", "ISUZU TFS54HP 91 CTG N1", "FURGONE APERTO CASSONE FISSO", "Anno 1994 | Telaio JAATFS54HP7104096"], ["FF025HZ", "FIAT FIORINO", "FURGONE CHIUSO", "Anno 2016 | Telaio ZFA22500006C55927"], ["FF367CV", "PEUGEOT BOXER", "FURGONE CHIUSO", "Anno 2016 | Telaio VF3YCTMFB12B43439"], ["FF934AB", "FIAT FIORINO", "FURGONE CHIUSO", "Anno 2016 | Telaio ZFA22500006D16980"], ["FH046VC", "CITROEN JUMPER", "FURGONE CHIUSO", "Anno 2017 | Telaio VF7YC2MFB12C29527"], ["FK645NT", "VOLKSWAGEN CRAFTER", "FURGONE CHIUSO", "Anno 2017 | Telaio WV1ZZZSYZJ9003546"], ["FN382VD", "FIAT DUCATO", "FURGONE APERTO CASSONE FISSO", "Anno 2018 | Telaio ZFA25000002G69328"], ["FS137VN", "CITROEN JUMPER", "FURGONE CHIUSO", "Anno 2018 | Telaio VF7YB2MFB12H28215"], ["FS215ZS", "CITROEN JUMPER", "FURGONE CHIUSO", "Anno 2018 | Telaio VF7YC3MFC12J64446"], ["FT556WF", "RENAULT MDA3C UJZ42M", "CAMION CASSONE RIBALTABILE TRILATERALE", "Anno 2019 | Telaio VF640J868KB009917"], ["FV912CR", "FIAT DUCAT0", "FURGONE APERTO CASSONE FISSO", "Anno 2019 | Telaio ZFA25000002K52288"], ["FV984VZ", "VOLKSWAGEN CRAFTER", "FURGONE APERTO CASSONE FISSO", "Anno 2019 | Telaio WV3ZZZSZZK9071498"], ["FW173NT", "IVECO 35C14", "FURGONE APERTO CASSONE FISSO", "Anno 2019 | Telaio ZCFD35A705275008"], ["FW184NT", "IVECO 35C14", "FURGONE APERTO CASSONE RIBALTABILE TRILATERALE", "Anno 2019 | Telaio ZCFCD35A405275015"], ["FX267ML", "VOLKSWAGEN CRAFTER", "FURGONE APERTO CASSONE RIBALTABILE TRILATERALE", "Anno 2019 | Telaio WV3ZZZSZZK9071227"], ["FY811FM", "VOLKSWAGEN CADDY", "FURGONE CHIUSO", "Anno 2019 | Telaio WV1ZZZ2KZKX137719"], ["GA171MR", "OPEL MOVANO", "FURGONE CHIUSO", "Anno 2020 | Telaio W0VMRY606KB183253"], ["GC605ZM", "IVECO CTG", "CAMION CASSONE RIBALTABILE TRILATERALE", "Anno 1995 | Telaio ZCFA1AD0002152782"], ["GC868BJ", "RENAULT MDA3C UJZ42M", "CAMION SCARRABILE", "Anno 2020 | Telaio VF640J860MB012412"], ["GD234NL", "VOLKSWAGEN CRAFTER", "FURGONE CHIUSO", "Anno 2021 | Telaio WV1ZZZSYZM9030107"], ["GD235NL", "VOLKSWAGEN CRAFTER", "FURGONE CHIUSO", "Anno 2021 | Telaio WV1ZZZSYZM9029671"], ["GE705NW", "RENAULT HD004", "CAMION SCARRABILE", "Anno 2021 | Telaio VF630M367MD000959"], ["GE783ZZ", "IVECO 29L 12V", "FURGONE CHIUSO", "Anno 2006 | Telaio ZCPC2980005587093"], ["GE784ZZ", "FORD FMD6H9FBFA TRANSIT", "FURGONE APERTO CASSONE RIBALTABILE TRILATERALE", "Anno 2011 | Telaio WF0FXXTTFFBC29837"], ["GE793ZZ", "IVECO (BIANCO) ML 180 328", "CAMION ASFALTI", "Anno 2011 | Telaio ZCFA1TM0402586486"], ["GE897NW", "PEUGEOT Y CBNAU KS BOXER", "FURGONE APERTO CASSONE RIBALTABILE TRILATERALE", "Anno 2021 | Telaio VF3YCBNAU12R64524"], ["GE900NV", "PEUGEOT E F YHYC- K2E022", "FURGONE CHIUSO", "Anno 2021 | Telaio VR3EFYHYCMJ662316"], ["GG480XZ", "VOLVO TRUCK CO FH12", "CAMION GRU", "Anno 1194 | Telaio YV2A4B3C3RB113345"], ["GJ925M", "OPEL MOVANO", "FURGONE APERTO CASSONE FISSO", "Anno 2022 | Telaio VXEYCBPAU12V71786"], ["GJ954FM", "OPEL MOVANO", "FURGONE APERTO CASSONE FISSO", "Anno 2022 | Telaio VXEYDBPAU12V72225"], ["GK695MH", "IVECO DAILY", "FURGONE APERTO CASSONE FISSO", "Anno 2012 | Telaio ZCFC407500D471816"], ["GL711ER", "RENAULT MDA3C UJZ42M", "CAMION SCARRABILE", "Anno 2023 | Telaio VF640J863PB018693"], ["GN471BP", "OPEL MOVANO", "FURGONE APERTO CASSONE FISSO", "Anno 2023 | Telaio VXEYDBPAU12W48776"], ["GN733BN", "OPEL MOVANO", "FURGONE APERTO CASSONE FISSO", "Anno 2023 | Telaio VXEYDBPAU12W48759"], ["GN954BR", "RENAULT MDA3C UJZ42M", "CAMION SCARRABILE", "Anno 2024 | Telaio VF640J866RB022174"], ["GR834PT", "MAN NUTZFAHRZEUGE 41 460 F", "CAMION CASSONE RIBALTABILE TRILATERALE", "Anno 2002 | Telaio WMAH38ZZZ3M359956"], ["GR939PT", "RENAULT HD001 CPZ42A", "TRATTORE CABINATO CON RALLA", "Anno 2024 | Telaio VF630A165SD001302"], ["GR962PT", "RENAULT HD010 TECNOKAR EMILCAMION S5", "CAMION CASSONE RIBALTABILE POSTERIORE", "Anno 2024 | Telaio VF631S366RD003392"], ["GR993PT", "RENAULT HD011 RPZ8T6 C", "CAMION GRU", "Anno 2025 | Telaio VF630V16SD000771"], ["GV078JN", "MERCEDES BENZ CITAN", "FURGONE CHIUSO", "Anno 2013 | Telaio WDF4157031U121195"], ["GV936JT", "RENAULT MDA3C UJZ42M D", "CAMION SCARRABILE", "Anno 2025 | Telaio VF640J866SB025498"], ["GV937JT", "RENAULT MDA3C UJZ42M D", "CAMION SCARRABILE", "Anno 2025 | Telaio VF640J868SB025499"], ["ALD405", "BOBCAT S770", "PALA CARICATRICE", "Anno 2019 | Telaio B3BV11898"], ["AGM308", "BOBCAT T 66", "PALA CARICATRICE", "Anno 2020 | Telaio B51V11015"], ["---", "CASE BOB TR270B", "PALA CARICATRICE", "Anno 2023 | Telaio JAFTR270JPM42484"], ["COAA494", "CATERPILLAR IT 12", "PALA CARICATRICE", "Anno 1989 | Telaio 2YC00635"], ["VCAE237", "CATERPILLAR IT 14 G", "PALA CARICATRICE", "Anno 1998 | Telaio 1WN00290"], ["MIAE483", "CATERPILLAR IT 18", "PALA CARICATRICE", "Anno 1989 | Telaio 7ZB00967"], ["MOAE485", "CIMAS 970 4RM", "TERNA", "Anno 1993 | Telaio 32125"], ["ADP771", "KOBELCO EX125WT", "ESCAVATORE GOMMATO", "Anno 2004 | Telaio ZEF117WTA00000331"], ["RNAA014", "BITELLI 121", "VIBROFINITRICE", "Anno 1994 | Telaio 930028"], ["T001850", "J.C.B. JS235HD", "ESCAVATORE CINGOLATO", "Anno 2005 | Telaio 1019834"], ["AKW329", "KOMATSU KIM PW 118 MR-11", "ESCAVATORE GOMMATO", "Anno 2019 | Telaio KMTPW032LKUF30189"], ["AAN896", "KOMATSU WB97R", "TERNA", "Anno 1998 | Telaio 8919894"], ["ADP752", "MANITOU MVT 1330 SL TURBO", "SOLLEVATORE TELESCOPICO", "Anno 2004 | Telaio 12360"], ["AGP451", "TAKEUCHI TL240", "PALA CARICATRICE", "Anno 2008 | Telaio 224000018"], ["AGP452", "TAKEUCHI TL240", "PALA CARICATRICE", "Anno 2008 | Telaio 224000030"], ["ACA334", "J.C.B. 3CX 974 T", "TERNA", "Anno 1999 | Telaio 0475722"], ["2025", "KOBELCO SK28SR-7", "MINI ESCAVATORE", "Telaio PD05020184"], ["DP968WF", "IVECO 180/ E4", "CAMION CASSONE RIBALTABILE TRILATERALE", "Anno 2008 | Telaio ZCFA1TM0302534393"], ["EJ044CE", "IVECO 160/150/E4", "CAMION CASSONE RIBALTABILE TRILATERALE", "Anno 2011 | Telaio ZCFA1LG0302523429"], ["XA707ZD", "ZORZI 37 S PL", "SEMIRIMORCHIO CASSONE RIBALTABILE POSTERIORE", "Anno 2006 | Telaio ZAX37S075PL013069"], ["FL253SS", "FIAT DUCATO", "FURGONE CHIUSO", "Anno 2017 | Telaio ZFA25000002E84083"], ["GC117DZ", "FIAT DUCATO", "FURGONE CHIUSO", "Anno 2020 | Telaio ZFA25000002N51266"], ["GA577CH", "FIAT DUCATO (CAPOVILLA MATTIA)", "FURGONE CHIUSO", "Anno 2020 | Telaio ZFA25000002M77242"]];

function creaParcoMezzi() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName("Parco Mezzi");
  if (!sh) { sh = ss.insertSheet("Parco Mezzi"); } else { if (sh.getFilter()) sh.getFilter().remove(); sh.clear(); sh.clearConditionalFormatRules(); }
  var headers = ["Codice interno","Targa","Mezzo","Tipo","Km attuali","Km ultimo tagliando","Intervallo km","Prossimo tagliando (km)","Km mancanti","Stato","Data ultimo tagliando","Note"];
  var rowsOut = [headers];
  for (var i = 0; i < VEICOLI.length; i++) { var v = VEICOLI[i]; rowsOut.push(["", v[0], v[1], v[2], "", "", "", "", "", "", "", v[3]]); }
  sh.getRange(1, 1, rowsOut.length, headers.length).setValues(rowsOut);
  var n = VEICOLI.length, g=[], h=[], st=[];
  for (var k = 0; k < n; k++) {
    var r = k + 2;
    g.push(['=IF(OR(F'+r+'="";G'+r+'="");"";F'+r+'+G'+r+')']);
    h.push(['=IF(OR(H'+r+'="";E'+r+'="");"";H'+r+'-E'+r+')']);
    st.push(['=IF(OR(E'+r+'="";F'+r+'="";G'+r+'="");"DATI MANCANTI";IF(I'+r+'<=0;"SCADUTO";IF(I'+r+'<='+SOGLIA+';"IN SCADENZA";"OK")))']);
  }
  sh.getRange(2, 8, n, 1).setFormulas(g);
  sh.getRange(2, 9, n, 1).setFormulas(h);
  sh.getRange(2, 10, n, 1).setFormulas(st);
  sh.getRange(1, 1, 1, headers.length).setFontWeight("bold").setFontColor("#ffffff").setBackground("#2c3e50").setHorizontalAlignment("center").setWrap(true);
  sh.setFrozenRows(1); sh.setFrozenColumns(2);
  sh.getRange(2, 5, n, 5).setNumberFormat("#,##0");
  var widths = [120,110,220,250,95,130,110,150,110,130,140,300];
  for (var c = 0; c < widths.length; c++) sh.setColumnWidth(c + 1, widths[c]);
  var last = n + 1; var rng = sh.getRange("A2:L" + last);
  var rules = [];
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=$J2="SCADUTO"').setBackground("#FBE9E7").setRanges([rng]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=$J2="IN SCADENZA"').setBackground("#FDF0E3").setRanges([rng]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=$J2="OK"').setBackground("#E8F8EF").setRanges([rng]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=$J2="DATI MANCANTI"').setBackground("#ECEFF1").setRanges([rng]).build());
  sh.setConditionalFormatRules(rules);
  sh.getRange(1, 1, last, headers.length).createFilter();
  var ist = ss.getSheetByName("Istruzioni"); if (!ist) ist = ss.insertSheet("Istruzioni"); ist.clear();
  ist.getRange("A1").setValue("ISTRUZIONI - Gestione Parco Mezzi").setFontWeight("bold").setFontSize(14);
  var note = [
    ["1) Colonna A 'Codice interno': compila col tuo codice mezzo (libero)."],
    ["2) Per ogni mezzo compila: Km ultimo tagliando e Intervallo km (i Km attuali arrivano da Verizon)."],
    ["3) Il foglio calcola da solo Prossimo tagliando, Km mancanti e Stato (colori)."],
    ["4) FILTRARE PER TIPO: clicca l'icona a imbuto nell'intestazione 'Tipo'."],
    ["5) STAMPARE: menu File > Stampa (orizzontale, adatta alla larghezza)."],
    ["6) Ogni giorno alle 8 arriva un'email con i tagliandi da fare; di notte i km si aggiornano da Verizon."]
  ];
  ist.getRange(3, 1, note.length, 1).setValues(note); ist.setColumnWidth(1, 760);
  ss.setActiveSheet(sh);
}

function controllaTagliandi() {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Parco Mezzi"); if (!sh) return;
  var rows = sh.getDataRange().getValues(); var scad = [];
  for (var i = 1; i < rows.length; i++) { var s = rows[i][9]; if (s === "SCADUTO" || s === "IN SCADENZA") scad.push(rows[i]); }
  if (!scad.length) return;
  var html = '<div style="font-family:Arial"><h2>Tagliandi da fare</h2><table border="1" cellpadding="6" style="border-collapse:collapse">';
  html += '<tr style="background:#f0f0f0"><th>Codice</th><th>Targa</th><th>Mezzo</th><th>Km attuali</th><th>Prossimo tagliando</th><th>Stato</th></tr>';
  for (var j = 0; j < scad.length; j++) { var v = scad[j]; var col = v[9] === "SCADUTO" ? "#c0392b" : "#e67e22";
    html += '<tr><td>'+(v[0]||"")+'</td><td><b>'+v[1]+'</b></td><td>'+v[2]+'</td><td>'+v[4]+'</td><td>'+v[7]+'</td><td style="color:'+col+';font-weight:bold">'+v[9]+'</td></tr>'; }
  html += '</table></div>';
  MailApp.sendEmail({ to: EMAIL, subject: "[Parco Mezzi] " + scad.length + " tagliando/i da fare", htmlBody: html });
}

function attivaEmailGiornaliera() {
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === "controllaTagliandi") ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger("controllaTagliandi").timeBased().everyDays(1).atHour(8).create();
}


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
    var t = vzNorm_(data[r][1]);
    var num = perTarga[t];
    if (num && odo[num] != null) { sh.getRange(r + 1, 5).setValue(Math.round(odo[num] * mult)); agg++; }
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
