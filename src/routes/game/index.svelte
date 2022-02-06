<script lang="ts">
	import { getStores } from '$app/stores';
	import { ENV } from '$lib/env';
	import GameBoard from '$lib/game-board/GameBoard.svelte';
	import Prize from '$lib/prize/Prize.svelte';
	import ScoreLegend from '$lib/score-legend/ScoreLegend.svelte';
	import axios from 'axios';
	// import type { Auth } from '../../models/auth.model';
	import { onMount } from 'svelte';
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

	// let items = [];
	let allGames;

	// onMount(async () => {
	// 	const res = await axios.get<{ items: any[] }>(`${ENV.api}/items`);
	// 	items = res.data.items || items;
	// });

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
	function selectGame(gameId: string) {
		console.log(gameId);
		// Get game, players and weekly picks to build the game board
		axios
			.get(`${ENV.api}/games/${gameId}/players`, {
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

<!-- <ul>
	{#each items as item}
		<li>{item.name}</li>
	{:else}
	<li>loading...</li>
	{/each}
</ul> -->

<h3
	in:fly={{ x: 1000, duration: 1000 }}
	out:fly={{ x: -1000, duration: 1000 }}
	class="game-title"
>
	NFL Loser Pool {new Date().getFullYear()}
</h3>
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
	<select on:change={(event) => selectGame(event.currentTarget.value)}>
		<option
			>-- SELECT GAME -- (Default to the first game the user ownes)</option
		>
		{#each allGames as game}
			<option value={game.id}>{game.name}</option>
		{/each}
	</select>
{/if}

<GameBoard {players} />

<style>
	div.game-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.25rem;
	}

	.game-title {
		text-align: center;
		margin: 0;
	}
</style>
