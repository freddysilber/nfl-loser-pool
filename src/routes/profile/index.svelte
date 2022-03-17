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
	<p class="white-text">Profile</p>
	{#if user}
		<p class="white-text">Id: {user.id}</p>
		<p class="white-text">Name: {user.name}</p>
		<p class="white-text">Username: {user.username}</p>
		<p class="white-text">Account Created: {new Date(user.createdAt).toLocaleDateString()}</p>
	{/if}
</div>
