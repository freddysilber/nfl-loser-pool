<script>
	import { writable } from "svelte/store";

	export const user = writable({
		username: "",
		password: "",
	});

	function handleSubmit(event) {
		console.log("handle submit", event, $user);
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="form-container">
	<h1>Login</h1>
	<form on:submit|preventDefault={handleSubmit} method="post">
		<!-- Username -->
		<label for="username">Username</label>
		<input
			id="username"
			type="text"
			autocomplete="username"
			bind:value={$user.username}
			placeholder="Enter your username"
			required
		/>
		<!-- Password -->
		<label for="password">Password</label>
		<input
			id="password"
			type="password"
			autocomplete="current-password"
			bind:value={$user.password}
			required
		/>
		<!-- Submit -->
		<button type="submit">Login</button>
	</form>
</div>

<style>
	div.form-container {
		width: 50%;
		align-self: center;
	}

	form {
		display: flex;
		flex-direction: column;
	}
</style>
