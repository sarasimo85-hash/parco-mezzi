try { require('dotenv').config(); } catch (e) { /* dotenv opzionale */ }
const express = require('express');
const session = require('express-session');
const cron = require('node-cron');
const path = require('path');
const db = require('./db');
const { sendAlert } = require('./mailer');
const verizon = require('./verizon-sync');

const app = express();
const PORT = process.env.PORT || 3000;
const SOGLIA = Number(process.env.SOGLIA_KM) || 1000; // km di preavviso per "in scadenza"
const PASSWORD = process.env.APP_PASSWORD || 'tagliandi';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'cambia-questa-chiave',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }, // 30 giorni
}));

// --- Autenticazione semplice (password condivisa + nome utente libero) ---
function requireAuth(req, res, next) {
  if (req.session && req.session.auth) return next();
  if (req.path.startsWith('/api/')) return res.status(401).json({ error: 'Non autenticato' });
  return res.redirect('/login.html');
}

app.post('/api/login', (req, res) => {
  const { password, nome } = req.body;
  if (password === PASSWORD) {
    req.session.auth = true;
    req.session.nome = (nome || '').trim() || 'Utente';
    return res.json({ ok: true });
  }
  return res.status(401).json({ error: 'Password errata' });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get('/api/me', (req, res) => {
  res.json({ auth: !!(req.session && req.session.auth), nome: req.session && req.session.nome || null, soglia: SOGLIA });
});

// Pagina di login (accessibile senza autenticazione)
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// --- API mezzi (protette) ---
app.get('/api/mezzi', requireAuth, (req, res) => {
  res.json(db.listMezzi(SOGLIA));
});

app.post('/api/mezzi', requireAuth, (req, res) => {
  const m = db.createMezzo(req.body, req.session.nome);
  res.status(201).json(db.withDerived(m, SOGLIA));
});

app.put('/api/mezzi/:id', requireAuth, (req, res) => {
  const m = db.updateMezzo(req.params.id, req.body, req.session.nome);
  if (!m) return res.status(404).json({ error: 'Mezzo non trovato' });
  res.json(db.withDerived(m, SOGLIA));
});

app.delete('/api/mezzi/:id', requireAuth, (req, res) => {
  const ok = db.deleteMezzo(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Mezzo non trovato' });
  res.json({ ok: true });
});

// Invio manuale dell'alert (utile per test dal pulsante nell'interfaccia)
app.post('/api/invia-alert', requireAuth, async (req, res) => {
  const inScadenza = db.listMezzi(SOGLIA).filter((m) => m.stato === 'scaduto' || m.stato === 'in_scadenza');
  try {
    const r = await sendAlert(inScadenza);
    res.json(r);
  } catch (e) {
    res.status(500).json({ sent: false, error: e.message });
  }
});

// Sincronizzazione km da Verizon (manuale, dall'interfaccia)
app.post('/api/sync-verizon', requireAuth, async (req, res) => {
  try {
    const r = await verizon.syncKmDaVerizon();
    res.json(r);
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Pagina principale protetta
app.get('/', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// --- Cron: controllo giornaliero alle 08:00 ---
const CRON_EXPR = process.env.CRON || '0 8 * * *';
cron.schedule(CRON_EXPR, async () => {
  if (verizon.configurato()) {
    try {
      const sync = await verizon.syncKmDaVerizon();
      console.log('[Sched] sync verizon:', sync);
    } catch (e) {
      console.error('[Sched] errore sync verizon:', e.message);
    }
  }
  const inScadenza = db.listMezzi(SOGLIA).filter((m) => m.stato === 'scaduto' || m.stato === 'in_scadenza');
  try {
    const r = await sendAlert(inScadenza);
    console.log('[Sched] controllo tagliandi:', r);
  } catch (e) {
    console.error('[Sched] errore invio alert:', e.message);
  }
}, { timezone: process.env.TZ || 'Europe/Rome' });

app.listen(PORT, () => {
  console.log('Gestione Parco Mezzi avviato sulla porta ' + PORT);
  console.log('Soglia preavviso ' + SOGLIA + ' km; controllo email ' + CRON_EXPR);
});
