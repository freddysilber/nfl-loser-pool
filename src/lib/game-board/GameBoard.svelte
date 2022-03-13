<script lang="ts">
	import WeekPicker from '$lib/week-picker/WeekPicker.svelte';
	import teams from '$lib/data/nfl-teams.json';

	export let players: string[];
	console.log(teams);
	const teamNames = teams.map((team) => team.displayName);

	const weeks = [...Array(19).keys()];
</script>

<div>
	<table>
		<thead>
			<tr>
				<th />
				{#each weeks as week}
					<th>Week {week + 1}</th>
				{/each}
				<th>Points</th>
			</tr>
		</thead>

		<tbody>
			{#each players as player}
				<tr>
					<td style="vertical-align: middle;">
						<!-- PLayers and the row they play on need to be important.... so make them very big -->
						{player}
					</td>
					{#each weeks as week}
						<td>
							<WeekPicker {week} {player} {teamNames} />
						</td>
					{/each}
					<td />
				</tr>
			{/each}
		</tbody>
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

	td:first-child,
	th:first-child {
		position: sticky;
		left: 0;
		z-index: 1;
		/* background-color: #b9c6d2; */
	}
</style>
