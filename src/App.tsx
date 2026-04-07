import "./App.css";
import { BoardComponent } from "./components/BoardComponent.tsx";
import { useEffect, useState } from "react";
import { Board } from "./models/Board.ts";
import {Player} from "./models/Player.ts";
import {Colors} from "./models/Colors.ts";
import {LostFigures} from "./components/LostFigures.tsx";
import {Timer} from "./components/Timer.tsx";

const whitePlayer = new Player(Colors.WHITE)
const blackPlayer = new Player(Colors.BLACK)

const App = () => {
	const [board, setBoard] = useState(new Board());
	const [currentPlayer, setCurrentPlayer] = useState <Player | null>(null);

	useEffect(() => {
		restart();
		setCurrentPlayer(whitePlayer);
	}, []);

	function restart() {
		const newBoard = new Board();
		newBoard.initlCells();
		newBoard.addFigures()
		setBoard(newBoard);
	}

	function swapPlayer() {
		setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
	}

	return (
		<div className="app">
			<div className="appTimer">
				<Timer
					restart={restart}
					currentPlayer={currentPlayer}
				/>
			</div>
			<BoardComponent
				board={board}
				setBoard={setBoard}
				currentPlayer={currentPlayer}
				swapPlayer={swapPlayer}
			/>
			<div>
				<LostFigures
				title="Black figures"
				figures={board.lostBlackFigures}
				/>
				<LostFigures
				title="White figures"
				figures={board.lostWhiteFigures}
				/>
			</div>
		</div>
	);
};

export default App;
