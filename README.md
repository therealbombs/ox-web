# OX Bank Web Interface

Interfaccia web moderna per OX Bank, costruita con React e Chakra UI.

## Tecnologie Utilizzate

- React 18
- TypeScript
- Vite
- Chakra UI
- React Router
- i18next per l'internazionalizzazione
- Axios per le chiamate API

## Struttura del Progetto

```
ox-web/
├── src/
│   ├── components/     # Componenti riutilizzabili
│   ├── pages/         # Pagine dell'applicazione
│   ├── services/      # Servizi e chiamate API
│   ├── theme/         # Configurazione tema Chakra UI
│   └── i18n/          # File di traduzione
```

## Installazione

```bash
# Installa le dipendenze
npm install

# Avvia in modalità sviluppo
npm run dev

# Build per produzione
npm run build

# Preview della build
npm run preview
```

## Variabili d'Ambiente

Crea un file `.env` nella root del progetto:

```env
VITE_API_URL=http://localhost:8080
```

## Deploy su Heroku

1. Crea una nuova app su Heroku
2. Collega il repository
3. Configura le variabili d'ambiente su Heroku
4. Deploy!

## Personalizzazione del Tema

Il tema può essere personalizzato modificando il file `src/theme/index.ts`. Puoi cambiare:

- Colori del brand
- Stili dei componenti
- Font
- Spaziature
- etc.

## Internazionalizzazione

Aggiungi nuove lingue creando nuovi file JSON in `src/i18n/` e aggiungendoli in `main.tsx`.
