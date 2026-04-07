import type { Board } from "../models/Board.ts";
import {type FC, useEffect, useState} from "react";
import { CellComponent } from "./CellComponent.tsx";
import React from "react";
import type {Cell} from "../models/Cell.ts";
import type {Player} from "../models/Player.ts";

interface BoardCProps {
	board: Board;
	setBoard: (board: Board) => void;
	currentPlayer: Player| null;
	swapPlayer: ()=>void;

}
export const BoardComponent: FC<BoardCProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

	function click (cell: Cell){
		if(selectedCell && selectedCell != cell && selectedCell.figure?.canMove(cell)){
			selectedCell.moveFigure(cell);
			swapPlayer()
			setSelectedCell(null);

		} else {
			if(cell.figure?.color === currentPlayer?.color)
			setSelectedCell(cell);
		}
	}

	useEffect(() => { hightLightCells()
	}, [selectedCell]);

	function hightLightCells(){
		board.hightlightCells(selectedCell);
		updateBoard()
	}

	function updateBoard(){
		const newBoard = board.getCopyBoard()
		setBoard(newBoard)
	}

	return (
		<div>
			<h3> Current player {currentPlayer?.color}</h3>
		<div className="board">
			{board.cells.map((row, index) => (
				<React.Fragment key={index}>
					{row.map(cell =>
						<CellComponent
							click={click}
							cell={cell}
							key={cell.id}
							selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}/>
					)}
				</React.Fragment>
			))}
		</div>
		</div>
	);
};
