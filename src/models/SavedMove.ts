import type { FigureName } from "./figures/Figure.ts";

export type SavedMove = {
	fromX: number;
	fromY: number;
	toX: number;
	toY: number;
	promotion?: FigureName;
};
