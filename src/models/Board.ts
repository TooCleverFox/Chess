import {Cell} from "./Cell.ts";
import {Colors} from "./Colors.ts";
import {Pawn} from "./figures/Pawn.ts";
import {King} from "./figures/King.ts";
import {Queen} from "./figures/Queen.ts";
import {Bishop} from "./figures/Bishop.ts";
import {Knight} from "./figures/Knight.ts";
import {Rook} from "./figures/Rook.ts";
import type {Figure} from "./figures/Figure.ts";
import {FigureNames, type FigureName} from "./figures/Figure.ts";
import type { SavedMove } from "./SavedMove.ts";

export class Board {
	cells: Cell[][] = [];
	lostBlackFigures: Figure[] = [];
	lostWhiteFigures: Figure[] = [];

	public initCells() {
		for (let i = 0; i < 8; i++) {
			const row: Cell[] = [];
			for (let j = 0; j < 8; j++) {
				if ((i + j) % 2 !== 0) {
					row.push(new Cell(this, j, i, Colors.BLACK, null));
				} else {
					row.push(new Cell(this, j, i, Colors.WHITE, null));
				}
			}
			this.cells.push(row);
		}
	}

	public getCopyBoard(): Board {
		const newBoard = new Board();
		newBoard.cells = this.cells;
		newBoard.lostWhiteFigures = this.lostWhiteFigures;
		newBoard.lostBlackFigures = this.lostBlackFigures;
		return newBoard;
	}

	public highlightCells(selectedCell: Cell | null) {
		for (let i = 0; i < this.cells.length; i++) {
			const row = this.cells[i];
			for (let j = 0; j < row.length; j++) {
				const target = row[j];
				target.available = !!(selectedCell && this.isLegalMove(selectedCell, target));
			}
		}
	}

	public getKingCell(color: Colors): Cell | null {
		for (const row of this.cells) {
			for (const cell of row) {
				if (cell.figure?.name === FigureNames.KING && cell.figure.color === color) {
					return cell;
				}
			}
		}
		return null;
	}

	public isCellAttacked(cell: Cell, attackerColor: Colors): boolean {
		for (const row of this.cells) {
			for (const boardCell of row) {
				const figure = boardCell.figure;
				if (figure?.color === attackerColor && figure.canAttack(cell)) {
					return true;
				}
			}
		}
		return false;
	}

	public isInCheck(color: Colors): boolean {
		const kingCell = this.getKingCell(color);
		if (!kingCell) {
			return false;
		}
		const attackerColor = color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
		return this.isCellAttacked(kingCell, attackerColor);
	}

	public wouldLeaveKingInCheck(from: Cell, to: Cell): boolean {
		const figure = from.figure;
		if (!figure) {
			return true;
		}

		const captured = to.figure;

		from.figure = null;
		to.setFigure(figure);

		const inCheck = this.isInCheck(figure.color);

		to.figure = captured;
		if (captured) {
			captured.cell = to;
		}
		from.figure = figure;
		figure.cell = from;

		return inCheck;
	}

	public isLegalMove(from: Cell, to: Cell): boolean {
		if (!from.figure?.canMove(to)) {
			return false;
		}
		return !this.wouldLeaveKingInCheck(from, to);
	}

	public hasLegalMoves(color: Colors): boolean {
		for (const row of this.cells) {
			for (const from of row) {
				if (from.figure?.color !== color) {
					continue;
				}
				for (const targetRow of this.cells) {
					for (const to of targetRow) {
						if (this.isLegalMove(from, to)) {
							return true;
						}
					}
				}
			}
		}
		return false;
	}

	public isCheckmate(color: Colors): boolean {
		return this.isInCheck(color) && !this.hasLegalMoves(color);
	}

	public isStalemate(color: Colors): boolean {
		return !this.isInCheck(color) && !this.hasLegalMoves(color);
	}

	public getCell(x: number, y: number) {
		return this.cells[y][x];
	}
	private addPawns(){
		for(let i =0; i < 8; i++){
			new Pawn(Colors.BLACK, this.getCell(i, 1))
			new Pawn(Colors.WHITE, this.getCell(i, 6))
		}
	}
	private addKings(){
		new King(Colors.BLACK, this.getCell(4, 0))
		new King(Colors.WHITE, this.getCell(4,7))
	}
	private addQueens(){
		new Queen(Colors.BLACK, this.getCell(3, 0))
		new Queen(Colors.WHITE, this.getCell(3,7))
	}
	private addBishops(){
		new Bishop(Colors.BLACK, this.getCell(2, 0))
		new Bishop(Colors.WHITE, this.getCell(2,7))
		new Bishop(Colors.BLACK, this.getCell(5, 0))
		new Bishop(Colors.WHITE, this.getCell(5,7))
	}
	private addKnights(){
		new Knight(Colors.BLACK, this.getCell(1,0))
		new Knight(Colors.WHITE, this.getCell(1,7))
		new Knight(Colors.BLACK, this.getCell(6, 0))
		new Knight(Colors.WHITE, this.getCell(6,7))
	}
	private addRooks(){
		new Rook(Colors.BLACK, this.getCell(0, 0))
		new Rook(Colors.WHITE, this.getCell(0,7))
		new Rook(Colors.BLACK, this.getCell(7,0))
		new Rook(Colors.WHITE, this.getCell(7,7))
	}

	public addFigures() {
		this.addPawns()
		this.addKings()
		this.addKnights()
		this.addRooks()
		this.addQueens()
		this.addBishops()
	}

	public createFigure(
		name: FigureName,
		color: Colors,
		cell: Cell,
		options?: { isFirstStep?: boolean },
	): Figure {
		let figure: Figure;
		switch (name) {
			case FigureNames.PAWN: {
				const pawn = new Pawn(color, cell);
				if (options?.isFirstStep !== undefined) {
					pawn.isFirstStep = options.isFirstStep;
				}
				figure = pawn;
				break;
			}
			case FigureNames.KING:
				figure = new King(color, cell);
				break;
			case FigureNames.QUEEN:
				figure = new Queen(color, cell);
				break;
			case FigureNames.BISHOP:
				figure = new Bishop(color, cell);
				break;
			case FigureNames.KNIGHT:
				figure = new Knight(color, cell);
				break;
			case FigureNames.ROOK:
				figure = new Rook(color, cell);
				break;
			default:
				throw new Error(`Unknown figure: ${name}`);
		}
		return figure;
	}

	public addLostFigure(name: FigureName, color: Colors) {
		const cell = this.findEmptyCell();
		const figure = this.createFigure(name, color, cell);
		cell.figure = null;
		if (color === Colors.BLACK) {
			this.lostBlackFigures.push(figure);
		} else {
			this.lostWhiteFigures.push(figure);
		}
	}

	public applyMove(move: SavedMove) {
		const from = this.getCell(move.fromX, move.fromY);
		const to = this.getCell(move.toX, move.toY);
		from.moveFigure(to);
		if (move.promotion) {
			this.promotePawn(to, move.promotion);
		}
	}

	public promotePawn(cell: Cell, name: FigureName) {
		if (!cell.figure || cell.figure.name !== FigureNames.PAWN) {
			return;
		}
		const color = cell.figure.color;
		cell.figure = null;
		this.createFigure(name, color, cell);
	}

	private findEmptyCell(): Cell {
		for (const row of this.cells) {
			for (const cell of row) {
				if (cell.isEmpty()) {
					return cell;
				}
			}
		}
		throw new Error("No empty cell on board");
	}
}


export const createBoard = ()=>new Board()
