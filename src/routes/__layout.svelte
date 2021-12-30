<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/header/Header.svelte';
	import { getStores } from '$app/stores';
	import '../app.css';
	import { ENV } from '$lib/env';
	import axios from 'axios';
	import { setSession } from '../session';

	const { session }: any = getStores();

	onMount(async () => {
		if (session && session.authenticated) {
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

<Header />

<main>
	{#if $session.authenticated}
		{$session.profile.name} - {$session.profile.username}
	{/if}
	<slot />
</main>

<footer>
	<p>
		created by <a href="https://github.com/freddysilber" target="_blank">Freddy Silber</a>
	</p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
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
