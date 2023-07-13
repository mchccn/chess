import { GameState, Move, MoveGenerator, Piece } from "../../dist/index.js";
import { boardElement, render } from "./render.js";
import { setup } from "./setup.js";
import { state } from "./state.js";

setup();

render();

function makeMoveOnBoard(move: Move) {
    if (state.gameOver) return;
    
    // move on board
    state.board.makeMove(move);

    // update state
    state.movesMade.push(move);

    state.legalMoves = new MoveGenerator(state.board).generateMoves();
}

boardElement.addEventListener("click", function clickHandler(e) {
    if (!(e.target instanceof HTMLElement)) return;

    const cell = e.target.closest<HTMLElement>(".cell");

    if (!cell) return;

    // selected the same cell
    if (state.selected === Number(cell.dataset.index)) {
        state.selected = -1;
    } else {
        const index = Number(cell.dataset.index);

        const attemptedMove = state.legalMoves.find((move) => (
            move.startSquare === state.selected && move.targetSquare === index
        ));
        
        if (attemptedMove) {
            // made a move, deselect cell
            state.selected = -1;

            let audio: HTMLAudioElement;
            
            if (attemptedMove.isPromotion) {
                // replace with ui and await user input later
                const promotionInput = prompt("promotion (q/n/b/r):")?.[0]?.toLowerCase() ?? "q";
                
                const promotionFlag = "qnbr".includes(promotionInput) ? {
                    q: Move.Flag.PromoteToQueen,
                    n: Move.Flag.PromoteToKnight,
                    b: Move.Flag.PromoteToBishop,
                    r: Move.Flag.PromoteToRook,
                }[promotionInput] : Move.Flag.PromoteToQueen;

                makeMoveOnBoard(new Move(
                    attemptedMove.startSquare,
                    attemptedMove.targetSquare,
                    promotionFlag,
                ));
                
                audio = new Audio("assets/sounds/move-promote.mp3");
            } else {
                if (attemptedMove.moveFlag === Move.Flag.Castling) {
                    audio = new Audio("assets/sounds/castle.mp3");
                } else if (attemptedMove.moveFlag === Move.Flag.EnPassantCapture || (state.board.squares[attemptedMove.targetSquare] !== Piece.None && !Piece.isColor(state.board.squares[attemptedMove.targetSquare], state.board.colorToMove))) {
                    audio = new Audio("assets/sounds/capture.mp3");
                } else {
                    audio = new Audio("assets/sounds/move-self.mp3");
                }
                
                // move on board
                makeMoveOnBoard(attemptedMove);

                const mg = new MoveGenerator(state.board);
                mg.generateMoves();

                if (mg.inCheck) audio = new Audio("assets/sounds/move-check.mp3");
            }

            const gameState = state.board.gameState();

            if (gameState !== GameState.Playing) {
                audio = new Audio("assets/sounds/game-end.mp3");

                state.gameOver = true;

                boardElement.removeEventListener("click", clickHandler);
            }

            audio.play();
        } else if (state.board.squares[index] === Piece.None || !Piece.isColor(state.board.squares[index], state.board.colorToMove)) {
            // can't select enemy piece or empty cell
            state.selected = -1;
        } else {
            state.selected = index;
        }
    }

    render();
});