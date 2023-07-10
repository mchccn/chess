import { spawn } from "child_process";
import { readFileSync } from "fs";
import path from "path";
import url from "url";
import { Board, FEN, Move, MoveGenerator } from "../src/index.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const lines      = readFileSync(path.join(__dirname, "perft_divide.txt"), "utf8").split("\n");

const position   =        lines[0] ;
const ogdepth    = Number(lines[1]);

const stockfish  = spawn("stockfish").on("error", console.error);

function perft_divide(board: Board, depth: number, root?: true): Record<string, number>;
function perft_divide(board: Board, depth: number, root: false): number;
function perft_divide(board: Board, depth: number, root = true) {
    if (depth === 0) return 1;

    let nodes = 0;

    const divide: Record<string, number> = {};

    const moves = new MoveGenerator(board).generateMoves();

    for (const move of moves) {
        board.makeMove(move);

        const result = perft_divide(board, depth - 1, false);

        if (root) divide[move.name] = perft_divide(board, depth - 1, false);
        else nodes += result;
        
        board.unmakeMove(move);
    }

    return root ? divide : nodes;
}

(async function compare(position: string, depth: number) {
    console.log(`perft_divide: depth=${depth} position=${position}`);

    const board = new Board().loadPosition(position);

    const stockfishDivide = await new Promise<Record<string, number>>((resolve, reject) => {
        stockfish.on("error", reject);

        const chunks: string[] = [];

        stockfish.stdout.on("data", function handler(data) {
            const raw = data.toString();

            chunks.push(raw);

            if (raw.includes("Nodes searched: ")) {
                stockfish.off("error", resolve);
                stockfish.stdout.off("data", handler);
                
                resolve(Object.fromEntries(
                    [...chunks.join("\n").matchAll(/^\w+: \d+$/gm)]
                        .map((match) => match[0].split(": "))
                        .map(([key, value]) => [key, Number(value)]),
                ));
            }
        });

        stockfish.stdin.write(`position fen ${position}\n`);
        stockfish.stdin.write(`go perft ${depth}\n`);
    });

    const stockfishMoves = Object.keys(stockfishDivide).sort();

    const stockfishTotal = stockfishMoves.reduce((total, key) => total + stockfishDivide[key], 0);

    console.log(`expected: moves=${stockfishMoves.length} perft=${stockfishTotal}`);

    const ourDivide = perft_divide(board, depth);

    const ourMoves = Object.keys(ourDivide).sort();

    const ourTotal = ourMoves.reduce((total, key) => total + ourDivide[key], 0);

    console.log(`actual: moves=${ourMoves.length} perft=${ourTotal}`);

    const extraneousMoves = ourMoves.filter((move) => !stockfishMoves.includes(move));
    const missedMoves = stockfishMoves.filter((move) => !ourMoves.includes(move));

    if (extraneousMoves.length || missedMoves.length) {
        console.log(`compare: depth=${depth} position=${position}`);
        console.log(`compare: extraneous-moves=${extraneousMoves.length} missed-moves=${missedMoves.length}`);
        console.log(`extraneous moves: ${extraneousMoves.join(", ") || "-"}`);
        console.log(`missed moves: ${missedMoves.join(", ") || "-"}`)
    } else {
        if (depth === 0) return;

        for (const lan of stockfishMoves) {
            if (ourDivide[lan] !== stockfishDivide[lan]) {
                console.log(`for move ${lan}: with-position=${position}`);
                console.log(`for move ${lan}: expected=${stockfishDivide[lan]} actual=${ourDivide[lan]}`);

                const move = Move.parseMove(lan, board);

                board.makeMove(move);

                await compare(FEN.toFENString(board), depth - 1);

                board.unmakeMove(move);
            }
        }
    }

    // kill stockfish to exit process
    if (depth === ogdepth) stockfish.kill();
})(position, ogdepth);
