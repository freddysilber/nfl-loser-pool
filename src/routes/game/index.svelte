<script lang="ts">
	import Prize from "$lib/prize/Prize.svelte";

	let weeks: number[] = [...Array(19).keys()];
	let players = ["Freddy", "Lydia", "Jay", "Carmen"];
</script>

<div class="game-container">
	<Prize />

	<table>
		<tr>
			<th />
			{#each weeks as week}
				<th>Week {week + 1}</th>
			{/each}
		</tr>
		{#each players as player}
			<tr>
				<td>{player}</td>
				{#each weeks as week}
					<td>{week + 1}</td>
				{/each}
			</tr>
		{/each}
	</table>
</div>

<style>
	div.game-container {
		border: 1px solid black;
		border-radius: 5px;
	}

	table {
		font-family: arial, sans-serif;
		border-collapse: collapse;
		width: 100%;
	}

	td,
	th {
		border: 1px solid #dddddd;
		text-align: left;
		padding: 8px;
	}

	tr:nth-child(even) {
		background-color: #dddddd;
	}
</style>
