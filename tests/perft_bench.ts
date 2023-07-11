import { Board, MoveGenerator } from "../src/index.js";

const tests = [
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"                ,
    "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1"    ,
    "8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1"                               ,
    "r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1"        ,
    "r2q1rk1/pP1p2pp/Q4n2/bbp1p3/Np6/1B3NBn/pPPP1PPP/R3K2R b KQ - 0 1 "       ,
    "rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8"               ,
    "r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10",
];

function perft(board: Board, depth: number) {
    if (depth === 0) return 1;

    let nodes = 0;

    const moves = new MoveGenerator(board).generateMoves();

    for (const move of moves) {
        board.makeMove(move);

        nodes += perft(board, depth - 1);
        
        board.unmakeMove(move);
    }

    return nodes;
}

let time   = 0n;
let total  = 0n;
let limit  = 4;
let iters  = Number(process.argv[2]) || 10;

console.log("working...");

for (let i = 0; i < iters; i++) {
    tests.forEach((fen) => {
        const board = new Board().loadPosition(fen);

        for (let depth = 0; depth < limit; depth++) {
            const then     = process.hrtime.bigint();
            const actual   = perft(board, depth);
            const now      = process.hrtime.bigint();

            time  += now - then;
            total += BigInt(actual);
        }
    });
}

console.log(`📋 TEST RESULTS`);
console.log(`ℹ️ ${total} nodes found in ${time}ns (~${Number(total / (time / 1_000_000n)) * 1000} nps)`);