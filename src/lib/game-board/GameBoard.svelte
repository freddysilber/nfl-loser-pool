<!-- 
	If players skip a week, they should not be on this board
	When player chooses a pick from the left, the then card on the right should update
	Player card (right) should be clickable and take you to you 'season' board of all the weeks all season long
	Game 'grid' on the right kinda acts like a leader board when we order it by winner (then by name)
 -->
<script lang="ts">
	// import WeekPicker from '$lib/week-picker/WeekPicker.svelte';
	import teams from '$lib/data/nfl-teams.json';
	import { mdiThumbDown } from '@mdi/js';
	import type { User } from 'src/models/user.model';
	import { Icon, Button } from 'svelte-materialify';

	export let players: User[]; // Todo order these by winner to looser

	const weeksInSeason: number = 19;
	// TODO: move this to a more top level component so we dont run this map everytime a board is changed when a user switches between different games
	// console.log(teams);
	const teamOptions = teams.map((team) => ({
		name: team.displayName,
		value: team.displayName,
		logo: team.logos[0].href,
	}));
	// console.log(teamOptions);

	const weeks = [...Array(weeksInSeason).keys()];

	const playerMap: Map<User, number[]> = new Map();
	players.forEach((player) => playerMap.set(player, weeks));

	console.log(playerMap);

	function selectPlayer(player: User): void {
		console.log('select player', player);
	}
</script>

<div>
	<div class="d-flex" style="overflow: scroll;">
		<div style="width: 25%; height: 20rem;">
			<h1 class="white-text">Get your picks in!</h1>
			{#each teamOptions as team}
				<div style="display: flex; justify-content: space-between; align-items: center;">
					<img style="height: 50px;" src={team.logo} alt="placeholder"/>
					<span class="white-text">{team.name}</span>
					<Button icon class="pink-text">
						<Icon path={mdiThumbDown} />
					</Button>
				</div>
			{/each}
		</div>

		<div class="container">
			{#each players as player}
				<div class="player" on:click={() => selectPlayer(player)}>
					{player.name}
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;

		.player {
			width: 25%;
			height: 150px;
			color: black;
			background-color: aquamarine;
			border: 1px solid black;
			cursor: pointer;
		}
	}
</style>
