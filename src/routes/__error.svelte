<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				message: error.message,
				status, // same as status: status
			},
		};
	}
</script>

<script>
	// import Error from '$lib/errors/Error.svelte';
	import NotFound from '$lib/errors/NotFound.svelte';

	// export let message;
	export let status;
</script>

{#if status == 404}
	<NotFound />
{:else}
	<p>Error!</p>
	<!-- <Error {message} /> -->
{/if}
