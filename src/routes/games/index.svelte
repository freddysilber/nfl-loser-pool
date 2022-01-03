<script lang="ts">
	import { getStores } from '$app/stores';
	import { ENV } from '$lib/env';
	import Games from '$lib/games/Games.svelte';
	import axios from 'axios';
	import Collapsible from 'spaper/components/Collapsible.svelte';
	import { onMount } from 'svelte';
	import type { Game } from '../../models/game';

	let games: Game[] = [];

	const { session } = getStores();

	// onMount(()=>{
	// 	console.log($session)
	// 	axios
	// 		.get(`${ENV.api}/users/games/${$session.profile.id}`)
	// 		.then((response) => {
	// 			console.log(response);
	// 			games = response.data;
	// 			console.log(games);
	// 		})
	// 		.catch((error) => {
	// 			console.error(error);
	// 		});
	// });

	// session.subscribe((session) => {
	// 	console.log(session);
	// 	axios
	// 		.get(`${ENV.api}/users/games/${session.profile.id}`)
	// 		.then((response) => {
	// 			console.log(response);
	// 			games = response.data;
	// 			console.log(games);
	// 		})
	// 		.catch((error) => {
	// 			console.error(error);
	// 		});
	// });
</script>

<h1>My Games</h1>
<!-- <Games {games} /> -->

<Collapsible label="Games I Joined">
	I have a bowling personal best of 194
</Collapsible>
