<script lang="ts">
	import { getStores } from '$app/stores';
	import ProfileDetails from '$lib/ProfileDetails.svelte';

	const { session } = getStores();
</script>

<svelte:head>
	<title>My Profile: {$session.profile.username}</title>
</svelte:head>

<ProfileDetails user={$session.profile}/>