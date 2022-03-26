<script lang="ts">
	import type { User } from '../models/user.model';

	export let user: User;
</script>

<div>Manage your profile</div>
<p class="white-text">Id: {user.id}</p>
<p class="white-text">Name: {user.name}</p>
<p class="white-text">Username: {user.username}</p>
<p class="white-text">
	Account Created: {new Date(user.createdAt).toLocaleDateString()}
</p>
