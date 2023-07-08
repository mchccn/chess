export class Piece {
    static readonly None   = 0b00000;
    static readonly King   = 0b00001;
    static readonly Pawn   = 0b00010;
    static readonly Knight = 0b00011;
    static readonly Bishop = 0b00101;
    static readonly Rook   = 0b00110;
    static readonly Queen  = 0b00111;

    static readonly White  = 0b01000;
    static readonly Black  = 0b10000;

    static #typeMask       = 0b00111;
    static #colorMask      = 0b11000;

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
        return (piece & 0b110) === 0b110;
    }

    static isBishopOrQueen(piece: number) {
        return (piece & 0b101) === 0b101;
    }

    static isSlidingPiece(piece: number) {
        return (piece & 0b100) !== 0;
    }
}
