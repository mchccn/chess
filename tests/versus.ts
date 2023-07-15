import { appendFileSync, readFileSync, readdirSync } from "fs";
import { Adversary, Board, GameState, Piece } from "../src/index.js";

const alreadyPlayed = readFileSync("tests/versus.txt", "utf8").split("\n").map((match) => match.split(":")[0]);

const engines = await Promise.all(
    readdirSync("src/adversaries", "utf8")
        .filter((name) => name !== "Adversary.ts")
        .map((name) => import(`../src/adversaries/${name}`)
            .then((mod) => mod[name.slice(0, -".ts".length)])
        )
);

const toAppend: string[] = [];

for (const white of engines) {
    for (const black of engines) {
        if (alreadyPlayed.includes(`${white.name} vs ${black.name}`)) continue;

        const playerWhite = new white() as Adversary;
        const playerBlack = new black() as Adversary;

        const gameResults: number[] = [];

        for (let gameNumber = 0; gameNumber < 1000; gameNumber++) {
            console.log(`playing game: #${gameNumber + 1}`);

            const board = new Board().loadStartingPosition();

            while (board.gameState() === GameState.Playing) {
                board.makeMove(
                    board.colorToMove === Piece.White
                        ? playerWhite.bestMove(board)
                        : playerBlack.bestMove(board)
                );
            }

            const state = board.gameState();

            gameResults.push(state);

            console.log(`${white.name} vs ${black.name} result: ${GameState.getName(state)}`);
        }

        toAppend.push(`${white.name} vs ${black.name}: ${
            gameResults.filter((x) => x === GameState.WhiteCheckmatedBlack).length
        } wins | ${
            gameResults.filter((x) => GameState.isDraw(x)).length
        } draws | ${
            gameResults.filter((x) => x === GameState.BlackCheckmatedWhite).length
        } losses`);
    }
}

appendFileSync("tests/versus.txt", toAppend.join("\n"), "utf8");
