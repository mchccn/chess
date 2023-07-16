import { useState } from "react";
import { Link } from "react-router-dom";
import { Piece } from "../../../src/index";
import AdversariesMap from "../AdversariesMap";
import { TransitioningElementProps } from "../App";
import "./MainMenu.css";

export interface MainMenuProps extends TransitioningElementProps {}

export default function MainMenu({ transitioningElementRef }: MainMenuProps) {
    const [white, setWhite] = useState(Object.keys(AdversariesMap)[0]);
    const [black, setBlack] = useState(Object.keys(AdversariesMap)[0]);

    const [against, setAgainst] = useState(Object.keys(AdversariesMap)[0]);

    return (
        <div className="main-menu" ref={transitioningElementRef}>
            <h1>
                <img src="favicon.svg" /> @kelsny/chess
            </h1>
            <h2>TypeScript chess engine</h2>
            <p>
                read the <Link to="docs">documentation</Link>
            </p>
            <h3>test it out below</h3>
            <p>
                play as{" "}
                <Link to="vs/yourself" state={{ playingAs: Piece.White }}>
                    white
                </Link>
                {" or "}
                <Link to="vs/yourself" state={{ playingAs: Piece.Black }}>
                    black
                </Link>
            </p>
            <h3>or play against an engine</h3>
            <p>
                play vs{" "}
                <select value={against} onChange={(e) => setAgainst(e.target.value)}>
                    {Object.keys(AdversariesMap).map((name) => (
                        <option key={name} value={name}>
                            {name.split("_")[1]}
                        </option>
                    ))}
                </select>{" "}
                as{" "}
                <Link to={`vs/${against}`} state={{ playingAs: Piece.White }}>
                    white
                </Link>
                {" or "}
                <Link to={`vs/${against}`} state={{ playingAs: Piece.Black }}>
                    black
                </Link>
            </p>
            <h3>spectate an engine match</h3>
            <div>
                <select value={white} onChange={(e) => setWhite(e.target.value)}>
                    {Object.keys(AdversariesMap).map((white) => (
                        <option key={white} value={white}>
                            {white.split("_")[1]}
                        </option>
                    ))}
                </select>
                vs
                <select value={black} onChange={(e) => setBlack(e.target.value)}>
                    {Object.keys(AdversariesMap).map((black) => (
                        <option key={black} value={black}>
                            {black.split("_")[1]}
                        </option>
                    ))}
                </select>
                <Link to={`spectate/${white}/vs/${black}`}>go</Link>
            </div>
        </div>
    );
}
