import { BoardRepresentation, MoveData } from "./index.js";

export class Magics {
    // queen not needed since you can just AND the rook and bishop masks
    static readonly rookAttackBitboards: bigint[] = [];
    static readonly bishopAttackBitboards: bigint[] = [];

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

    static readonly fileA = BigInt("0x0101010101010101");
    static readonly rank1 = BigInt("0x00000000000000ff");

    static {
        for (let squareIndex = 0; squareIndex < 64; squareIndex++) {
            this.rookAttackBitboards.push(this.#computeAttackBitboard(squareIndex, 0, 4));
            this.bishopAttackBitboards.push(this.#computeAttackBitboard(squareIndex, 4, 8));
        }
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