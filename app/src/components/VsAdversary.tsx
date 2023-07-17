import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GameState, Move, MoveGenerator, Piece } from "../../../src/index";
import AdversariesMap from "../AdversariesMap";
import { TransitioningElementProps } from "../App";
import { BoardContext } from "../BoardContext";
import BoardWrapper from "./BoardWrapper";

export interface VsAdversaryProps extends TransitioningElementProps {}

export default function VsAdversary(props: VsAdversaryProps) {
    const params = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const board = useContext(BoardContext);
    const adversary = useRef(
        params.adversary && params.adversary in AdversariesMap
            ? new AdversariesMap[
                  params.adversary as keyof typeof AdversariesMap
              ](board)
            : null,
    );

    const [legalMoves, setLegalMoves] = useState(
        new MoveGenerator(board).generateMoves(),
    );
    const [gameState, setGameState] = useState(board.gameState());
    const [selected, setSelected] = useState(-1);

    const [adversaryTurn, setAdversaryTurn] = useState(false);

    const [diagnostics, setDiagnostics] = useState<Record<string, unknown>>({});

    const playingAs = state?.playingAs ?? Piece.White;
    const invalidParams =
        !params.adversary || !(params.adversary in AdversariesMap);

    useEffect(() => {
        if (invalidParams) navigate("/", { replace: true });

        if (playingAs === Piece.Black) {
            if (board.gameState() === GameState.Playing && board.colorToMove === Piece.White) {
                setTimeout(() => {
                    playMove(adversary.current!.bestMove({ debug: true, useBook: true }))

                    setDiagnostics(adversary.current!.getDiagnostics());
                });
            }
        }
    }, []);

    useEffect(() => {
        if (adversaryTurn) {
            setTimeout(() => {
                playMove(adversary.current!.bestMove({ debug: true, useBook: true }))
    
                setDiagnostics(adversary.current!.getDiagnostics());

                setAdversaryTurn(false);
            }, 50);
        }
    }, [adversaryTurn])

    if (invalidParams) return null;

    async function playMove(move: Move) {
        if (board.gameState() !== GameState.Playing) return;

        setSelected(-1);

        const isOurMove = Piece.isColor(
            board.squares[move.startSquare],
            playingAs,
        );

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
                isOurMove ? "sounds/move-self.mp3" : "sounds/move-opponent.mp3",
            );
        }

        if (move.isPromotion && isOurMove) {
            const promotionInput =
                prompt("promotion (q/n/b/r):")?.[0]?.toLowerCase() ?? "q";

            const promotionFlag = "qnbr".includes(promotionInput)
                ? {
                      q: Move.Flag.PromoteToQueen,
                      n: Move.Flag.PromoteToKnight,
                      b: Move.Flag.PromoteToBishop,
                      r: Move.Flag.PromoteToRook,
                  }[promotionInput]
                : Move.Flag.PromoteToQueen;

            board.makeMove(
                new Move(move.startSquare, move.targetSquare, promotionFlag),
            );
        } else {
            board.makeMove(move);

            const mg = new MoveGenerator(board);

            mg.generateMoves();

            if (mg.inCheck) audio = new Audio("sounds/move-check.mp3");
        }

        const gameState = board.gameState();

        setGameState(gameState);

        if (gameState !== GameState.Playing)
            audio = new Audio("sounds/game-end.mp3");

            
        setLegalMoves(new MoveGenerator(board).generateMoves());

        await audio.play();
    }

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
                    <br />
                    <p>diagnostics:</p>
                    <p>best move: {(diagnostics.bestMove instanceof Move ? diagnostics.bestMove.name : diagnostics.bestMove as string) || "n/a"}</p>
                    <p>best eval: {diagnostics.bestEval as number ?? "n/a"}</p>
                    <p>is book move: {(diagnostics.isBookEval as boolean ?? "n/a").toString()}</p>
                </>
            }
            right={`${
                GameState.isDraw(board.gameState()) ? "draw by " : ""
            }${GameState.getName(board.gameState())}`}
            boardProps={{
                playingAs,
                legalMoves,
                selected,
                style: { cursor: adversaryTurn ? "wait" : "auto" },
                async squareOnClick(index) {
                    if (gameState !== GameState.Playing) return;

                    if (selected === index) return setSelected(-1);

                    const move = legalMoves.find(
                        (move) =>
                            move.startSquare === selected &&
                            move.targetSquare === index,
                    );

                    if (move) {
                        await playMove(move);

                        if (board.gameState() === GameState.Playing)
                            setAdversaryTurn(true);
                    } else if (
                        !Piece.isColor(board.squares[index], board.colorToMove)
                    ) {
                        setSelected(-1);
                    } else {
                        setSelected(index);
                    }
                },
            }}
        />
    );
}
