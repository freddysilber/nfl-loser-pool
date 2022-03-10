<script lang="ts">
	import type { Game } from '../../models/game.model';

	export let game: Game;

	function goToGame() {
		console.log(game);
	}
</script>

{#if game}
	<div class="game-card" on:click={goToGame}>
		<div>
			<p><span class="label">Name: </span>{game.name}</p>
			<p><span class="label">Description: </span>{game.description}</p>
			<p><span class="label">Share Id: </span>{game.shareId}</p>
		</div>
		<slot name="join-action"></slot>
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
			color: #eee
		}
	}
</style>
