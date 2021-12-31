<script lang="ts">
	import WeekPicker from '$lib/week-picker/WeekPicker.svelte';

	export let players: string[];

	const weeks = [...Array(19).keys()];
</script>

<div>
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
				<td>
					<!-- PLayers and the row they play on need to be important.... so make them very big -->
					{player}
				</td>
				{#each weeks as week}
					<td>
						<WeekPicker {week} {player} />
					</td>
				{/each}
				<td />
			</tr>
		{/each}
	</table>
</div>

<style>
	table {
		overflow: auto;
		border-collapse: collapse;
		overflow: auto;
	}

	div {
		overflow: scroll;
	}

	tr > td {
		top: 0%;
		position: sticky;
	}

	td:first-child, th:first-child {
		position: sticky;
		left: 0;
		z-index: 1;
		background-color: #b9c6d2;
	}

	h1 {
		margin-right: 0.25rem;
	}
</style>
