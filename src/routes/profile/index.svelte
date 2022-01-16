<script lang="ts">
	import { getStores } from '$app/stores';
	import type { User } from 'src/models/user.model';

	const { session } = getStores();
	let user: User = $session.profile;
	console.log($session);
</script>

<div>
	<p>Profile</p>
	{#if user}
		<p>Name: {user.name}</p>
		<p>Account Created: {new Date(user.createdAt).toUTCString()}</p>
	{/if}
</div>

<style>
</style>
