import { Board, MoveGenerator } from "../index.js";
import { Move } from "../Move.js";
import { Adversary } from "./Adversary.js";

export class v00_Random extends Adversary {
    bestMove(board: Board): Move {
        const moves = new MoveGenerator(board).generateMoves();

        const move = moves[Math.floor(Math.random() * moves.length)] ?? Move.invalidMove;

        return move;
    }
}