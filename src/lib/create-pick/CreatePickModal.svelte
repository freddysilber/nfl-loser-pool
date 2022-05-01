<script lang="ts">
	import { Dialog } from 'svelte-materialify';
	import { createEventDispatcher } from 'svelte';
	import type { Pick } from 'src/models/pick.model';
	import CreatePickForm from './CreatePickForm.svelte';

	const dispatch = createEventDispatcher();

	export let showCreateModal: boolean = false;

	function createPayload(event: CustomEvent<{ payload: Pick }>): void {
		// TODO figure out how to only get ONE game from the payload
		const pick: Pick = event.detail.payload;
		dispatch('submit', {
			pick,
		});
	}
</script>

<Dialog persistent class="pa-5" bind:active={showCreateModal}>
	<CreatePickForm
		on:create={createPayload}
		on:cancel={() => (showCreateModal = false)}
	/>
</Dialog>
