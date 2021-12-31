<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/header/Header.svelte';
	import { getStores } from '$app/stores';
	import { ENV } from '$lib/env';
	import axios from 'axios';
	import { setSession } from '../session';
	import '../app.css';
	import 'papercss/dist/paper.min.css';
	// import Button from 'spaper/components/Button.svelte';
	// import Modal from 'spaper/components/Modal/Modal.svelte';

	const { session }: any = getStores();

	// let showModal = false;

	onMount(async () => {
		if ($session && $session.authenticated) {
			return; // already have valid session
		}
		// validate session-token against server
		axios
			.get(`${ENV.api}/session`, {
				withCredentials: true,
			})
			.then((response) => {
				setSession(response, session);
			})
			.catch((error) => {
				console.error(error);
			});
	});
</script>

<!-- <Button on:click={() => (showModal = true)}>Show</Button>
<Modal bind:active={showModal} title="Modal Title">
	<p>Hey!</p>
	<p>Here is the modal content</p>
</Modal> -->

<Header />

<main>
	<!-- {#if $session.authenticated}
		<p>{$session.profile.name} - {$session.profile.username}</p>
	{/if} -->
	<slot />
</main>

<footer>
	<p>
		created by <a href="https://github.com/freddysilber" target="_blank"
			>Freddy Silber</a
		>
	</p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		width: 100%;
		/* max-width: 1024px; */
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
