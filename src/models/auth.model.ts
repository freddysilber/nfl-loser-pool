export interface AuthProfile {
	id: string;

	name: string;
	username: string;
	password: string;

	roles: string[];
}

export interface Auth {
	authenticated: boolean;
	profile: AuthProfile;
}