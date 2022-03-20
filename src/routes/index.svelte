<script lang="ts">
	import {Button} from 'svelte-materialify';
	// This is a link we need to update on a per season basis
	const SCHEDULE_URL = `https://www.google.com/search?q=nfl+schedule&rlz=1C1CHBF_enUS851US854&oq=nfl+schedule&aqs=chrome.0.69i59i131i433i512j0i131i433i512l4j0i433i512j0i131i433i512l2j0i433i512j0i131i433i512.2480j1j4&sourceid=chrome&ie=UTF-8#sie=lg;/g/11nym9rnk6;6;/m/059yj;mt;fp;1;;`;

	function goToSchedule(): void {
		window.open(SCHEDULE_URL);
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1 class="text-h1 graduate-text">NFL Loser Pool!</h1>
	<Button
		text
		class="graduate-text"
		on:click={goToSchedule}
	>
		Schedule
	</Button>
</section>

<style lang="scss">
	section {
		.graduate-text {
			// font-family: 'Graduate', cursive;
			font-family: 'Graduate', Roboto;
			font-weight: bold;
			color: white;
		}

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
