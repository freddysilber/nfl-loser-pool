<script lang="ts">
	import { Writable, writable } from 'svelte/store';
	import type { AxiosResponse } from 'axios';
	import { getStores } from '$app/stores';
	import { goto } from '$app/navigation';

	import Spinner from '$lib/spinner/Spinner.svelte';

	import { setSession, signup, login } from '../../session';
	import type { User } from '../../models/user.model';
	import { Routes } from '../../tsbs/router-helper';

	const { session } = getStores();

	export let isSignUp = true;

	let user: Writable<User>;
	let formLabel: string;
	let confirmPassword: string;
	let showLoginError = false;
	let loading = false;

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
			<input
				placeholder="Name"
				label="Name"
				type="text"
				bind:value={$user.name}
				required
			/>
			<!-- Username -->
			<input
				placeholder="Choose a username"
				label="Username"
				type="text"
				autocomplete="username"
				bind:value={$user.username}
				required
			/>
			<!-- Password -->
			<input
				placeholder="Password"
				label="Password"
				type="password"
				autocomplete="current-password"
				bind:value={$user.password}
				required
			/>
			<!-- Confirm Password -->
			<input
				placeholder="Confirm Password"
				label="Confirm Password"
				type="password"
				autocomplete="current-password"
				bind:value={confirmPassword}
				required
			/>
			<!-- LOGIN -->
		{:else}
			<!-- Username -->
			<input
				placeholder="Username"
				label="Username"
				type="text"
				autocomplete="username"
				bind:value={$user.username}
				required
			/>
			<!-- Password -->
			<input
				placeholder="Password"
				label="Password"
				type="password"
				autocomplete="current-password"
				bind:value={$user.password}
				required
			/>
		{/if}
		<!-- Submit -->
		<button type="submit">{formLabel}</button>
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
