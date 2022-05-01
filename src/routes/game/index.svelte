<script lang="ts">
	import { getStores } from '$app/stores';
	import { ENV } from '$lib/env';
	import GameBoard from '$lib/game-board/GameBoard.svelte';
	import Prize from '$lib/prize/Prize.svelte';
	import ScoreLegend from '$lib/score-legend/ScoreLegend.svelte';
	import axios,{ type AxiosResponse } from 'axios';
	import { Select } from 'svelte-materialify';
	import { fly } from 'svelte/transition';
	import type { Game } from '../../models/game.model';
	import type { User } from '../../models/user.model';

	const { session } = getStores();

	let players: User[] = [];

	let allGames: Game[];
	let value: string;

	session.subscribe(() => {
		axios
			// We need to improve the type system here
			// This shit is wak
			// Might get let go... who knows, this is a deadline. The start up is a failure now

			// .get<AxiosResponse<Game[], any>>(`${ENV.api}/games`, {
			.get(`${ENV.api}/games`, {
				withCredentials: true,
			})
			.then((response) => {
				allGames = response.data.games;
				value = allGames[0].id;

				selectGame();
			})
			.catch((error) => {
				console.error(error);
			});
	});

	// TODO: Cache this stuff
	function selectGame(): void {
		const gameId: string = value;
		// Get game, players and weekly picks to build the game board
		axios
			.get(`${ENV.api}/games/${gameId}/payload`, {
				withCredentials: true,
			})
			.then((response) => {
				console.log(response.data);
				players = response.data.players.users;
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
	<Prize cash={100} prizeType="Gift Card" />
	<p class="white-text">← Week 1 →</p>
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
			bind:value
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
