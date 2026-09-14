import { Colors } from "./Colors.ts";

export const isPromotionSquare = (y: number, color: Colors): boolean =>
	color === Colors.WHITE ? y === 0 : y === 7;
