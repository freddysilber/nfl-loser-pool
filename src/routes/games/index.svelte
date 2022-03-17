<script lang="ts">
	import { getStores } from '$app/stores';
	import { ENV } from '$lib/env';
	import GameCard from '$lib/game-card/GameCard.svelte';
	import axios, { AxiosResponse } from 'axios';
	import { onMount } from 'svelte';
	import { writable, Writable } from 'svelte/store';
	import type { Game } from '../../models/game.model';
	import { Button, Textarea, TextField } from 'svelte-materialify';

	let ownedGames: Game[] = [];
	let allGames: Game[] = [];
	let error: string;
	let selectedGame: Game;

	const { session } = getStores();
	const game: Writable<Game> = writable({
		name: '',
		description: '',
		ownerId: $session.profile ? $session.profile.id : null,
	});

	onMount(() => {
		if ($session.profile) {
			Promise.all([
				axios.get(`${ENV.api}/users/games/${$session.profile.id}`, {
					withCredentials: true,
				}), // Owned games
				axios.get(`${ENV.api}/games`, { withCredentials: true }), // All Games
				// axios.get(`${ENV.api}/players/?player=${session.profile.id}`, { withCredentials: true })
			]).then(([owned, all]) => {
				ownedGames = owned.data.games;
				allGames = all.data.games;
			});
		}
	});

	function joinGame(gameId: string) {
		console.log('join game', gameId);
	}

	function selectGame(game: Game): void {
		console.log(game);
		selectedGame = game;
	}

	function deleteGame(game: Game) {
		if (game.ownerId === $session.profile.id) {
			axios
				.delete(`${ENV.api}/games/${game.id}`)
				.then((_) => {
					// Remove the game from the UI
					const newAllGames = [...allGames];
					newAllGames.splice(ownedGames.indexOf(game), 1);
					allGames = newAllGames;
					selectedGame = undefined;
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			// TODO: add this validation in the server code too
			alert('you cannot delete games you dont own');
		}
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
					// Add the game to UI list
					allGames.push(response.data);
					ownedGames.push(response.data);
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
<div class="placeholder-form-div">
	<h5 class="white-text form-title">Create a new game</h5>
	<div class="form-container">
		{#if error}
			<p style="color: red;">{error}</p>
		{/if}
		<form on:submit|preventDefault={handleCreateGame} method="post">
			<!-- Name -->
			<div class="form-group">
				<TextField
					placeholder="Name"
					type="text"
					bind:value={$game.name}
					required
				/>
			</div>
			<!-- Description -->
			<div class="form-group">
				<Textarea
					class="mt-4"
					placeholder="Description"
					bind:value={$game.description}
				>
				</Textarea>
			</div>
			<Button type="submit" class="green mt-4">Create Game</Button>
		</form>
	</div>
</div>
<br/>
<div class="container">
	<div class="list">
		<h1 class="white-text">Games List</h1>
		<ul>
			{#each allGames as game}
				<li class="list-item" on:click={() => selectGame(game)}>
					{game.name}
				</li>
			{/each}
		</ul>
	</div>
	<div class="details">
		<h1 class="white-text">Details</h1>
		<div style="padding: .25rem;">
			{#if selectedGame}
				<GameCard game={selectedGame}>
					<div slot="actions">
						{#if selectedGame.ownerId !== $session.profile.id}
							<Button
								class="red"
								on:click={() => joinGame(selectedGame.id)}
							>
								Join Game
							</Button>
						{:else}
							<Button
								class="red"
								on:click={() => deleteGame(selectedGame)}
							>
								Delete Game
							</Button>
						{/if}
					</div>
				</GameCard>
			{:else}
				<p class="green-text">Select a game to view details</p>
			{/if}
		</div>
	</div>
</div>

<!-- </Collapsible> -->
<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
	}

	div.container {
		display: flex;
		border: 1px solid black;

		div.list {
			width: 25%;
			border-right: 1px solid black;
			h1 {
				text-align: left;
				border-bottom: 1px solid black;
				margin: 0;
			}

			li.list-item {
				color: #eee;
				&:hover {
					cursor: pointer;
				}
			}
		}

		div.details {
			width: 75%;
			h1 {
				text-align: left;
				border-bottom: 1px solid black;
				margin: 0;
			}
		}
	}

	div.placeholder-form-div {
		border: 1px solid black;
		border-radius: 10px;
		padding: 0.25rem;
	}

	div.form-container {
		align-self: center;
	}

	h3.form-title {
		text-align: center;
	}
</style>
