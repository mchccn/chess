import { Piece } from "../../src/index.js";

const IconMap = {
    [Piece.None                ]: "none.svg"        ,
    [Piece.White | Piece.King  ]: "white_king.svg"  ,
    [Piece.White | Piece.Pawn  ]: "white_pawn.svg"  ,
    [Piece.White | Piece.Knight]: "white_knight.svg",
    [Piece.White | Piece.Bishop]: "white_bishop.svg",
    [Piece.White | Piece.Rook  ]: "white_rook.svg"  ,
    [Piece.White | Piece.Queen ]: "white_queen.svg" ,
    [Piece.Black | Piece.King  ]: "black_king.svg"  ,
    [Piece.Black | Piece.Pawn  ]: "black_pawn.svg"  ,
    [Piece.Black | Piece.Knight]: "black_knight.svg",
    [Piece.Black | Piece.Bishop]: "black_bishop.svg",
    [Piece.Black | Piece.Rook  ]: "black_rook.svg"  ,
    [Piece.Black | Piece.Queen ]: "black_queen.svg" ,
};

export default IconMap;