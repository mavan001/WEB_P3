<!-- Template -->
<!-- Contentbereich -->
<div class="headline">Auswertung - Mitarbeiter - Detail</div>

<br>

<div class="headline_small">Mitarbeiter</div>
<table class="overview">
	<tr>
        <th>Name</th>
        <th>Vorname</th>
        <th>akademische Grade</th>
        <th>Tätigkeit</th>
    </tr>
    @var idm;@
    @var entry_a;@
    @var loop_i;@
    @for loop_i in context@
        @entry_a = context[loop_i];@
        @if entry_a['id_m'] != null@
            @idm = entry_a['id_m'];@
            <tr>
                <td>#entry_a['name']#</td>
                <td>#entry_a['vorname']#</td>
	        	<td>#entry_a['akagrad']#</td>
	        	<td>#entry_a['taetigkeit']#</td>
            </tr>
         @endif@	
    @endfor@
</table>

<br>

<div class="headline_small">Weiterbildungen</div>
<table class="overview">
	<tr>
        <th>Bezeichnung</th>
        <th>Von</th>
        <th>Bis</th>
        <th>Status</th>
    </tr>
    @var entry_a;@
    @var loop_i;@
    @for loop_i in context@
        @entry_a = context[loop_i];@
        @if entry_a['id_w'] != null@	
        <tr>
            <td>#entry_a['bezeichnung_w']#</td>
            <td>#entry_a['von_w']#</td>
            <td>#entry_a['bis_w']#</td>
            
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

<div>
    <button class="zurück_auswertung_mitarbeiter" id="idBackAuswertungMitarbeiter">Zurück</button>
</div>

<div> </div>
<!-- EOF -->
				
				