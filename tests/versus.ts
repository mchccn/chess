import { writeFileSync } from "fs";
import { Adversary, Board, GameState, Piece } from "../src/index.js";

const engineNamePlayingAsWhite = process.argv[2];
const engineNamePlayingAsBlack = process.argv[3];

if (!engineNamePlayingAsWhite || !engineNamePlayingAsBlack) {
    console.log("missing engine name");

    process.exit(1);
}

const enginePlayingAsWhite = (await import(`../dist/adversaries/${engineNamePlayingAsWhite}.js`))[engineNamePlayingAsWhite];
const enginePlayingAsBlack = (await import(`../dist/adversaries/${engineNamePlayingAsBlack}.js`))[engineNamePlayingAsBlack];

const playerWhite = new enginePlayingAsWhite() as Adversary;
const playerBlack = new enginePlayingAsBlack() as Adversary;

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

    console.log(`result: ${GameState.getName(state)}`);
}

writeFileSync(`${engineNamePlayingAsWhite}_vs_${engineNamePlayingAsBlack}.txt`, `\
${gameResults.filter((x) => x === GameState.WhiteCheckmatedBlack).length} wins | ${gameResults.filter((x) => GameState.isDraw(x)).length} draws | ${gameResults.filter((x) => x === GameState.BlackCheckmatedWhite).length} losses
game states: ${gameResults.join(", ")}
state names: ${gameResults.map((x) => GameState.getName(x)).join(", ")}
`, "utf8");
