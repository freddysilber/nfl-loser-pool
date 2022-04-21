<script lang="ts">
	import { Dialog } from 'svelte-materialify';
	import CreateGameForm from '$lib/create-game/CreateGameForm.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Game } from 'src/models/game.model';

	const dispatch = createEventDispatcher();

	export let showCreateModal: boolean = false;

	function createPayload(event: CustomEvent<{ payload: Game[] }>): void {
		// TODO figure out how to only get ONE game from the payload
		console.log('event', event);
		const game: Game = event.detail.payload[0];
		dispatch('submit', { game });
	}
</script>

<Dialog persistent class="pa-5" bind:active={showCreateModal}>
	<CreateGameForm
		on:create={createPayload}
		on:cancel={() => (showCreateModal = false)}
	/>
</Dialog>
