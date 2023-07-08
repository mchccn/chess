import { Board, BoardRepresentation, MoveGenerator, Piece } from "../dist/index.js";

const iconMap = {
    [Piece.None]: "none.svg",
    [Piece.White | Piece.King]: "white_king.svg",
    [Piece.White | Piece.Pawn]: "white_pawn.svg",
    [Piece.White | Piece.Knight]: "white_knight.svg",
    [Piece.White | Piece.Bishop]: "white_bishop.svg",
    [Piece.White | Piece.Rook]: "white_rook.svg",
    [Piece.White | Piece.Queen]: "white_queen.svg",
    [Piece.Black | Piece.King]: "black_king.svg",
    [Piece.Black | Piece.Pawn]: "black_pawn.svg",
    [Piece.Black | Piece.Knight]: "black_knight.svg",
    [Piece.Black | Piece.Bishop]: "black_bishop.svg",
    [Piece.Black | Piece.Rook]: "black_rook.svg",
    [Piece.Black | Piece.Queen]: "black_queen.svg",
};

// starting position fen "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
// sliding pieces move generation test fen "8/8/4Q3/8/3B4/8/2R5/8 w KQkq - 0 1"

const board = new Board().loadPosition("8/8/4Q3/8/3B4/8/2R5/8 w KQkq - 0 1");

const filesElement = document.querySelector(".files")!;
const ranksElement = document.querySelector(".ranks")!;

for (const f of BoardRepresentation.fileNames) {
    const fileDiv = document.createElement("div");
    fileDiv.textContent = f;

    filesElement.append(fileDiv);
}

for (const r of BoardRepresentation.rankNames) {
    const rankDiv = document.createElement("div");
    rankDiv.textContent = r;

    ranksElement.append(rankDiv);
}

const boardElement = document.querySelector(".board")!;

const moves = MoveGenerator.generateMoves(board);

console.log(moves.map((m) => ({ start: m.startSquare, target: m.targetSquare })))

const state = {
    selected: -1,
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

        if (moves.some((move) => move.startSquare === state.selected && move.targetSquare === index)) {
            cellElement.classList.add(isLightSquare ? "light-highlighted" : "dark-highlighted");
        }
    }
}

render();

boardElement.addEventListener("click", (e) => {
    if (!(e.target instanceof HTMLElement)) return;

    const cell = e.target.closest<HTMLElement>(".cell");

    if (!cell) return;

    if (state.selected === Number(cell.dataset.index)) {
        state.selected = -1;

        render();
    } else {
        state.selected = Number(cell.dataset.index);

        if (board.squares[state.selected] === Piece.None || !Piece.isColor(board.squares[state.selected], board.colorToMove)) {
            state.selected = -1;

            render();
        } else {
            render();
        }
    }
});