# 🚐 Gestione Parco Mezzi – Tagliandi

Applicazione web per gestire i tagliandi del parco mezzi:
inserisci i mezzi, i km attuali e l'intervallo del tagliando, l'app calcola **a quanti km
va fatto il prossimo tagliando**, mostra un **avviso a schermo** quando si avvicina o è superato,
e invia un'**email automatica** di riepilogo. Accessibile da più colleghi con una password condivisa.

---

## Cosa fa

- Elenco mezzi con targa, modello, km attuali, km ultimo tagliando, intervallo (km), data, note.
- Calcolo automatico: `prossimo tagliando = km ultimo tagliando + intervallo`.
- Stato colorato di ogni mezzo:
  - 🟢 **OK** – tagliando lontano
  - 🟠 **In scadenza** – mancano meno km della soglia (default 1.000 km)
  - 🔴 **Scaduto** – km attuali oltre la soglia del tagliando
- **Email automatica** giornaliera (default ore 08:00) con i mezzi in scadenza/scaduti.
- Pulsante "Invia alert" per mandare subito l'email di riepilogo.
- Login con password unica condivisa tra i colleghi; ognuno indica il proprio nome
  (registrato come "ultima modifica").

---

## Avvio in locale (per provarla)

Serve [Node.js](https://nodejs.org) versione 18 o successiva.

1. Apri il terminale nella cartella `parco-mezzi`.
2. Installa le dipendenze:
   ```bash
   npm install
   ```
3. Copia `.env.example` in `.env` e compila i valori (almeno `APP_PASSWORD`).
4. Avvia:
   ```bash
   npm start
   ```
5. Apri il browser su **http://localhost:3000**

I dati vengono salvati nel file `data/mezzi.json`.

---

## Pubblicare online (uso condiviso tra colleghi)

Il modo più semplice e gratuito è **Render.com**:

1. Crea un account su https://render.com
2. Carica questa cartella su un repository GitHub (oppure usa "Deploy from Git").
3. Su Render: **New → Web Service**, collega il repository.
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Nella sezione **Environment** del servizio, aggiungi le variabili che trovi in `.env.example`
   (APP_PASSWORD, SESSION_SECRET, SMTP_*, ALERT_TO, ecc.).
5. **Importante – per non perdere i dati:** in **Disks** aggiungi un disco persistente,
   montalo su `/data` e imposta la variabile `DATA_DIR=/data`.
6. Avvia il deploy: otterrai un indirizzo tipo `https://parco-mezzi.onrender.com`
   da condividere con i colleghi (basta la password per entrare).

> In alternativa puoi ospitarla su Railway, su un server/PC aziendale sempre acceso,
> o su qualsiasi hosting che supporti Node.js.

---

## Configurazione email (SMTP)

Nel file `.env` (o nelle variabili d'ambiente di Render) imposta i parametri SMTP.

**Esempio con Gmail:**
1. Attiva la verifica in due passaggi sull'account Google.
2. Crea una **"Password per le app"** (Google → Sicurezza → Password per le app).
3. Usa quella password come `SMTP_PASS`. Esempio:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=tuo.indirizzo@gmail.com
   SMTP_PASS=password-per-le-app
   SMTP_FROM=tuo.indirizzo@gmail.com
   ALERT_TO=tu@azienda.it, collega@azienda.it
   ```
   Per server di posta aziendali, usa host/porta forniti dal vostro provider.

L'email automatica parte ogni giorno all'ora indicata in `CRON` (default `0 8 * * *` = 08:00).

---

## Integrazione con Verizon Connect (km automatici) – opzionale

Verizon Connect (Reveal) mette a disposizione un'**API REST ufficiale** che fornisce, tra l'altro,
la **lettura del contachilometri (odometer)** dei mezzi. È quindi possibile aggiornare i km in automatico
invece che a mano. Vedi il file **`VERIZON.md`** per i dettagli su come richiedere le credenziali API
e come collegarla a questa app.

---

## Personalizzazioni rapide

- **Soglia preavviso:** variabile `SOGLIA_KM` (es. 1500).
- **Orario email:** variabile `CRON` (formato cron, es. `0 7 * * 1` = lunedì alle 7:00).
- **Password accesso:** variabile `APP_PASSWORD`.

## Struttura del progetto

```
parco-mezzi/
├── server.js          # server web + API + invio email programmato
├── db.js              # salvataggio dati su file JSON + calcoli
├── mailer.js          # invio email SMTP
├── public/
│   ├── login.html     # pagina di accesso
│   └── index.html     # interfaccia principale
├── .env.example       # modello di configurazione
├── VERIZON.md         # guida all'integrazione Verizon Connect
└── package.json
```
