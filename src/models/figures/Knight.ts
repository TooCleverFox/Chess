import { Figure, FigureNames } from "./Figure.ts";
import { Colors } from "../Colors.ts";
import type { Cell } from "../Cell.ts";
import blackLogo from "../../assets/black-knight.png";
import whiteLogo from "../../assets/white-knight.png";

export class Knight extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell, color === Colors.BLACK ? blackLogo : whiteLogo);
		this.name = FigureNames.KNIGHT;
	}
	canMove(target: Cell): boolean {
		if(!super.canMove(target))
			return false;
		const dx = Math.abs(this.cell.x - target.x);
		const dy = Math.abs(this.cell.y - target.y);


		return (dx === 1 && dy === 2) || (dx ===2 && dy === 1)
	}

	canAttack(target: Cell): boolean {
		if (target.figure?.color === this.color) {
			return false;
		}
		const dx = Math.abs(this.cell.x - target.x);
		const dy = Math.abs(this.cell.y - target.y);
		return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
	}
}
