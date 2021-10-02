<script lang="ts">
	export let message: string; // Optional message prop
	export let showMessage: boolean;
	export let cash: number;
	export let prizeType: string;
</script>

<h1>Prize: ${cash} {prizeType}<slot></slot>!</h1>

{#if showMessage}
	<p>{message}</p>
{/if}

<style>
	h1 {
		color: #686868;
	}
</style>