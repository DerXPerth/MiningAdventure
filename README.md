# StrataSphere – Mining Adventure Browsergame

StrataSphere ist ein vollständig im Browser laufendes Management-Spiel rund um den Aufbau eines globalen Bergbaukonzerns. Dieses Repository enthält eine produktionsreife, statische Web-App auf Basis von HTML, CSS und Vanilla-JavaScript.

## Features

- **Landingpage & Authentifizierung** – Modernes, responsives Design mit Login- und Registrierungsdialog (LocalStorage-basierte Accounts).
- **Globale Spielwelt** – Interaktive OpenStreetMap-Karte (Leaflet) zum Platzieren neuer Minen überall auf der Welt.
- **Wirtschaftssimulation** – Ressourcenproduktion mit Tag-/Nachtzyklus, Personalverwaltung, Logistik- und Forschungsmechaniken.
- **Forschung & Upgrades** – Mehrstufige Technologien, Logistikerweiterungen, Boosts und Upgrades für einzelne Minen.
- **Persistenter Spielstand** – Fortschritt wird automatisch und zusätzlich über den Speichern-Button im Browser gesichert.

## Schnellstart

1. Repository klonen oder herunterladen.
2. Einen lokalen Webserver starten (z. B. `npx serve .` oder `python -m http.server`).
3. `http://localhost:PORT/index.html` im Browser öffnen.

> **Hinweis:** Aufgrund von Browser-Sicherheitsrichtlinien sollte das Spiel nicht direkt als `file://` geöffnet werden. Verwende einen lokalen Webserver.

## Technologie-Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES Modules)
- **Karte:** Leaflet 1.9.x mit OpenStreetMap-Tiles
- **State-Management:** Browser `localStorage`

## Assets

Alle Grafiken sind Vektor-SVGs, die direkt im Repository liegen. Weitere Bildressourcen können über KI-Tools ergänzt werden.

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Viel Spaß beim Erweitern und Spielen!
