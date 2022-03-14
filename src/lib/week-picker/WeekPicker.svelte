<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Select } from 'svelte-materialify';

	interface SelectOption {
		name: string;
		value: string;
	}

	export let week: number;
	export let player: string;
	export let teamOptions: SelectOption[];

	let value;

	const dispatch = createEventDispatcher();

	function handleSelect(team: string) {
		dispatch('selectTeam', {
			team,
			week,
			player,
		});
	}
</script>

<Select solo items={teamOptions} bind:value  placeholder="Select" on:change={(event => handleSelect(value))}/>
<!-- <select on:change={(event => handleSelect(event.currentTarget.value))}>
	<option>Select a team...</option>
	{#each teamNames as team}
		<option>{team}</option>
	{/each}
</select> -->
