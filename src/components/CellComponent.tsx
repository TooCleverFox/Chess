import type { Cell } from "../models/Cell.ts";
import type { FC } from "react";

type CellProps = {
	cell: Cell;
	selected: boolean;
	click: (cell:Cell) => void;
}

export const CellComponent: FC<CellProps> = ({ cell, selected,click }) => {

	return (<div className={["cell", cell.color, selected ? "selected":""].join(" ")}
	onClick={()=>click(cell)}
	style={{background: cell.available && cell.figure ? "red" : ""}}
	>

		{cell.available && !cell.figure && <div className={"available"}/>}
		{cell.figure?.logo && <img src={cell.figure.logo} alt = ''/>}
	</div>);
};



