<script lang="ts">
	import WeekPicker from '$lib/week-picker/WeekPicker.svelte';

	export let weeks: number[];
	// export let selectTeam
	export let players : string[];
</script>

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
				<h1>{player}</h1>
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
