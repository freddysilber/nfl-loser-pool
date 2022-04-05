<script lang="ts">
	export let cash: number;
	export let prizeType: string;
</script>

<h4>Prize: ${cash} {prizeType}<slot />!</h4>
