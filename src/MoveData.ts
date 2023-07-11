import { Board } from "./index.js";

export class MoveData {
    static readonly directionOffsets = [8, -8, -1, 1, 7, -7, 9, -9];

    static readonly pawnAttackDirections: [number[], number[]] = [[4, 6], [7, 5]];

    static readonly knightAttackBitboards: bigint[] = [];
    static readonly knightOffsets = [15, 17, -17, -15, 10, -6, 6, -10];
    static readonly knightOffsetsForSquare: number[][] = [...Array(64).keys()].map((squareIndex) => {
        const ifile = squareIndex & 0b111;
        const irank = 7 - (squareIndex >> 3);

        let knightBitboard = 0n;

        const offsets = this.knightOffsets.filter((offset) => {
            const destinationIndex = squareIndex + offset;

            if (destinationIndex < 0 || destinationIndex > 63) return false;

            const jfile = destinationIndex & 0b111;
            const jrank = 7 - (destinationIndex >> 3);

            const distance = Math.max(Math.abs(ifile - jfile), Math.abs(irank - jrank));

            // knight can't move more than 2 squares vertically or horizontally
            const valid = distance === 2;

            if (valid) {
                knightBitboard |= 1n << BigInt(destinationIndex);

                return true;
            }

            return false;
        });

        this.knightAttackBitboards[squareIndex] = knightBitboard;

        return offsets;
    });

    static readonly kingAttackBitboards: bigint[] = [];
    static readonly kingOffsets = this.directionOffsets;
    static readonly kingOffsetsForSquare: number[][] = [...Array(64).keys()].map((squareIndex) => {
        const ifile = squareIndex & 0b111;
        const irank = 7 - (squareIndex >> 3);

        this.kingAttackBitboards[squareIndex] = 0n;

        return this.kingOffsets.filter((offset) => {
            const destinationIndex = squareIndex + offset;

            if (destinationIndex < 0 || destinationIndex > 63) return false;

            const jfile = destinationIndex & 0b111;
            const jrank = 7 - (destinationIndex >> 3);

            const distance = Math.max(Math.abs(ifile - jfile), Math.abs(irank - jrank));

            // king moves one square in every direction
            const valid = distance === 1;

            if (valid) {
                this.kingAttackBitboards[squareIndex] |= 1n << BigInt(destinationIndex);

                return true;
            }

            return false;
        });
    });

    static readonly pawnAttacksWhite: number[][] = [];
    static readonly pawnAttacksBlack: number[][] = [];
    static readonly pawnAttackBitboards: [bigint, bigint][] = [...Array(64).keys()].map((squareIndex) => {
        const file = squareIndex & 0b111;
        const rank = 7 - (squareIndex >> 3);

        const whiteCaptures: number[] = [];
        const blackCaptures: number[] = [];

        const bitboards: [bigint, bigint] = [0n, 0n];

        if (file > 0) {
            if (rank < 7) {
                whiteCaptures.push(squareIndex + 7);
                bitboards[Board.whiteIndex] |= 1n << BigInt(squareIndex + 7);
            }
            if (rank > 0) {
                blackCaptures.push(squareIndex - 9);
                bitboards[Board.blackIndex] |= 1n << BigInt(squareIndex - 9);
            }
        }

        if (file < 7) {
            if (rank < 7) {
                whiteCaptures.push(squareIndex + 9);
                bitboards[Board.whiteIndex] |= 1n << BigInt(squareIndex + 9);
            }
            if (rank > 0) {
                blackCaptures.push(squareIndex - 7);
                bitboards[Board.blackIndex] |= 1n << BigInt(squareIndex - 7);
            }
        }

        this.pawnAttacksWhite[squareIndex] = whiteCaptures;
        this.pawnAttacksBlack[squareIndex] = blackCaptures;

        return bitboards;
    });

    static readonly directionLookup = [...Array(127).keys()].map((difference) => {
        const offset         = difference - 63;
        const absoluteOffset = Math.abs(offset);
        const absoluteDir    =
            absoluteOffset % 9 === 0 ? 9 :
            absoluteOffset % 8 === 0 ? 8 :
            absoluteOffset % 7 === 0 ? 7 : 1;

        return absoluteDir * Math.sign(offset);
    });
    
    static readonly squaresToEdge: [
        north : number,
        south : number,
        west  : number,
        east  : number,
        minNW : number,
        minSE : number, 
        minNE : number,
        minSW : number,
    ][] = [...Array(64).keys()].map((i) => {
        const north = 7 - (i >> 3);
        const south = i >> 3;
        const west = i & 0b111;
        const east = 7 - (i & 0b111);

        return [
            north, south, west, east,
            Math.min(north, west),
            Math.min(south, east),
            Math.min(north, east),
            Math.min(south, west),
        ];
    });
}