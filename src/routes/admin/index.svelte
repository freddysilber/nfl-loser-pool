<script lang="ts">
	import { fade, fly } from "svelte/transition";

	export let myName = "Freddy"; // This can be passed down from a parent component because it is marked with the 'export' keyword

	let values: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 19];

	function caluclator() {
		return Math.random() + 1;
	}

	function delay(ms: number) {
		return new Promise((resolve) =>
			setTimeout(() => resolve("Promise Value"), ms)
		);
	}

	let promiseValue = delay(2000);

	$: thinggy = Math.random(); // This is a variable that reacts/ updates whenever the component changes (???)

	let rando: number = Math.random();

	function setRando(event: MouseEvent) {
		console.log(event);
		rando = Math.random();
	}
</script>

<div>
	<p transition:fade>{myName}</p>
	<p transition:fade>{rando}</p>
	<p transition:fade>{thinggy}</p>
	<p transition:fade>{thinggy}</p>
	<p transition:fly>{thinggy}</p>
	<button on:click={setRando}>Rando</button>
	<input bind:value={rando} />

	{Math.floor(caluclator()) % 2}
	{caluclator() % 2}

	{#if rando % 2 == 0}
		<p transition:fade>The rando is even!</p>
	{/if}

	{#each values as number}
		{#if number % 2 === 0}
			<p>{number} is even!!!</p>
		{:else if number == 1}
			<p>{number} is exactly one</p>
		{:else}
			<p
				in:fly={{ x: 1000, duration: 1000 }}
				out:fly={{ x: -500, duration: 1000 }}
			>
				{number} is not even...
			</p>
		{/if}
	{/each}
	
	{#await promiseValue}
		<p>Promise Value is working</p>
	{:then val} 
		<p>VAL! -- {val}</p>
	{:catch}
		<p>There was and issue! peep the promise error</p>
	{/await}
</div>
