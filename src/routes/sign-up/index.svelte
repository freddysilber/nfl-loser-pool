<script>
import { ENV } from "$lib/env";

import axios from "axios";

	import { writable } from "svelte/store";

	export const user = writable({
		username: "Tiago Vilas Boas",
		// password: "",
	});

	function handleSubmit(event) {
		console.log("handle submit", event, $user);
		axios.post(`${ENV.api}/users`, $user).then(response =>{
			console.log(response)
		})
	}
</script>

<svelte:head>
	<title>Sign Up</title>
</svelte:head>

<div class="form-container">
	<h1>Sign Up</h1>
	<form on:submit|preventDefault={handleSubmit} method="post">
		<!-- Username -->
		<label for="username">Username</label>
		<input id="username" type="text" autocomplete="username" bind:value={$user.username} />
		<!-- Password -->
		<!-- <label for="password">Password</label>
		<input id="password" type="password" autocomplete="current-password" bind:value={$user.password} /> -->
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

	input,
	button {
		margin-bottom: 1rem;
		border-radius: 5px;
		padding: 0.25rem;
	}
</style>
