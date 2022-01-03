<script context="module" lang="ts">
	import { getStores } from '$app/stores';
	import { ENV } from '$lib/env';
	import axios, { AxiosResponse } from 'axios';
	import Modal from 'spaper/components/Modal/Modal.svelte';
	import Alert from 'spaper/components/Alert.svelte';
	import Input from 'spaper/components/Form/Input.svelte';
	import Popover from 'spaper/components/Popover.svelte';
	import { Writable, writable } from 'svelte/store';

	interface Game {
		name: string;
		description: string;
		id?: number;
		ownerId: string;
	}
</script>

<script lang="ts">
	let showModal = false;
	let newGame: Game;
	let error = {
		show: false,
		message: 'An Error Occured!',
	};

	const SCHEDULE_URL = `https://www.google.com/search?q=nfl+schedule&rlz=1C1CHBF_enUS851US854&oq=nfl+schedule&aqs=chrome.0.69i59i131i433i512j0i131i433i512l4j0i433i512j0i131i433i512l2j0i433i512j0i131i433i512.2480j1j4&sourceid=chrome&ie=UTF-8#sie=lg;/g/11nym9rnk6;6;/m/059yj;mt;fp;1;;`;
	const { session } = getStores();
	const game: Writable<Game> = writable({
		name: '',
		description: '',
		ownerId: $session.profile ? $session.profile.id : null,
	});

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

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>Welcome to the NFL Loser Pool!</h1>
	<h4 class="schedule-link">
		<Popover
			label="Click to see the official NFL schedule"
			position="bottom"
			background="secondary"
		>
			<a href={SCHEDULE_URL} target="_blank">NFL Schedule</a>
		</Popover>
	</h4>
	<!-- New Game Form -->
	<h3>Create a new game</h3>
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
		<div class="modal-content">
			<p>Game Id - {newGame?.id}</p>
			<p>Name - {newGame?.name}</p>
			<p>Description - {newGame?.description}</p>
			<p>Share Key - '{newGame?.id} - {newGame?.name}'</p>
		</div>
	</Modal>
</section>

<style>
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

	form {
		display: flex;
		flex-direction: column;
	}
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
