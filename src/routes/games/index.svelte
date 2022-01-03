<script lang="ts">
	import { getStores } from '$app/stores';
	import { ENV } from '$lib/env';
	import axios from 'axios';
	import Collapsible from 'spaper/components/Collapsible.svelte';
	import type { Game } from '../../models/game';

	let ownedGames: Game[] = [];
	let allGames: Game[] = [];
	let joinedGames: Game[] = [];

	const { session } = getStores();

	interface AuthProfile {
		id: number;
		name: string;
		username: string;
		password: string;
		roles: string[];
	}

	interface Auth {
		authenticated: boolean;
		profile: AuthProfile;
	}

	session.subscribe((session: Auth) => {
		axios
			.get(`${ENV.api}/users/games/${session.profile.id}`, {
				withCredentials: true,
			})
			.then((response) => {
				ownedGames = response.data.games;
			})
			.catch((error) => {
				console.error(error);
			});

		axios
			.get(`${ENV.api}/games`, { withCredentials: true })
			.then((response) => {
				allGames = response.data.games;
			})
			.catch((error) => {
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
</script>

<h1>My Games</h1>
<Collapsible label="Games I Own">
	<ol>
		{#each ownedGames as game}
			<li>{game.name} - {game.description}</li>
		{/each}
	</ol>
</Collapsible>

<Collapsible label="All Games">
	<ol>
		{#each allGames as game}
			<li>{game.name} - {game.description}</li>
		{/each}
	</ol>
</Collapsible>

<Collapsible label="Joined Games">
	<ol>
		{#each joinedGames as game}
			<li>{game.name} - {game.description}</li>
		{/each}
	</ol>
</Collapsible>
