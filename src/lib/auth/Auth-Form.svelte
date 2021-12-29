<script lang="ts">
	import { Writable, writable } from 'svelte/store';
	import { ENV } from '$lib/env';
	import axios, { AxiosResponse } from 'axios';
	import { DoRegister, DoLogin, User } from '../../session';
	import { goto } from '$app/navigation';
	import { getStores } from '$app/stores';

	const { session } = getStores();

	// export let mode: 'login' | 'signup' = 'signup';
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
	} else if (!isSignUp) {
		user = writable({
			username: '',
			password: '',
		});
		formLabel = 'Log In!';
	}

	async function handleAuth() {
		if (isSignUp) {
			if ($user.password === confirmPassword) {
				const response = await DoRegister($user);
				processResponse(response);
			} else {
				alert('Passwords must be the same');
			}
		} else if (!isSignUp) {
			axios
				.post(`${ENV.api}/users/login`, $user)
				.then((response: AxiosResponse<unknown, any>) => {
					console.log('response from post login', response);
				})
				.catch((error: any) => {
					alert(
						`Oops! There's been an error, this shouldn't happen. Contact your favorite dev to fix this 🖤'`
					);
					showLoginError = true;
					throw new Error(error);
				});
		}
	}

	async function logout() {
		console.log('logging out');
		await axios.delete(`${ENV.api}/users/logout`);
		// Navigate back to home after user logs out
		goto('/');
	}

	function processResponse(response: AxiosResponse<any, any>) {
		console.log(response);

		if (response.statusText === 'OK') {
			session.update(() => {
				return {
					authenticated: !!response.data.id,
					profile: response.data,
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
		console.log($session)
	}
</script>

<h1>auth!</h1>
<button on:click={logout}>Logout</button>
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
</style>
