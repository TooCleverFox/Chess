import type { FC } from "react";
import type { GameEndState } from "../models/GameEnd.ts";

interface GameOverScreenProps {
	gameEnd: GameEndState;
	onRestart: () => void;
}

export const GameOverScreen: FC<GameOverScreenProps> = ({ gameEnd, onRestart }) => {
	const winner = gameEnd.winner ? `${gameEnd.winner} wins` : "Draw";
	const reason =
		gameEnd.reason === "checkmate"
			? "Checkmate"
			: gameEnd.reason === "stalemate"
				? "Stalemate"
				: "Time expired";

	return (
		<div className="game-over-overlay">
			<div className="game-over-modal">
				<h2>{winner}</h2>
				<p className="game-over-message">{reason}</p>
				<button className="timer" type="button" onClick={onRestart}>
					New game
				</button>
			</div>
		</div>
	);
};
