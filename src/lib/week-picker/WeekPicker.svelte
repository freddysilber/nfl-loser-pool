<script lang="ts">
	export let week: number;

	const label: string = 'Pick';

	function openSelectUserModal() {
		console.log('select', week)
	}
</script>

<button on:click={openSelectUserModal}>{label} ▼</button>

<!-- <span>{week}</span> -->

<!-- <input type="text"> -->

<style>
	button {
		min-width: max-content;
	}
</style>