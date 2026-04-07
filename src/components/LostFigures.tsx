import type {Figure} from "../models/figures/Figure.ts";
import type {FC} from "react";

interface LostFigureProps {
    title: string;
    figures: Figure[];
}

export const LostFigures: FC<LostFigureProps> = ({title, figures}) => {
    return (
        <div className="lost">
            <h3>{title}</h3>
            {figures.map(figure =>
                <div key={figure.id}>
                    {figure.name} {figure.logo && <img width={20} height={20} src={figure.logo}/>} </div>
        )}
        </div>
    );
};