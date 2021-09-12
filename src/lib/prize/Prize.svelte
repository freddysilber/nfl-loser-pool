<script lang="ts">
	export let test: string;
	export let cash: number;
	export let prizeType: string;

	const showSampleProp: boolean = false;
</script>

<h1>Prize: ${cash} {prizeType}<slot></slot>!</h1>

{#if showSampleProp}
	<p>{test}</p>
{/if}

<style>
	h1 {
		color: #686868;
	}
</style>