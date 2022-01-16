export interface Game {
	ownerId: number;

	name: string;
	description: string;

	id?: number;

	created_at?: string;
	shareId?: string;
}

export type Games = Game[];
