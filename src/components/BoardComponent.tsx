import type { Board } from "../models/Board.ts";
import { type FC, useEffect, useState } from "react";
import { CellComponent } from "./CellComponent.tsx";
import type { Cell } from "../models/Cell.ts";
import type { Player } from "../models/Player.ts";
import type { GameEndState } from "../models/GameEnd.ts";
import { Colors } from "../models/Colors.ts";
import { FigureNames, type FigureName } from "../models/figures/Figure.ts";
import { isPromotionSquare } from "../models/promotion.ts";
import { PromotionModal } from "./PromotionModal.tsx";
import type { SavedMove } from "../utils/gameStorage.ts";

interface BoardCProps {
	board: Board;
	setBoard: (board: Board) => void;
	currentPlayer: Player | null;
	swapPlayer: () => void;
	gameOver: boolean;
	onGameEnd: (gameEnd: GameEndState) => void;
	onMoveRecorded: (move: SavedMove) => void;
}

type PendingPromotion = {
	cell: Cell;
	movingColor: Colors;
	fromX: number;
	fromY: number;
};

export const BoardComponent: FC<BoardCProps> = ({
	board,
	setBoard,
	currentPlayer,
	swapPlayer,
	gameOver,
	onGameEnd,
	onMoveRecorded,
}) => {
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
	const [pendingPromotion, setPendingPromotion] = useState<PendingPromotion | null>(null);

	function updateBoard() {
		setBoard(board.getCopyBoard());
	}

	function finishTurn(movingColor: Colors) {
		const opponentColor = movingColor === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
		if (board.isCheckmate(opponentColor)) {
			onGameEnd({ winner: movingColor, reason: "checkmate" });
		} else if (board.isStalemate(opponentColor)) {
			onGameEnd({ winner: null, reason: "stalemate" });
		} else {
			swapPlayer();
		}
	}

	function click(cell: Cell) {
		if (gameOver || pendingPromotion) {
			return;
		}

		if (selectedCell && selectedCell !== cell && board.isLegalMove(selectedCell, cell)) {
			const movingColor = selectedCell.figure!.color;
			const promotes =
				selectedCell.figure!.name === FigureNames.PAWN &&
				isPromotionSquare(cell.y, movingColor);
			const move: SavedMove = {
				fromX: selectedCell.x,
				fromY: selectedCell.y,
				toX: cell.x,
				toY: cell.y,
			};

			selectedCell.moveFigure(cell);
			setSelectedCell(null);
			updateBoard();

			if (promotes) {
				setPendingPromotion({
					cell,
					movingColor,
					fromX: move.fromX,
					fromY: move.fromY,
				});
				return;
			}

			onMoveRecorded(move);
			finishTurn(movingColor);
			return;
		}

		if (cell.figure?.color === currentPlayer?.color) {
			setSelectedCell(cell);
		}
	}

	function handlePromotion(piece: FigureName) {
		if (!pendingPromotion) {
			return;
		}

		const { cell, movingColor, fromX, fromY } = pendingPromotion;
		board.promotePawn(cell, piece);
		onMoveRecorded({
			fromX,
			fromY,
			toX: cell.x,
			toY: cell.y,
			promotion: piece,
		});
		setPendingPromotion(null);
		updateBoard();
		finishTurn(movingColor);
	}

	useEffect(() => {
		board.highlightCells(selectedCell);
		updateBoard();
	}, [selectedCell]);

	const inCheck = !gameOver && currentPlayer && board.isInCheck(currentPlayer.color);

	return (
		<div>
			{pendingPromotion && (
				<PromotionModal
					color={pendingPromotion.movingColor}
					onSelect={handlePromotion}
				/>
			)}
			<h2>Current player: {currentPlayer?.color}</h2>
			<div className="check-warning">
			{inCheck && <p className="check-warning_text">Check!</p>}
			</div>
			<div className="board">
				{board.cells.map((row) =>
					row.map((cell) => (
						<CellComponent
							key={`${cell.x}-${cell.y}`}
							click={click}
							cell={cell}
							selected={
								cell.x === selectedCell?.x && cell.y === selectedCell?.y
							}
						/>
					)),
				)}
			</div>
		</div>
	);
};
