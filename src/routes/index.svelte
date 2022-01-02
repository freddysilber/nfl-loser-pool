<script context="module" lang="ts">
	import { writable } from "svelte/store";
	import Popover from 'spaper/components/Popover.svelte';
	import Input from 'spaper/components/Form/Input.svelte';
	import Alert from 'spaper/components/Alert.svelte';
	import Modal from 'spaper/components/Modal/Modal.svelte'
	import axios, { AxiosResponse } from "axios";
	import { ENV } from "$lib/env";

	interface Game {
		id: number;
		name: string;
		description: string;
	}

	export const prerender = true;
	
	export const item = writable({
		name: `Random Item: ${Math.floor(Math.random() * 100)}`,
	});

	const scheduleUrl = 'https://www.google.com/search?q=nfl+schedule&rlz=1C1CHBF_enUS851US854&oq=nfl+schedule&aqs=chrome.0.69i59i131i433i512j0i131i433i512l4j0i433i512j0i131i433i512l2j0i433i512j0i131i433i512.2480j1j4&sourceid=chrome&ie=UTF-8#sie=lg;/g/11nym9rnk6;6;/m/059yj;mt;fp;1;;';
</script>

<script lang="ts">
	import { getStores } from "$app/stores";

	let showModal = false;
	let newGame: Game;
	let error = {
		show: false,
		message: 'An Error Occured!'
	};
	const {session} = getStores();
	const game = writable({
		name: '',
		description: '',
		ownerId: $session.profile.id
	});
	
	function handleCreateGame() {
		if (!$game.name || !$game.ownerId) {
			error.show = true;
			error.message = 'There is no owner for this game. Are you logged in?';
			return
		}

		axios.post(
			`${ENV.api}/games`,
			$game,
			{
				withCredentials: true
			}
		).then((response: AxiosResponse<Game, any>) => {
			newGame = response.data;
			showModal = true;
		}).catch((e) => {
			error.show = true;
			if (e.response.status === 401) {
				error.message = `${e.message} - ${e.response.statusText} - Make sure you are logged in!`
			}
		});
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>Welcome to the NFL Loser Pool!</h1>
	<h4 class="schedule-link">
		<Popover label="Click to see the official NFL schedule" position="bottom" background="secondary">
			<a href={scheduleUrl} target="_blank">NFL Schedule</a>
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
			<button type="submit" class="btn-success-outline margin-top-small">Create Game</button>
		</form>
	</div>
	<!-- New Game Modal -->
	<Modal 
		bind:active={showModal}
		title="New Game - {newGame?.name}"
	>
		<div style="width: 25vw;">
			<p>Game Id - {newGame?.id}</p>
			<p>Name - {newGame?.name}</p>
			<p>Description - {newGame?.description}</p>
			<p>Share Key - '{newGame?.id} - {newGame?.name}'</p>
		</div>
	</Modal>
	<!-- <a sveltekit:prefetch href="/game"
		>Get to the game... or use the nav bar at the top</a
	>
	<a sveltekit:prefetch href="/login">Login</a>
	<a sveltekit:prefetch href="/sign-up">Sign Up</a>

	<button on:click={fetchItems}>Fetch Items</button>

	<h1>Create a random 'Item'</h1>
	<form on:submit|preventDefault={handleSubmit} method="post">
		<label for="name">Name</label>
		<input id="name" type="text" autocomplete="name" bind:value={$item.name} />
		<button type="submit">Create Item</button>
	</form>

	<form on:submit|preventDefault={updateItem} method="post">
		<label for="name">Name</label>
		<input id="name" type="text" autocomplete="name" bind:value={$item.name} />
		<button type="submit">Update Item?</button>
	</form> -->

	<!-- <h1>
		<div class="welcome">
			<picture>
				<source srcset="svelte-welcome.webp" type="image/webp" />
				<img src="svelte-welcome.png" alt="Welcome" />
			</picture>
		</div>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/index.svelte</strong>
	</h2>

	<Counter /> -->
</section>

<style>
	div.form-container {
		width: 50%;
		align-self: center;
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

	h1 {
		width: 100%;
		/* font-size: 2em; */
	}

	/* .welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	} */
</style>
