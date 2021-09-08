<div>
	<table>
		<tr class="zero">
			<th>0 Point</th>
			<td>Guessed incorrectly or picked the same team twice</td>
		</tr>
		<tr class="half">
			<th>1/2 Point</th>
			<td>Both teams tied</td>
		</tr>
		<tr class="one">
			<th>1 Point</th>
			<td>Guessed the losing team but the wrong point spread</td>
		</tr>
		<tr class="two">
			<th>2 Points</th>
			<td>Guessed the losing team and point spread correctly</td>
		</tr>
	</table>
</div>

<style>
	table {
		border-collapse: collapse;
		width: 100%;
	}
	td,
	th {
		text-align: left;
		padding: 8px;
	}
	tr.zero {
		background: red;
	}
	tr.half {
		background: lightskyblue;
	}
	tr.one {
		background: yellow;
	}
	tr.two {
		background: lightgreen;
	}
</style>
