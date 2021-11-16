<script lang="ts">
	import { page } from '$app/stores';
	import logo from './svelte-logo.svg';
</script>

<header>
	<!-- Top left corner logos -->
	<div class="corner">
		<a href="https://cloudcoach.com" target="_blank">
			<img src="https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_5daa66323ec035555304b5a66b252bfc/cloud-coach.png" alt="Cloud Coach" target="_blank" />
		</a>
		<!-- Could propably strip this one out at some point... -->
		<a href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav>
		<!-- ATM, not much knowledge with svgs so idk what this is doing... -->
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<!-- Not really relevant, but its good to have a reference... -->
			<li class:active={$page.path === '/'}><a sveltekit:prefetch href="/">Home</a></li>
			<li class:active={$page.path === '/about'}><a sveltekit:prefetch href="/about">About</a></li>
			<li class:active={$page.path === '/todos'}><a sveltekit:prefetch href="/todos">Todos</a></li>
			<li class:active={$page.path === '/admin'}><a sveltekit:prefetch href="/admin">Admin</a></li>
			<!-- This is the important stuff -->
			<li class:active={$page.path === '/login'}><a sveltekit:prefetch href="/login">Login</a></li>
			<li class:active={$page.path === '/sign-up'}><a sveltekit:prefetch href="/sign-up">Sign Up</a></li>
			<li class:active={$page.path === '/rules'}><a sveltekit:prefetch href="/rules">Rules</a></li>
			<li class:active={$page.path === '/game'}><a sveltekit:prefetch href="/game">Game</a></li>
		</ul>
		<!-- ATM, not much knowledge with svgs so idk what this is doing... -->
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner">
		<!-- TODO put something else here? github link? -->
		<!-- Lets put a watermark here or something for people to click on -->
		<a href="https://github.com/freddysilber" target="_blank">Freddy Silber</a>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
		display: flex;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
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
	}

	a:hover {
		color: var(--accent-color);
	}
</style>
