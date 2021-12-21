<script lang="ts">
	import { writable } from "svelte/store";
	import { ENV } from "$lib/env";
	import axios, { AxiosResponse } from "axios";

	export let mode: "login" | "signup" = "signup";

	let user;
	let formLabel: string;
	let showLoginError: boolean = false;

	if (mode === "signup") {
		user = writable({
			firstName: "",
			lastName: "",
			username: "",
			// email: "",
			password: "",
			confirmPassword: "",
		});
		formLabel = "Sign Up!";
	} else if (mode === "login") {
		user = writable({
			username: "",
			password: "",
		});
		formLabel = "Log In!";
	}

	function handleAuth(event: any) {
		console.log("Auth event!", event, $user);
		if (mode === "signup") {
			console.log("handle submit", event, $user);
			if ($user.password === $user.confirmPassword) {
				axios
					.post(`${ENV.api}/users/signup`, $user)
					.then((response) => {
						console.log(response);
					});
			} else {
				alert("Passwords must be the same");
			}
		} else if (mode === "login") {
			console.log({
				what: "loginUser",
				event,
				user: $user,
			});

			axios
				.post(`${ENV.api}/users/login`, $user)
				.then((response: AxiosResponse<unknown, any>) => {
					console.log("response from post login", response);
				})
				.catch((error: any) => {
					alert(`Oops! There's been an error, this shouldn't happen. Contact your favorite dev to fix this 🖤'`)
					showLoginError = true;
					throw new Error(error);
				});
		}
	}
</script>

<h1>auth!</h1>
<div class="form-container">
	<h1>{formLabel}</h1>
	{#if showLoginError}
		<p class="error">
			Login Failed. Please Make sure your username and password are
			correct!
		</p>
	{/if}
	<form on:submit|preventDefault={handleAuth} method="post">
		<!-- SIGNUP -->
		{#if mode === "signup"}
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
			<button type="submit">Sign Up!</button>
			<!-- LOGIN -->
		{:else}
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
		{/if}
	</form>
</div>

<style>
	p.error {
		/* TODO: Change this color */
		color: rgb(250, 104, 104);
	}

	div.form-container {
		width: 50%;
		align-self: center;
	}

	form {
		display: flex;
		flex-direction: column;
	}
</style>
