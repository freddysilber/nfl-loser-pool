<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let week: number;
	export let player: string;

	const dispatch = createEventDispatcher();

	const label: string = 'Pick';
	const teams: string[] =[
		'Arizona Cardinals',
		'Chicago Bears',
		'Green Bay Packers'
	];

	function openSelectUserModal() {
		console.log('select', week)
	}

	function handleSelect(event: any) {
		console.log(event.target.value, week, player);
		dispatch('selectTeam', {
			team: event.target.value,
			week,
			player
		});
	}
</script>

<!-- <button on:click={openSelectUserModal}>{label} ▼</button> -->
<select on:change={handleSelect}>
	<option>Pick Team</option>
	{#each teams as team}
		<option>{team}</option>
	{/each}
</select>

<!-- <span>{week}</span> -->

<!-- <input type="text"> -->

<style>
	button {
		min-width: max-content;
	}
</style>