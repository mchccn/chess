import { writeFileSync } from "fs";
import { Bitboard, BoardRepresentation, Magics } from "./index.js";

const now = Date.now();

const bestMagicsSoFar = new Array<bigint>(64).fill(-1n);

while (bestMagicsSoFar.some((x) => x < 0)) {
    for (let squareIndex = 0; squareIndex < 63; squareIndex++) {
        if (bestMagicsSoFar[squareIndex] > 0) continue;

        const candidate = Bitboard.randomU64() & Bitboard.randomU64() & Bitboard.randomU64();

        const blockers = Magics.bishopBlockerBitboards[squareIndex];

        const set = new Set(blockers.map((blocker) => Bitboard.overflowMultU64(blocker, candidate) >> Magics.bishopShifts[squareIndex]));

        if (set.size === Magics.bishopBlockerBitboards[squareIndex].length) {
            bestMagicsSoFar[squareIndex] = candidate; 

            console.log(`${BoardRepresentation.squareName(squareIndex)}: ${candidate}`);
        }
    }
}

console.log(bestMagicsSoFar);

writeFileSync("BishopMagics.txt", bestMagicsSoFar.join("\n"), "utf8");

console.log(Date.now() - now, "milliseconds");
