// ordered specifically this way to get around circular dependencies

// no dependencies (load these first)
export { Bitboard } from "./Bitboard.js";
export { BoardRepresentation } from "./BoardRepresentation.js";
export { GameState } from "./GameState.js";
export { Piece } from "./Piece.js";
export { PieceList } from "./PieceList.js";

// heavily referenced by the remaining files, so has to be loaded first
export { Board, type BoardOptions } from "./Board.js";
export { MoveData } from "./MoveData.js";


// yes dependencies
export { FEN, type FENInfo } from "./FEN.js";
export { Magics, type ComputeMagicsOptions } from "./Magics.js";
export { Move } from "./Move.js";
export { MoveGenerator, type MoveGeneratorOptions } from "./MoveGenerator.js";
export { Zobrist } from "./Zobrist.js";
export { Adversary, type AdversaryBestMoveConfig } from "./adversaries/Adversary.js";
