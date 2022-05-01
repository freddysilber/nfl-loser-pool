<!-- 
	If players skip a week, they should not be on this board
	When player chooses a pick from the left, the then card on the right should update
	Player card (right) should be clickable and take you to you 'season' board of all the weeks all season long
	Game 'grid' on the right kinda acts like a leader board when we order it by winner (then by name)
 -->
<script lang="ts">
	import WeekPicker from '$lib/week-picker/WeekPicker.svelte';
	import CreatePickModal from '$lib/create-pick/CreatePickModal.svelte';
	import teams from '$lib/data/nfl-teams.json';
	import { mdiThumbDown } from '@mdi/js';
	import type { User } from 'src/models/user.model';
	import type { Pick } from 'src/models/pick.model';
	import { Icon, Button } from 'svelte-materialify';

	export let playerMap: Map<User, number[]>;
	export let selectedGameId: string;
	let showCreateModal: boolean = false;

	const teamOptions = teams.map((team) => ({
		name: team.displayName,
		value: team.displayName,
		logo: team.logos[0].href,
		id: team.id,
	}));
	let value;

	function handleCreatePick(team): void {
		console.log({ team });
		showCreateModal = true;
	}

	function handleSuccess(event): void {
		console.log('here ', event, selectedGameId);
		const pick: Pick = event.detail.pick;
		pick.gameId = selectedGameId;
		console.log('pick ', pick);
	}

	function selectTeam(event: CustomEvent<any>) {
		console.log(event, value);
	}
</script>

<CreatePickModal bind:showCreateModal on:submit={handleSuccess} />

<div class="d-flex" style="height: 100%;">
	<!-- <div style="width: 20rem; height: 20rem;">
		<h1 class="white-text">Get your picks in!</h1>
		{#each teamOptions as team}
			<div
				style="display: flex; justify-content: space-between; align-items: center;"
			>
				<img style="height: 50px;" src={team.logo} alt="placeholder" />
				<span class="white-text">{team.name}</span>
				<Button
					icon
					class="pink-text"
					on:click={() => handleCreatePick(team)}
				>
					<Icon path={mdiThumbDown} />
				</Button>
			</div>
		{/each}
	</div> -->

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
							<p>Select Pick</p>
							<!-- <WeekPicker
								{week}
								{player}
								teamOptions={teams.map((team) => {
									return {
										// logo: team.logos[0].href,
										name: team.displayName,
										value: team.id,
									};
								})}
								on:selectTeam={selectTeam}
							/> -->
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;

		.player {
			width: 25%;
			height: 150px;
			color: black;
			background-color: aquamarine;
			border: 1px solid black;
			cursor: pointer;
		}
	}
</style>
