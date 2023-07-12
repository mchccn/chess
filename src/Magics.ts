import { Bitboard, BoardRepresentation, MoveData } from "./index.js";

// this engine does not use magics because computing the piece bitboards needed slows it down severely
// however, it still includes the code needed to compute and use magics

export type ComputeMagicsOptions = { logging?: boolean; radix?: number };

export class Magics {
    static #initialized = false;

    // queen not needed since you can just OR the rook and bishop masks
    static readonly rookAttackBitboards: bigint[] = [];
    static readonly bishopAttackBitboards: bigint[] = [];

    static readonly rookBlockerBitboards: bigint[][] = [];
    static readonly bishopBlockerBitboards: bigint[][] = [];

    // bigint[64][4096]
    static readonly rookMovesForSquare: bigint[][] = [];

    // bigint[64][512]
    static readonly bishopMovesForSquare: bigint[][] = [];

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

    static readonly rookMagics = [
        0x8080001082284004n, 0x540004010002002n , 0x80082000801004n  , 0x1100100100a09428n,
        0x180240008004680n , 0x1000c0002080100n , 0x100208100020004n , 0x8080008001526900n,
        0x88001400080a1n   , 0xa004101208200n   , 0x80500280a000n    , 0x411002100089000n ,
        0x4424808044000800n, 0x800401020080n    , 0x402000908640200n , 0x401a800100044080n,
        0x80004040002000n  , 0x800a404010006004n, 0x20008020100482n  , 0x9100100090410a0n ,
        0x101010010040800n , 0x40080110200440n  , 0x8c8080800a000100n, 0x1082001080c401n  ,
        0x1004400080208000n, 0x281022500400080n , 0xca00100080802000n, 0x1018008080085000n,
        0x484c80180240080n , 0x4000440080800200n, 0x2108410400020810n, 0x80500010026d082n ,
        0x8000200040014cn  , 0x440010081004360n , 0x2000100080802000n, 0x4082000812004022n,
        0x1444080080800c00n, 0x800c00800200n    , 0x101001102400a80an, 0x84282000104n     ,
        0x202080c0088004n  , 0x840002881010043n , 0x20012011050040n  , 0x1028100008008080n,
        0x1000240008008080n, 0x40100882c010012n , 0x245008900a140001n, 0x4009014504820004n,
        0x4168208004400080n, 0x4000200080400080n, 0x90200504b1204300n, 0x1002008100100n   ,
        0x12110801002500n  , 0x28400800200a480n , 0x40021001080400n  , 0x8008408412200n   ,
        0x4001204810042a2n , 0x5082804003002011n, 0x10200101c0100dn  , 0x8001002090000429n,
        0x2000420100802n   , 0x8001001804002289n, 0x4100a81020804n   , 0x12810c00802042n  ,
    ];

    static readonly bishopMagics = [
        0x4410690108008300n, 0xc410100200a02010n, 0x404102008d022020n, 0x114140080086007n ,
        0x2b0a021000080004n, 0x4412010051510n   , 0xa03a18820102020n , 0x2800820042200400n,
        0x2010201410008701n, 0x8000801080201c0n , 0x410028109c018004n, 0x8040040414808800n,
        0x40423000502n     , 0x210348c02000n    , 0x4180508841101000n, 0x208002202022000n ,
        0x14c0003010220698n, 0xa442003010020092n, 0x5020010018a0008n , 0xa0800802810020n  ,
        0x21000090401000n  , 0x2842000860842000n, 0xa2021101100300n  , 0x2401001030921000n,
        0x934048420200400n , 0xe6a00108280282n  , 0x108080214022020n , 0x8024040088009010n,
        0x81001045004000n  , 0x3020002480451n   , 0x121850024012800n , 0x84102004808412n  ,
        0x482602080300289n , 0x1004100a10046400n, 0xc0040a080100100n , 0x1221010800210040n,
        0x4020084010601a0n , 0x819020080080800n , 0x48022680040080n  , 0x809010200a22201n ,
        0x4104040268004100n, 0x802081104054860n , 0x4022282098009000n, 0x54010420200n     ,
        0x4040010a12010400n, 0x804362080a004040n, 0x111890803041982n , 0x424448202001951n ,
        0x4124020250040802n, 0x1082188601101040n, 0x1102444c4104000n , 0x1502001642022100n,
        0x402848d040008n   , 0x28410408088040n  , 0x2040a90841014000n, 0x8108089800504400n,
        0x3940405008201cn  , 0x80a003202300400n , 0x4012520111d800n  , 0x2022000080208802n,
        0x804010060a20n    , 0x408334004080480n , 0x4025842008024890n, 0x2010020281021200n,
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

    /** must call this first before computing magics or looking up moves */
    static initialize() {
        if (this.#initialized) throw new Error("magics data has already been initialized");

        for (let squareIndex = 0; squareIndex < 64; squareIndex++) {
            const rookBitboard = this.#computeAttackBitboard(squareIndex, 0, 4);
            const bishopBitboard = this.#computeAttackBitboard(squareIndex, 4, 8);

            this.rookAttackBitboards.push(rookBitboard);
            this.bishopAttackBitboards.push(bishopBitboard);

            const rookBitsSet = this.#countBitsSet(rookBitboard);
            const bishopBitsSet = this.#countBitsSet(bishopBitboard);

            this.rookBlockerBitboards[squareIndex] = [];
            this.rookMovesForSquare[squareIndex] = [];

            for (let index = 0; index < (1 << rookBitsSet); index++) {
                const rookBlockers = this.#computeBlockerBitboard(index, rookBitboard);

                this.rookBlockerBitboards[squareIndex][index] = rookBlockers;

                let rookMoves = 0n;

                //

                const key = Bitboard.overflowMultU64(rookBlockers, this.rookMagics[squareIndex]) >> this.rookShifts[squareIndex];

                this.rookMovesForSquare[squareIndex][Number(key)] = rookMoves;
            }

            this.bishopBlockerBitboards[squareIndex] = [];
            this.bishopMovesForSquare[squareIndex] = [];

            for (let index = 0; index < (1 << bishopBitsSet); index++) {
                const bishopBlockers = this.#computeBlockerBitboard(index, bishopBitboard);

                this.bishopBlockerBitboards[squareIndex][index] = bishopBlockers;

                let bishopMoves = 0n;

                //

                const key = Bitboard.overflowMultU64(bishopBlockers, this.bishopMagics[squareIndex]) >> this.bishopShifts[squareIndex];

                this.bishopMovesForSquare[squareIndex][Number(key)] = bishopMoves;
            }
        }

        this.#initialized = true;
    }

    static getQueenMoves(square: number, blockers: bigint) {
        return this.getRookMoves(square, blockers) | this.getBishopMoves(square, blockers);
    }

    static getRookMoves(square: number, blockers: bigint) {
        if (!this.#initialized) throw new Error("magics data hasn't been initialized yet");

        blockers &= this.rookAttackBitboards[square];

        const index = Bitboard.overflowMultU64(blockers, this.rookMagics[square]) >> this.rookShifts[square];

        return this.rookMovesForSquare[square][Number(index)];
    }

    static getBishopMoves(square: number, blockers: bigint) {
        if (!this.#initialized) throw new Error("magics data hasn't been initialized yet");

        blockers &= this.bishopAttackBitboards[square];

        const index = Bitboard.overflowMultU64(blockers, this.bishopMagics[square]) >> this.bishopShifts[square];

        return this.bishopMovesForSquare[square][Number(index)];
    }

    static computeRookMagics(options: ComputeMagicsOptions = {}) {
        if (!this.#initialized) throw new Error("magics data hasn't been initialized yet");

        const bestMagicsSoFar: bigint[] = [];

        for (let squareIndex = 0; squareIndex < 64; squareIndex++) {
            const blockers = this.rookBlockerBitboards[squareIndex];

            let candidate = 0n, set: Set<bigint>;

            do {
                candidate = Bitboard.randomU64() & Bitboard.randomU64() & Bitboard.randomU64();

                set = new Set(blockers.map((blocker) => Bitboard.overflowMultU64(blocker, candidate) >> this.rookShifts[squareIndex]));
            } while (set.size !== blockers.length);
            
            bestMagicsSoFar.push(candidate);

            if (options.logging) console.log(`${BoardRepresentation.squareName(squareIndex)}: ${candidate.toString(options.radix ?? 10)}`);
        }

        return bestMagicsSoFar;
    }

    static computeBishopMagics(options: ComputeMagicsOptions = {}) {
        if (!this.#initialized) throw new Error("magics data hasn't been initialized yet");

        const bestMagicsSoFar: bigint[] = [];

        for (let squareIndex = 0; squareIndex < 64; squareIndex++) {
            const blockers = this.bishopBlockerBitboards[squareIndex];

            let candidate = 0n, set: Set<bigint>;

            do {
                candidate = Bitboard.randomU64() & Bitboard.randomU64() & Bitboard.randomU64();

                set = new Set(blockers.map((blocker) => Bitboard.overflowMultU64(blocker, candidate) >> this.bishopShifts[squareIndex]));
            } while (set.size !== blockers.length);

            bestMagicsSoFar.push(candidate);

            if (options.logging) console.log(`${BoardRepresentation.squareName(squareIndex)}: ${candidate.toString(options.radix ?? 10)}`);
        }

        return bestMagicsSoFar;
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