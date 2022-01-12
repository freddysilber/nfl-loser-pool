<script lang="ts">
	import axios from 'axios';

	import { page } from '$app/stores';
	import { ENV } from '$lib/env';
	import { goto } from '$app/navigation';
	import { getStores } from '$app/stores';

	import Button from 'spaper/components/Button.svelte';

	import { setSession } from '../../session';
	import type { NavTabs } from '../../models/nav-tabs.model';
	import { Routes } from '../../tsbs/routes.enum';
	import { RouterHelper } from '../../tsbs/router-helper';

	let navTabs: NavTabs[] = [];

	const { session } = getStores();

	session.subscribe((session) => {
		navTabs = RouterHelper.getRoutes(session.authenticated);
	});

	async function logout() {
		await axios.delete(`${ENV.api}/session`, {
			withCredentials: true,
		});
		setSession(null, session);
		// Navigate back to home after user logs out
		goto(Routes.Login);
	}
</script>

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
				<li class:active={$page.path === tab.path}>
					<a sveltekit:prefetch href={tab.path}>{tab.label}</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="corner" style="justify-content: flex-end;">
		{#if $session.authenticated}
			<Button outline="warning" on:click={logout}>Logout</Button>
		{/if}
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
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
