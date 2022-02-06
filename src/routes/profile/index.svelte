<script lang="ts">
	import { getStores } from '$app/stores';
	import type { User } from '../../models/user.model';

	const { session } = getStores();
	let user: User = $session.profile;
	console.log($session);
</script>

<svelte:head>
	<title>My Profile: {user.username}</title>
</svelte:head>

<div>
	<p>Profile</p>
	{#if user}
		<p>Id: {user.id}</p>
		<p>Name: {user.name}</p>
		<p>Username: {user.username}</p>
		<p>Account Created: {new Date(user.createdAt).toUTCString()}</p>
	{/if}
</div>
