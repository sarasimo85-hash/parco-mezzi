// Persistenza dati su file JSON (nessun database esterno da installare).
// Adatto a un parco mezzi di piccole/medie dimensioni e a piu' colleghi.
const fs = require('fs');
const path = require('path');

// In ambienti di hosting (es. Render) usa un disco persistente impostando DATA_DIR.
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'mezzi.json');

function ensure() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ mezzi: [], seq: 1 }, null, 2));
  }
}

function readAll() {
  ensure();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    return { mezzi: [], seq: 1 };
  }
}

function writeAll(data) {
  ensure();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Normalizza un mezzo e calcola i campi derivati (km prossimo tagliando, stato...).
function withDerived(m, soglia) {
  const kmAttuali = Number(m.kmAttuali) || 0;
  const kmUltimo = Number(m.kmUltimoTagliando) || 0;
  const intervallo = Number(m.intervalloKm) || 0;
  const kmProssimo = kmUltimo + intervallo;
  const kmMancanti = kmProssimo - kmAttuali;

  let stato = 'ok';
  if (intervallo > 0) {
    if (kmMancanti <= 0) stato = 'scaduto';
    else if (kmMancanti <= soglia) stato = 'in_scadenza';
  } else {
    stato = 'incompleto';
  }

  return { ...m, kmAttuali, kmUltimoTagliando: kmUltimo, intervalloKm: intervallo, kmProssimo, kmMancanti, stato };
}

function listMezzi(soglia) {
  const data = readAll();
  return data.mezzi.map((m) => withDerived(m, soglia));
}

function getMezzo(id, soglia) {
  const data = readAll();
  const m = data.mezzi.find((x) => x.id === Number(id));
  return m ? withDerived(m, soglia) : null;
}

function createMezzo(payload, autore) {
  const data = readAll();
  const id = data.seq++;
  const now = new Date().toISOString();
  const mezzo = {
    id,
    targa: (payload.targa || '').trim(),
    modello: (payload.modello || '').trim(),
    kmAttuali: Number(payload.kmAttuali) || 0,
    kmUltimoTagliando: Number(payload.kmUltimoTagliando) || 0,
    intervalloKm: Number(payload.intervalloKm) || 0,
    dataUltimoTagliando: payload.dataUltimoTagliando || '',
    note: (payload.note || '').trim(),
    aggiornatoIl: now,
    aggiornatoDa: autore || '',
  };
  data.mezzi.push(mezzo);
  writeAll(data);
  return mezzo;
}

function updateMezzo(id, payload, autore) {
  const data = readAll();
  const i = data.mezzi.findIndex((x) => x.id === Number(id));
  if (i === -1) return null;
  const m = data.mezzi[i];
  const fields = ['targa', 'modello', 'note', 'dataUltimoTagliando'];
  fields.forEach((f) => { if (payload[f] !== undefined) m[f] = String(payload[f]).trim(); });
  ['kmAttuali', 'kmUltimoTagliando', 'intervalloKm'].forEach((f) => {
    if (payload[f] !== undefined && payload[f] !== '') m[f] = Number(payload[f]) || 0;
  });
  m.aggiornatoIl = new Date().toISOString();
  m.aggiornatoDa = autore || m.aggiornatoDa || '';
  data.mezzi[i] = m;
  writeAll(data);
  return m;
}

function deleteMezzo(id) {
  const data = readAll();
  const before = data.mezzi.length;
  data.mezzi = data.mezzi.filter((x) => x.id !== Number(id));
  writeAll(data);
  return data.mezzi.length < before;
}

module.exports = { listMezzi, getMezzo, createMezzo, updateMezzo, deleteMezzo, withDerived, readAll };
