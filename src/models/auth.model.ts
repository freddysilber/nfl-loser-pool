export interface AuthProfile {
	id: number;

	name: string;
	username: string;
	password: string;

	roles: string[];
}

export interface Auth {
	authenticated: boolean;
	profile: AuthProfile;
}