<script lang="ts">
	import { getStores } from '$app/stores';
	import CreateGame from '$lib/CreateGame.svelte';
	import { ENV } from '$lib/env';
	import Error from '$lib/errors/Error.svelte';
	import GameCard from '$lib/game-card/GameCard.svelte';
	import { mdiDiscPlayer } from '@mdi/js';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { Button, Dialog } from 'svelte-materialify';
	import type { Game } from '../../models/game.model';

	let ownedGames: Game[] = [];
	let allGames: Game[] = [];
	let selectedGame: Game;
	let showCreateModal = false;

	const { session } = getStores();

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
				selectedGame = allGames[0] || undefined;
			});
		}
	});

	function joinGame(gameId: string) {
		const player = {
			gameId,
			playerId: $session.profile.id,
		};
		console.log('player ', player);
		axios
			.post(`${ENV.api}/players`, player, {
				withCredentials: true,
			})
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				throw new Error(error);
			});
	}

	function deleteGame(game: Game) {
		if (game.ownerId === $session.profile.id) {
			axios
				.delete(`${ENV.api}/games/${game.id}`)
				.then((_) => {
					// Remove the game from the UI
					const newAllGames = [...allGames]; // Make a clone that we can manipulate
					newAllGames.splice(
						newAllGames.findIndex((owned) => owned.id === game.id),
						1
					); // Remove the item that was deleted from the UI
					allGames = newAllGames; // Set the updated list for re-rendering

					selectedGame = allGames[0] || undefined;
				})
				.catch((error) => {
					throw new Error(error);
				});
		} else {
			// TODO: add this validation in the server code too
			alert('you cannot delete games you dont own');
		}
	}

	function createPayload(event: any) {
		// TODO fix this type and this logic
		allGames = [...allGames, ...event.detail.payload];
		ownedGames = [...ownedGames, ...event.detail.payload];
		showCreateModal = false;
	}
</script>

<svelte:head>
	<title>My Games</title>
</svelte:head>

<Button
	class="green"
	on:click={() => (showCreateModal = true)}
>
	New Game
</Button>

<Dialog
	persistent
	class="pa-5"
	bind:active={showCreateModal}
>
	<CreateGame
		on:create={createPayload}
		on:cancel={() => (showCreateModal = false)}
	/>
</Dialog>

<br />

<div class="container">
	<div class="list">
		<h1 class="white-text">Games List</h1>
		{#each allGames as game}
			<div
				class="list-item"
				class:selected={selectedGame.id === game.id}
				on:click={() => (selectedGame = game)}
			>
				{game.name}
			</div>
		{/each}
	</div>

	<div class="details">
		<h1 class="white-text">Details</h1>
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
							class="blue"
							on:click={(event) => console.log(event)}
						>
							Edit Game
						</Button>
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

<!-- </Collapsible> -->
<style lang="scss">
	$selected-color: rgb(0, 162, 202);

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

			.list-item {
				border-radius: 4px;
				margin: .1rem;
				padding: .2rem;
				transition: background-color .2s ease-in-out;

				&:hover {
					cursor: pointer;
					background-color: $selected-color;
					
					&:not(.selected) {
						opacity: .6;
					}
				}

				&.selected {
					background-color: $selected-color;
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
</style>
