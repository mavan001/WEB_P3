<!-- Template -->
<div class="headline"> Teilnahme - Weiterbildung - Detail</div>

<br>

<div class="headline_small">Weiterbildung</div>
<table class="overview">
	<tr>
        <th>Bezeichnung</th>
        <th>Von</th>
        <th>Bis</th>
        <th>Beschreibung</th>
        <th>max. Teilnehmer</th>
        <th>min. Teilnehmer</th>
    </tr>
    <tr id="#context[0]['id_w']#">
        <td id="weiid" data-value=#context[0]['id_w']# hidden>#context[0]['id_w']#</td>
        <td>#context[0]['bezeichnung_w']#</td>
        <td>#context[0]['von_w']#</td>
		<td>#context[0]['bis_w']#</td>
		<td>#context[0]['beschreibung_w']#</td>
        <td>#context[0]['maxteilnehmer_w']#</td>
        <td>#context[0]['minteilnehmer_w']#</td>
    </tr>
</table>

<br>

<div class="headline_small">Teilnehmer</div>
<table class="overview">
	<tr>
        <th>Name</th>
        <th>Vorname</th>
        <th>akademische Grade</th>
        <th>Tätigkeit</th>
        <th>Status</th>
    </tr>

    @var entry_a;@
        @var loop_i;@
        @for loop_i in context@
            @entry_a = context[loop_i];@
            @if entry_a['id_m'] != null@
                <tr id="#entry_a['id_m']#">
                    <td>#entry_a['name']#</td>
                    <td>#entry_a['vorname']#</td>
                    <td>#entry_a['akagrad']#</td>
                    <td>#entry_a['taetigkeit']#</td>
                    @var idm = entry_a['id_m'];@
                    @var entry_b;@
                    @var loop_b;@
                    @var context2 = context[context.length-1];@
                    @for loop_b in context2@
                        @entry_b = context2[loop_b];@
                        @if entry_b['id_m'] == idm@
                            <td>#entry_b['status']#</td>
                        @endif@
                    @endfor@


                </tr>
            @endif@
        @endfor@							
</table>
<button class="erfolg" id="erfolgTeilnahme">Erfolg</button>
<button class="nichterfolg" id="nichterfolgTeilnahme">Nichterfolg</button>
<button class="abbruch" id="abbruchTeilnahme">Abbruch</button>

<!-- EOF -->