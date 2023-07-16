import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameState, Move, MoveGenerator, Piece } from "../../../src/index";
import AdversariesMap from "../AdversariesMap";
import { TransitioningElementProps } from "../App";
import { BoardContext } from "../BoardContext";
import BoardWrapper from "./BoardWrapper";

export interface SpectateMatchProps extends TransitioningElementProps {}

export default function SpectateMatch(props: SpectateMatchProps) {
    const params = useParams();
    const navigate = useNavigate();
    const board = useContext(BoardContext);
    const playerOne = useRef(
        params.playerOne && params.playerOne in AdversariesMap
            ? new AdversariesMap[
                  params.playerOne as keyof typeof AdversariesMap
              ](board)
            : null,
    );
    const playerTwo = useRef(
        params.playerTwo && params.playerTwo in AdversariesMap
            ? new AdversariesMap[
                  params.playerTwo as keyof typeof AdversariesMap
              ](board)
            : null,
    );

    const [selected, setSelected] = useState(-1);

    const invalidParams =
        !params.playerOne ||
        !(params.playerOne in AdversariesMap) ||
        !params.playerTwo ||
        !(params.playerTwo in AdversariesMap);

    useEffect(() => {
        if (invalidParams) navigate("/", { replace: true });
    }, []);

    async function playMove(move: Move) {
        if (board.gameState() !== GameState.Playing) return;

        let audio: HTMLAudioElement;

        if (move.isPromotion) {
            audio = new Audio("sounds/move-promote.mp3");
        } else if (move.moveFlag === Move.Flag.Castling) {
            audio = new Audio("sounds/castle.mp3");
        } else if (
            move.moveFlag === Move.Flag.EnPassantCapture ||
            (board.squares[move.targetSquare] !== Piece.None &&
                !Piece.isColor(
                    board.squares[move.targetSquare],
                    board.colorToMove,
                ))
        ) {
            audio = new Audio("sounds/capture.mp3");
        } else {
            audio = new Audio(
                board.colorToMove === Piece.White
                    ? "sounds/move-self.mp3"
                    : "sounds/move-opponent.mp3",
            );
        }

        board.makeMove(move);

        const mg = new MoveGenerator(board);

        mg.generateMoves();

        if (mg.inCheck) audio = new Audio("sounds/move-check.mp3");

        const gameState = board.gameState();

        if (gameState !== GameState.Playing)
            audio = new Audio("sounds/game-end.mp3");

        await audio.play();
    }

    useEffect(() => {
        if (board.gameState() !== GameState.Playing) return;

        const timeout = setTimeout(async () => {
            board.colorToMove === Piece.White
                ? await playMove(playerOne.current!.bestMove())
                : await playMove(playerTwo.current!.bestMove());

            setSelected((s) => s - 1);
        }, 100);

        return () => clearTimeout(timeout);
    });

    if (invalidParams) return null;

    return (
        <BoardWrapper
            transitioningElementRef={props.transitioningElementRef}
            left={
                <>
                    <p>{board.plyCount} ply</p>
                    <p>
                        {(board.currentGameState & 0b0001 ? "K" : "") +
                            (board.currentGameState & 0b0010 ? "Q" : "") +
                            (board.currentGameState & 0b0100 ? "k" : "") +
                            (board.currentGameState & 0b1000 ? "q" : "") ||
                            "no"}{" "}
                        castling rights
                    </p>
                    <p>
                        {board.colorToMove === Piece.White ? "white" : "black"}{" "}
                        to move
                    </p>
                </>
            }
            right={`${
                GameState.isDraw(board.gameState()) ? "draw by " : ""
            }${GameState.getName(board.gameState())}`}
            boardProps={{
                playingAs: Piece.White,
                legalMoves: [],
                selected,
            }}
        />
    );
}
