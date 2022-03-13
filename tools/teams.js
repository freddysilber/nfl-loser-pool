import fs from 'fs';
import fetch from 'node-fetch';
import colors from 'colors';
/**
 * This is a pretty sketch api... we'll probebly find something new to use...
 * https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/teams?limit=32
 * http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/21?lang=en&region=us%27,
 */

/**
 * THIS IS PROBABLY AN UNSUSTAINBLE API
 * 
 * ...keep reading...
 * 
 * We need to find a better source than this...
 * ... or the dev can find some wack enpoint and cache, like I did
 */
const TEAMS_ROOT = `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/teams?limit=32`;
const DASHES = `-------------------------`;
const TEAM_REF = `$ref`;
// Start the script
start();

const teams = await fetch(TEAMS_ROOT);
const teamList = await teams.json();
await Promise.all(teamList.items.map((team) => {
	return team[TEAM_REF];
}).map((team) => {
	return fetch(team)
}))
	.then((responses) => Promise.all(responses.map((teamRes) => {
		return teamRes.json();
	})))
	.then((teams) => {
		fs.writeFile(
			'./src/lib/data/teams.json',
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
end();

function start() {
	console.log(colors.america(`${DASHES} LETS GOO000000000OoOOoooOoOOO`));
	console.log(`${DASHES} LETS GET SOME TEAMS!!! 🏈 \n`);
}

function end() {
	console.log(colors.blue('Thanks for collecting some NFL data!!'));
	console.log(`We'll throw this in a file...`);
}