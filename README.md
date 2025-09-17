# StrataSphere – Mining Adventure Browsergame

StrataSphere ist ein vollständig im Browser laufendes Management-Spiel rund um den Aufbau eines globalen Bergbaukonzerns. Dieses Repository enthält eine produktionsreife Web-App mit moderner Frontend-Experience, persistenter PHP/SQLite-Backend-API und automatischer Synchronisation zwischen Browser und Datenbank.

## Features

- **Landingpage & Authentifizierung** – Modernes, responsives Design mit Login- und Registrierungsdialog samt serverseitiger Validierung und Sessions.
- **Globale Spielwelt** – Interaktive OpenStreetMap-Karte (Leaflet) zum Platzieren neuer Minen überall auf der Welt.
- **Wirtschaftssimulation** – Ressourcenproduktion mit Tag-/Nachtzyklus, Personalverwaltung, Logistik- und Forschungsmechaniken.
- **Forschung & Upgrades** – Mehrstufige Technologien, Logistikerweiterungen, Boosts und Upgrades für einzelne Minen.
- **Persistenter Spielstand** – Automatische Synchronisation zwischen Browser, SQLite-Datenbank und optionalem Offline-Fallback.

## Schnellstart

1. Repository klonen oder herunterladen.
2. PHP ≥ 8.1 installieren (inkl. `pdo_sqlite`).
3. Zwei Terminalfenster öffnen:
   - **Backend:** `php -S localhost:9000 -t .` (liefert `index.html` aus und stellt die API unter `server/api.php` bereit)
   - **Frontend (optional separater Server):** Alternativ kann jeder beliebige Static-Server genutzt werden, solange er Requests an `/server/api.php` weiterreicht.
4. `http://localhost:9000/index.html` im Browser öffnen.

> **Hinweis:** Aufgrund von Browser-Sicherheitsrichtlinien sollte das Spiel nicht direkt als `file://` geöffnet werden. Verwende einen lokalen Webserver.

## Technologie-Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES Modules)
- **Karte:** Leaflet 1.9.x mit OpenStreetMap-Tiles
- **Persistenz:** PHP 8.1 API mit SQLite-Datenbank, abgesichert durch Sessions und serverseitige Validierung
- **Offline-Fallback:** Browser `localStorage` hält einen letzten Stand vor, falls der Server nicht erreichbar ist

## Assets

Alle Grafiken sind Vektor-SVGs, die direkt im Repository liegen. Weitere Bildressourcen können über KI-Tools ergänzt werden.

## Tests & Monitoring

- Frontend: Manuelles Durchklicken der Landingpage, Auth-Dialoge und Map-Interaktionen.
- Backend: Die API validiert Eingaben serverseitig, Sessions laufen automatisch nach 12 Stunden ab.
- Automatisierte Tests können unkompliziert ergänzt werden (z. B. PHPUnit oder Cypress), sind aber im Lernkontext optional.

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Viel Spaß beim Erweitern und Spielen!
