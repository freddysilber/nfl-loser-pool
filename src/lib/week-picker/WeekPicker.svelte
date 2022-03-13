<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let week: number;
	export let player: string;
	export let teamNames: string[];

	const dispatch = createEventDispatcher();

	function handleSelect(team: string) {
		dispatch('selectTeam', {
			team,
			week,
			player
		});
	}
</script>

<select on:change={(event => handleSelect(event.currentTarget.value))}>
	<option>Select a team...</option>
	{#each teamNames as team}
		<option>{team}</option>
	{/each}
</select>