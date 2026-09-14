import { Board } from "../models/Board.ts";
import type { SavedMove } from "../models/SavedMove.ts";

export type { SavedMove } from "../models/SavedMove.ts";

const STORAGE_KEY = "chess-saved-moves";

export function saveMoves(moves: SavedMove[]): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(moves));
}

export function loadMoves(): SavedMove[] | null {
	const raw = localStorage.getItem(STORAGE_KEY);
	if (!raw) return null;

	try {
		const moves = JSON.parse(raw) as SavedMove[];
		return Array.isArray(moves) ? moves : null;
	} catch {
		return null;
	}
}

export function clearSavedGame(): void {
	localStorage.removeItem(STORAGE_KEY);
}

export function createInitialBoard(): Board {
	const board = new Board();
	board.initCells();
	board.addFigures();
	return board;
}

export function replayMoves(moves: SavedMove[]): Board {
	const board = createInitialBoard();
	for (const move of moves) {
		board.applyMove(move);
	}
	return board;
}
