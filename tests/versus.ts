import { appendFileSync, readFileSync, readdirSync } from "fs";
import { Adversary, Board, GameState, Piece } from "../src/index.js";

const alreadyPlayed = readFileSync("tests/versus.txt", "utf8").split("\n").map((match) => match.split(":")[0]);

const engines = await Promise.all(
    readdirSync("src/adversaries", { encoding: "utf8", withFileTypes: true })
        .filter((dirent) => !dirent.isDirectory() && dirent.name !== "Adversary.ts")
        .map((dirent) => import(`../src/adversaries/${dirent.name}`)
            .then((mod) => mod[dirent.name.slice(0, -".ts".length)])
        )
);

const toAppend: string[] = [];

for (const white of engines) {
    for (const black of engines) {
        if (alreadyPlayed.includes(`${white.name} vs ${black.name}`)) continue;
        
        const gameResults: number[] = [];
        
        for (let gameNumber = 0; gameNumber < 1000; gameNumber++) {
            console.log(`playing game: #${gameNumber + 1}`);
            
            const board = new Board().loadStartingPosition();
    
            const playerWhite = new white(board) as Adversary;
            const playerBlack = new black(board) as Adversary;

            while (board.gameState() === GameState.Playing) {
                board.makeMove(
                    board.colorToMove === Piece.White
                        ? playerWhite.bestMove()
                        : playerBlack.bestMove()
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
