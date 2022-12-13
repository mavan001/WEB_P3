//------------------------------------------------------------------------------
//Demonstrator evs/tco/tmg
//------------------------------------------------------------------------------
'use strict'

// Aktuelles Datum wird für einige Templates gebraucht
var currentDate = new Date();
var dd = String(currentDate.getDate()).padStart(2, '0');
var mm = String(currentDate.getMonth()+1).padStart(2, '0'); // Januar ist 0, deswegen +1
var yyyy = currentDate.getFullYear();
currentDate = yyyy + '-' + mm + '-' + dd; // Aktuelles Datum

//------------------------------------------------------------------------------
class FormView_cl {
//------------------------------------------------------------------------------
   // Konstruktor für "Formular" Ansicht
   constructor (el_spl, template_spl, action) {
      this.el_s = el_spl;  //main (Hauptfenster wo alles angezeigt wird)
      this.template_s = template_spl;  //Template Name
	   this.action = action;   //mitarbeiter, weiterbildung etc.
   }

   render_px (id_spl, typ) {
      let path_s = "/app/" + this.action + "/" + id_spl; //der Pfad wird gesetzt
	      if(typ != ""){
		      path_s = path_s + "/" + typ;
	      }
	   console.log("render_px | path_s = " + path_s);
      let requester_o = new APPUTIL.Requester_cl();
      requester_o.request_px(path_s,
         function (responseText_spl) {
            let data_o = JSON.parse(responseText_spl);   //hole Json Daten aus view.py
            this.doRender_p(data_o);   //übergebe die Daten an die Renderfunktion
         }.bind(this),
         function (responseText_spl) {
            alert("Form - render failed");
         }
      );
   }

   //Tpl wird gerendert
   doRender_p (data_opl) {
      let markup_s = APPUTIL.tm_o.execute_px(this.template_s, data_opl);
      let el_o = document.querySelector(this.el_s);
         if (el_o != null) {
            el_o.innerHTML = markup_s;
            this.configHandleEvent_p();
         }
   }

   configHandleEvent_p () {   //setzt Event-Listener in form tag. Der EventListener reagiert auf den Button Speichern, Abbrechen etc., da diese innerhalb des Form Tags sind)
      let el_o = document.querySelector("form");
      if (el_o != null) {
	      console.log("c: this.action = " + this.action);
         el_o.addEventListener("click", this.handleEvent_p);
      }
   }

   handleEvent_p (event_opl) {

      if (event_opl.target.id == "idBack") { //Button Zurück
         APPUTIL.es_o.publish_px("app.cmd", ["idBack", null]);
         event_opl.preventDefault();
      }

      else if (event_opl.target.id == "idSave") {  //speichere Daten
		   let data ={};
         var form = document.getElementById("idForm");   //Alle Daten aus den input-Feldern werden ausgelesen
         //var inputs = form[0].getElementsByTagName("input");
         var input_action = document.getElementById("action");

		   var para = new URLSearchParams(new FormData(form));
		   let url = "/app/" + input_action.value + "/";
		   var type = "POST";
		      if(form[0].value != '') {  //wenn Daten schon vorher in den input-Feldern sind dann ändere Typ auf PUT (bearbeiten)

			      type = "PUT";
		      }
		 
		   console.log("Save: url = " + url);
		   console.log("Save: form[0].value = " + form[0].value);
		 
		   fetch(url, {method: type, body: para, header: {"Content-type": "application/x-www-form-urlencoded"}}).then(res => res.json()) //übergebe Daten an Application.py
		   .then(response => console.log("Success ID = ", response, alert("speichern erfolgreich"), APPUTIL.es_o.publish_px("app.cmd", ["input_action", response])))
		   .catch(error => console.error("Error", error));
		 
		   console.log("handleEvent_p() -> idSave 2");
		   APPUTIL.es_o.publish_px("app.cmd", ["idSave", null]);
		   event_opl.preventDefault();
	   }
	}
}

//------------------------------------------------------------------------------
class AnzeigenView_cl {
//------------------------------------------------------------------------------
   // Konstruktor für "Anzeigen" Ansicht
   constructor (el_spl, template_spl, action) {
      this.el_s = el_spl;  //main (Hauptfenster wo alles angezeigt wird)
      this.template_s = template_spl;  //Template Name
      this.action = action;   //mitarbeiter, weiterbildung etc.
   }

   render_px (id_spl, typ) {
      let path_s = "/app/" + this.action + "/" + id_spl; //der Pfad wird gesetzt
         if(typ != ""){
            path_s = path_s + "/" + typ;
         }
      console.log("render_px | path_s = " + path_s);
      let requester_o = new APPUTIL.Requester_cl();
      requester_o.request_px(path_s,
         function (responseText_spl) {
            let data_o = JSON.parse(responseText_spl);   //hole Json daten aus View.py
            this.doRender_p(data_o);   //übergebe die Daten an die Renderfunktion
         }.bind(this),
         function (responseText_spl) {
            alert("Anzeigen - render failed");
         }
      );
   }
   
   //Tpl wird gerendert
   doRender_p (data_opl) {
      let markup_s = APPUTIL.tm_o.execute_px(this.template_s, data_opl);
      let el_o = document.querySelector(this.el_s);
         if (el_o != null) {
            el_o.innerHTML = markup_s;
            this.configHandleEvent_p();
         }
   }
   
   configHandleEvent_p () {   
      
      // Anmelden/Stornieren Buttons: Teilnahme Mitarbeiter anzeigen
      let el_o = document.querySelector(".anmelden");
      let el_o2 = document.querySelector(".stornieren");

      // Zurück Buttons: Pflege Mitarbeiter/ Weiterbildung anzeigen
      let el_o3 = document.querySelector(".zurückmitarbeiter");   // Pflege: Mitarbeiter Anzeigen Zurück
      let el_o4 = document.querySelector(".zurückweiterbildung"); // Pflege: Weiterbildung Anzeigen Zurück

      // Zurück Buttons: Auswertung anzeigen
      let el_o5 = document.querySelector(".zurück_auswertung_mitarbeiter");   // Auswertung: Mitarbeiter anzeigen
      let el_o6 = document.querySelector(".zurück_auswertung_weiterbildung"); // Auswertung: Weiterbildung anzeigen
      let el_o7 = document.querySelector(".zurück_auswertung_zertifikat");    // Auswertung: Zertifikat anzeigen

      // Erfolg/Nichterfolg/Abbruch Buttons: Teilnahme Weiterbildung anzeigen
      let el_o8 = document.querySelector(".erfolg");    // Erfolg
      let el_o9 = document.querySelector(".nichterfolg");    // NichtErfolg
      let el_o10 = document.querySelector(".abbruch");    // Abbruch

      //EventListener wird gesetzt
      if (el_o != null) {
         console.log("c: this.action = " + this.action);
         el_o.addEventListener("click", this.handleEvent_p);
      }

      //EventListener wird gesetzt
      if (el_o2 != null) {
         console.log("c: this.action = " + this.action);
         el_o2.addEventListener("click", this.handleEvent_p);
      }

      //EventListener wird gesetzt
      if (el_o3 != null) {
         console.log("c: this.action = " + this.action);
         el_o3.addEventListener("click", this.handleEvent_p);
      }

      //EventListener wird gesetzt
      if (el_o4 != null) {
         console.log("c: this.action = " + this.action);
         el_o4.addEventListener("click", this.handleEvent_p);
      }

      //EventListener wird gesetzt
      if (el_o5 != null) {
         console.log("c: this.action = " + this.action);
         el_o5.addEventListener("click", this.handleEvent_p);
      }

      //EventListener wird gesetzt
      if (el_o6 != null) {
         console.log("c: this.action = " + this.action);
         el_o6.addEventListener("click", this.handleEvent_p);
      }

      //EventListener wird gesetzt
      if (el_o7 != null) {
         console.log("c: this.action = " + this.action);
         el_o7.addEventListener("click", this.handleEvent_p);
      }

      //EventListener wird gesetzt
      if (el_o8 != null) {
         console.log("c: this.action = " + this.action);
         el_o8.addEventListener("click", this.handleEvent_p);
      }

      //EventListener wird gesetzt
      if (el_o9 != null) {
         console.log("c: this.action = " + this.action);
         el_o9.addEventListener("click", this.handleEvent_p);
      }

      //EventListener wird gesetzt
      if (el_o10 != null) {
         console.log("c: this.action = " + this.action);
         el_o10.addEventListener("click", this.handleEvent_p);
      }
   }
   
   handleEvent_p (event_opl) {

      if (event_opl.target.tagName.toUpperCase() == "TD") { 
         let elx_o = document.querySelector(".clSelected");
            if (elx_o != null) {
               elx_o.classList.remove("clSelected");
            }
         event_opl.target.parentNode.classList.add("clSelected");
         event_opl.preventDefault();
      }

      //Zurückbuttons
      else if (event_opl.target.id == "idBackmitarbeiter") {
         APPUTIL.es_o.publish_px("app.cmd", ["idBackmitarbeiter", null]);
         event_opl.preventDefault();
      }

      //Zurückbuttons
      else if (event_opl.target.id == "idBackweiterbildung") {
         APPUTIL.es_o.publish_px("app.cmd", ["idBackweiterbildung", null]);
         event_opl.preventDefault();
      }

      //Zurückbuttons
      else if (event_opl.target.id == "idBackAuswertungMitarbeiter") {
         APPUTIL.es_o.publish_px("app.cmd", ["idBackAuswertungMitarbeiter", null]);
         event_opl.preventDefault();
      }

      //Zurückbuttons
      else if (event_opl.target.id == "idBackAuswertungWeiterbildung") {
         APPUTIL.es_o.publish_px("app.cmd", ["idBackAuswertungWeiterbildung", null]);
         event_opl.preventDefault();
      }

      //Zurückbuttons
      else if (event_opl.target.id == "idBackAuswertungZertifikat") {
         APPUTIL.es_o.publish_px("app.cmd", ["idBackAuswertungZertifikat", null]);
         event_opl.preventDefault();
      }

      //Status Erfolg in Teilnahme Weiterbildung Anzeigen
      else if (event_opl.target.id == "erfolgTeilnahme") {  //Wenn auf Erfolg geklickt wurde
         var elx_o = document.querySelector(".clSelected");   //ID von Tabellenzeile wird abgefragt
         var weiterbildungdaten = document.getElementById("weiid").dataset.value;  //hole Weiterbildung-ID von der Tpl Datei
         if (elx_o == null || elx_o.id == weiterbildungdaten) {   //Falls kein Tabelleneintrag ausgewählt wurde oder der ausgewählte Tabelleneintrag == der WeiterbildungsID ist, dann blockiere. (Man kann den Status nur für Mitarbeiter ändern, nicht für eine Weiterbildung :))

            alert("Bitte zuerst einen gültigen Eintrag auswählen!");
         } 
         else {
            status = "erfolgreich";
            APPUTIL.es_o.publish_px("app.cmd", ["erfolgTeilnahme", elx_o.id, weiterbildungdaten, status]);  //übergebe die Mitarbeiter-ID und die WeiterbildungsID, sowie den Status
         }
      }

      //Status NichtErfolg in Teilnahme Weiterbildung Anzeigen
      else if (event_opl.target.id == "nichterfolgTeilnahme") {   //Wenn auf Nichterfolg geklickt wurde
         var elx_o = document.querySelector(".clSelected");   //ID von Tabellenzeile wird abgefragt
         var weiterbildungdaten = document.getElementById("weiid").dataset.value;  //hole Weiterbildung-ID von der Tpl Datei
         if (elx_o == null || elx_o.id == weiterbildungdaten) {   //Falls kein Tabelleneintrag ausgewählt wurde oder der ausgewählte Tabelleneintrag == der WeiterbildungsID ist, dann blockiere. (Man kann den Status nur für Mitarbeiter ändern, nicht für eine Weiterbildung :))

            alert("Bitte zuerst einen gültigen Eintrag auswählen!");
         } 
         else {
            status = "nicht erfolgreich";
            APPUTIL.es_o.publish_px("app.cmd", ["nichterfolgTeilnahme", elx_o.id, weiterbildungdaten, status]);   //übergebe die Mitarbeiter-ID und die WeiterbildungsID, sowie den Status
         }
      }

      //Status Abbruch in Teilnahme Weiterbildung Anzeigen
      else if (event_opl.target.id == "abbruchTeilnahme") { //Wenn auf Abbrechen geklickt wurde
         var elx_o = document.querySelector(".clSelected");   //ID von Tabellenzeile wird abgefragt
         var weiterbildungdaten = document.getElementById("weiid").dataset.value;  //hole Weiterbildung-ID von der Tpl Datei
         if (elx_o == null || elx_o.id == weiterbildungdaten) {   //Falls kein Tabelleneintrag ausgewählt wurde oder der ausgewählte Tabelleneintrag == der WeiterbildungsID ist, dann blockiere. (Man kann den Status nur für Mitarbeiter ändern, nicht für eine Weiterbildung :))

            alert("Bitte zuerst einen gültigen Eintrag auswählen!");
         } 
         else {
            status = "abgebrochen";
            APPUTIL.es_o.publish_px("app.cmd", ["abbruchTeilnahme", elx_o.id, weiterbildungdaten, status]); //übergebe die Mitarbeiter-ID und die WeiterbildungsID, sowie den Status
         }
      }

      // Teilnahme anmelden in Teilnahme Mitarbeiter anzeigen
      else if (event_opl.target.id == "idSaveTeilnahme") {  //Wenn auf Anmelden geklickt wurde
         var elx_o = document.querySelector(".clSelected");   //ID von Tabellenzeile wird abgefragt
         var mitarbeiterdaten = document.getElementById("mitid").dataset.value;  //hole Mitarbeiter-ID von der Tpl Datei
         if (elx_o == null || elx_o.id == mitarbeiterdaten) {  //Falls kein Tabelleneintrag ausgewählt wurde oder der ausgewählte Tabelleneintrag == der MitarbeiterID ist, dann blockiere. (Man kann sich für keinen Mitarbeiter anmelden. Nur für eine Weiterbildung :))

            alert("Bitte zuerst einen gültigen Eintrag auswählen!");
         } 
         else {
            APPUTIL.es_o.publish_px("app.cmd", ["addteilnahme", elx_o.id, mitarbeiterdaten] );  //rufe addteilnahme auf und übergebe die Weiterbildungs-ID und die Mitarbeiter-ID. Funktion läuft über publish_px in evs.js. Von dort wird die notify_px in main.js aufgerufen. Dort muss ein case und eine Funktion mit "addteilnahme" existieren. Und dort wird es dann in die Application.py übergeben mit dem Befehel POST.
         }
      }
      
      // Teilnahme stornieren in Teilnahme Mitarbeiter anzeigen
      else if (event_opl.target.id == "idDeleteTeilnahme") {   //Wenn auf Stornieren geklickt wurde
         var elx_o = document.querySelector(".clSelected");   //ID von Tabellenzeile wird abgefragt
         var mitarbeiterdaten = document.getElementById("mitid").dataset.value;  //hole Mitarbeiter-ID von der Tpl Datei
         if (elx_o == null || elx_o.id == mitarbeiterdaten) {  //Falls kein Tabelleneintrag ausgewählt wurde oder der ausgewählte Tabelleneintrag == der MitarbeiterID ist, dann blockiere. (Man kann keinen Mitarbeiter stornieren. Nur eine Weiterbildung :))

            alert("Bitte zuerst einen gültigen Eintrag auswählen!");
         } 
         else {
            APPUTIL.es_o.publish_px("app.cmd", ["deleteteilnahme", elx_o.id, mitarbeiterdaten] );  //rufe deleteteilnahme auf und übergebe die Weiterbildungs-ID und die Mitarbeiter-ID. Funktion läuft über publish_px in evs.js. Von dort wird die notify_px in main.js aufgerufen. Dort muss ein case und eine Funktion mit "deleteteilnahme" existieren. Und dort wird es dann in die Application.py übergeben mit dem Befehel DELETE.
         }
	   }
   }
}

//------------------------------------------------------------------------------
class ListView_cl {
//------------------------------------------------------------------------------
   // Konstruktor für "Listen" Ansicht
   constructor (el_spl, template_spl, action) {
      this.el_s = el_spl;  //main (Hauptfenster wo alles angezeigt wird)
      this.template_s = template_spl;  //Template Name
      this.configHandleEvent_p();   //ein EventListener wird erstellt, sobald man eine Seite aufruft, z.b. Pflege Weiterbildung
	   this.action = action;   //mitarbeiter, weiterbildung etc.
	   console.log("lv: this.action = " + this.action);
   }

   render_px (id) {
      let path_s = "/app/" + this.action + "/"; //Pfad wird übergeben
	   console.log("render_px: id = " + id);
	      if (id != null && id != -1) { //Falls eine ID mitgeliefert wurde, aktualisere den Pfad
		      path_s = path_s + null + "/" + id + "/";
         }
      
	   console.log("path_s = " + path_s);
      let requester_o = new APPUTIL.Requester_cl();
      requester_o.request_px(path_s,
         function (responseText_spl) {
            let data_o = JSON.parse(responseText_spl);   //hole Json Daten aus View.py
            this.doRender_p(data_o);   //übergebe die Daten an die Renderfunktion
         }.bind(this),
         function (responseText_spl) {
            alert("List - render failed ");
         }
      );
   }

   //Tpl wird gerendert
   doRender_p (data_opl) {
      let markup_s = APPUTIL.tm_o.execute_px(this.template_s, data_opl);
      let el_o = document.querySelector(this.el_s);
         if (el_o != null) {
            el_o.innerHTML = markup_s;
         }
   }

   configHandleEvent_p () {   //bei einem Klick auf etwas, wird die handleEvent Methode aufgerufen. Dort werden verschiedene IDs abgefragt, z.b. von Buttons etc.
      let el_o = document.querySelector(this.el_s);
      if (el_o != null) {
         el_o.addEventListener("click", this.handleEvent_p);
      }
   }

   handleEvent_p (event_opl) {   //falls eine Tabellenzeile ausgewählt wurde, setzte eine ID. Auf diese ID können die anderen events zugreifen, um so die ID der Tabellenzeile zu erhalten, z.b. die Mitarbeiter-ID

      if (event_opl.target.tagName.toUpperCase() == "TD") {
         let elx_o = document.querySelector(".clSelected");
            if (elx_o != null) {
               elx_o.classList.remove("clSelected");
            }
         event_opl.target.parentNode.classList.add("clSelected");
         event_opl.preventDefault();
      }

      //Löschen eines ausgewählten Eintrags
	   else if (event_opl.target.id == "idDelete") {   //wenn Button Entfernen gedrückt wurde
         let elx_o = document.querySelector(".clSelected"); //ID von Tabellenzeile wird abgefragt
            if (elx_o == null) { //Falls kein Tabelleneintrag ausgewählt wurde

               alert("Bitte zuerst einen Eintrag auswählen!");
            } 
            else {

               APPUTIL.es_o.publish_px("app.cmd", ["idDelete", elx_o.id] );   //Tag idDelete und die ausgewählte Zeilen-ID wird übergeben. Weiter unten wird das Tag abgefragt und dann an Application.py übergeben.
            }
      }

      //Anzeigen Mitarbeiter in Plege Mitarbeiter
	   else if (event_opl.target.id == "anzeigen_mitarbeiter") {   //wenn Button Anzeigen gedrückt wurde

         let elx_o = document.querySelector(".clSelected"); //ID von Tabellenzeile wird abgefragt
         if (elx_o == null) { //Falls kein Tabelleneintrag ausgewählt wurde

            alert("Bitte zuerst einen Eintrag auswählen!"); //Falls kein Tabelleneintrag ausgewählt wurde
         }else {

            console.log("anzeigen_mitarbeiter");
            APPUTIL.es_o.publish_px("app.cmd", ["anzeigen_mitarbeiter", elx_o.id] );   //Tag anzeigen_mitarbeiter und die ausgewählte Zeilen-ID wird übergeben. Weiter unten wird das Tag abgefragt und dann an Application.py übergeben.
         }
      }

      //Auswertung Mitarbeiter Anzeigen
	   else if (event_opl.target.id == "anzeigen_auswertung_mitarbeiter") { //wenn Button Anzeigen gedrückt wurde

         let elx_o = document.querySelector(".clSelected"); //ID von Tabellenzeile wird abgefragt
         if (elx_o == null) { //Falls kein Tabelleneintrag ausgewählt wurde

            alert("Bitte zuerst einen Eintrag auswählen!");
         }else {

            console.log("anzeigen_auswertung_mitarbeiter");
            APPUTIL.es_o.publish_px("app.cmd", ["anzeigen_auswertung_mitarbeiter", elx_o.id] ); //Tag anzeigen_auswertung_mitarbeiter und die ausgewählte Zeilen-ID wird übergeben. Weiter unten wird das Tag abgefragt und dann an Application.py übergeben.
         }
      }

      //Auswertung Weiterbildung Anzeigen
	   else if (event_opl.target.id == "anzeigen_auswertung_weiterbildung") {  //wenn Button Anzeigen gedrückt wurde

         let elx_o = document.querySelector(".clSelected"); //ID von Tabellenzeile wird abgefragt
         if (elx_o == null) { //Falls kein Tabelleneintrag ausgewählt wurde

            alert("Bitte zuerst einen Eintrag auswählen!");
         }else {

            console.log("anzeigen_auswertung_weiterbildung");
            APPUTIL.es_o.publish_px("app.cmd", ["anzeigen_auswertung_weiterbildung", elx_o.id] );  //Tag anzeigen_auswertung_weiterbildung und die ausgewählte Zeilen-ID wird übergeben. Weiter unten wird das Tag abgefragt und dann an Application.py übergeben.
         }
      }

      //Auswertung Zertifikat Anzeigen
	   else if (event_opl.target.id == "anzeigen_auswertung_zertifikat") {  //wenn Button Anzeigen gedrückt wurde

         let elx_o = document.querySelector(".clSelected"); //ID von Tabellenzeile wird abgefragt
         if (elx_o == null) { //Falls kein Tabelleneintrag ausgewählt wurde

            alert("Bitte zuerst einen Eintrag auswählen!");
         }else {

            console.log("anzeigen_auswertung_zertifikat");
            APPUTIL.es_o.publish_px("app.cmd", ["anzeigen_auswertung_zertifikat", elx_o.id] );  //Tag anzeigen_auswertung_zertifikat und die ausgewählte Zeilen-ID wird übergeben. Weiter unten wird das Tag abgefragt und dann an Application.py übergeben.
         }
      }

      //Teilnahme Mitarbeiter Anzeigen
	   else if (event_opl.target.id == "anzeigen_teilnahme_mitarbeiter") {  //wenn Button Anzeigen gedrückt wurde

         let elx_o = document.querySelector(".clSelected"); //ID von Tabellenzeile wird abgefragt
         if (elx_o == null) { //Falls kein Tabelleneintrag ausgewählt wurde

            alert("Bitte zuerst einen Eintrag auswählen!");
         }else {

            console.log("anzeigen_teilnahme_mitarbeiter");
            APPUTIL.es_o.publish_px("app.cmd", ["anzeigen_teilnahme_mitarbeiter", elx_o.id] );  //Tag anzeigen_teilnahme_mitarbeiter und die ausgewählte Zeilen-ID wird übergeben. Weiter unten wird das Tag abgefragt und dann an Application.py übergeben.
         }
      }

      //Teilnahme Weiterbildung Anzeigen
	   else if (event_opl.target.id == "anzeigen_teilnahme_weiterbildung") {   //wenn Button Anzeigen gedrückt wurde

         let elx_o = document.querySelector(".clSelected"); //ID von Tabellenzeile wird abgefragt
         if (elx_o == null) { //Falls kein Tabelleneintrag ausgewählt wurde

            alert("Bitte zuerst einen Eintrag auswählen!");
         }else {

            console.log("anzeigen_teilnahme_weiterbildung");
            APPUTIL.es_o.publish_px("app.cmd", ["anzeigen_teilnahme_weiterbildung", elx_o.id] );   //Tag anzeigen_teilnahme_weiterbildung und die ausgewählte Zeilen-ID wird übergeben. Weiter unten wird das Tag abgefragt und dann an Application.py übergeben.
         }
      }

      //Erfassen Mitarbeiter in Pflege Weiterbildung
	   else if (event_opl.target.id == "erfassen_mitarbeiter") {   //wenn Button Erfassen gedrückt wurde

		   console.log("erfassen_mitarbeiter");
		   APPUTIL.es_o.publish_px("app.cmd", ["form_mitarbeiter", null] );  //Tag form_mitarbeiter wird übergeben. Weiter unten wird das Tag abgefragt und dann an Application.py übergeben.
      }
      
      //Liste anzeigen aller Mitarbeiter
	   else if (event_opl.target.id == "mitarbeiter") {

		   APPUTIL.es_o.publish_px("app.cmd", ["mitarbeiter", null] ); //Tag mitarbeiter wird übergeben. Weiter unten wird das Tag abgefragt und dann an Application.py übergeben. 
      }
      
      //Bearbeiten Mitarbeiter in Pflege Mitarbeiter
      else if (event_opl.target.id == "bearbeiten_mitarbeiter") { //wenn Button Bearbeiten gedrückt wurde

         let elx_o = document.querySelector(".clSelected"); //ID von Tabellenzeile wird abgefragt
         if (elx_o == null) { //Falls kein Tabelleneintrag ausgewählt wurde

            alert("Bitte zuerst einen Eintrag auswählen!");
         }else {

            console.log("bearbeiten_mitarbeiter");
            APPUTIL.es_o.publish_px("app.cmd", ["form_mitarbeiter", elx_o.id] ); //Tag form_mitarbeiter wird übergeben. Weiter unten wird das Tag abgefragt und dann an Application.py übergeben.
         }
      }

      //Anzeigen Weiterbildung
	   else if (event_opl.target.id == "anzeigen_weiterbildung") { //wenn Button Anzeigen gedrückt wurde

         let elx_o = document.querySelector(".clSelected"); //ID von Tabellenzeile wird abgefragt
         if (elx_o == null) { //Falls kein Tabelleneintrag ausgewählt wurde

            alert("Bitte zuerst einen Eintrag auswählen!");
         }else {

            console.log("anzeigen_weiterbildung");
            APPUTIL.es_o.publish_px("app.cmd", ["anzeigen_weiterbildung", elx_o.id] ); //Tag anzeigen_weiterbildung und die ausgewählte Zeilen-ID wird übergeben. Weiter unten wird das Tag abgefragt und dann an Application.py übergeben.
         }
      }

      //Erfassen Weiterbildung in Pflege Weiterbildung
	   else if (event_opl.target.id == "erfassen_weiterbildung") { //wenn Button Erfassen gedrückt wurde

		   console.log("erfassen_weiterbildung");
		   APPUTIL.es_o.publish_px("app.cmd", ["form_weiterbildung", null] );   //Tag form_weiterbildung wird übergeben. Weiter unten wird das Tag abgefragt und dann an Application.py übergeben. 
      }

      //Liste anzeigen aller Weiterbildungen
	   else if (event_opl.target.id == "weiterbildung") {

		   APPUTIL.es_o.publish_px("app.cmd", ["weiterbildung", null] );  //Tag weiterbildung wird übergeben. Weiter unten wird das Tag abgefragt und dann an Application.py übergeben. 
      }

      //Bearbeiten Weiterbildung in Pflege Weiterbildung
      else if (event_opl.target.id == "bearbeiten_weiterbildung") {  //wenn Button Bearbeiten gedrückt wurde

         let elx_o = document.querySelector(".clSelected"); //ID von Tabellenzeile wird abgefragt
         if (elx_o == null) { //Falls kein Tabelleneintrag ausgewählt wurde

            alert("Bitte zuerst einen Eintrag auswählen!");
         }else {

            console.log("bearbeiten_weiterbildung");
            APPUTIL.es_o.publish_px("app.cmd", ["form_weiterbildung", elx_o.id] );  //Tag bearbeiten_weiterbildung und die ausgewählte Zeilen-ID wird übergeben. Weiter unten wird das Tag abgefragt und dann an Application.py übergeben.
         }
      }
   }
}

//------------------------------------------------------------------------------
class SideBar_cl {
//------------------------------------------------------------------------------
   // Konstruktor für Sidebar
   constructor (el_spl, template_spl) {
      this.el_s = el_spl;
      this.template_s = template_spl;
      this.configHandleEvent_p();
   }

   render_px (data_opl) {
      let markup_s = APPUTIL.tm_o.execute_px(this.template_s, data_opl);
      let el_o = document.querySelector(this.el_s);
         if (el_o != null) {
            el_o.innerHTML = markup_s;
         }
   }

   configHandleEvent_p () {
      let el_o = document.querySelector(this.el_s);
         if (el_o != null) {
            el_o.addEventListener("click", this.handleEvent_p);
         }
   }

   handleEvent_p (event_opl) {
      let cmd_s = event_opl.target.dataset.action;
      APPUTIL.es_o.publish_px("app.cmd", [cmd_s, null]);
   }
}


class Application_cl {
   // Konstruktor für alle Templates
   constructor () {
      APPUTIL.es_o.subscribe_px(this, "templates.loaded");
      APPUTIL.es_o.subscribe_px(this, "templates.failed");
      APPUTIL.es_o.subscribe_px(this, "app.cmd");

      // Startseite
      this.AnzeigenView_startseite_o = new AnzeigenView_cl("main", "startseite.tpl", "startseite");

      // Sidebar
      this.sideBar_o = new SideBar_cl("aside", "sidebar.tpl");
      
      // Datenpflege: Mitarbeiter
      this.listView_mitarbeiter_o = new ListView_cl("main", "pflegeMitarbeiter.tpl", "mitarbeiter");
      this.FormView_mitarbeiter_o = new FormView_cl("main", "formularMitarbeiter.tpl", "mitarbeiter");
      this.AnzeigenView_mitarbeiter_o = new AnzeigenView_cl("main", "anzeigenMitarbeiter.tpl", "mitarbeiterAnzeigen");

      // Datenpflege: Weiterbildung
      this.listView_weiterbildung_o = new ListView_cl("main", "pflegeWeiterbildung.tpl", "weiterbildung");
      this.FormView_weiterbildung_o = new FormView_cl("main", "formularWeiterbildung.tpl", "weiterbildung");
      this.AnzeigenView_weiterbildung_o = new AnzeigenView_cl("main", "anzeigenWeiterbildung.tpl", "weiterbildungAnzeigen");
      
      // Teilnahme: Mitarbeiter
      this.listView_teilnahme_mitarbeiter_o = new ListView_cl("main", "teilnahmeMitarbeiter.tpl", "mitarbeiter");
      this.AnzeigenView_teilnahme_mitarbeiter_o = new AnzeigenView_cl("main", "teilnahmeMitarbeiteranzeige.tpl", "teilnahme");   //vllt deshalb error unten in bei add und delete teilnahme?

      // Teilnahme: Weiterbildung
      this.listView_teilnahme_weiterbildung_o = new ListView_cl("main", "teilnahmeWeiterbildung.tpl", "weiterbildung");
      this.AnzeigenView_teilnahme_weiterbildung_o = new AnzeigenView_cl("main", "teilnahmeWeiterbildunganzeige.tpl", "teilnahme");

      // Auswertung: Mitarbeiter
      this.listView_auswertung_mitarbeiter_o = new ListView_cl("main", "auswertungMitarbeiter.tpl", "auswertungMitarbeiter");
      this.AnzeigenView_auswertung_mitarbeiter_o = new AnzeigenView_cl("main", "auswertungMitarbeiteranzeigen.tpl", "auswertungMitarbeiter");

      // Auswertung: Weiterbildung
      this.listView_auswertung_weiterbildung_o = new ListView_cl("main", "auswertungWeiterbildung.tpl", "auswertungWeiterbildung");
      this.AnzeigenView_auswertung_weiterbildung_o = new AnzeigenView_cl("main", "auswertungWeiterbildunganzeigen.tpl", "auswertungWeiterbildung");

      // Auswertung: Zertifikate
      this.listView_auswertung_zertifikat_o = new ListView_cl("main", "auswertungZertifikat.tpl", "auswertungZertifikat");
      this.AnzeigenView_auswertung_zertifikat_o = new AnzeigenView_cl("main", "auswertungZertifikatanzeigen.tpl", "auswertungZertifikat");
      
   }
   
   //wird durch evs.js aufgerufen
   notify_px (self, message_spl, data_opl) {
      switch (message_spl) {
         case "templates.failed":
            alert("Vorlagen konnten nicht geladen werden.");
         break;

         case "templates.loaded":
            // Templates stehen zur Verfügung, Bereiche mit Inhalten füllen
            let markup_s;
            let el_o;
            markup_s = APPUTIL.tm_o.execute_px("header.tpl", null);
            el_o = document.querySelector("header");
               if (el_o != null) {
                  el_o.innerHTML = markup_s;
               }
            let nav_a = [
               ["home", "Startseite"],
               ["mitarbeiter", "Pflege: Mitarbeiter"],
               ["weiterbildung", "Pflege: Weiterbildung"],
               ["teilnahme_mitarbeiter", "Teilnahme: Mitarbeiter"],
               ["teilnahme_weiterbildung", "Teilnahme: Weiterbildung"],
               ["auswertung_mitarbeiter", "Auswertung: Mitarbeiter"],
               ["auswertung_weiterbildung", "Auswertung: Weiterbildung"],
               ["auswertung_zertifikat", "Auswertung: Zertifikat"]
            ];
            self.sideBar_o.render_px(nav_a);
            
            // Startseite laden, beim ersten Seitenaufruf
            var url = "/app/" + 'startseite';
            fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'} })
            APPUTIL.es_o.publish_px("app.cmd", ["home", null]);
            //markup_s = APPUTIL.tm_o.execute_px("startseite.tpl", null);
            el_o = document.querySelector("main");
               if (el_o != null) {
                  el_o.innerHTML = markup_s;
               }
         break;

         case "app.cmd":
            switch (data_opl[0]) {
               // Startseite
               case "home":
                  this.AnzeigenView_startseite_o.render_px(data_opl[1]);
               break;
               
               // Datenpflege: Mitarbeiter
               case "mitarbeiter":
                  this.listView_mitarbeiter_o.render_px(data_opl[1]);
               break;

               case "form_mitarbeiter":
                  this.FormView_mitarbeiter_o.render_px(data_opl[1]);
               break;

               case "anzeigen_mitarbeiter":
                  this.AnzeigenView_mitarbeiter_o.render_px(data_opl[1]);
               break;


               // Datenpflege: Weiterbildung
               case "weiterbildung":
                  this.listView_weiterbildung_o.render_px(data_opl[1]);
               break;

               case "form_weiterbildung":
                  this.FormView_weiterbildung_o.render_px(data_opl[1]);
               break;

               case "anzeigen_weiterbildung":
                  this.AnzeigenView_weiterbildung_o.render_px(data_opl[1]);
               break;


               // Teilnahme: Mitarbeiter
               case "teilnahme_mitarbeiter":
                  this.listView_teilnahme_mitarbeiter_o.render_px(data_opl[1]);
               break;

               case "anzeigen_teilnahme_mitarbeiter":
                  this.AnzeigenView_teilnahme_mitarbeiter_o.render_px(data_opl[1], currentDate);
               break;


               // Teilnahme Weiterbildung
               case "teilnahme_weiterbildung":
                  this.listView_teilnahme_weiterbildung_o.render_px(data_opl[1], currentDate);
               break;

               case "anzeigen_teilnahme_weiterbildung":
                  this.AnzeigenView_teilnahme_weiterbildung_o.render_px(data_opl[1]);
               break;

               // Teilnahme hinzufügen
               case "addteilnahme":
                  var url = "/app/" + "teilnahme" + "/" + data_opl[1] + "/" + data_opl[2];   // 1. Weiterbildung, 2. Mitarbeiter
                  fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'} })
      				APPUTIL.es_o.publish_px("app.cmd", ["teilnahme_mitarbeiter", null]);
               break;

               // Teilnahme löschen
               case "deleteteilnahme":
                  var url = "/app/" + "teilnahme" + "/" + data_opl[1] + "/" + data_opl[2];   // 1. Weiterbildung, 2. Mitarbeiter
                  fetch(url, {method: 'DELETE', headers: {'Content-Type': 'application/json'} })
      				APPUTIL.es_o.publish_px("app.cmd", ["teilnahme_mitarbeiter", null]);
               break;

               // Status setzen: Erfolg
               case "erfolgTeilnahme":
                  var url = "/app/" + "teilnahme" + "/" + data_opl[1] + "/" + data_opl[2] + "/" + data_opl[3];   // 1. Mitarbeiter, 2. Weiterbildung, 3. Status
                  fetch(url, {method: 'PUT', headers: {'Content-Type': 'application/json'} })
      				APPUTIL.es_o.publish_px("app.cmd", ["teilnahme_weiterbildung", null]);
               break;

               // Status setzen: NichtErfolg
               case "nichterfolgTeilnahme":
                  var url = "/app/" + "teilnahme" + "/" + data_opl[1] + "/" + data_opl[2] + "/" + data_opl[3];   // 1. Mitarbeiter, 2. Weiterbildung, 3. Status
                  fetch(url, {method: 'PUT', headers: {'Content-Type': 'application/json'} })
      				APPUTIL.es_o.publish_px("app.cmd", ["teilnahme_weiterbildung", null]);
               break;

               // Status setzen: Abbruch
               case "abbruchTeilnahme":
                  var url = "/app/" + "teilnahme" + "/" + data_opl[1] + "/" + data_opl[2] + "/" + data_opl[3];   // 1. Mitarbeiter, 2. Weiterbildung, 3. Status
                  fetch(url, {method: 'PUT', headers: {'Content-Type': 'application/json'} })
      				APPUTIL.es_o.publish_px("app.cmd", ["teilnahme_weiterbildung", null]);
               break;

               // Auswertung: Mitarbeiter
               case "auswertung_mitarbeiter":
                  this.listView_auswertung_mitarbeiter_o.render_px(data_opl[1]);
               break;

               case "anzeigen_auswertung_mitarbeiter":
                  this.AnzeigenView_auswertung_mitarbeiter_o.render_px(data_opl[1]);
               break;

               // Auswertung: Weiterbildung
               case "auswertung_weiterbildung":
                  this.listView_auswertung_weiterbildung_o.render_px(data_opl[1]);
               break;

               case "anzeigen_auswertung_weiterbildung":
                  this.AnzeigenView_auswertung_weiterbildung_o.render_px(data_opl[1]);
               break;

               // Auswertung: Zertifikate
               case "auswertung_zertifikat":
                  this.listView_auswertung_zertifikat_o.render_px(data_opl[1]);
               break;

               case "anzeigen_auswertung_zertifikat":
                  this.AnzeigenView_auswertung_zertifikat_o.render_px(data_opl[1]);
               break;

               // Zurück Buttons
               case "idBack":
      			   var input_action = document.getElementById("action");
      			   console.log("action = " + input_action.value);
                  APPUTIL.es_o.publish_px("app.cmd", [input_action.value, null]);
               break;

               case "idBackmitarbeiter":
      			   //var input_action = document.getElementById("action");  //Erkennt nicht Mitarbeiter als Action
      			   console.log("action = " + "mitarbeiter");
                  APPUTIL.es_o.publish_px("app.cmd", ["mitarbeiter", null]);
               break;

               case "idBackweiterbildung":
      			   //var input_action = document.getElementById("action");  //Erkennt nicht Weiterbildung als action
      			   console.log("action = " + "weiterbildung");
                  APPUTIL.es_o.publish_px("app.cmd", ["weiterbildung", null]);
               break;

               case "idBackAuswertungMitarbeiter":
      			   //var input_action = document.getElementById("action");  //Erkennt nicht Weiterbildung als action
      			   console.log("action = " + "auswertungMitarbeiter");
                  APPUTIL.es_o.publish_px("app.cmd", ["auswertung_mitarbeiter", null]);
               break;

               case "idBackAuswertungWeiterbildung":
      			   //var input_action = document.getElementById("action");  //Erkennt nicht Weiterbildung als action
      			   console.log("action = " + "auswertungWeiterbildung");
                  APPUTIL.es_o.publish_px("app.cmd", ["auswertung_weiterbildung", null]);
               break;

               case "idBackAuswertungZertifikat":
      			   //var input_action = document.getElementById("action");  //Erkennt nicht Weiterbildung als action
      			   console.log("action = " + "auswertungZertifikat");
                  APPUTIL.es_o.publish_px("app.cmd", ["auswertung_zertifikat", null]);
               break;

               // Mitarbeiter oder Weiterbildung löschen
      		   case "idDelete":
      			   if(confirm("Entfernen?")){
      				   var input_action = document.getElementById("action");
      				   var url = "/app/" + input_action.value + "/" + data_opl[1];
      				   fetch(url, {method: 'DELETE', headers: {'Content-Type': 'application/json'} })
      				   APPUTIL.es_o.publish_px("app.cmd", [input_action.value, null]);
      			   }
      			break;
            }
         break;
      }
   }
}

window.onload = function () { //Application Klasse wird geladen, dass heißt alle Templates
   APPUTIL.es_o = new APPUTIL.EventService_cl();
   var app_o = new Application_cl();
   APPUTIL.createTemplateManager_px();
}