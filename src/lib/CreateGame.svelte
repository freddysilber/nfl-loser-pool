<script lang="ts">
	import { getStores } from '$app/stores';
	import { ENV } from '$lib/env';
	import axios from 'axios';
	import type { AxiosResponse } from 'axios';
	import { createEventDispatcher } from 'svelte';
	import { Button, Textarea, TextField } from 'svelte-materialify';
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import type { Game } from '../models/game.model';

	let error: any;

	const { session } = getStores();
	const dispatch = createEventDispatcher();
	const game: Writable<Game> = writable({
		name: '',
		description: '',
		ownerId: $session.profile ? $session.profile.id : null,
	});

	function handleCreateGame() {
		if (!$game.name || !$game.ownerId) {
			error = `There is no owner for this game. Are you logged in?`;
			return;
		}

		axios
			.post(`${ENV.api}/games`, $game, {
				withCredentials: true,
			})
			.then((response: AxiosResponse<Game, any>) => {
				if (response.data) {
					dispatch('create', {
						payload: [response.data],
					});
				}
			})
			.catch((e) => {
				console.error(e);
				if (e.response.status === 401) {
					error = `${e.message} - ${e.response.statusText} - Make sure you are logged in!`;
				}
			});
	}
</script>

<div class="placeholder-form-div">
	<h6 class="white-text form-title mb-4">Create a new game</h6>
	<div class="form-container">
		{#if error}
			<p style="color: red;">{error}</p>
		{/if}
		<form on:submit|preventDefault={handleCreateGame} method="post">
			<!-- Name -->
			<div class="form-group">
				<TextField
					placeholder="Name"
					type="text"
					bind:value={$game.name}
					required
				/>
			</div>
			<!-- Description -->
			<div class="form-group">
				<Textarea
					class="mt-4"
					placeholder="Description"
					bind:value={$game.description}
				/>
			</div>
			<div class="button-container">
				<Button on:click={() => dispatch('cancel')} class="red mt-4"
					>Cancel</Button
				>
				<Button type="submit" class="green mt-4">Create Game</Button>
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
