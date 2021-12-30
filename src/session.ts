import { ENV } from "$lib/env";

export interface User {
	username: string;
	password: string;
	name?: string;
	roles?: string[];
}

export function DoLogin(username: string, password: string): Promise<Response> {
	return fetch(`${ENV.api}/users/login`, {
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

export function DoRegister(user: User): Promise<Response> {
	return fetch(`${ENV.api}/users/signup`, {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	})
}
