import { Board, BoardRepresentation, Piece } from "./index.js";

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

    // for performance, this lookup is an array instead
    static readonly #typeToSymbol = [
        "?",
        "k", // Piece.King = 1
        "p", // Piece.Pawn = 2,
        "n", // Piece.Knight = 3,
        "?",
        "b", // Piece.Bishop = 5,
        "r", // Piece.Rook = 6,
        "q", // Piece.Queen = 7,
    ];

    static fromFENString(fen: string): FENInfo {
        const [positions, sideToMove, castlingRights, enPassantTarget, halfmoveClock, fullmoveNumber] = fen.split(" ");

        const squares = new Array<number>(64).fill(0);

        let i: number, cell: number;
        for (i = 0, cell = 0; i < positions.length; i++) {
            const char = positions[i];

            if (char === "/") continue;

            if (/\d/.test(char)) {
                cell += Number(char);
            } else {
                const pieceColor = char.toUpperCase() === char ? Piece.White : Piece.Black; 
                const pieceType = this.#symbolToType[char.toLowerCase()];

                const rank = 7 - (cell >> 3);
                const file = cell & 0b111;

                squares[rank * 8 + file] = pieceColor | pieceType;

                cell++;
            }
        }

        const colorToMove = sideToMove === "w" ? Piece.White : Piece.Black;

        const enPassantFile = enPassantTarget === "-" ? 0 : BoardRepresentation.fileNames.indexOf(enPassantTarget[0]) + 1;

        const halfmoves = Number(halfmoveClock);

        const fullmoves = Number(fullmoveNumber);

        const whiteCastleKingside  = castlingRights.includes("K");
        const whiteCastleQueenside = castlingRights.includes("Q");
        const blackCastleKingside  = castlingRights.includes("k");
        const blackCastleQueenside = castlingRights.includes("q");

        return {
            squares,
            colorToMove,
            enPassantFile,
            halfmoves,
            fullmoves,
            whiteCastleKingside,
            whiteCastleQueenside,
            blackCastleKingside,
            blackCastleQueenside,
        };
    }

    static toFENString(board: Board): string {
        let fen = "";

        let rank: number, file: number, cell: number, j: number, type: number, casing: keyof string;
        for (rank = 7; rank >= 0; rank--) {
            for (file = 0; file < 8; file++) {
                cell = board.squares[rank * 8 + file];

                j = file;

                while (!board.squares[rank * 8 + file] && file < 8) file++;

                if (file !== j) {
                    fen += file-- - j;
                } else {
                    type = Piece.getType(cell);
                    casing = Piece.getColor(cell) === Piece.White ? "toUpperCase" : "toLowerCase";

                    fen += this.#typeToSymbol[type][casing]();
                }
            }

            if (rank) fen += "/"
        }

        fen += " ";
        fen += board.colorToMove === Piece.White ? "w" : "b";

        fen += " ";
        fen += (board.currentGameState >> 0 & 1) === 1 ? "K" : "";
        fen += (board.currentGameState >> 1 & 1) === 1 ? "Q" : "";
        fen += (board.currentGameState >> 2 & 1) === 1 ? "k" : "";
        fen += (board.currentGameState >> 3 & 1) === 1 ? "q" : "";
        fen += (board.currentGameState & 0b1111) === 0 ? "-" : "";

        const enPassantFile = board.currentGameState >> 4 & 0b1111;

        fen += " ";

        if (!enPassantFile) {
            fen += "-";
        } else {
            const enPassantRank = board.colorToMove === Piece.White ? 6 : 3;
            
            fen += BoardRepresentation.fileNames[enPassantFile - 1] + enPassantRank;
        }

        fen += " ";
        fen += board.fiftyMoveCounter;

        fen += " ";
        fen += Math.floor(board.plyCount / 2) + 1;

        return fen;
    }
}

export type FENInfo = {
    /** the piece positions on the board */
    squares: number[];
    /** the side to move (Piece.White or Piece.Black) */
    colorToMove: number;
    /** the file of the en passant target square (0 if there is no target) */
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
};