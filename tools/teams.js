/**
 * Gets all the NFL team data and dumps the list of teams into the 'nfl-teams.json' file.
 * In case these endpoints change or stop working, we can have a backup of the teams.
 */
import fs from 'fs';
import fetch from 'node-fetch';
import colors from 'colors';
/**
 * This is a pretty sketch api... we'll probebly find something new to use...
 * https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/teams?limit=32
 * http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/21?lang=en&region=us%27,
 */
const TEAMS_ROOT = `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/teams?limit=32`;
const TEAM_REF = `$ref`;
const DASHES = `-------------------------`;

// Start the script
(function start() {
	console.log(colors.america(`${DASHES} LETS GOO000000000OoOOoooOoOOO ${DASHES}`));
	console.log(`${DASHES} LETS GET SOME TEAMS!!! 🏈 ${DASHES}\n`);
	console.log(colors.green(`${DASHES} Fetching data ${DASHES}\n`));
})();

const teams = await fetch(TEAMS_ROOT);
const teamList = await teams.json();
// Map each team enpoint to a fetch promise
await Promise.all(teamList.items.map((team) => {
	return fetch(team[TEAM_REF])
}))
	.then((responses) => Promise.all(responses.map((teamRes) => {
		// Parse each team to json
		return teamRes.json();
	})))
	.then((teams) => {
		// Populate file with data
		fs.writeFile(
			'./src/lib/data/nfl-teams.json',
			JSON.stringify(teams),
			(error) => {
				if (error) {
					console.error(colors.red(error));
					return
				}
			}
		)
	});

// End the script
(function end() {
	console.log(colors.blue(`${DASHES} Thanks for collecting some NFL data!! ${DASHES}`));
	console.log(`${DASHES} We'll throw this in a file, check 'src/lib/data/nfl-teams.json' for results ... ${DASHES}`);
})();