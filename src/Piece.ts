export class Piece {
    static readonly None = 0;
    static readonly King = 1;
    static readonly Pawn = 2;
    static readonly Knight = 3;
    static readonly Bishop = 4;
    static readonly Rook = 5;
    static readonly Queen = 6;

    static readonly White = 8;
    static readonly Black = 16;

    static #typeMask = 7;
    static #colorMask = 24;

    static isColor(piece: number, color: number) {
        return this.getColor(piece) === color;
    }

    static getColor(piece: number) {
        return piece & this.#colorMask;
    }

    static getType(piece: number) {
        return piece & this.#typeMask;
    }

    static isRookOrQueen(piece: number) {
        return (piece & 6) === 6;
    }

    static isBishopOrQueen(piece: number) {
        return (piece & 5) === 5;
    }

    static isSlidingPiece(piece: number) {
        return (piece & 4) !== 0;
    }
}
