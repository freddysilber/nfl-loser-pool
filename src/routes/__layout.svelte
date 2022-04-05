<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/header/Header.svelte';
	import { getStores } from '$app/stores';
	import { ENV } from '$lib/env';
	import axios from 'axios';
	import { setSession } from '../session';
	import '../app.css';
	// import Error from '$lib/errors/Error.svelte';
	import { MaterialApp } from 'svelte-materialify';
	import { goto } from '$app/navigation';
	import { Routes } from '../tsbs/router-helper';

	const { session }: any = getStores();

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

				if (!session.authenticated) {
					goto(Routes.Home);
				}
			})
			.catch((_) => {
				goto(Routes.Home);
			});
	});
</script>

<!-- Leave this.... might make toggleing between light and dark easier... -->
<!-- <MaterialApp theme="dark" style="height: 100%;"> -->
<MaterialApp theme="dark">
	<div class="app-layout">
		<Header />

		<main>
			<!-- {#if $session.authenticated}
				<p>{$session.profile.name} - {$session.profile.username}</p>
				{/if} -->
			<slot />
		</main>

		<footer>
			<p class="blue-text">
				created by <a
					href="https://github.com/freddysilber"
					target="_blank">Freddy Silber</a
				>
			</p>
		</footer>
	</div>
</MaterialApp>

<style lang="scss">
	div.app-layout {
		display: flex;
		flex-direction: column;
		overflow: auto;
		height: 100%;

		main {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 0.5rem;
			width: 100%;
			margin: 0 auto;
			box-sizing: border-box;
		}

		footer {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			/* padding: 40px; */
		}

		footer a {
			font-weight: bold;
		}
		/* 
		@media (min-width: 480px) {
			footer {
				padding: 40px 0;
			}
		} */
	}
</style>
