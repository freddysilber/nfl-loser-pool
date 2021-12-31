<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let week: number;
	export let player: string;

	const dispatch = createEventDispatcher();
	const label: string = 'Pick';
	const teams: string[] =[
		'Kansas City Chiefs',
		'Arizona Cardinals',
		'Chicago Bears',
		'Green Bay Packers',
		"Denver Broncos"
	];

	function handleSelect(event: any) {
		dispatch('selectTeam', {
			team: event.target.value,
			week,
			player
		});
	}
</script>

<select on:change={handleSelect}>
	<option>{ label } a team...</option>
	{#each teams as team}
		<option>{team}</option>
	{/each}
</select>

<style>
	option {
		font-size: 2em;
	}
</style>