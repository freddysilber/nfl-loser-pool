<script lang="ts">
	import { getStores } from '$app/stores';
	import { ENV } from '$lib/env';
	import GameBoard from '$lib/game-board/GameBoard.svelte';
	import Prize from '$lib/prize/Prize.svelte';
	import ScoreLegend from '$lib/score-legend/ScoreLegend.svelte';
	import axios, { type AxiosResponse } from 'axios';
	import type { Game } from '../../models/game.model';
	import { Select } from 'svelte-materialify';
	import { fly } from 'svelte/transition';

	const { session } = getStores();

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

	session.subscribe(() => {
		axios
			.get<AxiosResponse<Game[], any>>(`${ENV.api}/games`, {
				withCredentials: true,
			})
			.then((response) => {
				allGames = response.data.games;
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
	class="orange-text text-h4"
>
	NFL Loser Pool {new Date().getFullYear()}
</h1>

<div class="game-header">
	<Prize
		cash={100}
		prizeType="Gift Card"
	/>
	<ScoreLegend />
</div>

{#if allGames}
	<div class="d-flex justify-end">
		<Select
			outlined
			items={allGames.map((game) => {
				return {
					name: game.name,
					value: game.id,
				};
			})}
			bind:selectedGameId
			on:change={selectGame}
			placeholder="Select Game"
		/>
	</div>
{/if}

<GameBoard {players} />

<style>
	div.game-header {
		display: flex;
		justify-content: space-between;
	}
</style>
