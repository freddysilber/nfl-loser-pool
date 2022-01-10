<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	// let loadingScore: number = 0;
	// let interval: NodeJS.Timer;

	// onMount(() => {
	// 	interval = setInterval(() => {
	// 		loadingScore += 7;
	// 	}, 1000);
	// });

	// onDestroy(() => {
	// 	clearInterval(interval);
	// });
</script>

<div class="lds-ripple">
	<!-- <div />
	<div /> -->
	<!-- <div style="color: white">+{loadingScore}</div> -->
	<div><img src="static/american-football.png" alt="football spinner"/></div>
</div>
<div class="overlay" />

<style>
	img {
		border: none;
	}

	div.overlay {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background: black;
		opacity: 0.5;
	}

	.lds-ripple {
		/* background-image: url("/static/american-football.png"); */
		display: inline-block;
		position: absolute;
		width: 80px;
		height: 80px;
		z-index: 1;
	}

	.lds-ripple div {
		position: absolute;
		/* border: 4px solid rgb(219, 30, 93); */
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}

	.lds-ripple div:nth-child(2) {
		animation-delay: -0.5s;
	}

	@keyframes lds-ripple {
		0% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			top: 0px;
			left: 0px;
			width: 72px;
			height: 72px;
			opacity: 0;
		}
	}
</style>
