<script lang="ts">
	import { ENV } from "$lib/env";
	import axios, { AxiosResponse } from "axios";
	import { writable } from "svelte/store";

	let showLoginError: boolean = false;

	export const user = writable({
		username: "",
		password: "",
	});

	function loginUser(event: any) {
		console.log({
			what: 'loginUser',
			event,
			user: $user,
		});

		axios.post(`${ENV.api}/users/login`, $user).then((response: AxiosResponse<unknown, any>) => {
			console.log('response from post login', response);
		}).catch((error: any) => {
			showLoginError = true;
		});
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="form-container">
	{#if showLoginError}
		<p style="color: red;">Login Failed. Please Make sure your username and password are correct!</p>
	{/if}

	<h1>Login</h1>
	<form on:submit|preventDefault={loginUser} method="post">
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
