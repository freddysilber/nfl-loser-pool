import { ENV } from "$lib/env";
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Writable } from "svelte/store";
import type { User } from './models/user.model';

export function login({ username, password }: User): Promise<AxiosResponse> {
	return axios.post(
		`${ENV.api}/users/login`,
		{
			username,
			password
		},
		{
			withCredentials: true,
		}
	);
}

export function signup(user: User): Promise<AxiosResponse> {
	return axios.post(
		`${ENV.api}/users/signup`,
		user,
		{
			withCredentials: true
		}
	);
}

export function setSession(response: AxiosResponse, session: Writable<Record<string, unknown>>) {
	const sessionDetails = {
		authenticated: false,
		profile: null,
	};
	if (response && response.statusText === 'OK' && response.status === 200) {
		// user profile is returned on success
		sessionDetails.authenticated = !!response.data;
		sessionDetails.profile = response.data;
	}
	session.update(() => sessionDetails);
}