import { BoardRepresentation } from "./BoardRepresentation.js";
import { Piece } from "./Piece.js";

export class FEN {
    static readonly startingPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

    static readonly #symbolToType: Record<string, number> = {
        k: Piece.King,
        p: Piece.Pawn,
        n: Piece.Knight,
        b: Piece.Bishop,
        r: Piece.Rook,
        q: Piece.Queen,
    };

    static fromFENString(fen: string): FENInfo {
        const [positions, colorToMove, castlingRights, enPassantTarget, halfmoveClock, fullmoveNumber] = fen.split(" ");

        const squares = new Array<number>(64).fill(0);

        for (let i = 0, cell = 0; i < positions.length; i++) {
            const char = positions[i];

            if (char === "/") continue;

            if (/\d/.test(char)) {
                cell += Number(char);
            } else {
                const pieceColor = char.toUpperCase() === char ? Piece.White : Piece.Black; 
                const pieceType = this.#symbolToType[char.toLowerCase()];

                squares[cell++] = pieceColor | pieceType;
            }
        }

        const sideToMove = colorToMove === "w" ? Piece.White : Piece.Black;

        const enPassantFile = enPassantTarget === "-" ? -1 : BoardRepresentation.fileNames.indexOf(enPassantTarget[0]);

        const halfmoves = Number(halfmoveClock);

        const fullmoves = Number(fullmoveNumber);

        const whiteCastleKingside  = castlingRights.includes("K");
        const whiteCastleQueenside = castlingRights.includes("Q");
        const blackCastleKingside  = castlingRights.includes("k");
        const blackCastleQueenside = castlingRights.includes("q");

        return {
            squares,
            sideToMove,
            enPassantFile,
            halfmoves,
            fullmoves,
            whiteCastleKingside,
            whiteCastleQueenside,
            blackCastleKingside,
            blackCastleQueenside,
        };
    }
}

export type FENInfo = {
    /** the piece positions on the board */
    squares: number[];
    /** the side to move (Piece.White or Piece.Black) */
    sideToMove: number;
    /** the file of the en passant target square (-1 if there is no target) */
    enPassantFile: number;
    /** number of halfmoves (50-move draw rule) */
    halfmoves: number;
    /** number of fullmoves */
    fullmoves: number;
    /** white can castle kingside */
    whiteCastleKingside: boolean;
    /** white can castle queenside */
    whiteCastleQueenside: boolean;
    /** black can castle kingside */
    blackCastleKingside: boolean;
    /** black can castle queenside */
    blackCastleQueenside: boolean;
}