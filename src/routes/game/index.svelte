<script lang="ts">
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";
	import { ENV } from "$lib/env";
	import Prize from "$lib/prize/Prize.svelte";
	import ScoreLegend from "$lib/score-legend/ScoreLegend.svelte";
	import GameBoard from "$lib/game-board/GameBoard.svelte";
	import axios from "axios";

	const scheduleUrl =
		"https://www.google.com/search?q=nfl+schedule&rlz=1C1CHBF_enUS851US854&oq=nfl+schedule&aqs=chrome.0.69i59i131i433i512j0i131i433i512l4j0i433i512j0i131i433i512l2j0i433i512j0i131i433i512.2480j1j4&sourceid=chrome&ie=UTF-8#sie=lg;/g/11nym9rnk6;6;/m/059yj;mt;fp;1;;";
	const players = [
		"Freddy",
		"Lydia",
		"Jay",
		"Carmen",
		"Patrick",
		"Andrew",
		"Chris",
		// "Pheonix",
	];

	let items = [];

	onMount(async () => {
		const res = await axios.get<{items: any[]}>(`${ENV.api}/items`);
		items = res.data.items || items;
	});
</script>

<svelte:head>
	<title>Game</title>
</svelte:head>

<!-- <ul>
	{#each items as item}
		<li>{item.name}</li>
	{:else}
	<li>loading...</li>
	{/each}
</ul> -->

<h3 in:fly={{ x: 1000, duration: 1000 }} out:fly={{ x: -1000, duration: 1000 }} class="game-title">NFL Loser Pool {new Date().getFullYear()}</h3>
<div class="game-header">
	<h4 class="schedule-link">
		<a href={scheduleUrl} target="_blank">Schedule</a>
	</h4>
	<Prize
		message="some random prop is being passed in!!!"
		showMessage={false}
		cash={100}
		prizeType="Gift Card"
	/>
	<ScoreLegend />
</div>

<GameBoard {players} />

<style>
	div.game-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.25rem;
	}

	.schedule-link {
		display: flex;
		flex-direction: column;
		align-self: center;
	}

	.game-title {
		text-align: center;
	}
</style>
