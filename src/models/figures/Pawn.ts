import { Figure, FigureNames } from "./Figure.ts";
import { Colors } from "../Colors.ts";
import  { type Cell } from "../Cell.ts";
import blackLogo from "../../assets/black-pawn.png";
import whiteLogo from "../../assets/white-pawn.png";

export class Pawn extends Figure {

	isFirstStep: boolean = true;

	constructor(color: Colors, cell: Cell) {
		super(color, cell, color === Colors.BLACK ? blackLogo : whiteLogo);
		this.name = FigureNames.PAWN;
	}

	canMove(target: Cell): boolean {
		if (!super.canMove(target))
			return false;

		const direction = this.color === Colors.BLACK ? 1 : -1;

		if (target.y === this.cell.y + direction
			&& (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
			&& this.cell.isEnemy(target)) {
			return true;
		}

		if (target.x !== this.cell.x || !target.isEmpty()) {
			return false;
		}

		if (target.y === this.cell.y + direction) {
			return true;
		}

		if (this.isFirstStep && target.y === this.cell.y + direction * 2) {
			const middleY = this.cell.y + direction;
			return this.cell.board.getCell(this.cell.x, middleY).isEmpty();
		}

		return false;
	}

	canAttack(target: Cell): boolean {
		const direction = this.color === Colors.BLACK ? 1 : -1;
		return target.y === this.cell.y + direction
			&& Math.abs(target.x - this.cell.x) === 1;
	}
}
