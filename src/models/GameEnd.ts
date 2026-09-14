import type { Colors } from "./Colors.ts";

export type GameEndReason = "checkmate" | "stalemate" | "time";

export type GameEndState = {
	winner: Colors | null;
	reason: GameEndReason;
};
