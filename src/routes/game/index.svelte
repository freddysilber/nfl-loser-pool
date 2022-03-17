<script lang="ts">
	import { getStores } from '$app/stores';
	import { ENV } from '$lib/env';
	import GameBoard from '$lib/game-board/GameBoard.svelte';
	import Prize from '$lib/prize/Prize.svelte';
	import ScoreLegend from '$lib/score-legend/ScoreLegend.svelte';
	import axios from 'axios';
	import type { Game } from '../../models/game.model';
	import { Select } from 'svelte-materialify';
	import { fly } from 'svelte/transition';

	const { session } = getStores();

	// These will come from the api as 'players'
	const players = [
		'Freddy',
		'Lydia',
		'Jay',
		'Carmen',
		'Patrick',
		'Andrew',
		'Chris',
	];

	let allGames: Game[];
	let selectedGameId: string;

	// session.subscribe((session: Auth) => {
	session.subscribe(() => {
		axios
			.get(`${ENV.api}/games`, {
				withCredentials: true,
			})
			.then(({ data }) => {
				allGames = data.games;

				console.log({
					allGames,
				});
			})
			.catch((error) => {
				console.error(error);
			});
	});

	// TODO: Cache this stuff
	function selectGame() {
		console.log('change event', selectedGameId);
		// Get game, players and weekly picks to build the game board
		axios
			.get(`${ENV.api}/games/${selectedGameId}/players`, {
				withCredentials: true,
			})
			.then((response) => {
				console.log(response);
			});
	}
</script>

<svelte:head>
	<title>Game</title>
</svelte:head>

<h1
	in:fly={{ x: 400, duration: 200 }}
	out:fly={{ x: -400, duration: 200 }}
	class="orange-text game-title"
>
	NFL Loser Pool {new Date().getFullYear()}
</h1>
<div class="game-header">
	<Prize
		message="some random prop is being passed in!!!"
		showMessage={false}
		cash={100}
		prizeType="Gift Card"
	/>
	<ScoreLegend />
</div>

{#if allGames}
	<Select
		solo
		items={allGames.map((game) => {
			console.log(game);
			return {
				name: game.name,
				value: game.id,
			};
		})}
		bind:selectedGameId
		placeholder="-- SELECT GAME -- (Default to the first game the user ownes)"
		on:change={selectGame}
	/>
	<!-- <select on:change={(event) => selectGame(event.currentTarget.value)}>
		<option
			>-- SELECT GAME -- (Default to the first game the user ownes)</option
		>
		{#each allGames as game}
			<option value={game.id}>{game.name}</option>
		{/each}
	</select> -->
{/if}

<GameBoard {players} />

<style>
	h1.game-title {
		font-size: 1.75em;
	}

	div.game-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.25rem;
	}
</style>
