---
title: WEB P3 Mitarbeiterqualifizierung
---

# Mitarbeiterqualifizierung
**Gruppe B4**<br>
**Marvin van Kessel (986598)**<br>
**Gültigkeitsdatum 21.01.2021**

## Allgemeine Beschreibung

### Aufgabe der Anwendung

Die Anwendung "Mitarbeiterqualifizierung" ermöglicht das Verwalten von Mitarbeitern, Weiterbildungen, Qualifizierungen und ggf. Zertifikaten.
Dazu gehört das Erfassen neuer Mitarbeiter oder Weiterbildungen, sowie die Bearbeitung und Löschung dieser Daten.
Mitarbeiter können an Weiterbildungen teilnehmen oder ihre Teilnahme stornieren. Durch erfolgreiches Abschließen einer Weiterbildung kann ein Mitarbeiter Qualifikationen und Zertifikate erwerben.
Desweiteren gibt es Funktionen zur Auswertung der Mitarbeiter und Weiterbildungen. Dort findet man eine Liste aller Weiterbildungen an denen der Mitarbeiter teilgenommen hat, sowie die Zertifikate die man erlangt hat.
Außerdem ist sichtbar, welche Weiterbildungen wie viele erfolgreiche Teilnehmer hatte.


------------



### Übersicht der fachlichen Funktionen

#### Startseite

Hier werden folgende Infos angezeigt:
- Anzahl der erfassten Mitarbeiter
- Anzahl der planenden, laufenden und abgeschlossenen Weiterbildungen
- Anzahl aller Teilnahmen an Weiterbildungen

#### Pflege

- Verwaltung der Mitarbeiter: Erfassen, bearbeiten und löschen
- Detailierte Ansicht der Mitarbeiter
- Verwaltung der Weiterbildungen sowie Qualifikationen (und ggf. Zertifikate): Erfassen, bearbeiten und löschen
- Detailierte Ansicht der Weiterbildungen

#### Teilnahme

- Mitarbeiter können an zukünftig angebotenen Weiterbildungen teilnehmen und wieder stornieren sofern die Weiterbildung nicht begonnen hat
- Weiterbildungen können bei abgeschlossenem Status zwischen Erfolg und Nichterfolg der Teilnehmer entscheiden
- Weiterbildungen können bei laufendem Status die Teilnahme der Mitarbeiter abbrechen

#### Auswertungen

- Detailierte Ansicht der Mitarbeiter und dessen Teilnahmen an Weiterbildung inklusive Status
- Detailierte Ansicht der Weitbildungen führt zu Listenansicht der erfolgreichen Teilnehmer
- Auflistung aller möglich erwerbbaren Zertifikate sowie Liste der Mitarbeiter, die diese erworben haben


------------



## Beschreibung der Komponenten des Servers

### server.py `server.py`

Startet den Server.


------------



### application.py `application.py`

#### Zweck

Die Application Python Datei ist für die Verwaltung des Datenverkehrs zuständig.

#### Zusammenwirken mit anderen Komponenten

Die Klassegreift auf `database.py` zu um die Daten der Mitarbeiter und Weiterbildungen von der Datenbank zu erhalten. Ebenfalls wird `view.py` aufgegriffen, um die Seiten mit den entsprechenden Daten anzuzeigen.

#### API

| Funktionen für Startseite  | Beschreibung  |
| ------------ | ------------ |
|  `__init__(self)` | Legt die Datenbank database an, sowie view.  |
|  `GET(self, id=None, startseite=None)` | Fordert Daten an. Gibt die Funktionen getAllData zurück.  |
| `getAllData(self)`  | Sammelt alle benötigten Daten für die Startseite und sendet diese an View.  |

| Funktionen für Mitarbeiter  | Beschreibung  |
| ------------ | ------------ |
|  `__init__(self)` | Legt die Datenbank database an, sowie view.  |
|  `GET(self, id=None, mitarbeiter=None)` | Fordert Daten an. Gibt die Funktionen getList oder getDetail zurück.  |
| `POST(self, id, name, vorname, akagrad, taetigkeit)`  | Erfasst einen neuen Mitarbeiter. Sendet Daten an Datebase zum erstellen. |
| `PUT(self, id, name, vorname, akagrad, taetigkeit)`  | Bearbeitet einen Mitarbeiter. Sendet Daten an Datebase zum updaten. |
| `DELETE(self, id)`  | Löscht einen Mitarbeiter. Sendet id an Datebase zum löschen. |
| `getList_m(self)`  | Fordert alle Mitarbeiterdaten an. |
| `getDetail_m(self)`  | Fordert alle Daten an eines bestimmten Mitarbeiters an. |
| `get_mitarbeiter_anzeigen(self, id_spl)`  | Liest alle Daten aus und sendet diese an View um einen Mitarbeiter anzuzeigen. |

| Funktionen für Weiterbildungen  | Beschreibung  |
| ------------ | ------------ |
|  `__init__(self)` | Legt die Datenbank database an, sowie view.  |
|  `GET(self, id=None, weiterbildung=None)` | Fordert Daten an. Gibt die Funktionen getList oder getDetail zurück.  |
| `POST(self, id, bezeichnung_w, von_w, bis_w, beschreibung_w, maxteilnehmer_w, minteilnehmer_w, bezeichnung_q, beschreibung_q, bezeichnung_z, beschreibung_z, berechtigtzu_z)`  | Erfasst eine neue Weiterbildung inkl. Qualifikation und Zertifikat. Sendet Daten an Datebase zum erstellen. |
| `PUT(self, id, bezeichnung_w, von_w, bis_w, beschreibung_w, maxteilnehmer_w, minteilnehmer_w, bezeichnung_q, beschreibung_q, bezeichnung_z, beschreibung_z, berechtigtzu_z)`  | Bearbeitet eine Weiterbildung. Sendet Daten an Datebase zum updaten. |
| `DELETE(self, id)`  | Löscht eine Weiterbildung. Sendet id an Datebase zum löschen. |
| `getList_w(self)`  | Fordert alle Daten der Weiterbildungen an. |
| `getDetail_w(self)`  | Fordert alle Daten einer bestimmten Weiterbildung an. |
| `get_weiterbildung_anzeigen(self, id_spl)`  | Liest alle Daten aus und sendet diese an View um eine Weiterbildung anzuzeigen. |

| Funktionen für Teilnahme  | Beschreibung  |
| ------------ | ------------ |
|  `__init__(self)` | Legt die Datenbank database an, sowie view.  |
|  `GET(self, id=None, teilnahme=None)` | Fordert Daten an.  |
| `POST(self, id_w, id_m)`  | Erfasst eine neue Teilnahme. |
| `PUT(self, id_m, id_w, status)`  | Bearbeitet eine Teilnahme. Sendet Daten an Datebase zum updaten. |
| `DELETE(self, id_w, id_m)`  | Löscht eine Teilnahme. Sendet Id's an Datebase zum löschen. |
| `getList_w(self)`  | Fordert alle Daten der Weiterbildungen an. |
| `getDetail_mt(self, id_spl)`  | Fordert alle Daten an für die Anzeige Teilnahme Mitarbeiter. |
| `getDetail_wt(self, id_spl)`  | Fordert alle Daten an für die Anzeige Teilnahme Weiterbildung. |

| Funktionen für Auswertungen  | Beschreibung  |
| ------------ | ------------ |
|  `__init__(self)` | Legt die Datenbank database an, sowie view.  |
|  `GET()` | Fordert Daten an.  |
| `POST()`  | Erstellt Daten neu. |
| `PUT()`  | Bearbeitet Daten. Sendet Daten an Datebase zum updaten. |
| `DELETE()`  | Löscht Daten. |
| `getList_auswertung()`  | Fordert alle Daten der Liste an. |
| `getDetail_auswertung()`  | Fordert alle Daten an detailierte Anzeige. |

------------



### database.py `database.py`

#### Zweck

Die Database Python Datei ist für die Verwaltung aller Daten zuständig. 
Es werden Methoden zum Erstellen, Löschen oder ändern der Daten zur Verfügung gestellt.

#### API

| Funktionen  | Beschreibung
| ------------ | ------------ |
| `__init__(self)`  | Legt die Datensätze an und ließt Sie aus den JSON Dateien aus.  |
| `create_mitarbeiter(self, data_m)`  | Erstellt eine random ID. Die mitgelieferten Daten werden der ID zugewiesen und in die JSON Datei gespeichert.  |
| `create_weiterbildung(self, data_w, data_q, data_z)`  | Erstellt eine random ID. Die mitgelieferten Daten werden der ID zugewiesen und in die JSON Datei gespeichert.  |
| `create_qualifikation(self, data_q, id)`  | Die mitgelieferten Daten werden der ID zugewiesen und in die JSON Datei gespeichert.  |
| `create_zertifikate(self, data_z, id)`  |  Die mitgelieferten Daten werden der ID zugewiesen und in die JSON Datei gespeichert. |
| `create_teilnahme(self, data_t, id_w, id_m, data_new)`  | Erstellt eine random ID. Die mitgelieferten Daten werden der ID zugewiesen und in die JSON Datei gespeichert.  |
| `create_teilnahmeIDs(self, id_t)`  | Erstellt eine neue Teilnahme ID.  |
| `read_mitarbeiter(self, id_m = None)`  |  Lädt die Daten data_m, falls Id mitgegeben sind das die Daten dieses Mitarbeiters, ansonsten von allen. |
| `read_weiterbildung(self, id_w = None)`  | Lädt die Daten data_w, falls Id mitgegeben sind das die Daten dieser Weiterbildung, ansonsten von allen.  |
| `read_qualifikation(self, id_q = None)`  | Lädt die Daten data_q, falls Id mitgegeben sind das die Daten dieser Weiterbildung, ansonsten von allen.  |
| `read_zertifikate(self, id_z = None)`  | Lädt die Daten data_z, falls Id mitgegeben sind das die Daten dieser Weiterbildung, ansonsten von allen.  |
| `read_teilnahme(self, id_t = None)`  | Lädt die Daten data_t.  |
| `read_teilnahmeIDs(self, id_tID = None)`  | Lädt die Daten data_tIDs.  |
| `update_mitarbeiter(self, id_m, data_m)`  | Aktualisiert die Daten zwischen JSON und data_m.  |
| `update_weiterbildung(self, id_w, data_w)`  |  Aktualisiert die Daten zwischen JSON und data_w. |
| `update_qualifikation(self, id_q, data_q)`  |  Aktualisiert die Daten zwischen JSON und data_q. |
| `update_zertifikate(self, id_z, data_z)`  | Aktualisiert die Daten zwischen JSON und data_z.  |
| `update_teilnahme(self, data_t, data_tIDs, id_m, id_w, status)`  | Aktualisiert die Daten zwischen JSON und data_t.  |
| `delete_Mitarbeiter(self, id_m)`  | Entfernt Mitarbeiterdaten der mitgelieferten ID.  |
| `delete_Weiterbildung(self, id_w)`  |  Entfernt Weiterbildungsdaten der mitgelieferten ID. |
| `delete_Qualifikation(self, id_q)`  | Entfernt Qualifikationen der mitgelieferten ID.  |
| `delete_Zertifikate(self, id_z)`  |  Entfernt Zertifikate der mitgelieferten ID. |
| `delete_Teilnahme(self, id_w, id_m)`  |  Entfernt die Teilnahme der mitgelieferten ID. |
| `readData_mitarbeiter(self)`  | Lädt die Daten aus der JSON Datei und speichert sie in data_m.  |
| `readData_weiterbildung(self)`  | Lädt die Daten aus der JSON Datei und speichert sie in data_w.  |
| `readData_qualifikation(self)`  | Lädt die Daten aus der JSON Datei und speichert sie in data_q.  |
| `readData_zertifikate(self)`  | Lädt die Daten aus der JSON Datei und speichert sie in data_z.  |
| `readData_teilnahme(self)`  | Lädt die Daten aus der JSON Datei und speichert sie in data_t.  |
| `saveData_mitarbeiter(self)`, `saveData_weiterbildung(self)`, `saveData_qualifikation(self)`, `saveData_zertifikate(self)`, `saveData_teilnahme(self)`  | Schreibt und überschreibt die Daten in die JSON Datei.  |



------------


### template.py `template.py`

#### Zweck

Wird benutzt um alle Templates an den Client zu schicken.


------------

### view.py `view.py`

#### Zweck

Die View Klasse ist für die Zusammenstellung von Daten für die verschiedenen Templates zuständig.

### API

| Funktionen  | Beschreibung  |
| ------------ | ------------ |
| `createStartseite(self, data_m, data_w, data_t)`  | Fasst die Daten für die Startseite zusammen.  |
|  `createList_m(self, data_m)` | Daten von allen Mitarbeitern zusammenfassen.  |
| `createDetail_m(self, data_m, data_w, data_q, data_z, data_t)`  |  Daten von einem bestimmten Mitarbeiter zusammenfassen. |
| `mitarbeiter_anzeigen(self, data_m, data_w, data_q, data_z, data_t, id_spl)`  | Daten für die Mitarbeiter Anzeige zusammenfassen.  |
|  `createList_w(self, data_w)` | Daten von allen Weiterbildungen(inkl. Qualifikation, Zertifikat) zusammenfassen.   |
| `createDetail_w(self, data_w, data_q, data_z)`  |  Daten von einer bestimmten Weiterbildungen(inkl. Qualifikation, Zertifikat) zusammenfassen.  |
| `weiterbildung_anzeigen(self, data_m, data_w, data_q, data_z, data_t, id_spl)`  |  Daten für die Weiterbildungs Anzeige zusammenfassen. |
|  `createDetail_w_t(self, data_m, data_w, data_t, data_tIDs)`, `createDetail_m_t(self, data_m, data_w, data_t, data_tIDs)` | Daten von einer bestimmten Teilnahme zusammenfassen.  |
| `createList_auswertung_mitarbeiter(self, data_m)`, `createList_auswertung_weiterbildung(self, data_w)`, `createList_auswertung_zertifikat(self, data_z)`  |  Daten für die Auswertung zusammenfassen.  |
| `createDetail_auswertung_mitarbeiter(self, data_m, data_w, data_t, id_spl)`, `createDetail_auswertung_weiterbildung(self, data_m, data_w, data_t, id_spl)`, `createDetail_auswertung_zertifikat(self, data_m, data_z, data_t, id_spl)`  | Daten für die Auswertung Anzeigen zusammenfassen.  |


------------


### `main.js`

- `AnzeigenView_cl`

    Wird benötigt wenn eine Detailsicht angezeigt werden soll.


- `FormView_cl`

    Wird benötigt wenn eine Formularansicht angezeigt werden soll.


- `ListView_cl`

    Wird benötigt wenn eine Listenansicht angezeigt werden soll.


- `SideBar_cl`

    Dient zum rendern der Sidebar.


- `Application_cl`

    Hat hauptsächtlich die Aufgabe die `main.js` zu verwalten. Sie lädt zuerst
    alle Templates mit Hilfe der anderen Klassen. Der Eventservice ruft die `notify_px()`
    auf um das rendern einzuleiten. Diese ruft nämlich je nach ID die entsprechende 
    `render_px()` in `ListView_cl`, `FormView_cl` oder `AnzeigenView_cl`,
    welche wiederum die Template-Engine aufruft und so das Markup erstellt.


------------


### `evs.js`

Durch den Eventservice wird ein clientseitiger asynchroner Austausch zwischen den
JavaScript-Komponenten ermöglicht. Die Implementierung erfolgt in der Klasse `EventService_cl`.
Er arbeitet im Publish-Subscriber-Muster:

  - Subscriber melden sich zum Empfang von Nachrichten an (subscribe-Schnittstelle)
  - ein Publisher veröffentlicht über die publish-Schnittstelle des Eventservice eine Nachricht
  - die Subscriber erhalten dann eine Benachrichtung über ihre notify-Schnittstelle
  - Subscriber beenden den Empfang durch Aufruf der unSubscribe-Schnittstelle.
 


------------





## Datenablage

Die Daten werden JSON-Dateien abgelegt. Das Skript `database.py` sicher die Daten der Mitarbeiter, Weiterbildungen etc in:

- mitarbeiter.json
- qualifikation.json
- teilnahme.json
- teilnahmeIDs.json
- weiterbildung.json
- zertifikat.json



------------

## Konfiguration

```python
   # Method-Dispatcher für die "Startseite" Klasse
   cherrypy.tree.mount(
      application.App_startseite_cl(),
      '/app/startseite/',
      {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}}
   )

   # Method-Dispatcher für die "Mitarbeiter" Klasse
   cherrypy.tree.mount(
      application.App_mitarbeiter_cl(),
      '/app/mitarbeiter/',
      {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}}
   )

   # Method-Dispatcher für "Mitarbeiter Anzeigen" Klasse
   cherrypy.tree.mount(
      application.App_mitarbeiter_anzeigen_cl(),
      '/app/mitarbeiterAnzeigen/',
      {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}}
   )

   # Method-Dispatcher für "Weiterbildung" Klasse
   cherrypy.tree.mount(
      application.App_weiterbildung_cl(),
      '/app/weiterbildung/',
      {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}}
   )

   # Method-Dispatcher für "Weiterbildung Anzeigen" Klasse
   cherrypy.tree.mount(
      application.App_weiterbildung_anzeigen_cl(),
      '/app/weiterbildungAnzeigen/',
      {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}}
   )

   # Method-Dispatcher für "Teilnahme" Klasse
   cherrypy.tree.mount(
      application.App_teilnahme_cl(),
      '/app/teilnahme/',
      {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}}
   )     

   # Method-Dispatcher für "Auswertung Mitarbeiter" Klasse
   cherrypy.tree.mount(
      application.App_auswertung_mitarbeiter_cl(),
      '/app/auswertungMitarbeiter/',
      {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}}
   ) 

   # Method-Dispatcher für "Auswertung Weiterbildung" Klasse
   cherrypy.tree.mount(
      application.App_auswertung_weiterbildung_cl(),
      '/app/auswertungWeiterbildung/',
      {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}}
   ) 

   # Method-Dispatcher für "Auswertung Zertifikate" Klasse
   cherrypy.tree.mount(
      application.App_auswertung_zertifikat_cl(),
      '/app/auswertungZertifikat/',
      {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}}
   ) 

   # Method-Dispatcher für die "Templates" Klasse
   cherrypy.tree.mount(
      template.Template_cl(),
      '/templates',
      {'/': {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}}
   )
```
```python
	# Static content config
   static_config = {
      '/': {
         'tools.staticdir.root': current_dir,
         'tools.staticdir.on': True,
         'tools.staticdir.dir': './content'
      }
   }
```
Der Server ist erreichbar unter der Addresse: ```http://127.0.0.1:8080``` . 


------------



## Durchführung und Ergebnis der geforderten Prüfungen

### Markup-Validierung

Hier konnte die Variante, in dem man jede Seite öffnete und mittels Browser den Source Code öffnete, nicht verwendet werden.


## CSS-Validierung

Der Source_Code von style.css wurde mit dem [CSS-Validator](http://jigsaw.w3.org/css-validator/ "CSS-Validator") überprüft und es wurden 0 Fehler gefunden.

<img style="border:0;width:88px;height:31px"
            src="http://jigsaw.w3.org/css-validator/images/vcss"
            alt="CSS ist valide!" />

## REST-Tests

Die Tests verliefen weitestgehend Fehlerfrei: Code 200 OK