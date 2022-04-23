export interface User {
	username: string;
	password: string;

	id?: string;
	name?: string;
	createdAt?: string;

	roles?: string[];
}