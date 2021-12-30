<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/header/Header.svelte';
	import { getStores } from '$app/stores';
	import '../app.css';
	import { ENV } from '$lib/env';
	import axios from 'axios';

	const { session }: any = getStores();

	onMount(async () => {
		if (session && session.authenticated) {
			return; // already have valid session
		}

		try {
			// validate session-token against server
			const response = await fetch(`${ENV.api}/session`, {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				const profile = await response.json();
				// user profile is returned on success
				session.update(() => {
					return {
						authenticated: !!profile,
						profile,
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
	});
</script>

<Header />

<main>
	{#if $session.authenticated}
		{$session.profile.name} - {$session.profile.username}
	{/if}
	<slot/>
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
