import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FEN, Piece } from "../../../src/index";
import { TransitioningElementProps } from "../App";
import { BoardContext } from "../BoardContext";
import IconMap from "../IconMap";
import { useForceRender } from "../useForceRender";
import BoardWrapper from "./BoardWrapper";
import "./PlayBoard.css";

export interface PlayBoardProps extends TransitioningElementProps {}

export default function PlayBoard(props: PlayBoardProps) {
    const { state } = useLocation();
    const board = useContext(BoardContext);

    const [brush, setBrush] = useState(-1);
    const [selected, setSelected] = useState(-1);

    const [fenCopied, setFenCopied] = useState(false);
    const [shareCopied, setShareCopied] = useState(false);

    const [playingAs, setPlayingAs] = useState<number>(
        state?.playingAs ?? Piece.White,
    );

    const forceRender = useForceRender();

    useEffect(() => {
        const fen = new URLSearchParams(location.search).get("fen");

        if (fen) {
            board.loadPosition(fen);
        } else {
            board.loadPosition("8/8/8/8/8/8/8/8 w - - 0 1");
        }

        forceRender();
    }, []);

    return (
        <BoardWrapper
            transitioningElementRef={props.transitioningElementRef}
            left={
                <div className="selection">
                    {[
                        Piece.King,
                        Piece.Pawn,
                        Piece.Knight,
                        Piece.Bishop,
                        Piece.Rook,
                        Piece.Queen,
                    ].flatMap((pieceType) => [
                        <img
                            onClick={() => {
                                if (brush === (Piece.White | pieceType))
                                    return setBrush(-1);

                                setBrush(Piece.White | pieceType);
                            }}
                            className={`${
                                brush === (Piece.White | pieceType)
                                    ? "selected"
                                    : ""
                            }`}
                            key={Piece.White | pieceType}
                            draggable={false}
                            src={`pieces/${IconMap[Piece.White | pieceType]}`}
                        />,
                        <img
                            onClick={() => {
                                if (brush === (Piece.Black | pieceType))
                                    return setBrush(-1);

                                setBrush(Piece.Black | pieceType);
                            }}
                            className={`${
                                brush === (Piece.Black | pieceType)
                                    ? "selected"
                                    : ""
                            }`}
                            key={Piece.Black | pieceType}
                            draggable={false}
                            src={`pieces/${IconMap[Piece.Black | pieceType]}`}
                        />,
                    ])}
                </div>
            }
            right={
                <div className="board-menu">
                    <p>select a piece to place on the board</p>

                    <button
                        onClick={() =>
                            setPlayingAs(
                                playingAs === Piece.White
                                    ? Piece.Black
                                    : Piece.White,
                            )
                        }
                    >
                        switch sides
                    </button>

                    <button
                        onClick={() => {
                            board.loadStartingPosition();

                            forceRender();
                        }}
                    >
                        load starting position
                    </button>

                    <button onClick={async () => {
                        const fen = FEN.toFENString(board);

                        await window.navigator.clipboard.writeText(fen);

                        setFenCopied(true);

                        setTimeout(() => setFenCopied(false), 1000);
                    }}>{fenCopied ? "fen copied!" : "copy fen"}</button>

                    <button onClick={async () => {
                        const url = new URL(location.href);
                        
                        url.searchParams.set("fen", FEN.toFENString(board));

                        history.pushState(undefined, "", url);

                        await window.navigator.clipboard.writeText(url.href);

                        setShareCopied(true);

                        setTimeout(() => setShareCopied(false), 1000);
                    }}>{shareCopied ? "link copied!" : "share link"}</button>
                </div>
            }
            boardProps={{
                playingAs,
                legalMoves: [],
                selected,
                squareOnClick(index) {
                    board.squares[index] = brush === -1 ? 0 : brush;

                    forceRender();
                },
            }}
        />
    );
}
