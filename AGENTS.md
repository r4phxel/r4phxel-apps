# Releases für r4phxel apps

Der Browser-Katalog und SideStore verwenden dieselbe `source.json`. Dieses Repository enthält die Katalog-Webseite, die Quelle, öffentliche Bilder und freigegebene IPA-Downloads als Release-Anhänge. Spielprojekte werden separat geführt.

- [Katalog im Browser](https://r4phxel.github.io/r4phxel-apps/)
- [SideStore-Quelle](https://r4phxel.github.io/r4phxel-apps/source.json)

## Ein Release veröffentlichen

1. Verwende die vom Nutzer für die Veröffentlichung freigegebene IPA mit exakt ihrem Dateinamen und Inhalt. Ermittle Dateigröße und SHA-256. Lies `CFBundleIdentifier`, `CFBundleShortVersionString`, `CFBundleVersion` und `MinimumOSVersion` aus der `Info.plist` der Haupt-App im IPA-Archiv. Für INDIZ muss die Bundle-ID `com.indiz.game` lauten. Bei Updates müssen Version und Buildnummer gegenüber dem aktuellen Eintrag steigen.
2. Erstelle unter [GitHub Releases](https://github.com/r4phxel/r4phxel-apps/releases) ein Release mit einem App-spezifischen Tag wie `indiz-v1.0` und dem Titel `INDIZ 1.0`. Hänge die IPA an. Verifiziere den direkten Download ohne Anmeldung und vergleiche Prüfsumme und Größe. Falls ein Release mit identischer IPA bereits existiert, verwende es weiter. Kläre Abweichungen mit dem Nutzer.
3. Ergänze für eine neue App einen Eintrag in `apps` mit Name, Entwicklername, Bundle-ID, Beschreibung, öffentlichem Icon und den tatsächlichen App-Berechtigungen. Bei INDIZ lautet der Anzeigename **INDIZ** und das Icon liegt unter `media/indiz-icon.png`. Hinterlege bei Bedarf freigegebene Screenshots. `featuredApps` enthält die Bundle-IDs der hervorgehobenen Apps.
4. Füge die neue Version an erster Stelle von `versions` ein. Verwende `version`, `buildVersion`, `date` (JJJJ-MM-TT), `localizedDescription`, `downloadURL`, `size` (Bytes als Zahl) und `minOSVersion`. Behalte frühere Einträge und Release-Anhänge. Der Browser zeigt automatisch die erste Version an.
5. Committe die aktualisierte Quelle nach `main`. Nach dem Pages-Deployment prüfe Katalog, Live-JSON und IPA-Download ohne Anmeldung. Die Repository-Adresse, `sourceURL` und `identifier` dienen als feste Adressen und Anbieteridentität.

## Versionshinweise

Schreibe für jedes Update kurze deutsche Stichpunkte anhand tatsächlicher Änderungen. Verwende die Überschriften **Neu**, **Verbessert** und **Entfernt** jeweils nur, wenn es dazu mindestens einen Stichpunkt gibt. Hinterlege dieselben Hinweise im GitHub-Release und in `versions[0].localizedDescription`. Frage nach, wenn sich die Änderungen aus dem Auftrag und dem verfügbaren Projektstand nicht ermitteln lassen.

## Updates auf bestehenden iPhones

Behalte die installierte App auf dem iPhone. Für ein Update über SideStore müssen Bundle-ID und effektiv signierte App-ID zur vorhandenen Installation passen. Ein Wechsel der Quellenadresse erfordert, die neue Quelle in SideStore hinzuzufügen.
