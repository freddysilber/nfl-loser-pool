<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/header/Header.svelte';
	import { getStores } from '$app/stores';
	import { ENV } from '$lib/env';
	import axios from 'axios';
	import { setSession } from '../session';
	import '../app.css';
	import { MaterialApp, Icon } from 'svelte-materialify';
	import { goto } from '$app/navigation';
	import { Routes } from '../tsbs/router-helper';
	import { mdiGithub } from '@mdi/js';

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

				if (!$session.authenticated) {
					goto(Routes.Home);
				}
			})
			.catch((_) => {
				goto(Routes.Home);
			});
	});
</script>

<MaterialApp theme="dark">
	<div class="app-layout">
		<Header />

		<main>
			<slot />
		</main>

		<footer>
			<p class="blue-text">
				Created by <a
					href="https://github.com/freddysilber"
					target="_blank">Freddy Silber</a
				>
				<span>|</span>
				<a
					href="https://github.com/sponsors/freddysilber"
					style="color: dodgerblue;"
					target="_blank"
					class="amber-text"
					>Support the creator <Icon path={mdiGithub} /></a
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
		}

		footer a {
			font-weight: bold;
		}
	}
</style>
