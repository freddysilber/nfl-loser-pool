<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/header/Header.svelte';
	import { getStores } from '$app/stores';
	import '../app.css';
	import { ENV } from '$lib/env';
	import axios from 'axios';

	const { session }: any = getStores();

	// console.log($session);

	onMount(async () => {
		if (session && session.authenticated) {
			return; // already have valid session
		}

		try {
			// validate session-token against server
			const response = await axios.get(`${ENV.api}/session`);
			if (response.statusText === 'OK') {
				// user profile is returned on success
				console.log(response);
				session.update(() => {
					return {
						authenticated: !!response.data.authenticated,
						profile: response.data,
						loading: false,
					};
				});
			} else {
				// error validating session
				session.update(() => {
					return {
						authenticated: false,
						profile: null,
						loading: false,
					};
				});
			}
		} catch (error) {
			console.error(error); // connection error
			throw new Error(error);
		}
		console.log($session);
	});
</script>

<Header />

<main>
	{#if $session.authenticated}
		{$session.profile.name} - {$session.profile.username}
	{/if}
</main>

<footer>
	<p>
		visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
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
