import { Bitboard, Board, Piece } from "./index.js";

export class Zobrist {
    static filename = "zobrist.txt";

    // piece type, piece color, square index (8, 2, 64)
    static readonly piecesArray: [bigint[], bigint[]][] = [];
    // 16 possible states of castling rights
    static readonly castlingRights: bigint[] = [];
    // 8 files + no en passant file = 8 + 1 -> 9
    static readonly enPassantFile: bigint[] = [];
    // used every turn
    static readonly sideToMove: bigint = Bitboard.randomU64();

    static {
        for (let pieceIndex = 0; pieceIndex < 8; pieceIndex++) {
            this.piecesArray.push([[], []]);

            for (let squareIndex = 0; squareIndex < 64; squareIndex++) {
                this.piecesArray[pieceIndex][Board.whiteIndex][squareIndex] = Bitboard.randomU64();
                this.piecesArray[pieceIndex][Board.blackIndex][squareIndex] = Bitboard.randomU64();
            }
        }

        for (let i = 0; i < 16; i++) this.castlingRights.push(Bitboard.randomU64());

        for (let i = 0; i < 9; i++) this.enPassantFile.push(Bitboard.randomU64());
    }

    static calculateZobristKey(board: Board) {
        let zobristKey = 0n;

        for (let squareIndex = 0; squareIndex < 64; squareIndex++) {
            if (board.squares[squareIndex] !== Piece.None) {
                const pieceType  = Piece.getType (board.squares[squareIndex]);
                const pieceColor = Piece.getColor(board.squares[squareIndex]);

                zobristKey ^= this.piecesArray[pieceType][pieceColor === Piece.White ? Board.whiteIndex : Board.blackIndex][squareIndex];
            }
        }

        const enPassantIndex = (board.currentGameState >> 4) & 0b1111;

        zobristKey ^= this.enPassantFile[enPassantIndex];

        if (board.colorToMove === Piece.Black) zobristKey ^= this.sideToMove;

        zobristKey ^= this.castlingRights[board.currentGameState & 0b1111];

        return zobristKey;
    }
}