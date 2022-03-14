<script lang="ts">
	const SCHEDULE_URL = `https://www.google.com/search?q=nfl+schedule&rlz=1C1CHBF_enUS851US854&oq=nfl+schedule&aqs=chrome.0.69i59i131i433i512j0i131i433i512l4j0i433i512j0i131i433i512l2j0i433i512j0i131i433i512.2480j1j4&sourceid=chrome&ie=UTF-8#sie=lg;/g/11nym9rnk6;6;/m/059yj;mt;fp;1;;`;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h3>Welcome to the NFL Loser Pool!</h3>
	<h4>
		<a href={SCHEDULE_URL} target="_blank"> NFL Schedule </a>
	</h4>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
