import { Figure, FigureNames } from "./Figure.ts";
import { Colors } from "../Colors.ts";
import type { Cell } from "../Cell.ts";
import blackLogo from "../../assets/black-queen.png";
import whiteLogo from "../../assets/white-queen.png";

export class Queen extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell, color === Colors.BLACK ? blackLogo : whiteLogo);
		this.name = FigureNames.QUEEN;
	}
	canMove(target: Cell): boolean {
		if(!super.canMove(target))
			return false;
		if (this.cell.isEmptyVertical(target))
			return true
		if (this.cell.isEmptyHorizontal(target))
			return true
		if (this.cell.isEmptyDiagonal(target))
			return true
		return false
	}

	canAttack(target: Cell): boolean {
		if (target.figure?.color === this.color) {
			return false;
		}
		return this.cell.isEmptyVertical(target)
			|| this.cell.isEmptyHorizontal(target)
			|| this.cell.isEmptyDiagonal(target);
	}
}
