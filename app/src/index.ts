import { Move } from "../../dist/Move.js";
import { Board, BoardRepresentation, MoveGenerator, Piece } from "../../dist/index.js";
import { iconMap } from "./iconMap.js";
import { setup } from "./setup.js";

setup();

// starting position fen "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
// sliding pieces move generation test fen "8/8/4Q3/8/3B4/8/2R5/8 w KQkq - 0 1"

const board = new Board().loadPosition("8/8/4Q3/8/3B4/8/pR2p3/8 w KQkq - 0 1");

const boardElement = document.querySelector(".board")!;

const state = {
    selected: -1,
    moves: MoveGenerator.generateMoves(board),
};

function render() {
    boardElement.innerHTML = "";

    for (let i = 0; i < 64; i++) {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        
        const imgElement = document.createElement("img");
        imgElement.classList.add("cell-img");
        imgElement.draggable = false;

        const file = i & 0b111;
        const rank = 7 - (i >> 3);
        const index = rank * 8 + file;

        const isLightSquare = BoardRepresentation.isLightSquare(file, rank);

        cellElement.dataset.index = index.toString();
        cellElement.classList.add(isLightSquare ? "light" : "dark");
        imgElement.src = "assets/pieces/" + iconMap[board.squares[index]];

        cellElement.append(imgElement);
        boardElement.append(cellElement);

        if (index === state.selected) {
            cellElement.classList.add(isLightSquare ? "light-selected" : "dark-selected")
        }

        if (state.moves.some((move) => Move.equals(move, new Move(state.selected, index)))) {
            cellElement.classList.add(isLightSquare ? "light-highlighted" : "dark-highlighted");
        }
    }
}

render();

boardElement.addEventListener("click", (e) => {
    if (!(e.target instanceof HTMLElement)) return;

    const cell = e.target.closest<HTMLElement>(".cell");

    if (!cell) return;

    // selected the same cell
    if (state.selected === Number(cell.dataset.index)) {
        state.selected = -1;
    } else {
        const index = Number(cell.dataset.index);

        const attemptedMove = state.moves.find((move) => Move.equals(move, new Move(state.selected, Number(cell.dataset.index))));

        if (attemptedMove) {
            // made a move, deselect cell
            state.selected = -1;

            if (attemptedMove.moveFlag === Move.Flag.Castling) {
                new Audio("assets/sounds/castle.mp3").play();
            } else if (attemptedMove.isPromotion) {
                new Audio("assets/sounds/move-promote.mp3").play();
            } else if (attemptedMove.moveFlag === Move.Flag.EnPassantCapture || (board.squares[attemptedMove.targetSquare] && !Piece.isColor(board.squares[attemptedMove.targetSquare], board.colorToMove))) {
                new Audio("assets/sounds/capture.mp3").play();
            } else {
                new Audio("assets/sounds/move-self.mp3").play();
            }

            // move on board
            board.makeMove(attemptedMove);

            state.moves = MoveGenerator.generateMoves(board);
        } else if (board.squares[index] === Piece.None || !Piece.isColor(board.squares[index], board.colorToMove)) {
            // can't select enemy piece or empty cell
            state.selected = -1;
        } else {
            state.selected = index;
        }
    }

    render();
});