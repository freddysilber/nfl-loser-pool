<script lang="ts">
	import { Writable, writable } from 'svelte/store';
	import type { AxiosResponse } from 'axios';
	import { getStores } from '$app/stores';
	import { goto } from '$app/navigation';

	import Alert from 'spaper/components/Alert.svelte';
	import Input from 'spaper/components/Form/Input.svelte';

	import { setSession, signup, login } from '../../session';
	import type { User } from '../../models/user.model';
	import Spinner from '$lib/spinner/Spinner.svelte';

	const { session } = getStores();

	export let isSignUp: boolean = true;

	let user: Writable<User>;
	let formLabel: string;
	let showLoginError: boolean = false;
	let confirmPassword: string;
	let loading: boolean = false;

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
				goto('/game');
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

<div class="form-container">
	{#if loading}
		<Spinner />
	{/if}

	{#if showLoginError}
		<Alert type="danger" dismissible>
			<span
				>Login Failed. Please Make sure your username and password is
				correct! Or <a href="/sign-up">sign up</a> instead</span
			>
		</Alert>
	{/if}

	<form on:submit|preventDefault={handleAuth} method="post">
		<!-- SIGNUP -->
		{#if isSignUp}
			<!-- First Name -->
			<div class="form-group">
				<Input
					placeholder="Name"
					label="Name"
					type="text"
					bind:value={$user.name}
					block
					required
				/>
			</div>
			<!-- Username -->
			<div class="form-group">
				<Input
					placeholder="Choose a username"
					label="Username"
					type="text"
					autocomplete="username"
					bind:value={$user.username}
					block
					required
				/>
			</div>
			<!-- Password -->
			<div class="form-group">
				<Input
					placeholder="Password"
					label="Password"
					type="password"
					autocomplete="current-password"
					bind:value={$user.password}
					block
					required
				/>
			</div>
			<!-- Confirm Password -->
			<div class="form-group">
				<Input
					placeholder="Confirm Password"
					label="Confirm Password"
					type="password"
					autocomplete="current-password"
					bind:value={confirmPassword}
					block
					required
				/>
			</div>
			<!-- LOGIN -->
		{:else}
			<!-- Username -->
			<div class="form-group">
				<Input
					placeholder="Username"
					label="Username"
					type="text"
					autocomplete="username"
					bind:value={$user.username}
					block
					required
				/>
			</div>
			<!-- Password -->
			<div class="form-group">
				<Input
					placeholder="Password"
					label="Password"
					type="password"
					autocomplete="current-password"
					bind:value={$user.password}
					block
					required
				/>
			</div>
		{/if}
		<button type="submit" class="btn-success-outline margin-top-small"
			>{formLabel}</button
		>
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
