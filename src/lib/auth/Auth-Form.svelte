<script lang="ts">
	import { Writable, writable } from 'svelte/store';
	import { ENV } from '$lib/env';
	import axios, { AxiosResponse } from 'axios';
	import { User, setSession, signup, login } from '../../session';
	import { goto } from '$app/navigation';
	import { getStores } from '$app/stores';

	const { session } = getStores();

	export let isSignUp: boolean = true;

	let user: Writable<User>;
	let formLabel: string;
	let showLoginError: boolean = false;
	let confirmPassword: string;

	const userDetails = {
		username: '',
		password: ''
	};

	if (isSignUp) {
		userDetails['name'] = '';
		userDetails['roles']= [''];
		formLabel = 'Sign Up!';
	} else {
		// Todo: remove these
		userDetails.username = 'mrsir';
		userDetails.password = 'password';
		formLabel = 'Log In!';
	}

	user = writable(userDetails);

	async function handleAuth() {
		let response: AxiosResponse;
		if (isSignUp && validUser()) {
			response = await signup($user);
		} else {
			response = await login($user);
		}
		setSession(response, session);
	}

	async function logout() {
		await axios.delete(`${ENV.api}/session`, {
			withCredentials: true,
		});
		// Navigate back to home after user logs out
		goto('/');
	}

	function validUser(): boolean {
		if ($user.password !== confirmPassword) {
			alert('Passwords must be the same');
			return false;
		}
		return true;
	}
</script>

<div class="form-container">
	{#if $session.authenticated}
		<button class="logout" on:click={logout}>Logout</button>
	{/if}

	<label>
		<input bind:checked={isSignUp} label="isSignUp" type="checkbox" />
		{isSignUp ? 'Sign Up' : 'Log In'}
	</label>

	<h1>{formLabel}</h1>
	{#if showLoginError}
		<p class="error">
			Login Failed. Please Make sure your username and password are
			correct!
		</p>
	{/if}

	<form on:submit|preventDefault={handleAuth} method="post">
		<!-- SIGNUP -->
		{#if isSignUp}
			<!-- First Name -->
			<label for="name">Name</label>
			<input id="name" type="text" bind:value={$user.name} required />
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
				bind:value={confirmPassword}
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

	button.logout {
		width: 100%;
		background: rgb(255, 94, 121);
		border-radius: 8px;
		border: 1px solid rgb(94, 94, 94);
	}
</style>
