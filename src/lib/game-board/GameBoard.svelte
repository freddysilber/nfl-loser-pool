<script lang="ts">
	import WeekPicker from '$lib/week-picker/WeekPicker.svelte';

	export let weeks: number[];
	// export let selectTeam
	export let players;
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
			<td>{player}</td>
			{#each weeks as week}
				<td>
					<WeekPicker {week} {player} />
					<!-- <WeekPicker {week} {player} on:selectTeam={selectTeam} /> -->
				</td>
			{/each}
			<td />
		</tr>
	{/each}
</table>
