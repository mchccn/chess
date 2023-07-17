import { Adversary, Bitboard, Board, GameState, Move, MoveGenerator, Piece } from "../index.js";
import { AdversaryBestMoveConfig } from "./Adversary.js";

const PawnValue = 100;
const KnightValue = 300;
const BishopValue = 320;
const RookValue = 500;
const QueenValue = 900;

const squareControlledByOpponentPawnPenalty = 350;
const capturedPieceValueMultiplier = 10;

const immediateMateScore = 100_000;
const PositiveInf = 9_999_999;
const NegativeInf = -PositiveInf;

/** evaluates positions solely based on material, uses alpha-beta pruning and mvv-lva */
export class v01_NaiveMaterialEvaluation extends Adversary {
    #bestMove = Move.invalidMove();
    #bestEval = NegativeInf;
    #bestMoveThisIteration = Move.invalidMove();
    #bestEvalThisIteration = NegativeInf;
    #generator: MoveGenerator;
    #signal: AbortSignal | undefined;
    #repetitionHistory: bigint[];

    constructor (readonly board: Board) {
        super(board);

        this.#generator = new MoveGenerator(this.board);
        this.#repetitionHistory = [...board.repetitionHistory];
    }

    bestMove({ signal, maxDepth, debug }: AdversaryBestMoveConfig = {}): Move {
        if (debug) console.time("bestMove");

        this.#repetitionHistory = [...this.board.repetitionHistory];

        const depth = maxDepth ?? 4; // 5 is 11x slower

        this.#signal = signal;
        
        for (let d = 1; d <= depth; d++) {
            this.#bestMoveThisIteration = Move.invalidMove();
            this.#bestEvalThisIteration = NegativeInf;
            
            this.#search(d, 0, NegativeInf, PositiveInf);

            this.#bestMove = this.#bestMoveThisIteration;
            this.#bestEval = this.#bestEvalThisIteration;

            if (this.#isMateScore(this.#bestEval)) break;

            if (this.#signal?.aborted) break;
        }

        if (debug) console.timeEnd("bestMove");

        return this.#bestMove;
    }

    getDiagnostics(): Record<string, unknown> {
        return {};
    }

    #search(depth: number, plyFromRoot: number, alpha: number, beta: number): number {
        if (this.#signal?.aborted) return 0;

        this.#generator = new MoveGenerator(this.board);

        if (plyFromRoot > 0) {
            if (this.board.repetitionHistory.includes(this.board.zobristKey)) return 0;

            if (this.board.fiftyMoveCounter >= 100) return 0;

            alpha = Math.max(alpha, -immediateMateScore + plyFromRoot);
            beta = Math.min(beta, immediateMateScore - plyFromRoot);

            if (alpha >= beta) return alpha;
        }

        if (depth <= 0) return this.#evaluate(this.board);

        const moveToSearchFirst = plyFromRoot === 0 ? this.#bestMove : Move.invalidMove(); // use tt later

        const moves = this.#generator.generateMoves()
            .map((move) => [move, this.#orderScore(move)] as const)
            .sort(([am, a], [bm, b]) => Move.equals(am, moveToSearchFirst) ? PositiveInf : Move.equals(bm, moveToSearchFirst) ? NegativeInf : a - b)
            .map(([move]) => move);

        const gameState = this.board.gameState();

        if (GameState.isDraw(gameState)) return 0;

        if (moves.length === 0) {
            if (this.#generator.inCheck) {
                const mateScore = immediateMateScore - plyFromRoot;

                return -mateScore;
            }
        }

        let bestEvaluation = NegativeInf;

        for (const move of moves) {
            this.board.makeMove(move, true);
            this.#repetitionHistory.push(this.board.zobristKey);

            const evaluation = -this.#search(depth - 1, plyFromRoot + 1, -beta, -alpha);

            if (this.#signal?.aborted) return 0;

            if (evaluation > bestEvaluation) {
                bestEvaluation = evaluation;

                if (plyFromRoot === 0) {
                    this.#bestMoveThisIteration = move;
                    this.#bestEvalThisIteration = evaluation;
                }
            }

            this.#repetitionHistory.pop();
            this.board.unmakeMove(move, true);
        }

        return bestEvaluation;
    }

    #orderScore(move: Move) {
        let score = 0;

        const movedPieceType = Piece.getType(this.board.squares[move.startSquare]);
        const capturedPieceType = Piece.getType(this.board.squares[move.targetSquare]);
        const flag = move.moveFlag;

        if (capturedPieceType !== Piece.None) {
            score = capturedPieceValueMultiplier * this.#getPieceValue(capturedPieceType) - this.#getPieceValue(movedPieceType);
        }

        if (movedPieceType === Piece.Pawn) {
            if (flag === Move.Flag.PromoteToQueen) score += QueenValue;
            else if (flag === Move.Flag.PromoteToKnight) score += KnightValue;
            else if (flag === Move.Flag.PromoteToRook) score += RookValue;
            else if (flag === Move.Flag.PromoteToBishop) score += BishopValue;
        } else {
            if (Bitboard.containsSquare(this.#generator.opponentPawnAttackMap, move.targetSquare)) {
                score -= squareControlledByOpponentPawnPenalty;
            }
        }

        return score;
    }

    #isMateScore(score: number) {
        const maxDepth = 1000;

        return Math.abs(score) > immediateMateScore - maxDepth;
    }

    #evaluate(board: Board) {
        const whiteMat = this.#countMaterial(board, Board.whiteIndex);
        const blackMat = this.#countMaterial(board, Board.blackIndex);

        const score = whiteMat - blackMat;

        const sign = board.colorToMove === Piece.White ? 1 : -1;

        return score * sign;
    }

    #countMaterial(board: Board, index: 0 | 1) {
        let material = 0;

        material += board.pawns[index].count * PawnValue;
        material += board.knights[index].count * KnightValue;
        material += board.bishops[index].count * BishopValue;
        material += board.rooks[index].count * RookValue;
        material += board.queens[index].count * QueenValue;

        return material;
    }

    readonly #pieceValueLookup = [
        0,
        0,
        PawnValue,
        KnightValue,
        0,
        BishopValue,
        RookValue,
        QueenValue,
    ];

    #getPieceValue(piece: number) {
        return this.#pieceValueLookup[piece];
    }
}
