<script lang="ts">
	export let myName = "Freddy"; // This can be passed down from a parent component because it is marked with the 'export' keyword

	let values: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 19];

	function caluclator() {
		return Math.random() + 1;
	}

	$: thinggy = Math.random(); // This is a variable that reacts/ updates whenever the component changes (???)

	let rando: number = Math.random();

	function setRando(event) {
		console.log(event);
		rando = Math.random();
	}
</script>

<div>
	<p>{myName}</p>
	<p>{rando}</p>
	<p>{thinggy}</p>
	<p>{thinggy}</p>
	<p>{thinggy}</p>
	<button on:click={setRando}>Rando</button>
	<input bind:value={rando} />

	{Math.floor(caluclator()) % 2}
	{caluclator() % 2}

	{#if rando % 2 == 0}
		<p>The rando is even!</p>
	{/if}

	{#each values as number}
		{#if number % 2 === 0}
			<p>{number} is even!!!</p>
		{:else}
			<p>{number} is not even...</p>
		{/if}
	{/each}
</div>
