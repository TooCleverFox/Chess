import type { FC } from "react";
import { Colors } from "../models/Colors.ts";
import { FigureNames, type FigureName } from "../models/figures/Figure.ts";

interface PromotionModalProps {
	color: Colors;
	onSelect: (piece: FigureName) => void;
}

const promotionPieces: FigureName[] = [
	FigureNames.QUEEN,
	FigureNames.ROOK,
	FigureNames.BISHOP,
	FigureNames.KNIGHT,
];

export const PromotionModal: FC<PromotionModalProps> = ({ color, onSelect }) => (
	<div className="promotion-overlay">
		<div className="promotion-modal">
			<h3>Choose promotion</h3>
			<div className="promotion-options">
				{promotionPieces.map((piece) => (
					<button
						className="promotion-option"
						type="button"
						key={piece}
						onClick={() => onSelect(piece)}
					>
						<span>{piece}</span>
						<span>{color}</span>
					</button>
				))}
			</div>
		</div>
	</div>
);
