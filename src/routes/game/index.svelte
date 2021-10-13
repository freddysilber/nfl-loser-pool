<script lang="ts">
	import { fly } from 'svelte/transition';
	import Prize from '$lib/prize/Prize.svelte';
	import ScoreLegend from '$lib/score-legend/ScoreLegend.svelte';
	import GameBoard from '$lib/game-board/GameBoard.svelte';

	const GAME_YEAR = 4;

	const scheduleUrl = 'https://www.google.com/search?q=nfl+schedule&rlz=1C1CHBF_enUS851US854&oq=nfl+schedule&aqs=chrome.0.69i59i131i433i512j0i131i433i512l4j0i433i512j0i131i433i512l2j0i433i512j0i131i433i512.2480j1j4&sourceid=chrome&ie=UTF-8#sie=lg;/g/11nym9rnk6;6;/m/059yj;mt;fp;1;;';
	const players = ['Freddy', 'Lydia', 'Jay', 'Carmen', 'Patrick', 'Andrew', 'Chris', 'Pheonix'];
</script>

<svelte:head>
	<title>NFL Looser Pool</title>
</svelte:head>

<h1 in:fly={{ x: 1000, duration: 1000 }} out:fly={{ x: -1000, duration: 1000 }}>
	{GAME_YEAR}th Annual Cloud Coach NFL Looser Pool
</h1>
<div class="game-header">
	<h3 class="schedule-link">
		<a href={scheduleUrl} target="_blank">Schedule</a>
	</h3>
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
</style>
