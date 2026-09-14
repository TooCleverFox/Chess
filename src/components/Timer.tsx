import type { Player } from "../models/Player.ts";
import { useEffect, useRef, useState } from "react";
import { Colors } from "../models/Colors.ts";

const INITIAL_TIME = 300;

type TimerProps = {
	currentPlayer: Player | null;
	restart: () => void;
	gameOver: boolean;
	onTimeExpired: (winner: Colors) => void;
};

export const Timer = ({
	currentPlayer,
	restart,
	gameOver,
	onTimeExpired,
}: TimerProps) => {
	const [blackTime, setBlackTime] = useState(INITIAL_TIME);
	const [whiteTime, setWhiteTime] = useState(INITIAL_TIME);
	const [isPaused, setIsPaused] = useState(false);
	const timer = useRef<null | ReturnType<typeof setInterval>>(null);

	useEffect(() => {
		if (blackTime === 0 && !gameOver) {
			onTimeExpired(Colors.WHITE);
		}
	}, [blackTime, gameOver, onTimeExpired]);

	useEffect(() => {
		if (whiteTime === 0 && !gameOver) {
			onTimeExpired(Colors.BLACK);
		}
	}, [whiteTime, gameOver, onTimeExpired]);

	useEffect(() => {
		if (isPaused || !currentPlayer || gameOver) {
			if (timer.current) {
				clearInterval(timer.current);
				timer.current = null;
			}
			return;
		}

		if (timer.current) {
			clearInterval(timer.current);
		}

		const callback =
			currentPlayer.color === Colors.WHITE
				? () => setWhiteTime((prev) => Math.max(prev - 1, 0))
				: () => setBlackTime((prev) => Math.max(prev - 1, 0));

		timer.current = setInterval(callback, 1000);

		return () => {
			if (timer.current) {
				clearInterval(timer.current);
				timer.current = null;
			}
		};
	}, [currentPlayer, isPaused, gameOver]);

	function handleRestart() {
		setBlackTime(INITIAL_TIME);
		setWhiteTime(INITIAL_TIME);
		setIsPaused(false);
		restart();
	}

	function togglePause() {
		setIsPaused((prev) => !prev);
	}

	return (
		<div>
			<div>
				<button className="timer" type="button" onClick={handleRestart}>
					Restart game
				</button>
			</div>
			<h2>Black — {blackTime}</h2>
			<h2>White — {whiteTime}</h2>
			<div>
				<button className="timer" type="button" onClick={togglePause}>
					{isPaused ? "Continue" : "Pause"}
				</button>
			</div>
		</div>
	);
};
