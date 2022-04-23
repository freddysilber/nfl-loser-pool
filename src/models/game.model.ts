export interface Game {
	ownerId: string;

	name: string;
	description: string;

	id?: string;

	created_at?: string;
	shareId?: string;
}

export type Games = Game[];
