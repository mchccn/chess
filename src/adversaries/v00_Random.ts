import { Board, MoveGenerator } from "../index.js";
import { Move } from "../Move.js";
import { Adversary } from "./Adversary.js";

/** plays moves at random */
export class v00_Random extends Adversary {
    constructor(readonly board: Board) { super(board); }

    bestMove(): Move {
        const moves = new MoveGenerator(this.board).generateMoves();

        const move = moves[Math.floor(Math.random() * moves.length)] ?? Move.invalidMove;

        return move;
    }
}