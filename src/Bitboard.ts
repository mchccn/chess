export class Bitboard {
    static containsSquare(bitboard: bigint, square: number) {
        return ((bitboard >> BigInt(square)) & 1n) !== 0n;
    }
}