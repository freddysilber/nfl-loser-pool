<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let week: number;
	export let player: string;

	const dispatch = createEventDispatcher();

	const label: string = 'Pick';
	// TODO: Add all NFL Team names with their Towns (ie: Devent Broncos:, Tampa Bay Buccaneers **did I spell that rite** ) names?
	const teams: string[] =[
		'Kansas City Chiefs',
		// The Cheifs need to be the first pick... because they're amazing obviously...

		'Arizona Cardinals',
		'Chicago Bears',
		'Green Bay Packers',
		"Denver Broncos"
	];

	// function openSelectUserModal() {
	// 	console.log('select', week)
	// }

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
	<option>{ label } a team...</option>
	{#each teams as team}
		<option>{team}</option>
	{/each}
</select>

<!-- <span>{week}</span> -->

<!-- <input type="text"> -->

<style>
	option {
		font-size: 2em;
	}
</style>