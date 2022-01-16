<script lang="ts">
	import { getStores } from '$app/stores';
	import { ENV } from '$lib/env';
	import axios, { AxiosResponse } from 'axios';
	import { writable, Writable } from 'svelte/store';

	import Collapsible from 'spaper/components/Collapsible.svelte';
	import Button from 'spaper/components/Button.svelte';
	import Modal from 'spaper/components/Modal/Modal.svelte';
	import Alert from 'spaper/components/Alert.svelte';
	import Input from 'spaper/components/Form/Input.svelte';

	import type { Game } from '../../models/game.model';
	import type { Auth } from '../../models/auth.model';
	import GameCard from '$lib/game-card/GameCard.svelte';

	let ownedGames: Game[] = [];
	let allGames: Game[] = [];
	let joinedGames: Game[] = [];
	let showModal = false;
	let newGame: Game;
	let error = {
		show: false,
		message: 'An Error Occured!',
	};

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
				console.log(ownedGames);
			})
			.catch((error) => {
				// Todo: toast error here
				console.error(error);
			});

		axios
			.get(`${ENV.api}/games`, { withCredentials: true })
			.then(({ data }) => {
				allGames = data.games;
				console.log(allGames);
			})
			.catch((error) => {
				// Todo: toast error here
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
			error.show = true;
			error.message = `There is no owner for this game. Are you logged in?`;
			return;
		}

		axios
			.post(`${ENV.api}/games`, $game, {
				withCredentials: true,
			})
			.then((response: AxiosResponse<Game, any>) => {
				if (response.data) {
					newGame = response.data;
					showModal = true;
				}
			})
			.catch((e) => {
				if (e.response.status === 401) {
					error.message = `${e.message} - ${e.response.statusText} - Make sure you are logged in!`;
				}
				error.show = true;
			});
	}
</script>

<!-- New Game Form -->
<h3 class="form-title">Create a new game</h3>
<div class="form-container">
	{#if error.show}
		<Alert type="danger" dismissible>{error.message}</Alert>
	{/if}
	<form on:submit|preventDefault={handleCreateGame} method="post">
		<!-- Name -->
		<div class="form-group">
			<Input
				placeholder="Name"
				label="Name"
				type="text"
				bind:value={$game.name}
				block
				required
			/>
		</div>
		<!-- Description -->
		<div class="form-group">
			<Input
				placeholder="Description"
				label="Description"
				type="text"
				bind:value={$game.description}
				block
			/>
		</div>
		<button type="submit" class="btn-success-outline margin-top-small"
			>Create Game</button
		>
	</form>
</div>
<!-- New Game Modal -->
<Modal bind:active={showModal} title="New Game - {newGame?.name}">
	<GameCard game={newGame}/>
</Modal>

<h1>My Games</h1>
<Collapsible label="Games I Own">
	<ol>
		{#each ownedGames as game}
			<li>
				<GameCard {game} />
			</li>
		{/each}
	</ol>
</Collapsible>

<Collapsible label="All Games">
	<ol>
		{#each allGames as game}
			{#if game.ownerId === $session.profile.id}
				<li>
					<GameCard {game} />
				</li>
			{:else}
				<li style="display: flex;">
					<GameCard {game} />
					<Button
						size="small"
						class="margin-left-small"
						on:click={() => joinGame(game.id)}>Join Game</Button
					>
				</li>
			{/if}
		{/each}
	</ol>
</Collapsible>

<Collapsible label="Joined Games">
	<ol>
		{#each joinedGames as game}
			<li>
				<GameCard {game} />
			</li>
		{/each}
	</ol>
</Collapsible>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
	}

	div.form-container {
		width: 50%;
		align-self: center;
	}

	div.modal-content {
		width: 25vw;
	}

	div.modal-content > p {
		color: white;
	}

	h3.form-title {
		text-align: center;
	}
</style>
