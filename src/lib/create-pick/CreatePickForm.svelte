<script lang="ts">
	import { getStores } from '$app/stores';
	import { ENV } from '$lib/env';
	import axios, { type AxiosError, type AxiosResponse } from 'axios';
	import { createEventDispatcher } from 'svelte';
	import { Button, Textarea, TextField, Icon } from 'svelte-materialify';
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import type { Pick } from '../../models/pick.model';
	import { mdiCheckAll, mdiCancel } from '@mdi/js';

	let error: string;

	const { session } = getStores();
	const dispatch = createEventDispatcher();
	const pick: Writable<Pick> = writable<Pick>({
		// name: '',
		// description: '',
		id: null,
		gameId: null,
		playerId: $session.profile ? $session.profile.id : null,
	});

	function handleCreatePick() {
		// if (!$game.playerId || !$game.gameId) {
		// 	error = `There is no owner for this game. Are you logged in?`;
		// 	return;
		// }
		// console.log($pick, pick);
		dispatch('create', {
			payload: $pick,
		});

		// axios
		// 	.post(`${ENV.api}/picks`, $pick, {
		// 		withCredentials: true,
		// 	})
		// 	.then((response: AxiosResponse<Pick, any>) => {
		// 		if (response.data) {
		// 			console.log(response.data);
		// 			dispatch('create', {
		// 				payload: [response.data],
		// 			});
		// 		}
		// 	})
		// 	.catch((e: AxiosError<AxiosResponse>) => {
		// 		console.error(e);
		// 		if (e.response.status === 401) {
		// 			error = `${e.message} - ${e.response.statusText} - Make sure you are logged in!`;
		// 		}
		// 	});
	}
</script>

<div class="placeholder-form-div">
	<h6 class="white-text form-title mb-4">Get you pick in</h6>
	<div class="form-container">
		{#if error}
			<p style="color: red;">{error}</p>
		{/if}
		<form on:submit|preventDefault={handleCreatePick} method="post">
			<!-- Name -->
			<div class="form-group">
				<TextField
					placeholder="Name"
					type="text"
					bind:value={$pick.playerId}
				/>
			</div>
			<!-- Description -->
			<!-- <div class="form-group">
				<Textarea
					class="mt-4"
					placeholder="Description"
					bind:value={$game.description}
				/>
			</div> -->
			<div class="button-container">
				<Button on:click={() => dispatch('cancel')} class="red mt-4"
					>Cancel <Icon path={mdiCancel} /></Button
				>
				<Button
					type="submit"
					class="green mt-4"
				>
					Save
					<Icon path={mdiCheckAll} />
				</Button>
			</div>
		</form>
	</div>
</div>

<style lang="scss">
	.button-container {
		display: flex;
		justify-content: space-between;
	}
</style>
