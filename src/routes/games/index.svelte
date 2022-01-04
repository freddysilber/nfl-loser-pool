<script lang="ts">
	import { getStores } from '$app/stores';
	import { ENV } from '$lib/env';
	import axios from 'axios';
	import Collapsible from 'spaper/components/Collapsible.svelte';
	import Button from 'spaper/components/Button.svelte';
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
			.then(({ data }) => {
				ownedGames = data.games;
			})
			.catch((error) => {
				console.error(error);
			});

		axios
			.get(`${ENV.api}/games`, { withCredentials: true })
			.then(({ data }) => {
				console.log(data);
				allGames = data.games;
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

	function joinGame(gameId: number) {
		console.log('join game', gameId);
	}
</script>

<h1>My Games</h1>
<Collapsible label="Games I Own">
	<ol>
		{#each ownedGames as game}
			<li>
				<span class="star">&star;</span>
				{game.name} - {game.description}
			</li>
		{/each}
	</ol>
</Collapsible>

<Collapsible label="All Games">
	<ol>
		{#each allGames as game}
			{#if game.ownerId === $session.profile.id}
				<li>
					<span class="star">&star;</span>
					{game.name} - {game.description}
				</li>
			{:else}
				<li style="display: flex;">
					<span>{game.name} - {game.description}</span>
					<Button
						size="small"
						class="margin-left-small"
						on:click={() => joinGame(game.id)}>Join Game</Button
					>
				</li>
			{/if}
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

<style lang="scss">
	span.star {
		color: pink;
	}
</style>
