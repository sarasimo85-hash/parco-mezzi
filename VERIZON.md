# Integrazione con Verizon Connect (km automatici)

## È possibile?
Sì. Verizon Connect (Reveal) espone un'**API REST ufficiale** tramite l'Integration Services /
Developer Portal, che fornisce dati di veicoli, GPS e **lettura del contachilometri (odometer)**.
Si possono quindi aggiornare i km dei mezzi **in automatico** invece di inserirli a mano.

## Quanto è "sicuro"
È sicuro e affidabile, ma è importante avere aspettative corrette:

- **Sicurezza dell'accesso:** l'API usa credenziali dedicate e un token di autorizzazione
  (header tipo `Authorization: Atmosphere atmosphere_app_id=..., Bearer ...`), su HTTPS.
  Le credenziali NON vanno mai messe nel codice pubblico: si tengono nelle variabili d'ambiente
  del server (come gli altri segreti SMTP).
- **Tempistica dei dati:** la lettura del contachilometri di Verizon viene aggiornata
  tipicamente **una volta al giorno (di notte)**, con possibilità di aggiornamento manuale.
  Non è quindi un valore "al secondo": per la gestione dei tagliandi è più che sufficiente.
- **Precisione:** secondo Verizon, il dato km da GPS può avere una piccola differenza
  rispetto al contachilometri reale (nell'ordine di pochi punti percentuali). Per i tagliandi
  va benissimo, ma "100% identico al cruscotto" non è garantito.

In breve: **affidabile e adatto allo scopo**, ma nessun sistema telematico è "100%" in senso assoluto.
Per i tagliandi l'aggiornamento giornaliero automatico è la soluzione ideale.

## Come attivarla

1. **Richiedi l'accesso API** al vostro referente Verizon Connect (o dal Reveal:
   *Admin → Integrazioni / API*). Verizon invia via email le **credenziali integrazione**
   (un utente in formato email, es. `REST@vostrodominio.com`) e l'**App ID**.
2. Verizon fornisce la documentazione (Swagger/OpenAPI) con gli endpoint per ottenere
   l'elenco mezzi e le letture odometer.
3. Conserva le credenziali nelle variabili d'ambiente del server:
   ```
   VERIZON_APP_ID=...
   VERIZON_TOKEN=...
   ```

## Come si collega a questa app

Una volta che hai le credenziali, l'integrazione consiste in un piccolo modulo che ogni notte:
1. chiama l'API Verizon e legge l'odometer di ogni mezzo;
2. abbina il mezzo Verizon a quello dell'app tramite la **targa** (o un ID Verizon salvato sul mezzo);
3. aggiorna il campo `kmAttuali` nel file dati;
4. l'app ricalcola automaticamente stato e alert.

Lo schema (pseudocodice) sarebbe:

```js
// verizon-sync.js (da completare con gli endpoint reali del vostro Developer Portal)
async function syncKmDaVerizon() {
  const veicoli = await fetchVerizonVehicles(); // GET elenco mezzi + odometer
  for (const v of veicoli) {
    const mezzo = trovaPerTarga(v.registrationPlate);
    if (mezzo) updateMezzo(mezzo.id, { kmAttuali: v.odometerKm }, 'Verizon');
  }
}
// da eseguire ogni notte con node-cron, come l'invio email
```

> Per completarlo servono gli endpoint esatti e le credenziali del vostro account Verizon:
> appena li hai, posso scrivere il modulo `verizon-sync.js` su misura e collegarlo al cron già presente.
