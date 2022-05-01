<script lang="ts">
	import type { User } from 'src/models/user.model';

	import { createEventDispatcher } from 'svelte';
	import { Select } from 'svelte-materialify';
	import type { SelectOption } from '../../models/select-option.model';

	export let week: number;
	export let player: User;
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

<Select
	solo
	items={teamOptions}
	bind:value
	placeholder="Select"
	on:change={(event) => handleSelect(value)}
/>
<!-- <select on:change={(event => handleSelect(event.currentTarget.value))}>
	<option>Select a team...</option>
	{#each teamNames as team}
		<option>{team}</option>
	{/each}
</select> -->
