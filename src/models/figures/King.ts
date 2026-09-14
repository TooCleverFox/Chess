import { Figure, FigureNames } from "./Figure.ts";
import { Colors } from "../Colors.ts";
import type { Cell } from "../Cell.ts";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

export class King extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell, color === Colors.BLACK ? blackLogo : whiteLogo);
		this.name = FigureNames.KING;
	}
	canMove(target: Cell): boolean {
		if (!super.canMove(target))
			return false;

		const dx = Math.abs(target.x - this.cell.x);
		const dy = Math.abs(target.y - this.cell.y);

		if (dx <= 1 && dy <= 1) {
			return true;
		}

		return false;
	}

	canAttack(target: Cell): boolean {
		if (target.figure?.color === this.color) {
			return false;
		}
		const dx = Math.abs(target.x - this.cell.x);
		const dy = Math.abs(target.y - this.cell.y);
		return dx <= 1 && dy <= 1;
	}
}
