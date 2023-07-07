import { Board, BoardRepresentation, FEN, Piece } from "../dist/index.js";

const board = new Board();

//@ts-ignore
board.squares = FEN.fromFENString(FEN.startingPosition).squares;

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

for (let i = 0; i < 64; i++) {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    
    const imgElement = document.createElement("img");
    imgElement.classList.add("cell-img");
    imgElement.draggable = false;
    imgElement.src = "assets/pieces/" + iconMap[board.squares[i]];

    cellElement.append(imgElement);
    boardElement.append(cellElement);
}