<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let week: number;
	export let player: string;

	const dispatch = createEventDispatcher();
	const label = 'Pick';
	const teams: string[] =[
		'Kansas City Chiefs',
		'Arizona Cardinals',
		'Chicago Bears',
		'Green Bay Packers',
		"Denver Broncos"
	];

	function handleSelect(team: string) {
		dispatch('selectTeam', {
			team,
			week,
			player
		});
	}
</script>

<select on:change={(event => handleSelect(event.currentTarget.value))}>
	<option>{ label } a team...</option>
	{#each teams as team}
		<option>{team}</option>
	{/each}
</select>