# Farmbuch

Eine responsive, deutschsprachige Minecraft-Farmensammlung ohne Build-Schritt oder Server-Abhängigkeiten.

## Funktionen

- Farmen erstellen, bearbeiten und löschen
- Kategorien, Edition, Minecraft-Version und Baufortschritt
- Materiallisten mit dauerhaft gespeicherten Checkboxen
- Video-Links (HTTP/HTTPS), Notizen, Suche und Filter
- JSON-Export und validierter Import; vorhandene IDs werden beim Import übersprungen

## Start

Den Ordner mit einem beliebigen statischen Webserver bereitstellen. Einstiegspunkt: `index.html`. Die drei Dateien `index.html`, `style.css` und `app.js` müssen im selben Verzeichnis liegen.

## GitHub Pages

In den Repository-Einstellungen unter **Pages** eine passende Veröffentlichungsquelle wählen. Wird das Repository aus dem Hauptverzeichnis veröffentlicht und liegt die App unter `minecraft-farmen`, ist sie unter `https://BENUTZER.github.io/REPOSITORY/minecraft-farmen/` erreichbar. Pages muss für das Repository verfügbar und aktiviert sein.

## Speicherung

Farmen werden ausschließlich in `localStorage` dieses Browsers und dieser Website-Adresse gespeichert. Sie werden nicht automatisch zu GitHub oder zwischen Geräten synchronisiert. Regelmäßig JSON exportieren; das Löschen von Browserdaten entfernt die Sammlung. Import fügt neue IDs hinzu und überschreibt keine bestehenden Einträge. Keine Zugangsdaten erforderlich. Google Fonts ist optional; bei fehlendem Netz greifen lokale Ersatzschriften.
