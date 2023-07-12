import { writeFileSync } from "fs";
import { Bitboard, BoardRepresentation, Magics } from "./index.js";

const now = Date.now();

const bestMagicsSoFar = new Array<bigint>(64).fill(-1n);

while (bestMagicsSoFar.some((x) => x < 0)) {
    for (let squareIndex = 0; squareIndex < 63; squareIndex++) {
        if (bestMagicsSoFar[squareIndex] > 0) continue;

        const candidate = Bitboard.randomU64() & Bitboard.randomU64() & Bitboard.randomU64();

        const blockers = Magics.rookBlockerBitboards[squareIndex];

        const set = new Set(blockers.map((blocker) => Bitboard.overflowMultU64(blocker, candidate) >> Magics.rookShifts[squareIndex]));

        if (set.size === Magics.rookBlockerBitboards[squareIndex].length) {
            bestMagicsSoFar[squareIndex] = candidate; 

            console.log(`${BoardRepresentation.squareName(squareIndex)}: ${candidate}`);
        }
    }
}

console.log(bestMagicsSoFar);

writeFileSync("RookMagics.txt", bestMagicsSoFar.join("\n"), "utf8");

console.log(Date.now() - now, "milliseconds");
