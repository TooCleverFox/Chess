import type {Figure} from "../models/figures/Figure.ts";
import type {FC} from "react";

interface LostFigureProps {
    title: string;
    figures: Figure[];
}

export const LostFigures: FC<LostFigureProps> = ({title, figures}) => {
    return (
        <div className="lost">
            <h2>{title}</h2>
            <div className="lost-grid">
            {figures.map((figure, index) => (
                <div className="lost-item" key={`${figure.name}-${figure.color}-${index}`}>
                    {figure.logo && (
                        <img src={figure.logo} alt={figure.name} />
                    )}
                </div>
            ))}
            </div>
        </div>
    );
};