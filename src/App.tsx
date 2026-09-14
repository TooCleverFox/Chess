import "./App.css";
import { BoardComponent } from "./components/BoardComponent.tsx";
import { useCallback, useEffect, useState } from "react";
import { createBoard } from "./models/Board.ts";
import { Player } from "./models/Player.ts";
import { Colors } from "./models/Colors.ts";
import { LostFigures } from "./components/LostFigures.tsx";
import { Timer } from "./components/Timer.tsx";
import { GameOverScreen } from "./components/GameOverScreen.tsx";
import type { GameEndState } from "./models/GameEnd.ts";
import {
	clearSavedGame,
	createInitialBoard,
	loadMoves,
	replayMoves,
	saveMoves,
	type SavedMove,
} from "./utils/gameStorage.ts";

const whitePlayer = new Player(Colors.WHITE);
const blackPlayer = new Player(Colors.BLACK);

const App = () => {
	const [board, setBoard] = useState(createBoard);
	const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
	const [gameEnd, setGameEnd] = useState<GameEndState | null>(null);

	useEffect(() => {
		const savedMoves = loadMoves();
		if (savedMoves && savedMoves.length > 0) {
			setBoard(replayMoves(savedMoves));
			setCurrentPlayer(
				savedMoves.length % 2 === 0 ? whitePlayer : blackPlayer,
			);
		} else {
			startNewGame();
		}
	}, []);

	function startNewGame() {
		setBoard(createInitialBoard());
		setGameEnd(null);
		setCurrentPlayer(whitePlayer);
	}

	function restart() {
		clearSavedGame();
		startNewGame();
	}

	const handleTimeExpired = useCallback((winnerColor: Colors) => {
		setGameEnd({ winner: winnerColor, reason: "time" });
	}, []);

	function swapPlayer() {
		setCurrentPlayer((player) =>
			player?.color === Colors.WHITE ? blackPlayer : whitePlayer,
		);
	}

	const recordMove = useCallback((move: SavedMove) => {
		const savedMoves = loadMoves() ?? [];
		const nextMoves = [...savedMoves, move];
		saveMoves(nextMoves);
	}, []);

	return (
		<div className="app">
			{gameEnd && (
				<GameOverScreen gameEnd={gameEnd} onRestart={restart} />
			)}
			<div className="appTimer">
				<Timer
					restart={restart}
					currentPlayer={currentPlayer}
					gameOver={gameEnd !== null}
					onTimeExpired={handleTimeExpired}
				/>
			</div>
			<BoardComponent
				board={board}
				setBoard={setBoard}
				currentPlayer={currentPlayer}
				swapPlayer={swapPlayer}
				gameOver={gameEnd !== null}
				onGameEnd={setGameEnd}
				onMoveRecorded={recordMove}
			/>
			<div>
				<LostFigures
					title="Captured black pieces"
					figures={board.lostBlackFigures}
				/>
				<LostFigures
					title="Captured white pieces"
					figures={board.lostWhiteFigures}
				/>
			</div>
		</div>
	);
};

export default App;
