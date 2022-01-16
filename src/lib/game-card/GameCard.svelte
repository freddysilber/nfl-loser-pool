<script lang="ts">
	import type { Game } from '../../models/game.model';

	export let game: Game;
</script>

<span class="star">&star;</span>
{#if game}
	<span>Name: {game.name}</span>
	<span>Description: {game.description}</span>
	<span>Share Id: {game.shareId}</span>
{/if}

<style lang="scss">
	span.star {
		color: pink;
	}
</style>
