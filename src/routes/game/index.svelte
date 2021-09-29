<script lang="ts">
	import { fly } from 'svelte/transition';
	import axios from 'axios';
	import Prize from '$lib/prize/Prize.svelte';
	import ScoreLegend from '$lib/score-legend/ScoreLegend.svelte';
	import WeekPicker from '$lib/week-picker/WeekPicker.svelte';
	import GameBoard from '$lib/game-board/GameBoard.svelte';

	const WEEKS = 19;
	const GAME_YEAR = 4;

	const scheduleUrl =
		'https://www.google.com/search?q=nfl+schedule&rlz=1C1CHBF_enUS851US854&oq=nfl+schedule&aqs=chrome.0.69i59i131i433i512j0i131i433i512l4j0i433i512j0i131i433i512l2j0i433i512j0i131i433i512.2480j1j4&sourceid=chrome&ie=UTF-8#sie=lg;/g/11nym9rnk6;6;/m/059yj;mt;fp;1;;';
	const weeks = [...Array(WEEKS).keys()];
	const players = ['Freddy', 'Lydia', 'Jay', 'Carmen'];

	function selectTeam(event) {
		console.log(event);
	}

	function getUsers() {
		axios
			.get('http://localhost:8080/api/user')
			.then((r) => {
				console.log(r);
			})
			.catch((e) => {
				console.error(e);
			});
	}

	function newUser() {
		axios
			.post(
				'http://localhost:8080/api/newuser',
				JSON.stringify({
					name: 'gopher',
					age: 25,
					location: 'India'
				})
			)
			.then((r) => {
				console.log(r);
			})
			.catch((e) => {
				console.error(e);
			});
	}

	function getUser() {
		axios
			.get('http://localhost:8080/api/user/1')
			.then((user) => {
				console.log(user);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	function deleteUser() {
		axios
			.delete('http://localhost:8080/api/deleteuser/1')
			.then((user) => {
				console.log(user);
			})
			.catch((error) => {
				console.error(error);
			});
	}
</script>

<svelte:head>
	<title>NFL Looser Pool</title>
</svelte:head>

<div>
	<h1 in:fly={{ x: 1000, duration: 1000 }} out:fly={{ x: -1000, duration: 1000 }}>{GAME_YEAR}th Annual Cloud Coach NFL Looser Pool</h1>
	<div class="game-header">
		<button on:click={getUsers}>Get Users</button>
		<button on:click={getUser}>Get User</button>
		<button on:click={newUser}>New User</button>
		<button on:click={deleteUser}>Delete User</button>
		<h3 class="schedule-link"><a href={scheduleUrl} target="_blank">Schedule</a></h3>
		<!-- Should be able to use a spread operator to send props to the child components -->
		<!-- <Prize {...test} /> -->

		<Prize message="some random prop is being passed in!!!" cash={100} prizeType="Gift Card" />
		<ScoreLegend />
	</div>

	<GameBoard {weeks} {players}/>
	<table>
		<tr>
			<th />
			{#each weeks as week}
				<th>Week {week + 1}</th>
			{/each}
			<th>Points</th>
		</tr>

		{#each players as player}
			<tr>
				<td>{player}</td>
				{#each weeks as week}
					<td>
						<WeekPicker {week} {player} on:selectTeam={selectTeam} />
					</td>
				{/each}
				<td />
			</tr>
		{/each}
	</table>
</div>

<style>
	div.game-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.25rem;
	}

	table {
		border-collapse: collapse;
		width: 100%;
	}

	td,
	th {
		border: 1px solid #aaaaaa;
		text-align: left;
		padding: 8px;
	}

	.schedule-link {
		display: flex;
		flex-direction: column;
		align-self: center;
	}
</style>
