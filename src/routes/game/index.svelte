<script lang="ts">
	import Prize from "$lib/prize/Prize.svelte";
	import ScoreLegend from "$lib/score-legend/ScoreLegend.svelte";

	const weeks = [...Array(19).keys()];
	const players = ["Freddy", "Lydia", "Jay", "Carmen"];
</script>

<svelte:head>
	<title>Game</title>
</svelte:head>

<div>
	<h1>4th Annual Cloud Coach NFL Looser Pool</h1>
	<div class="game-header">
		<Prize  />
		<ScoreLegend/>
	</div>

	<table>
		<tr>
			<th />
			{#each weeks as week}
				<th>Week {week + 1}</th>
			{/each}
			<th>Points</th>
		</tr>
		{#each players as player}
			<tr>
				<td>{player}</td>
				{#each weeks as week}
					<td/>
				{/each}
				<td/>
			</tr>
		{/each}
	</table>
</div>

<style>
	div.game-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.25rem;
	}

	table {
		border-collapse: collapse;
		width: 100%;
	}

	td,
	th {
		border: 1px solid #aaaaaa;
		text-align: left;
		padding: 8px;
	}
</style>
