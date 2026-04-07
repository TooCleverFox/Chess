import type {Player} from "../models/Player.ts";
import { useEffect, useRef, useState} from "react";
import {Colors} from "../models/Colors.ts";


type TimerProps = {
    currentPlayer: Player | null;
    restart: () => void;
}

export const Timer = ({currentPlayer, restart}: TimerProps) => {
    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)
    const [isPaused, setIsPaused] = useState(false);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        if (isPaused || !currentPlayer) {
            if (timer.current) {
                clearInterval(timer.current);
                timer.current = null;
            }
            return;
        }
        startTimer();
        return () => {
            if (timer.current) {
                clearInterval(timer.current);
                timer.current = null;
            }
        };
    }, [currentPlayer, isPaused]);

    function togglePause() {
        setIsPaused(prev => !prev);
    }

    function startTimer(){
        if (timer.current){
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
            timer.current = setInterval(callback, 1000)

    }
    function decrementBlackTimer(){
        setBlackTime(prev => Math.max(prev - 1, 0));
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => Math.max(prev - 1, 0));
    }

    const handleRestart =() =>{
        setBlackTime(300)
        setWhiteTime(300)
        restart()
    }

    return (
        <div>
            <div>
                <button className={"timer"} onClick={handleRestart}>Restart game</button>
            </div>
            <h2>Black - {blackTime}</h2>
            <h2>White - {whiteTime}</h2>
            <div>
            <button className={"timer"}  onClick={togglePause}>
                {isPaused ? "Continue" : "Pause"}
            </button>
            </div>
        </div>
    );
};