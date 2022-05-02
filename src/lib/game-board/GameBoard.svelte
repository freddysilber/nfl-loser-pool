<!-- 
	If players skip a week, they should not be on this board
	When player chooses a pick from the left, the then card on the right should update
	Player card (right) should be clickable and take you to you 'season' board of all the weeks all season long
	Game 'grid' on the right kinda acts like a leader board when we order it by winner (then by name)
 -->
<script lang="ts">
	import { getStores } from '$app/stores';
	import CreatePickModal from '$lib/create-pick/CreatePickModal.svelte';
	import teams from '$lib/data/nfl-teams.json';
	import type { User } from 'src/models/user.model';
	import type { Pick } from 'src/models/pick.model';
	import { Icon, Button } from 'svelte-materialify';
	import { mdiPlusCircleOutline, mdiPencilCircleOutline } from '@mdi/js';

	export let playerMap: Map<User, Pick[]>;
	export let selectedGameId: string;

	let showCreateModal: boolean = false;

	const { session } = getStores();

	const teamOptions = teams.map((team) => ({
		name: team.displayName,
		value: team.displayName,
		logo: team.logos[0].href,
		id: team.id,
	}));

	function handleSuccess(event): void {
		console.log('here ', event, selectedGameId);
		const pick: Pick = event.detail.pick;
		pick.gameId = selectedGameId;
		console.log('pick ', pick);
	}

	// Calling this 'mod pick because we might want to do creates and edits from this'
	function handleModPick(): void {
		showCreateModal = true;
	}
</script>

<CreatePickModal bind:showCreateModal on:submit={handleSuccess} />

<div class="container d-flex flex-column">
	<div class="header d-flex">
		<div class="placeholder" />
		{#each [...Array(19).keys()] as week}
			<div class="weeks white-text">
				Week {week + 1}
			</div>
		{/each}
	</div>

	{#each [...playerMap] as [player, weeks]}
		<div class="d-flex">
			<span
				class="placeholder white-text"
				style="min-width: 10rem; position: sticky; left: 0; background: black; z-index: 9;"
				>{player.name}</span
			>
			<div class="d-flex">
				{#each weeks as week}
					<div class="white-text" style="min-width: 20rem;">
						{#if week && week.playerId === player.id}
							{teams.find((team) => team.id === week.teamId).name}
							<Button icon class="yellow-text">
								<Icon path={mdiPencilCircleOutline} />
							</Button>
						{:else if player.id === $session.profile.id}
							<p>You can edit this</p>
						{:else}
							<p class="cyan-text">readonly</p>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.container {
		height: 100%;

		.header {
			border-bottom: 1px solid white;

			.placeholder {
				min-width: 10rem;
				position: sticky;
				left: 0;
			}

			.weeks {
				min-width: 20rem;
			}
		}
	}
</style>
