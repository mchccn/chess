import { FEN } from "./FEN.js";
import { Piece } from "./Piece.js";

export class Board {
    #sideToMove = 0;
    #squares = new Array<number>(64).fill(0);
    #plyCount = 0;
    #fiftyMoveCounter = 0;

    #gameStateHistory: number[] = [];
    #currentGameState = 0;

    constructor () {}

    get squares() {
        return [...this.#squares];
    }

    loadStartingPosition() {
        this.loadPosition(FEN.startingPosition);
    }

    loadPosition(fen: string) {
        const info = FEN.fromFENString(fen);

        this.#squares = info.squares;
        this.#sideToMove = info.sideToMove;
        this.#plyCount = info.fullmoves * 2 + (info.sideToMove === Piece.White ? 0 : 1);
        this.#fiftyMoveCounter = info.halfmoves;

        const whiteCastlingRights = ((info.whiteCastleKingside) ? 1 << 0 : 0) | ((info.whiteCastleQueenside) ? 1 << 1 : 0);
        const blackCastlingRights = ((info.blackCastleKingside) ? 1 << 2 : 0) | ((info.blackCastleQueenside) ? 1 << 3 : 0);
        const enPassantState = info.enPassantFile << 4;
        const initialGameState = whiteCastlingRights | blackCastlingRights | enPassantState;

        this.#gameStateHistory.push(initialGameState);
        this.#currentGameState = initialGameState;
    }
}
