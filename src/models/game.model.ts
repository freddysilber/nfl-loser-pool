export interface Game {
	id?: number;
	created_at?: string;
	ownerId: number;
	name: string;
	description: string;
}

export type Games = Game[];
