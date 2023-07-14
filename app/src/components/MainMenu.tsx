import { Link } from "react-router-dom";
import { Piece } from "../../../src/index";
import AdversariesMap from "../AdversariesMap";
import { TransitioningElementProps } from "../App";
import "./MainMenu.css";

export interface MainMenuProps extends TransitioningElementProps {}

export default function MainMenu({ transitioningElementRef }: MainMenuProps) {
    return (
        <div className="main-menu" ref={transitioningElementRef}>
            <h1>
                <img src="favicon.svg" /> @kelsny/chess
            </h1>
            <h2>TypeScript chess engine</h2>
            <p>read the <Link to="docs">documentation</Link></p>
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
            {Object.keys(AdversariesMap).map((name) => [
                <p key={name + "white"}>
                    play vs{" "}
                    <a
                        className="src-link"
                        href={`https://github.com/kelsny/chess/blob/master/src/adversaries/${name}.ts`}
                        target="_blank"
                        rel="nofollow noreferrer"
                    >
                        {name}
                    </a>{" "}
                    as{" "}
                    <Link to={`vs/${name}`} state={{ playingAs: Piece.White }}>
                        white
                    </Link>
                    {" or "}
                    <Link to={`vs/${name}`} state={{ playingAs: Piece.Black }}>
                        black
                    </Link>
                </p>,
            ])}
            <h3>spectate an engine match</h3>
            <p>
                <Link to="spectate/v00_Random/vs/v00_Random">
                    v00_Random <span className="not-black">vs</span> v00_Random
                </Link>
            </p>
        </div>
    );
}
