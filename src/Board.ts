import { FEN } from "./FEN.js";
import { Piece } from "./Piece.js";

export class Board {
    #squares = new Array<number>(64).fill(0);
    
    #colorToMove = 0;
    
    #plyCount = 0;

    /** counted in ply, so when it reaches 100 the game is a draw */
    #fiftyMoveCounter = 0;

    /** 7 | 5 | 4 | 4  - 0000000 | 00000 | 0000 | 0000 - fifty move counter (in ply) | captured piece | en passant file | castling rights */
    #currentGameState = 0;

    #gameStateHistory: number[] = [];

    constructor () {}

    get squares() {
        return [...this.#squares];
    }

    get colorToMove() {
        return this.#colorToMove;
    }

    get plyCount() {
        return this.#plyCount;
    }

    get fiftyMoveCounter() {
        return this.#fiftyMoveCounter;
    }

    get currentGameState() {
        return this.#currentGameState;
    }

    loadStartingPosition() {
        this.loadPosition(FEN.startingPosition);

        return this;
    }

    loadPosition(fen: string) {
        const info = FEN.fromFENString(fen);

        this.#squares = info.squares;
        this.#colorToMove = info.colorToMove;
        this.#plyCount = (info.fullmoves - 1) * 2 + (info.colorToMove === Piece.White ? 0 : 1);
        this.#fiftyMoveCounter = info.halfmoves;

        const whiteCastlingRights = ((info.whiteCastleKingside) ? 1 << 0 : 0) | ((info.whiteCastleQueenside) ? 1 << 1 : 0);
        const blackCastlingRights = ((info.blackCastleKingside) ? 1 << 2 : 0) | ((info.blackCastleQueenside) ? 1 << 3 : 0);
        const enPassantState = info.enPassantFile << 4;
        const initialGameState = whiteCastlingRights | blackCastlingRights | enPassantState;

        this.#gameStateHistory.push(initialGameState);
        this.#currentGameState = initialGameState;

        return this;
    }
}
