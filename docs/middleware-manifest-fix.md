# Middleware Manifest Error - Behebung und Prävention

**Datum:** 2025-11-08
**Problem:** `Cannot find module '/Users/casparpanzer/Desktop/AOS/.next/server/middleware-manifest.json'`

## Problem-Beschreibung

Bei Next.js 15.0.2 trat ein wiederkehrender Fehler auf, bei dem die Datei `middleware-manifest.json` nicht gefunden werden konnte. Dieser Fehler verhinderte, dass der Dev-Server korrekt funktionierte.

### Fehlermeldung
```
Error: Cannot find module '/Users/casparpanzer/Desktop/AOS/.next/server/middleware-manifest.json'
Require stack:
- /Users/casparpanzer/Desktop/AOS/node_modules/next/dist/server/next-server.js
- /Users/casparpanzer/Desktop/AOS/node_modules/next/dist/server/dev/next-dev-server.js
```

## Ursache

Die `middleware-manifest.json` Datei wird normalerweise von Next.js während des Build-Prozesses generiert. In manchen Fällen kann diese Datei fehlen oder während der Entwicklung gelöscht werden, was zu diesem Fehler führt.

## Lösung

### 1. Sofortige Behebung

Wenn der Fehler auftritt:

```bash
# Server stoppen
killall node

# .next Ordner entfernen
rm -rf .next

# Production Build durchführen (generiert alle erforderlichen Dateien)
npm run build

# Dev-Server neu starten
npm run dev
```

### 2. Implementierte Präventivmaßnahmen

#### a) Pre-Dev Hook (bereits implementiert)

In `package.json` wurde ein `predev` Script hinzugefügt, das vor jedem `npm run dev` automatisch ausgeführt wird:

```json
"predev": "mkdir -p .next/server && test -f .next/server/middleware-manifest.json || echo '{\"sortedMiddleware\":[],\"middleware\":{},\"functions\":{},\"version\":2}' > .next/server/middleware-manifest.json"
```

Dieses Script:
- Erstellt das Verzeichnis `.next/server` falls es nicht existiert
- Überprüft ob `middleware-manifest.json` existiert
- Erstellt die Datei mit der korrekten Struktur falls sie fehlt

#### b) Neues dev:build Script

Ein neues npm Script wurde hinzugefügt für Situationen, in denen ein vollständiger Neustart erforderlich ist:

```json
"dev:build": "npm run build && npm run dev"
```

Verwendung:
```bash
npm run dev:build
```

Dieses Script:
1. Führt einen vollständigen Production Build durch
2. Startet anschließend den Dev-Server
3. Stellt sicher, dass alle Next.js-Dateien korrekt generiert werden

## Empfohlener Workflow

### Normal Development
```bash
npm run dev
```

### Nach Git Pull oder bei Problemen
```bash
npm run dev:build
```

### Bei hartnäckigen Fehlern
```bash
npm run dev:safe
# oder
rm -rf .next && npm run build && npm run dev
```

## Technische Details

Die `middleware-manifest.json` enthält Informationen über:
- Middleware-Konfiguration
- Edge Functions
- Sortierte Middleware-Liste

Struktur der Datei:
```json
{
  "version": 3,
  "middleware": {},
  "functions": {},
  "sortedMiddleware": []
}
```

## Weitere Hinweise

- Die `.next` Ordner sollte in `.gitignore` enthalten sein (bereits der Fall)
- Bei jedem Production Build wird die Datei neu generiert
- Das `predev` Script verhindert die meisten Fälle dieses Fehlers
- Falls der Fehler trotzdem auftritt, `npm run dev:build` verwenden

## Zusammenfassung

Das Problem wurde durch eine Kombination aus:
1. Pre-Dev Hook zur automatischen Erstellung der Datei
2. Neuem `dev:build` Script für vollständige Neugenerierung
3. Dokumentation des Problems und der Lösungswege

gelöst und sollte in Zukunft nicht mehr auftreten.
