import { appendFileSync, readFileSync, readdirSync } from "fs";
import { Adversary, Board, GameState, Piece } from "../src/index.js";

const alreadyPlayed = readFileSync("tests/versus.txt", "utf8")
    .split("\n")
    .filter((line) => line.startsWith("#"))
    .map((match) => match.split(":")[0]);

const engines = await Promise.all(
    readdirSync("src/adversaries", { encoding: "utf8", withFileTypes: true })
        .filter((dirent) => !dirent.isDirectory() && dirent.name !== "Adversary.ts")
        .map((dirent) => import(`../src/adversaries/${dirent.name}`)
            .then((mod) => mod[dirent.name.slice(0, -".ts".length)])
        )
);

const matches = readFileSync("matches.txt", "utf8").split("\n").map((line) => line.split(" ")[2]);

const toAppend: string[] = [];

function playGame(fen: string, playerWhite: Adversary, playerBlack: Adversary) {
    const board = new Board().loadPosition(fen);
    
    while (board.gameState() === GameState.Playing) {
        board.makeMove(
            board.colorToMove === Piece.White
                ? playerWhite.bestMove()
                : playerBlack.bestMove()
        );
    }

    const state = board.gameState();

    console.log(`${playerWhite.constructor.name} vs ${playerBlack.constructor.name} result: ${GameState.getName(state)}`);

    return state;
}

for (let aIndex = 0; aIndex < engines.length - 1; aIndex++) {
    for (let bIndex = aIndex + 1; bIndex < engines.length; bIndex ++) {
        const a = engines[aIndex];
        const b = engines[bIndex];

        if (alreadyPlayed.includes(`${a.name} vs ${b.name}`) ||
            alreadyPlayed.includes(`${b.name} vs ${a.name}`)) continue;
        
        let wins = 0;
        let draws = 0;
        let losses = 0;

        for (let matchNumber = 0; matchNumber < 500; matchNumber++) {
            console.log(`playing game: #${matchNumber * 2}`);
 
            const gameOne = playGame(matches[matchNumber], new a() as Adversary, new b() as Adversary);

            GameState.isDraw(gameOne) ? draws++ :
            gameOne === GameState.WhiteCheckmatedBlack ? wins++ :
            gameOne === GameState.BlackCheckmatedWhite ? losses++ : 0;

            console.log(`playing game: #${matchNumber * 2 + 1}`);
 
            const gameTwo = playGame(matches[matchNumber], new b() as Adversary, new a() as Adversary);

            GameState.isDraw(gameTwo) ? draws++ :
            gameTwo === GameState.WhiteCheckmatedBlack ? wins++ :
            gameTwo === GameState.BlackCheckmatedWhite ? losses++ : 0;
        }

        toAppend.push(`${a.name} vs ${b.name}: ${wins} wins | ${draws} draws | ${losses} losses`);
    }
}

appendFileSync("tests/versus.txt", toAppend.join("\n"), "utf8");
