<!-- Template -->
<!-- Contentbereich -->

<div class="headline">Teilnahme - Mitarbeiter - Detail</div>
<br>

<div class="headline_small">Mitarbeiter</div>
<table class="overview">
	<tr>
        <th>Name</th>
        <th>Vorname</th>
        <th>akademische Grade</th>
        <th>Tätigkeit</th>
    </tr>
    <tr id="#context[0]['id_m']#">
        <td id="mitid" data-value=#context[0]['id_m']# hidden>#context[0]['id_m']#</td>
        <td>#context[0]['name']#</td>
        <td>#context[0]['vorname']#</td>
		<td>#context[0]['akagrad']#</td>
		<td>#context[0]['taetigkeit']#</td>
    </tr>
</table>

<br>

<div class="headline_small">Verfügbare - Weiterbildungen</div>
    <table class="overview">
        <tr>
            <th>Bezeichnung</th>
            <th>Von</th>
            <th>Bis</th>
            <th>Beschreibung</th>
            <th>max. Teilnehmer</th>
            <th>min. Teilnehmer</th>
        </tr>

        @var entry_a;@
        @var loop_i;@
        @var context2 = context[1];@   
   	    @for loop_i in context2@
              @entry_a = context2[loop_i];@
		        @var anfang = entry_a['von_w'];@
		        @var ende = entry_a['bis_w'];@
                @if currentDate <= anfang@
                
                    @var a;@
                    @var b;@
                    @var angemeldet = 0;@
                    @var c = context[2];@
                    @for b in c@
                        @a = c[b];@
                        @if a['id_m'] == context[0]['id_m']@
                            @if a['id_w'] == entry_a['id_w']@
                                @angemeldet = 1;@
                            @endif@
                        @endif@
                    @endfor@

                    @if angemeldet == 0@
                        <tr id="#entry_a['id_w']#">
                            <td>#entry_a['bezeichnung_w']#</td>
                            <td>#entry_a['von_w']#</td>
                            <td>#entry_a['bis_w']#</td>
                            <td>#entry_a['beschreibung_w']#</td>
                            <td>#entry_a['maxteilnehmer_w']#</td>
                            <td>#entry_a['minteilnehmer_w']#</td>
                        </tr>
                    @endif@
            @endif@
        @endfor@
    </table>

<br>

<div class="headline_small">Geplante - Weiterbildungen</div>
    <table class="overview">
        <tr>
            <th>Bezeichnung</th>
            <th>Von</th>
            <th>Bis</th>
            <th>Beschreibung</th>
            <th>max. Teilnehmer</th>
            <th>min. Teilnehmer</th>
        </tr>

        @var entry_a;@
        @var loop_i;@
        @var context2 = context[1];@   
   	    @for loop_i in context2@
              @entry_a = context2[loop_i];@
		        @var anfang = entry_a['von_w'];@
		        @var ende = entry_a['bis_w'];@
                @if currentDate <= anfang@
                
                    @var a;@
                    @var b;@
                    @var angemeldet = 0;@
                    @var c = context[2];@
                    @for b in c@
                        @a = c[b];@
                        @if a['id_m'] == context[0]['id_m']@
                            @if a['id_w'] == entry_a['id_w']@
                                @if a['status'] == "angemeldet"@
                                    @angemeldet = 1;@
                                @endif@
                            @endif@
                        @endif@
                    @endfor@

                    @if angemeldet == 1@
                        <tr id="#entry_a['id_w']#">
                            <td>#entry_a['bezeichnung_w']#</td>
                            <td>#entry_a['von_w']#</td>
                            <td>#entry_a['bis_w']#</td>
                            <td>#entry_a['beschreibung_w']#</td>
                            <td>#entry_a['maxteilnehmer_w']#</td>
                            <td>#entry_a['minteilnehmer_w']#</td>
                        </tr>
                    @endif@
            @endif@
        @endfor@
    </table>


    <div>
        <button class="anmelden" id="idSaveTeilnahme">Anmelden</button>
        <button class="stornieren" id="idDeleteTeilnahme">Stornieren</button>
    </div>   
<!-- EOF -->