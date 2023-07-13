import { Bitboard } from "../src/index.js";

const iterations = 1_000_000;

const randoms = Array.from({ length: iterations }, () => Bitboard.randomU64());

const reverse = (u64: bigint) => BigInt(u64.toString(2).split("").reverse().join(""));

let aTime = 0n;
let bTime = 0n;

for (const random of randoms) {
    const a1 = process.hrtime.bigint();

    const _1 = Bitboard.reverse(random);

    const a2 = process.hrtime.bigint();

    aTime += a2 - a1;

    const b1 = process.hrtime.bigint();

    const _2 = reverse(random);

    const b2 = process.hrtime.bigint();

    bTime += b2 - b1;
}

console.log(`Bitboard.reverse: ${iterations} u64's reversed in ${aTime / 1_000_000n}ms (~${Number(BigInt(iterations) / (aTime / 1_000_000n)) * 1000} per sec)`);
console.log(`str meth reverse: ${iterations} u64's reversed in ${bTime / 1_000_000n}ms (~${Number(BigInt(iterations) / (bTime / 1_000_000n)) * 1000} per sec)`);
