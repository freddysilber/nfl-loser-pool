import axios from 'axios';
import { ENV } from "$lib/env";

export interface User {
	username: string;
	password: string;
	name?: string;
	roles?: string[];
}

export function DoLogin(username: string, password: string) {
	return fetch('http://localhost:8000/api/v1/session', {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username,
			password
		})
	})
}

export function DoRegister(user: User) {

	return axios.post(
		`${ENV.api}/users/signup`,
		user
	);

	// return fetch('http://localhost:8000/register', {
	// 	method: 'POST',
	// 	mode: 'cors',
	// 	credentials: 'include',
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	},
	// 	body: JSON.stringify(user)
	// })
}
// export function DoRegister(user: User) {
// 	return fetch('http://localhost:8000/api/v1/register', {
// 		method: 'POST',
// 		mode: 'cors',
// 		credentials: 'include',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify(user)
// 	})
// }