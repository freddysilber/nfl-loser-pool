export interface User {
	username: string;
	password: string;

	id?: number;
	name?: string;
	createdAt?: string;

	roles?: string[];
}