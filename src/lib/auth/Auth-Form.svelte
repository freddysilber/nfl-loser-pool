<script lang="ts">
	import { Writable, writable } from 'svelte/store';
	import { ENV } from '$lib/env';
	import axios from 'axios';
	import { DoRegister, DoLogin, User } from '../../session';
	import { goto } from '$app/navigation';
	import { getStores } from '$app/stores';

	const { session } = getStores();

	export let isSignUp: boolean = true;

	let user: Writable<User>;
	let formLabel: string;
	let showLoginError: boolean = false;
	let confirmPassword: string;

	if (isSignUp) {
		user = writable({
			username: '',
			password: '',
			name: '',
			roles: [''],
		});
		formLabel = 'Sign Up!';
	} else if (!isSignUp) { // Log in
		user = writable({
			// Todo: Remove these values to empty strings
			username: 'mrsir',
			password: 'password',
		});
		formLabel = 'Log In!';
	}

	async function handleAuth() {
		if (isSignUp) {
			if ($user.password === confirmPassword) {
				processResponse(await DoRegister($user));
			} else {
				alert('Passwords must be the same');
			}
		} else if (!isSignUp) {
			processResponse(await DoLogin($user.username, $user.password));
		}
	}

	async function logout() {
		await axios.delete(`${ENV.api}/session`, {
			withCredentials: true,
		});
		// Navigate back to home after user logs out
		goto('/');
	}

	async function processResponse(response: Response) {
		const user = await response.json();

		if (response.statusText === 'OK') {
			session.update(() => {
				return {
					authenticated: !!response,
					profile: user,
				};
			});
		} else {
			session.update(() => {
				return {
					authenticated: false,
					profile: null,
				};
			});
		}
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
