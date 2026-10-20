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

## Item-Grafiken

Die Inventar- und Auswahlgrafiken werden aus [Owen1212055/mc-assets](https://github.com/Owen1212055/mc-assets) geladen (festgelegter Commit bc96011714c0eb3770bd641a3b86459ad5f860c7). Sie zeigen gerenderte Minecraft-Items. Minecraft-Grafiken gehören ihren jeweiligen Rechteinhabern; diese Fanseite ist kein offizielles Minecraft-Produkt. Für die Grafiken ist eine Internetverbindung erforderlich.

## Herstellungsbedarf und Stream-Overlay

Bei jeder Farm zeigt „Herstellungsbedarf“ die direkten Zutaten der hinterlegten Rezepte sowie den Bedarf für nicht abgehakte Materialien. Zwischenprodukte werden separat aufgeführt; nicht hinterlegte Rezepte werden ausdrücklich ausgeschlossen.

„Stream-Overlay“ öffnet eine eigenständige Material-Checkliste. „OBS-Link kopieren“ liefert eine URL mit transparentem Hintergrund ohne Bedienhinweise. In OBS eine Browserquelle anlegen, URL einfügen und zum Abhaken „Interagieren“ verwenden. Erledigte Materialien werden grün hinterlegt. Der Link enthält eine Momentaufnahme der Farm. OBS verwendet einen eigenen Browserspeicher; Fortschritt daher dort abhaken oder einen aktualisierten Link einfügen. Im selben Browser werden Änderungen über Storage-Events synchronisiert.
