import type { Cell } from "../models/Cell.ts";
import type { FC } from "react";

type CellProps = {
	cell: Cell;
	selected: boolean;
	click: (cell: Cell) => void;
};

export const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
	const className = [
		"cell",
		cell.color,
		selected && "selected",
		cell.available && cell.figure && "capture-target",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={className} onClick={() => click(cell)}>
			{cell.available && !cell.figure && <div className="available" />}
			{cell.figure?.logo && (
				<img src={cell.figure.logo} alt={cell.figure.name} />
			)}
		</div>
	);
};
