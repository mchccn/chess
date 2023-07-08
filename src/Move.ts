import { BoardRepresentation } from "./BoardRepresentation.js";
import { Piece } from "./Piece.js";

export class Move {
    static readonly Flag = {
        None             : 0b0000,
        EnPassantCapture : 0b0001,
        Castling         : 0b0010,
        DoublePawnPush   : 0b0011,
        PromoteToQueen   : 0b0100,
        PromoteToKnight  : 0b0101,
        PromoteToRook    : 0b0110,
        PromoteToBishop  : 0b0111,
    } as const;

    static readonly #startSquareMask  = 0b0000000000111111;
    static readonly #targetSquareMask = 0b0000111111000000;

    readonly #bits: number;

    constructor(start: number, target: number, flag = 0) {
        this.#bits = start | target << 6 | flag << 12;
    }

    get startSquare() {
        return this.#bits & Move.#startSquareMask;
    }

    get targetSquare() {
        return (this.#bits & Move.#targetSquareMask) >> 6;
    }

    get moveFlag() {
        return this.#bits >> 12;
    }

    get isPromotion() {
        return (this.#bits >> 12 & 0b0100) === 0b0100;
    }

    get promotionPieceType() {
        if (!this.isPromotion) return Piece.None;

        return {
            
        }[this.moveFlag];
    }

    get bits() {
        return this.#bits;
    }

    get isInvalid() {
        return this.#bits === 0;
    }

    get name() {
        return BoardRepresentation.squareName(this.startSquare) + BoardRepresentation.squareName(this.targetSquare);
    }

    static equals(a: Move, b: Move) {
        return a.#bits === b.#bits;
    }

    static invalidMove() {
        return new Move(0, 0, 0);
    }
}