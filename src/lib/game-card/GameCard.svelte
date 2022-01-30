<script lang="ts">
	import type { Game } from '../../models/game.model';

	export let game: Game;
</script>

{#if game}
	<div class="game-card">
		<p><span class="label">Name: </span>{game.name}</p>
		<p><span class="label">Description: </span>{game.description}</p>
		<p><span class="label">Share Id: </span>{game.shareId}</p>
	</div>
{/if}

<style lang="scss">
	div.game-card {
		border: 1px solid black;
		border-radius: 5px;
		p {
			margin: 0;
		}
		span.label {
			color: #eee
		}
	}
</style>
