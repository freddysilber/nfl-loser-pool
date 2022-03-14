<script lang="ts">
	import { Writable, writable } from 'svelte/store';
	import { getStores } from '$app/stores';
	import { goto } from '$app/navigation';
	// Components
	import Spinner from '$lib/spinner/Spinner.svelte';
	// Types
	import type { AxiosResponse } from 'axios';
	import type { User } from '../../models/user.model';
	// BS => 🐂💩
	import { setSession, signup, login } from '../../session';
	import { Routes } from '../../tsbs/router-helper';
	// Material UI
	import { TextField, Button } from 'svelte-materialify';
	//   import { mdiEyeOff, mdiEye } from '@mdi/js';

	const { session } = getStores();

	export let isSignUp = true; // Default to a sign up form

	let user: Writable<User>; // User info that we will use to either auth for login or create a new user
	let confirmPassword: string; // Need this at the moment to make sure the NEW user enters the same password twice
	let showLoginError = false;
	let loading = false;

	const userDetails: User = {
		username: '',
		password: '',
	};

	if (isSignUp) {
		userDetails['name'] = '';
		userDetails['roles'] = [''];
	} else {
		// Todo: remove these
		userDetails.username = 'mrsir';
		userDetails.password = 'password';
	}

	user = writable(userDetails);

	function handleAuth(): void {
		loading = true;
		let response: Promise<AxiosResponse>;

		if (isSignUp && validUser()) {
			response = signup($user);
		} else {
			response = login($user);
		}

		response
			.then((response) => {
				setSession(response, session);
				goto(Routes.Game);
			})
			.catch((error) => {
				console.error(error);
				showLoginError = true;
			})
			.finally(() => {
				loading = false;
			});
	}

	function validUser(): boolean {
		if ($user.password !== confirmPassword) {
			alert('Passwords must be the same');
			return false;
		}
		return true;
	}
</script>

{#if loading}
	<Spinner />
{/if}

<div class="form-container">
	{#if showLoginError}
		<span>
			Login Failed. Please Make sure your username and password is
			correct! Or <a href="/sign-up">sign up</a> instead
		</span>
	{/if}

	<form on:submit|preventDefault={handleAuth} method="post">
		<!-- SIGNUP -->
		{#if isSignUp}
			<!-- First Name -->
			<TextField
				dense
				required
				placeholder="Name"
				bind:value={$user.name}
				type="text"
				class="mb-4"
			>
				Name
			</TextField>
			<!-- Username -->
			<TextField
				dense
				required
				placeholder="Username"
				bind:value={$user.username}
				type="text"
				class="mb-4"
			>
				Username
			</TextField>
			<!-- Password -->
			<TextField
				type="password"
				bind:value={$user.password}
				required
				placeholder="Password"
				class="mb-4"
			>
				Password
			</TextField>
			<!-- Confirm Password -->
			<TextField
				type="password"
				bind:value={confirmPassword}
				required
				placeholder="Confirm Password"
				class="mb-4"
			>
				Confirm Password
			</TextField>
			<!-- LOGIN -->
		{:else}
			<!-- Username -->
			<TextField
				dense
				required
				placeholder="Username"
				bind:value={$user.username}
				type="text"
				class="mb-4"
			>
				Username
			</TextField>
			<!-- Password (class="mb-4" = margin bottom <size>)-->
			<TextField
				type="password"
				bind:value={$user.password}
				required
				placeholder="Password"
				class="mb-4"
			>
				Password
			</TextField>
		{/if}
		<!-- Submit -->
		<Button type="submit" class="green">{isSignUp ? 'Sign Up!' : 'Log In!'}</Button>
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
