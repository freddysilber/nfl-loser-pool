<script lang="ts">
	import { getStores } from '$app/stores';
	import { ENV } from '$lib/env';
	import axios from 'axios';
	import Collapsible from 'spaper/components/Collapsible.svelte';
	import type { Game } from '../../models/game';

	let games: Game[] = [];

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
			.get(`${ENV.api}/users/games/${session.profile.id}`)
			.then((response) => {
				games = response.data.games;
			})
			.catch((error) => {
				console.error(error);
			});
	});
</script>

<h1>My Games</h1>
<Collapsible label="Games I Own">
	<ol>
		{#each games as game}
			<li>{game.name} - {game.description}</li>
		{/each}
	</ol>
</Collapsible>

<Collapsible label="Games I Joined">
	<h4>Games I Joined</h4>
</Collapsible>
