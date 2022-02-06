<script lang="ts">
	import { getStores } from '$app/stores';
	import { ENV } from '$lib/env';
	import GameCard from '$lib/game-card/GameCard.svelte';
	import axios, { AxiosResponse } from 'axios';
	import { writable, Writable } from 'svelte/store';
	import type { Auth } from '../../models/auth.model';
	import type { Game } from '../../models/game.model';

	let ownedGames: Game[] = [];
	let allGames: Game[] = [];
	let joinedGames: Game[] = [];
	let newGame: Game;
	let error: string;
	// let error = {
	// 	show: false,
	// 	message: 'An Error Occured!',
	// };

	const { session } = getStores();
	const game: Writable<Game> = writable({
		name: '',
		description: '',
		ownerId: $session.profile ? $session.profile.id : null,
	});

	session.subscribe((session: Auth) => {
		// console.log(session);
		// axios.interceptors.request.use(
		// 	request => {
		// 		console.log(request, session);
		// 		request.headers['session-token']= session.profile.password;
		// 		return request;
		// 	}
		// )

		axios
			.get(`${ENV.api}/users/games/${session.profile.id}`, {
				withCredentials: true,
			})
			.then(({ data }) => {
				ownedGames = data.games;
			})
			.catch((error) => {
				// Todo: toast error here
				console.error(error);
			});

		axios
			.get(`${ENV.api}/games`, { withCredentials: true })
			.then(({ data }) => {
				allGames = data.games;
			})
			.catch((error) => {
				// Todo: toast error here
				error = error;
				console.error(error);
			});

		// axios
		// 	.get(`${ENV.api}/players/?player=${session.profile.id}`, { withCredentials: true })
		// 	.then((response) => {
		// 		joinedGames = response.data.games;
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 	});
	});

	function joinGame(gameId: number) {
		console.log('join game', gameId);
	}

	function handleCreateGame() {
		if (!$game.name || !$game.ownerId) {
			error = `There is no owner for this game. Are you logged in?`;
			return;
		}

		axios
			.post(`${ENV.api}/games`, $game, {
				withCredentials: true,
			})
			.then((response: AxiosResponse<Game, any>) => {
				if (response.data) {
					newGame = response.data;
					// Add the game to UI list
					allGames.push($game);
					ownedGames.push($game);
					allGames = allGames;
					ownedGames = ownedGames;
				}
			})
			.catch((e) => {
				if (e.response.status === 401) {
					error = `${e.message} - ${e.response.statusText} - Make sure you are logged in!`;
				}
			});
	}
</script>

<svelte:head>
	<title>My Games</title>
</svelte:head>

<!-- New Game Form -->
<h3 class="form-title">Create a new game</h3>
<div class="form-container">
	{#if error}
		<p style="color: red;">{error}</p>
	{/if}
	<form on:submit|preventDefault={handleCreateGame} method="post">
		<!-- Name -->
		<div class="form-group">
			<input
				placeholder="Name"
				label="Name"
				type="text"
				bind:value={$game.name}
				required
			/>
		</div>
		<!-- Description -->
		<div class="form-group">
			<input
				placeholder="Description"
				label="Description"
				type="text"
				bind:value={$game.description}
			/>
		</div>
		<button type="submit" class="btn-success-outline margin-top-small"
			>Create Game</button
		>
	</form>
</div>

<h1>My Games</h1>
{#each ownedGames as game}
	<GameCard {game} />
{/each}

<h1>All Games</h1>
{#each allGames as game}
	{#if game.ownerId === $session.profile.id}
		<GameCard {game} />
	{:else}
		<GameCard {game} />
		<button on:click={() => joinGame(game.id)} />
		<!-- <Button
					size="small"
					class="margin-left-small"
					on:click={() => joinGame(game.id)}>Join Game</Button
				> -->
	{/if}
{/each}

<h1>Joined Games</h1>
{#each joinedGames as game}
	<GameCard {game} />
{/each}

<!-- </Collapsible> -->
<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
	}

	div.form-container {
		width: 50%;
		align-self: center;
	}

	// div.modal-content {
	// 	width: 25vw;
	// }

	// div.modal-content > p {
	// 	color: white;
	// }

	h3.form-title {
		text-align: center;
	}
</style>
