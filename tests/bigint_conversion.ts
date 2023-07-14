const iterations = 10_000_000;

const bigints = Array.from({ length: iterations }, () => BigInt(Math.floor((Math.random() * Number.MAX_SAFE_INTEGER))));
const numbers = Array.from({ length: iterations }, () => Math.floor((Math.random() * Number.MAX_SAFE_INTEGER)));

const reverse = (u64: bigint) => BigInt(u64.toString(2).split("").reverse().join(""));

let aTime = 0n;
let bTime = 0n;

for (const bigint of bigints) {
    const a1 = process.hrtime.bigint();

    Number(bigint);

    const a2 = process.hrtime.bigint();

    aTime += a2 - a1;
}

for (const number of numbers) {
    const b1 = process.hrtime.bigint();

    BigInt(number);

    const b2 = process.hrtime.bigint();

    bTime += b2 - b1;
}

// number to bigint is ~7.8% faster

console.log(`bigint to number: ${iterations} bigints converted in ${aTime / 1_000_000n}ms (~${Number(BigInt(iterations) / (aTime / 1_000_000n)) * 1000} per sec)`);
console.log(`number to bigint: ${iterations} numbers converted in ${bTime / 1_000_000n}ms (~${Number(BigInt(iterations) / (bTime / 1_000_000n)) * 1000} per sec)`);