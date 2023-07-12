export class Bitboard {
    static containsSquare(bitboard: bigint, square: number) {
        return ((bitboard >> BigInt(square)) & 1n) !== 0n;
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