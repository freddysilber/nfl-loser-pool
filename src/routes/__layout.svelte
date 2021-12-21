<script lang="ts">
	import Header from "$lib/header/Header.svelte";
	import "../app.css";

	let isAuthenticated: boolean = true;
</script>

<Header />

<main>
	{#if isAuthenticated}
		<slot />
	{:else}
		<p class="unauthorized">Your not signed in!</p>
	{/if}
</main>

<footer>
	<p>
		visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
	</p>
</footer>

<style>
	p.unauthorized {
		text-align: center;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
