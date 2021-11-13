<script>
	import { ENV } from "$lib/env";

	import axios from "axios";

	import { writable } from "svelte/store";

	export const user = writable({
		firstName: "",
		lastName: "",
		username: "",
		// email: "",
		password: "",
		confirmPassword: "",
	});

	function handleSubmit(event) {
		console.log("handle submit", event, $user);
		if ($user.password === $user.confirmPassword) {
			axios.post(`${ENV.api}/users`, $user).then((response) => {
				console.log(response);
			});
		} else {
			alert("Passwords must be the same");
		}
	}
</script>

<svelte:head>
	<title>Sign Up</title>
</svelte:head>

<div class="form-container">
	<h1>Sign Up</h1>
	<form on:submit|preventDefault={handleSubmit} method="post">
		<!-- First Name -->
		<label for="first-name">First Name</label>
		<input
			id="first-name"
			type="text"
			bind:value={$user.firstName}
			required
		/>
		<!-- Last Name -->
		<label for="last-name">Last Name</label>
		<input
			id="last-name"
			type="text"
			bind:value={$user.lastName}
			required
		/>
		<!-- Username -->
		<label for="username">Username</label>
		<input
			id="username"
			type="text"
			autocomplete="username"
			bind:value={$user.username}
			placeholder="Choose a username"
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
		<!-- Confirm Password -->
		<label for="confirm-password">Confirm Password</label>
		<input
			id="confirm-password"
			type="password"
			autocomplete="current-password"
			bind:value={$user.confirmPassword}
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
