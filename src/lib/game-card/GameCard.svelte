<script lang="ts">
	import type { Game } from '../../models/game.model';

	export let game: Game;

	function editGame(): void {
		console.log(game);
	}
</script>

{#if game}
	<div class="game-card">
		<div>
			<p><span class="label">Name: </span>{game.name}</p>
			<p><span class="label">Id: </span>{game.id}</p>
			<p><span class="label">Description: </span>{game.description}</p>
			<p><span class="label">Share Id: </span>{game.shareId}</p>
		</div>
		<div>
			<slot name="actions" />
			<button on:click={editGame}>Edit Game</button>
		</div>
		<!-- <slot>default</slot> -->
	</div>
{/if}

<style lang="scss">
	div.game-card {
		border: 1px solid black;
		border-radius: 5px;
		display: flex;

		p {
			margin: 0;
		}
		span.label {
			color: #eee;
		}
	}
</style>
