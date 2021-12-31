<script lang="ts">
	import { Writable, writable } from 'svelte/store';
	import type { AxiosResponse } from 'axios';
	import { User, setSession, signup, login } from '../../session';
	import { getStores } from '$app/stores';
	import { goto } from '$app/navigation';

	const { session } = getStores();

	export let isSignUp: boolean = true;

	let user: Writable<User>;
	let formLabel: string;
	let showLoginError: boolean = false;
	let confirmPassword: string;

	const userDetails = {
		username: '',
		password: '',
	};

	if (isSignUp) {
		userDetails['name'] = '';
		userDetails['roles'] = [''];
		formLabel = 'Sign Up!';
	} else {
		// Todo: remove these
		userDetails.username = 'mrsir';
		userDetails.password = 'password';
		formLabel = 'Log In!';
	}

	user = writable(userDetails);

	function handleAuth() {
		let response: Promise<AxiosResponse>;
		if (isSignUp && validUser()) {
			response = signup($user);
		} else {
			response = login($user);
		}
		response.then((response)=> {
			setSession(response, session);
			goto('/game');
		}).catch((error)=>{
			console.error(error);
			showLoginError = true;
		})
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
	{#if showLoginError}
		<div class="alert alert-danger">
			Login Failed. Please Make sure your username and password are
			correct!
		</div>
		<!-- <p class="error">
			Login Failed. Please Make sure your username and password are
			correct!
		</p> -->
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
		{/if}
		<button type="submit" class="btn-success-outline">{formLabel}</button>
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
	}
</style>
