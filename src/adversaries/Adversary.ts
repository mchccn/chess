import { Board, Move } from "../index.js";

export abstract class Adversary {
    abstract bestMove(board: Board): Move;
}