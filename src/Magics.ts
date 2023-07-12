import { Bitboard, BoardRepresentation, MoveData } from "./index.js";



export class Magics {
    // queen not needed since you can just AND the rook and bishop masks
    static readonly rookAttackBitboards: bigint[] = [];
    static readonly bishopAttackBitboards: bigint[] = [];

    static readonly rookBlockerBitboards: bigint[][] = [];
    static readonly bishopBlockerBitboards: bigint[][] = [];

    static readonly rookShifts = [
        52n, 53n, 53n, 53n, 53n, 53n, 53n, 52n,
        53n, 54n, 54n, 54n, 54n, 54n, 54n, 53n,
        53n, 54n, 54n, 54n, 54n, 54n, 54n, 53n,
        53n, 54n, 54n, 54n, 54n, 54n, 54n, 53n,
        53n, 54n, 54n, 54n, 54n, 54n, 54n, 53n,
        53n, 54n, 54n, 54n, 54n, 54n, 54n, 53n,
        53n, 54n, 54n, 54n, 54n, 54n, 54n, 53n,
        52n, 53n, 53n, 53n, 53n, 53n, 53n, 52n,
    ];

    static readonly bishopShifts = [
        58n, 59n, 59n, 59n, 59n, 59n, 59n, 58n,
        59n, 59n, 59n, 59n, 59n, 59n, 59n, 59n,
        59n, 59n, 57n, 57n, 57n, 57n, 59n, 59n,
        59n, 59n, 57n, 55n, 55n, 57n, 59n, 59n,
        59n, 59n, 57n, 55n, 55n, 57n, 59n, 59n,
        59n, 59n, 57n, 57n, 57n, 57n, 59n, 59n,
        59n, 59n, 59n, 59n, 59n, 59n, 59n, 59n,
        58n, 59n, 59n, 59n, 59n, 59n, 59n, 58n,
    ];

    static readonly boardCornerMask = BigInt("0b\
        01111110\
        11111111\
        11111111\
        11111111\
        11111111\
        11111111\
        11111111\
        01111110\
    ".replaceAll(" ", ""));

    static readonly boardEdgeMask = BigInt("0b\
        10000001\
        01111110\
        01111110\
        01111110\
        01111110\
        01111110\
        01111110\
        10000001\
    ".replaceAll(" ", ""));

    static readonly fileA = 0x0101010101010101n;
    static readonly rank1 = 0x00000000000000ffn;

    static {
        for (let squareIndex = 0; squareIndex < 64; squareIndex++) {
            const rookBitboard = this.#computeAttackBitboard(squareIndex, 0, 4);
            const bishopBitboard = this.#computeAttackBitboard(squareIndex, 4, 8);

            this.rookAttackBitboards.push(rookBitboard);
            this.bishopAttackBitboards.push(bishopBitboard);

            const rookBitsSet = this.#countBitsSet(rookBitboard);
            const bishopBitsSet = this.#countBitsSet(bishopBitboard);

            this.rookBlockerBitboards[squareIndex] = [];

            for (let index = 0; index < (1 << rookBitsSet); index++) {
                this.rookBlockerBitboards[squareIndex][index] = this.#computeBlockerBitboard(index, rookBitboard);
            }

            this.bishopBlockerBitboards[squareIndex] = [];

            for (let index = 0; index < (1 << bishopBitsSet); index++) {
                this.bishopBlockerBitboards[squareIndex][index] = this.#computeBlockerBitboard(index, bishopBitboard);
            }
        }
    }

    static #computeBlockerBitboard(index: number, bitboard: bigint) {
        const bits = this.#countBitsSet(bitboard);

        let blockers = 0n;
        
        for (let i = 0, j = 0; i < bits; i++) {
            [bitboard, j] = Bitboard.popLSB(bitboard);

            if (index & (1 << i)) blockers |= 1n << BigInt(j);
        }

        return blockers;
    }

    static #countBitsSet(v: bigint) {
        let count;

        for (count = 0; v; count++) v &= v - 1n;

        return count;
    }
 
    static #computeAttackBitboard(startSquare: number, startIndex: number, endIndex: number) {
        let attackBitboard = 0n;

        const startFile = BoardRepresentation.fileIndex(startSquare);
        const startRank = BoardRepresentation.rankIndex(startSquare);

        let pruneEdgeMask = this.boardEdgeMask;

        // add back edges if the start square is on the edge
        if (startFile === 0 || startFile === 7) pruneEdgeMask |= this.fileA << BigInt(startFile);
        if (startRank === 0 || startRank === 7) pruneEdgeMask |= this.rank1 << (8n * BigInt(startRank));

        for (let i = startIndex; i < endIndex; i++) {
            const dirOffset = MoveData.directionOffsets[i];

            for (let n = 0; n < MoveData.squaresToEdge[startSquare][i]; n++) {
                const targetSquare = startSquare + dirOffset * (n + 1);

                attackBitboard |= 1n << BigInt(targetSquare);
            }
        }

        attackBitboard &= pruneEdgeMask;
        attackBitboard &= this.boardCornerMask;

        return attackBitboard;
    }
}