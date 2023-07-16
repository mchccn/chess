import { Board, Move } from "../index.js";

export type AdversaryBestMoveConfig = { signal?: AbortSignal, maxDepth?: number };

export abstract class Adversary {
    constructor(readonly board: Board) {}

    abstract bestMove(config?: AdversaryBestMoveConfig): Move;

    abstract getDiagnostics(): Record<string, unknown>;
}