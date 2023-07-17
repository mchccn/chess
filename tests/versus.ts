import { appendFileSync, readFileSync, readdirSync } from "fs";
import { Adversary, Board, GameState, Piece } from "../src/index.js";

const alreadyPlayed = readFileSync("tests/versus.txt", "utf8")
    .split("\n")
    .filter((line) => line.startsWith("#"))
    .map((match) => match.split(":")[0]);

const engines = await Promise.all(
    readdirSync("src/adversaries", { encoding: "utf8", withFileTypes: true })
        .filter(
            (dirent) => !dirent.isDirectory() && dirent.name !== "Adversary.ts",
        )
        .map((dirent) =>
            import(`../src/adversaries/${dirent.name}`).then(
                (mod) => mod[dirent.name.slice(0, -".ts".length)],
            ),
        ),
);

// even number, divide by 2 to get the number of positions to play
const games = 1000;

const matches = readFileSync("matches.txt", "utf8")
    .split("\n")
    .map((line) => line.split(" ").slice(2).join(" "))
    .slice(0, games / 2);

const toAppend: string[] = [];

function playGame(
    fen: string,
    playerWhite: new (board: Board) => Adversary,
    playerBlack: new (board: Board) => Adversary,
) {
    const board = new Board().loadPosition(fen);

    const white = new playerWhite(board);
    const black = new playerBlack(board);

    // sometimes engines get stuck in a never-ending game... so we stop at 300 ply and move on
    while (board.gameState() === GameState.Playing && board.plyCount < 300) {
        board.makeMove(
            board.colorToMove === Piece.White
                ? white.bestMove()
                : black.bestMove(),
        );
    }

    const state = board.gameState();

    const result = state === GameState.Playing ? GameState.Timeout : state;

    console.log(
        `${playerWhite.constructor.name} vs ${
            playerBlack.constructor.name
        } result: ${GameState.getName(result)}`,
    );

    return result;
}

for (let aIndex = 0; aIndex < engines.length - 1; aIndex++) {
    for (let bIndex = aIndex + 1; bIndex < engines.length; bIndex++) {
        const a = engines[aIndex];
        const b = engines[bIndex];

        if (
            alreadyPlayed.includes(`${a.name} vs ${b.name}`) ||
            alreadyPlayed.includes(`${b.name} vs ${a.name}`)
        )
            continue;

        console.log(`--- ${a.name} vs ${b.name} ---`);

        let wins = 0;
        let draws = 0;
        let losses = 0;

        for (let matchNumber = 0; matchNumber < games / 2; matchNumber++) {
            console.log(`playing game: #${matchNumber * 2 + 1} (${a.name} vs ${b.name})`);

            const gameOne = playGame(matches[matchNumber], a, b);

            GameState.isDraw(gameOne)
                ? draws++
                : gameOne === GameState.WhiteCheckmatedBlack
                ? wins++
                : gameOne === GameState.BlackCheckmatedWhite
                ? losses++
                : 0;

            console.log(`playing game: #${(matchNumber + 1) * 2} (${b.name} vs ${a.name})`);

            const gameTwo = playGame(matches[matchNumber], b, a);

            GameState.isDraw(gameTwo)
                ? draws++
                : gameTwo === GameState.WhiteCheckmatedBlack
                ? wins++
                : gameTwo === GameState.BlackCheckmatedWhite
                ? losses++
                : 0;
        }

        toAppend.push(
            `${a.name} vs ${b.name}: ${wins} wins | ${draws} draws | ${losses} losses`,
        );
    }
}

appendFileSync("tests/versus.txt", toAppend.join("\n"), "utf8");
