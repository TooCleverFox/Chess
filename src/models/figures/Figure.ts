import type { Colors } from "../Colors.ts";
import type { Cell } from "../Cell.ts";
import  logo from "*.png";

export const FigureNames = {
	FIGURE: "Figure",
	KING: "King",
	KNIGHT: "Knight",
	PAWN: "Pawn",
	QUEEN: "Queen",
	ROOK: "Rook",
	BISHOP: "Bishop",
} as const;

export type FigureName = (typeof FigureNames)[keyof typeof FigureNames];

export class Figure {
	color: Colors;
	logo: typeof logo | null;
	cell: Cell;
	name: FigureName;

	constructor(color: typeof this.color, cell: typeof this.cell, logo: typeof this.logo) {
		this.color = color;
		this.cell = cell;
		this.cell.figure = this;
		this.name = FigureNames.FIGURE;
		this.logo = logo
	}

	canMove(target: Cell): boolean {
		if(target.figure?.color === this.color)
			return false
		if(target.figure?.name === FigureNames.KING)
			return false;
		return true;
	}

	canAttack(target: Cell): boolean {
		if (target.figure?.color === this.color) {
			return false;
		}
		return false;
	}
}
