<script context="module" lang="ts">
	import axios from "axios";
	import { ENV } from "$lib/env";
	import { writable } from "svelte/store";

	export const prerender = true;

	export const item = writable({
		name: `Random Item: ${Math.floor(Math.random() * 100)}`,
	});

	function fetchItems() {
		axios.get(`${ENV.api}/items`).then((items) => {
			console.log(items);
		});
	}
</script>

<script lang="ts">
	// import Counter from '$lib/Counter.svelte';

	function handleSubmit(event: any){
		axios.post(`${ENV.api}/items`, $item).then(response =>{
			console.log(response);
		});
	}

	function updateItem(event: any) {
		axios.put(`${ENV.api}/item${1}`, $item).then(response => {
			console.log('response????', response);
		})
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<!-- Need to either make the 'game' route the default, or redirect from '/' to '/game' -->
	<h1>What's up guys!? Let's start loosing some games...</h1>
	<a sveltekit:prefetch href="/game"
		>Get to the game... or use the nav bar at the top</a
	>
	<a sveltekit:prefetch href="/login">Login</a>
	<a sveltekit:prefetch href="/sign-up">Sign Up</a>

	<button on:click={fetchItems}>Fetch Items</button>

	<h1>Create a random 'Item'</h1>
	<form on:submit|preventDefault={handleSubmit} method="post">
		<!-- Username -->
		<label for="name">Name</label>
		<input id="name" type="text" autocomplete="name" bind:value={$item.name} />
		<!-- Submit -->
		<button type="submit">Create Item</button>
	</form>

	<form on:submit|preventDefault={updateItem} method="post">
			<!-- Username -->
		<label for="name">Name</label>
		<input id="name" type="text" autocomplete="name" bind:value={$item.name} />
		<!-- Submit -->
		<button type="submit">Update Item?</button>
	</form>
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
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
		font-size: 2em;
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
