<script lang="ts">
	import axios from 'axios';
	// ENV
	import { ENV } from '$lib/env';
	// Svelte
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getStores } from '$app/stores';

	import { setSession } from '../../session';
	import { Routes, RouterHelper } from '../../tsbs/router-helper';
	// Types
	import type { NavTab } from '../../models/nav-tab.model';
	// UI
	import {
		Button,
		Menu,
		List,
		ListItem,
		Icon,
		Dialog,
	} from 'svelte-materialify';
	// Icons
	import { mdiMenu } from '@mdi/js';
	// Transitions
	import { scale } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';

	let navTabs: NavTab[] = [];
	let confirmLogout: boolean = false;

	const { session }: any = getStores(); // TODO type this better

	session.subscribe((session) => {
		navTabs = RouterHelper.routes(session.authenticated);
	});

	async function logout() {
		await axios.delete(`${ENV.api}/session`, {
			withCredentials: true,
		});

		setSession(null, session);

		goto(Routes.Home);

		confirmLogout = false;
	}

	function createGame(): void {
		console.log('create game');
	}

	function joinGame(): void {
		console.log('join game');
	}
</script>

<Dialog
	bind:active={confirmLogout}
	class="pa-6"
>
	<h1 class="white-text">Are you sure you want to logout??</h1>
	<div class="d-flex justify-space-between">
		<Button
			class="green"
			on:click={() => confirmLogout = false}
		>
			Take it easy
		</Button>
		
		<Button
			class="red"
			on:click={logout}
		>
			Yes, I'm done
		</Button>
	</div>
</Dialog>

<header>
	<div class="corner">
		{#if $session.profile}
			<h5 style="margin: .5rem 0 0 .5rem;">
				Hello, {$session.profile.name}
			</h5>
		{/if}
	</div>

	<nav>
		<ul>
			<!-- Not really relevant, but its good to have a reference... -->
			<!-- <li class:active={$page.path === "/todos"}><a sveltekit:prefetch href="/todos">Todos</a></li> -->
			<!-- <li class:active={$page.path === "/admin"}><a sveltekit:prefetch href="/admin">Admin</a></li> -->
			{#each navTabs as tab}
				<li class:active={$page.url.pathname === tab.path}>
					<a
						sveltekit:prefetch
						class="deep-orange-text"
						href={tab.path}
					>
						{tab.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="corner" style="justify-content: flex-end;">
		<Menu
			right
			transition={scale}
			inOpts={{ easing: elasticOut, duration: 500 }}
		>
			<div slot="activator">
				<Button icon class="orange">
					<Icon path={mdiMenu} />
				</Button>
			</div>
			<List>
				{#if $session.authenticated}
					<ListItem
						on:click={() => (confirmLogout = true)}
					>
						Logout
					</ListItem>
				{/if}
				<ListItem on:click={createGame}>Create Game</ListItem>
				<ListItem on:click={joinGame}>Join Game</ListItem>
			</List>
		</Menu>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid white;
	}

	.corner {
		width: 10em;
		height: 3em;
		display: flex;
	}

	nav {
		display: flex;
		justify-content: center;
		background: transparent;
		padding: 0;
	}
	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li::before {
		content: none;
	}
	li.active::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--accent-color);
	}

	li.active a {
		color: var(--accent-color);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 10%;
		text-decoration: none;
		transition: color 0.2s linear;
		border: none;
	}

	a:hover {
		color: var(--accent-color);
	}
</style>
