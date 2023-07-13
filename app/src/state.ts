import { Board, Move, MoveGenerator } from "../../dist/index.js";

const board = new Board().loadStartingPosition();

export const state = {
    board,
    selected: -1,
    legalMoves: new MoveGenerator(board).generateMoves(),
    movesMade: [] as Move[],
    gameOver: false,
};