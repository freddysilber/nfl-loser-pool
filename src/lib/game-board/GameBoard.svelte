<!-- 
	If players skip a week, they should not be on this board
	When player chooses a pick from the left, the then card on the right should update
	Player card (right) should be clickable and take you to you 'season' board of all the weeks all season long
	Game 'grid' on the right kinda acts like a leader board when we order it by winner (then by name)
 -->
<script lang="ts">
	import CreatePickModal from '$lib/create-pick/CreatePickModal.svelte';
	import teams from '$lib/data/nfl-teams.json';
	import type { User } from 'src/models/user.model';
	import type { Pick } from 'src/models/pick.model';
	import { Icon, Button } from 'svelte-materialify';
	import { mdiPlusCircleOutline, mdiPencilCircleOutline } from '@mdi/js';

	export let playerMap: Map<User, Pick[]>;
	export let selectedGameId: string;
	let showCreateModal: boolean = false;

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

<div class="d-flex" style="height: 100%;">
	<div class="d-flex flex-column" style="width: 100%; overflow: auto;">
		<div class="d-flex" style="border-bottom: 1px solid white;">
			<div
				style="min-width: 10rem; position: sticky; left: 0; background: black;"
			/>
			{#each [...Array(19).keys()] as week}
				<div class="white-text" style="min-width: 20rem;">
					Week {week + 1}
				</div>
			{/each}
		</div>

		{#each [...playerMap] as [player, weeks]}
			<div class="d-flex">
				<span
					class="white-text"
					style="min-width: 10rem; position: sticky; left: 0; background: black; z-index: 9;"
					>{player.name}</span
				>
				<div class="d-flex">
					{#each weeks as week}
						<div class="white-text" style="min-width: 20rem;">
							{#if week !== null}
								{teams.find((team) => team.id === week.teamId).name}
								<Button icon class="yellow-text">
									<Icon path={mdiPencilCircleOutline} />
								</Button>
							{:else}
								<span>
									<Button
										icon
										class="pink-text"
										on:click={handleModPick}
									>
										<Icon path={mdiPlusCircleOutline} />
									</Button>
								</span>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
</style>
