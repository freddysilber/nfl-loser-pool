export interface Game {
	id: number;
	ownerId: number;
	name: string;
	description: string;
	created_at: string;
}

export type Games = Game[];
