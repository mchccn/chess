import { CSSProperties, MouseEvent, useContext } from "react";
import { BoardRepresentation, Move, Piece } from "../../../src/index";
import { BoardContext } from "../BoardContext";
import IconMap from "../IconMap";
import "./Board.css";

function reverseRanks(board: number[]) {
    const result = [...board];

    for (let rank = 0; rank < 8; rank++)
        result.splice(
            rank * 8,
            8,
            ...board.slice((7 - rank) * 8, (8 - rank) * 8),
        );

    return result;
}

function reverseFiles(board: number[]) {
    const result = [...board];

    for (let file = 0; file < 8; file++) {
        result[file + (8 * 0)] = board[(7 - file) + (8 * 0)];
        result[file + (8 * 1)] = board[(7 - file) + (8 * 1)];
        result[file + (8 * 2)] = board[(7 - file) + (8 * 2)];
        result[file + (8 * 3)] = board[(7 - file) + (8 * 3)];
        result[file + (8 * 4)] = board[(7 - file) + (8 * 4)];
        result[file + (8 * 5)] = board[(7 - file) + (8 * 5)];
        result[file + (8 * 6)] = board[(7 - file) + (8 * 6)];
        result[file + (8 * 7)] = board[(7 - file) + (8 * 7)];
    }

    return result;
}

export interface BoardProps {
    playingAs: number;
    legalMoves: Move[];
    selected: number;
    squareOnClick?: (index: number, event: MouseEvent) => void;
    style?: CSSProperties;
}

export default function BoardComponent(props: BoardProps) {
    const board = useContext(BoardContext);

    return (
        <>
            <div
                className={`board playing-as-${
                    props.playingAs === Piece.White ? "white" : "black"
                }`} style={props.style}
            >
                <div className="ranks">
                    {(props.playingAs === Piece.White
                        ? [...BoardRepresentation.rankNames]
                        : [...BoardRepresentation.rankNames].reverse()
                    ).map((rank, i) => (
                        <div className={i % 2 === 0 ? "light-text" : "dark-text"} key={rank}>{rank}</div>
                    ))}
                </div>
                <div className="files">
                    {(props.playingAs === Piece.White
                        ? [...BoardRepresentation.fileNames]
                        : [...BoardRepresentation.fileNames].reverse()
                    ).map((file, i) => (
                        <div className={i % 2 === 0 ? "light-text" : "dark-text"} key={file}>{file}</div>
                    ))}
                </div>
                {(props.playingAs === Piece.White
                    ? reverseRanks(board.squares)
                    : reverseFiles(board.squares)
                ).map((piece, i) => {
                    const file = BoardRepresentation.fileIndex(i);
                    const rank = 7 - BoardRepresentation.rankIndex(i);
                    const index = props.playingAs === Piece.White ? rank * 8 + file : (7 - rank) * 8 + (7 - file);

                    const isLightSquare = BoardRepresentation.isLightSquare(
                        file,
                        rank,
                    );

                    const classes = ["cell", isLightSquare ? "light" : "dark"];

                    if (props.selected === index)
                        classes.push(
                            isLightSquare ? "light-selected" : "dark-selected",
                        );

                    if (
                        props.legalMoves.some(
                            (move) =>
                                move.startSquare === props.selected &&
                                move.targetSquare === index,
                        )
                    )
                        classes.push(
                            isLightSquare
                                ? "light-highlighted"
                                : "dark-highlighted",
                        );

                    return (
                        <div
                            onClick={(event) =>
                                props.squareOnClick?.(index, event)
                            }
                            className={classes.join(" ")}
                            key={index}
                        >
                            <img
                                className="cell-img"
                                src={`pieces/${IconMap[piece]}`}
                                draggable={false}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
}
