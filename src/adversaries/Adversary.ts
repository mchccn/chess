import { Board, Move } from "../index.js";

export abstract class Adversary {
    constructor(readonly board: Board) {}

    abstract bestMove(): Move;
}