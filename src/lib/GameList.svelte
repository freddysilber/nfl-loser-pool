<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { Game } from '../models/game.model';

	export let games: Game[];

	const dispatch = createEventDispatcher();

	let selectedGame: Game;
</script>

<div class="list">
	<h1 class="white-text">Games List</h1>
	{#each games as game}
		<div
			class="list-item"
			class:selected={selectedGame?.id === game.id}
			on:click={() => {
				dispatch('select', selectedGame = game);
			}}
		>
			{game.name}
		</div>
	{/each}
</div>

<style lang="scss">
	$selected-color: rgb(0, 162, 202);

	// We can use a function to be a bit more dynamic with some styles... subject to change...
	@function border($size: 1) {
		@return $size + px solid black;
	}

	div.list {
		width: 25%;
		border-right: border();

		h1 {
			text-align: left;
			border-bottom: border(1);
			margin: 0;
		}

		.list-item {
			border-radius: 4px;
			margin: 0.1rem;
			padding: 0.2rem;
			transition: background-color 0.2s ease-in-out;

			&:hover {
				cursor: pointer;
				background-color: $selected-color;

				&:not(.selected) {
					opacity: 0.6;
				}
			}

			&.selected {
				background-color: $selected-color;
			}
		}
	}
</style>
