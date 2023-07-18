export class Bitboard {
    static containsSquare(bitboard: bigint, square: number) {
        return ((bitboard >> BigInt(square)) & 1n) !== 0n;
    }

    static readonly #bitScanMagic = 0x07edd5e59a4e28c2n;

    // table[(x & -x) * magic >> 58]
    static readonly #bitScanTable = [
        63,  0, 58,  1, 59, 47, 53,  2,
        60, 39, 48, 27, 54, 33, 42,  3,
        61, 51, 37, 40, 49, 18, 28, 20,
        55, 30, 34, 11, 43, 14, 22,  4,
        62, 57, 46, 52, 38, 26, 32, 41,
        50, 36, 17, 19, 29, 10, 13, 21,
        56, 45, 25, 31, 35, 16,  9, 12,
        44, 24, 15,  8, 23,  7,  6,  5,
    ];

    // utilized for being able to overflow
    static readonly #u64 = new BigUint64Array(1);

    static popLSB(bitboard: bigint) {
        this.#u64[0]   = bitboard;
        this.#u64[0]  &= -bitboard;
        this.#u64[0]  *= this.#bitScanMagic;
        this.#u64[0] >>= 58n;

        return [
            bitboard & (bitboard - 1n),
            this.#bitScanTable[Number(this.#u64[0])],
        ] as [bitboard: bigint, index: number];
    }

    static overflowMultU64(a: bigint, b: bigint) {
        this.#u64[0]  = a;
        this.#u64[0] *= b;

        return this.#u64[0];
    }

    static randomU64() {
        // in-browser implementation
        if (typeof window !== "undefined") {
            const array = new Uint8Array(8);

            for (let i = 0; i < 8; i++) array[i] = Math.floor(Math.random() * 256);

            return new DataView(array.buffer).getBigUint64(0);
        }

        // nodejs implementation
        const array = [];

        for (let i = 0; i < 8; i++) array.push(Math.floor(Math.random() * 256))

        return Buffer.from(array).readBigUInt64BE();
    }
}