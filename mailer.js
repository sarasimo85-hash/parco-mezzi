// Invio email di alert tramite SMTP (configurato via variabili d'ambiente).
const nodemailer = require('nodemailer');

function getTransport() {
  const host = process.env.SMTP_HOST;
  if (!host) return null; // email non configurata
  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: String(process.env.SMTP_SECURE) === 'true', // true per porta 465
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
}

function buildHtml(mezzi) {
  const righe = mezzi
    .map((m) => {
      const statoLabel = m.stato === 'scaduto' ? 'SCADUTO' : 'In scadenza';
      const colore = m.stato === 'scaduto' ? '#c0392b' : '#e67e22';
      const km = m.stato === 'scaduto'
        ? `superato di ${Math.abs(m.kmMancanti).toLocaleString('it-IT')} km`
        : `mancano ${m.kmMancanti.toLocaleString('it-IT')} km`;
      return `<tr>
        <td style="padding:8px;border-bottom:1px solid #eee"><b>${m.targa || '-'}</b><br><span style="color:#666">${m.modello || ''}</span></td>
        <td style="padding:8px;border-bottom:1px solid #eee">${m.kmAttuali.toLocaleString('it-IT')} km</td>
        <td style="padding:8px;border-bottom:1px solid #eee">${m.kmProssimo.toLocaleString('it-IT')} km</td>
        <td style="padding:8px;border-bottom:1px solid #eee;color:${colore};font-weight:bold">${statoLabel}<br><span style="font-weight:normal">${km}</span></td>
      </tr>`;
    })
    .join('');
  return `<div style="font-family:Arial,sans-serif;max-width:640px">
    <h2 style="color:#2c3e50">Tagliandi in scadenza</h2>
    <p>I seguenti mezzi necessitano di un tagliando a breve o lo hanno gia' superato:</p>
    <table style="border-collapse:collapse;width:100%">
      <thead><tr style="background:#f5f6fa;text-align:left">
        <th style="padding:8px">Mezzo</th><th style="padding:8px">Km attuali</th>
        <th style="padding:8px">Prossimo tagliando</th><th style="padding:8px">Stato</th>
      </tr></thead>
      <tbody>${righe}</tbody>
    </table>
    <p style="color:#888;font-size:12px;margin-top:16px">Email automatica - Gestione Parco Mezzi</p>
  </div>`;
}

async function sendAlert(mezzi) {
  const transport = getTransport();
  const to = process.env.ALERT_TO;
  if (!transport || !to) {
    return { sent: false, reason: 'SMTP o ALERT_TO non configurati' };
  }
  if (!mezzi.length) return { sent: false, reason: 'nessun mezzo in scadenza' };

  await transport.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER || to,
    to,
    subject: `[Parco Mezzi] ${mezzi.length} tagliando/i in scadenza`,
    html: buildHtml(mezzi),
  });
  return { sent: true, count: mezzi.length };
}

module.exports = { sendAlert, getTransport };
