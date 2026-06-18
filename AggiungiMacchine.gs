// === Aggiunge le macchine operatrici mancanti come nuove righe ===
var MACCHINE = [["MIAE483", "Caterpillar IT18 (2)", 12822, null, "17/04/2026", "Anno 1988"], ["26010031", "Senci SCD15 TEQ", 300, null, "", "Anno 2020"], ["2926665", "Motosaldatrice Genset MPM 8/300 SS-KA", 4191, 300, "09/04/2026", "Anno 2018"], ["2927419", "Genset MPM 6/230 S-L", null, 300, "", "Anno 2019"], ["2928143", "Genset MPM6/230KI", 3840, 300, "05/05/2026", ""], ["MOSA GENERATORE", "Mosa cs 230 yxs-cc/cv", null, null, "06/10/2025", "Anno 2023"], ["x", "GenSet MPM/15400", null, null, "31/01/2022", "Anno 2014"], ["xxxxx", "GenSet MG23", null, null, "18/12/2023", ""], ["718621", "Sta C300T (12)", 872, 300, "16/10/2025", "Anno 2002"], ["1019834", "Jcb js235 HD (17)", 14344, 5000, "16/05/2021", "Anno 2005"], ["1460427430", "Bomag BW80 (20)", 1985, 300, "21/05/2026", "Anno 2008"], ["17530170", "Takeuchi TB175 (21)", 8369, 300, "06/03/2026", "Anno 2008"], ["179931", "Cesab Blitz 250 (10)", null, 200, "", "Anno 1999"], ["20CD100064", "GENSET MPM9/300SSK-N", 192, 300, "", ""], ["224000018", "Takeuchi TL240 (22)", 7925, 300, "09/04/2026", "Anno 2008"], ["224000030", "Takeuchi TL240 (23)", 7160, 300, "31/03/2026", "Anno 2008"], ["275MS0276", "Fiat Hitachi Ex285 (11)", 18426, 300, "24/10/2025", "Anno 2001"], ["315000080", "Rullo RVS315", null, null, "", "Anno 1983"], ["421260", "Benati 3.21 (3)", 18028, 300, "03/10/2025", "Anno 1989"], ["50027", "Kubota U48-4 (26)", 2602, 400, "07/11/2025", "Anno 2010"], ["51420024", "Takeuchi TB1140 (24)", 15320, 300, "24/10/2025", "Anno 2008"], ["AAN896", "Komatzu WB97R (8)", 2000, 500, "31/05/2025", "Anno 1998"], ["ACA334", "Jcb 3cx 4ws tse (7)", 18297, 300, "31/10/2025", "Anno 1997"], ["AD14", "Fiat Allis (1)", 9531, null, "19/09/2024", "Anno 1985"], ["ADP752", "Sollevatore Telescopico Manitou (15)", 7381, 300, "24/03/2026", "Anno 2004"], ["ADP771", "Fiat kobelco 117W/EX125 (13)", 19886, 300, "25/11/2025", "Anno 2002"], ["AHY079", "Iveco macchina operatrice", 319212, 20000, "08/04/2026", "Anno 2021"], ["ALD405", "BobCat 8770 (30)", 2092, null, "06/11/2025", "Anno 2019"], ["ALG598", "Hyundai HW140/3PB (42)", 5510, 500, "16/02/2026", "Anno 2021"], ["B51V11015", "Caterpillar BOB-CAT T-66 (35)", 1429, 300, "29/01/2026", "Anno 2020"], ["CAT0305ECH5M112240", "Caterpillar  305E2 CR (36)", 5407, 300, "31/03/2026", "Anno 2020"], ["CAT0305ECH5M13694", "Caterpillar  305E2 CR (37)", 4144, 300, "21/11/2025", "Anno 2020"], ["CAT0305ETH5M11146", "Caterpillar  305E2 CR (31)", 6006, 300, "28/05/2026", "Anno 2019"], ["CAT3035EPJX203223", "Caterpillar  3035E CR (38)", 3642, 300, "05/11/2025", "Anno 2020"], ["COAA494", "Caterpillar IT12 (4)", 14010, 300, "25/10/2024", "Anno 1989"], ["DIO340000004792", "Mosa TS300 SXC/EL", null, 400, "", "Anno 2011"], ["EG1703106", "Kato Imer 17 vxe (39)", 5047, 300, "29/04/2026", "Anno 2020"], ["EG1703727", "Kato Imer 17 vxe (45)", 2772, 300, "25/10/2025", "Anno 2022"], ["EL2700630", "Kato imer 27 (verde) (28)", 6914, 300, "01/10/2025", "Anno 2017"], ["EL2700676", "Kato Imer 27 v4 (29)", 7050, 300, "05/03/2026", "Anno 2018"], ["EL2700819", "Kato Imer 27 v4 (32)", 1330, 300, "", "Anno 2019"], ["EL2700832", "Kato Imer 27 v4 (33)", 6300, 300, "15/01/2026", "Anno 2019"], ["EP3500125", "Kato Imer 35v4 (40)", 6635, 300, "21/03/2026", "Anno 2020"], ["EP3710011", "Kato Imer 37v5 (41)", 5758, 300, "26/11/2025", "Anno 2020"], ["F00927", "Komatsu PC-16 (19)", 5829, 300, "14/01/2026", "Anno 2007"], ["F30189", "Komatsu PW118 MR (34)", 5451, 300, "18/09/2025", "Anno 2019"], ["GentSet", "GENSET MPM 8/300 SS-K (KALIL)", 16168, 200, "", "Anno 2014"], ["HCMBDD00V00502164", "HITACHI ZX-240 (18)", 6582, 300, "03/01/2025", "Anno 2006"], ["HDCKEAADAS0040035", "Hyundai HX35AZ (58)", 317, 300, "19/05/2026", "Anno 2024"], ["HHHKH614TE0000100", "Hyundai HX210 ANL (43)", 3673, 500, "27/02/2026", "Anno 2021"], ["HHKHE322EE0000081", "Hyndai HX 130 ALCR (46)", 3137, 500, "11/08/2025", "Anno 2022"], ["HHKHE434TE0001076", "Hyundai  Hx145ALCR (56)", 582, 300, "27/02/2026", "Anno 2025"], ["HHKHEL35HE0000086", "HYUNDAI HX35AZ  (52)", 1850, 400, "29/01/2026", "Anno 2024"], ["HHKHEN05KE0000211", "Hyundai Hx55Acr(57)", null, 300, "", "Anno 2025"], ["HHKHK614CE0001169", "Hyundai 210ANL 2025 (59)", 600, 300, "28/03/2026", "Anno 2025"], ["HHKHM905KE0000610", "Hyundai R55-9A (44)", 4155, 500, "26/06/2025", "Anno 2021"], ["HHKHMH04CE0002457", "Hyundai 35Z-9A (48)", 2577, 400, "07/04/2026", "Anno 2023"], ["HHKHMH04E0002211", "Hyundai 35Z-9A(vladimir) (49)", 2305, 400, "16/01/2026", "Anno 2023"], ["HHKHMH04EE0001462", "Hyundai 35z (47)", 3760, 300, "25/11/2025", "Anno 2022"], ["HHKHMZ02JE0000825", "Hyundai HX85A (60)", 763, 300, "27/11/2025", "Anno 2025"], ["HHKMZ02LE0000796", "Hyundai HX-85A (53)", 1919, 300, "05/05/2026", "Anno 2024"], ["HJSCEK24CE0033236", "Hyundai HX30AZ 2025 (61)", 822, 300, "17/04/2026", "Anno 2025"], ["HJSCEK24JE0033056", "Hyundai HX30AZ-FC (54)", null, 300, "18/01/2025", "Anno 2024"], ["HJSCEL38LE0030090", "Hyundai hx35AZ 2025 (62)", 970, 300, "25/05/2026", "Anno 2025"], ["JAFTR270JPM424284", "Case TR270B (50)", 902, 200, "19/08/2025", "Anno 2023"], ["JW223", "MotoCompressore", 1353, 300, "05/02/2026", "Anno 1984"], ["LF04-03342", "New Holland E 80 (25)", 13673, 300, "28/10/2024", "Anno 2009"], ["LF09012797", "Kobelco SK85MSR-7 (55)", 568, 400, "02/03/2026", "Anno 2024"], ["MOAE485", "Cimas 970 4X4 (5)", 12502, 300, "31/10/2025", "Anno 1993"], ["MOU.DP25N", "Muletto frontale (16)", 436, 300, "29/01/2026", "Anno 2004"], ["PD05020184", "Kobelco SK28SR-7(64", null, 400, "", "Anno 2025"], ["PD05020185", "Kobelco SK28SR-7 (63)", null, 400, "", "Anno 2025"], ["PX18020104", "Kobelco SX39SR-7 (51)", 1120, 400, "29/05/2026", "Anno 2023"], ["RNAA014", "Vibro-Finistrice BITTELLI (6)", null, 400, "", "Anno 1994"], ["VCAE237", "Caterpillar IT14 G (9)", 330, 300, "10/11/2025", "Anno 1998"], ["Weber", "Weber", null, null, "", "Anno 2021"], ["xxxxxxxxxxx", "Jcb 160 H7F (14)", 37533, 300, "11/02/2026", "Anno 2002"], ["YCEVI033EEDF09742", "Yanmar VI033U (27)", 10161, 300, "13/02/2026", "Anno 2016"]];  // [codice, modello, ore_ultimo, intervallo, data, note]
function aggiungiMacchineOperatrici() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName("Parco Mezzi");
  if (!sh) return;
  var values = sh.getDataRange().getValues();
  var presenti = {};
  for (var r = 1; r < values.length; r++) presenti[String(values[r][1]).toUpperCase().replace(/\s+/g,"")] = true;
  var nuovi = [];
  for (var i = 0; i < MACCHINE.length; i++) {
    var m = MACCHINE[i]; var code = String(m[0]||"").trim();
    if (!code) continue;
    if (presenti[code.toUpperCase().replace(/\s+/g,"")]) continue;
    presenti[code.toUpperCase().replace(/\s+/g,"")] = true;
    nuovi.push(["", code, m[1]||"", "MACCHINA OPERATRICE", "", (m[2]!=null?m[2]:""), (m[3]!=null?m[3]:""), "", "", "", (m[4]||""), (m[5]||"")]);
  }
  if (!nuovi.length) { Logger.log("Nessuna macchina da aggiungere"); return; }
  var start = sh.getLastRow() + 1;
  sh.getRange(start, 1, nuovi.length, 12).setValues(nuovi);
  // formule H, I, J per le nuove righe
  var g=[], h=[], st=[];
  for (var k = 0; k < nuovi.length; k++) {
    var rr = start + k;
    g.push(['=IF(OR(F'+rr+'="";G'+rr+'="");"";F'+rr+'+G'+rr+')']);
    h.push(['=IF(OR(H'+rr+'="";E'+rr+'="");"";H'+rr+'-E'+rr+')']);
    st.push(['=IF(OR(E'+rr+'="";F'+rr+'="";G'+rr+'="");"DATI MANCANTI";IF(I'+rr+'<=0;"SCADUTO";IF(I'+rr+'<='+1000+';"IN SCADENZA";"OK")))']);
  }
  sh.getRange(start, 8, nuovi.length, 1).setFormulas(g);
  sh.getRange(start, 9, nuovi.length, 1).setFormulas(h);
  sh.getRange(start, 10, nuovi.length, 1).setFormulas(st);
  sh.getRange(start, 5, nuovi.length, 5).setNumberFormat("#,##0");
  // ricrea filtro e formattazione condizionale su tutto
  var last = sh.getLastRow();
  if (sh.getFilter()) sh.getFilter().remove();
  sh.clearConditionalFormatRules();
  var rng = sh.getRange("A2:L" + last);
  var rules = [
    SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=$J2="SCADUTO"').setBackground("#FBE9E7").setRanges([rng]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=$J2="IN SCADENZA"').setBackground("#FDF0E3").setRanges([rng]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=$J2="OK"').setBackground("#E8F8EF").setRanges([rng]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=$J2="DATI MANCANTI"').setBackground("#ECEFF1").setRanges([rng]).build()
  ];
  sh.setConditionalFormatRules(rules);
  sh.getRange(1, 1, last, 12).createFilter();
  Logger.log("Macchine aggiunte: " + nuovi.length + " (totale righe " + last + ")");
}
