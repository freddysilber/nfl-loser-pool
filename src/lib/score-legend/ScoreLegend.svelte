<script>
	import { Tooltip } from 'svelte-materialify';

	const legendItems = [
		{ class: 'zero', content: '0 Points - Guess was was incorrect or was a duplicate guess' },
		{ class: 'half', content: '1/2 Point - Guess resulted in a tie' },
		{ class: 'one', content: '1 Point - Guessed the losing team but the wrong point spread' },
		{ class: 'two', content: '2 Points - Guessed the losing team and point spread correctly!' },
	];
</script>

<div class="d-flex flex-column justify-center">
	<div class="d-flex">
		{#each legendItems as item}
		<Tooltip top>
			<div class="{item.class} legend-item"></div>
			<span slot="tip">{item.content}</span>
		</Tooltip>
		{/each}
	</div>
</div>

<style>
	.zero {
		background: red;
	}
	.half {
		background: lightskyblue;
	}
	.one {
		background: yellow;
	}
	.two {
		background: lightgreen;
	}
	.legend-item {
		height: 12.5px;
		width: 60px;
	}
</style>
