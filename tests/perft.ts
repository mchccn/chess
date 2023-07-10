import { Board, MoveGenerator } from "../src/index.js";

const tests = {
    ["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"                ]: [1, 20, 400  , 8_902 , 197_281  ],
    ["r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1"    ]: [1, 48, 2039 , 97_862, 4_085_603],
    ["8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1"                               ]: [1, 14, 191  , 2_812 , 43_238   ],
    ["r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1"        ]: [1, 6 , 264  , 9467  , 422_333  ],
    ["r2q1rk1/pP1p2pp/Q4n2/bbp1p3/Np6/1B3NBn/pPPP1PPP/R3K2R b KQ - 0 1 "       ]: [1, 6 , 264  , 9467  , 422_333  ],
    ["rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8"               ]: [1, 44, 1_486, 62_379, 2_103_487],
    ["r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10"]: [1, 46, 2_079, 89_890, 3_894_594],
};

function perft(board: Board, depth: number) {
    if (depth === 0) return 1;

    let nodes = 0;

    const moves = MoveGenerator.generateMoves(board);

    for (const move of moves) {
        board.makeMove(move);

        nodes += perft(board, depth - 1);
        
        board.unmakeMove(move);
    }

    return nodes;
}

let failed = 0;
let passed = 0;

Object.entries(tests).forEach(([fen, nodes]) => {
    const board = new Board().loadPosition(fen);

    for (let depth = 0; depth < nodes.length; depth++) {
        const expected = nodes[depth];
        const then     = process.hrtime.bigint();
        const actual   = perft(board, depth);
        const now      = process.hrtime.bigint();

        if (expected !== actual) {
            console.log(`❌ TEST FAILED (depth ${depth}) [${expected} ≠ ${actual}] {${(now - then) / 1_000_000n}ms}`);
            console.log("❌ position: " + fen);
            console.log("❌ expected: " + expected);
            console.log("❌ actual: " + actual);

            failed++;
        } else {
            console.log(`✅ TEST PASSED (depth ${depth}) [${expected} = ${actual}] {${(now - then) / 1_000_000n}ms}`);

            passed++;
        }

        console.log();
    }
});

console.log(`📋 TEST RESULTS`);
console.log(`✅ ${passed} test${passed === 1 ? "" : "s"} passed`);
console.log(`❌ ${failed} test${failed === 1 ? "" : "s"} failed`);
