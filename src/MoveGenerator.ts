import { Board, BoardRepresentation, Move, Piece } from "./index.js";

export class MoveGenerator {
    static readonly directionOffsets = [8, -8, -1, 1, 7, -7, 9, -9];

    static readonly pawnAttackDirections: [number[], number[]] = [[4, 6], [7, 5]];

    static readonly knightOffsets = [15, 17, -17, -15, 10, -6, 6, -10];
    static readonly knightOffsetsForSquare: number[][] = [...Array(64).keys()].map((i) => {
        const ifile = i & 0b111;
        const irank = 7 - (i >> 3);

        return this.knightOffsets.filter((offset) => {
            const j = i + offset;

            if (j < 0 || j > 63) return false;

            const jfile = j & 0b111;
            const jrank = 7 - (j >> 3);

            const distance = Math.max(Math.abs(ifile - jfile), Math.abs(irank - jrank));

            return distance === 2;
        });
    });

    // king moves one square in every direction
    static readonly kingOffsets = this.directionOffsets;
    static readonly kingOffsetsForSquare: number[][] = [...Array(64).keys()].map((i) => {
        const ifile = i & 0b111;
        const irank = 7 - (i >> 3);

        return this.kingOffsets.filter((offset) => {
            const j = i + offset;

            if (j < 0 || j > 63) return false;

            const jfile = j & 0b111;
            const jrank = 7 - (j >> 3);

            const distance = Math.max(Math.abs(ifile - jfile), Math.abs(irank - jrank));

            return distance === 1;
        });
    });

    
    static readonly squaresToEdge: [
        north : number,
        south : number,
        west  : number,
        east  : number,
        minNW : number,
        minSE : number, 
        minNE : number,
        minSW : number,
    ][] = [...Array(64).keys()].map((i) => {
        const north = 7 - (i >> 3);
        const south = i >> 3;
        const west = i & 0b111;
        const east = 7 - (i & 0b111);

        return [
            north, south, west, east,
            Math.min(north, west),
            Math.min(south, east),
            Math.min(north, east),
            Math.min(south, west),
        ];
    });

    static generateMoves(board: Board, allowPseudoLegal = false): Move[] {
        const moves: Move[] = [];

        for (let startSquare = 0; startSquare < 64; startSquare++) {
            const piece = board.squares[startSquare];

            // skip if there is no piece or the piece is an enemy piece
            if (piece === Piece.None || !Piece.isColor(piece, board.colorToMove)) continue;

            // rook, bishop, queen
            if (Piece.isSlidingPiece(piece)) moves.push(...this.#generateSlidingMoves(board, startSquare, piece));
            if (Piece.isType(piece, Piece.Knight)) moves.push(...this.#generateKnightMoves(board, startSquare));
            if (Piece.isType(piece, Piece.King)) moves.push(...this.#generateKingMoves(board, startSquare));
            if (Piece.isType(piece, Piece.Pawn)) moves.push(...this.#generatePawnMoves(board, startSquare));
        }

        if (allowPseudoLegal) return moves;

        return moves.filter((move) => {
            board.makeMove(move);

            const legal = this.generateMoves(board, true).every((move) => board.squares[move.targetSquare] !== ((board.colorToMove === Piece.White ? Piece.Black : Piece.White) | Piece.King));

            board.unmakeMove(move);

            return legal;
        });

        // return moves;
    }

    static #generateSlidingMoves(board: Board, startSquare: number, piece: number) {
        const moves: Move[] = [];

        const startIndex = Piece.isType(piece, Piece.Bishop) && !Piece.isType(piece, Piece.Queen) ? 4 : 0;
        const endIndex = Piece.isType(piece, Piece.Rook) && !Piece.isType(piece, Piece.Queen) ? 4 : 8;

        for (let i = startIndex; i < endIndex; i++) {
            for (let n = 0; n < this.squaresToEdge[startSquare][i]; n++) {
                const targetSquare = startSquare + this.directionOffsets[i] * (n + 1);
                const pieceOnTarget = board.squares[targetSquare];

                // blocked by friendly piece
                if (pieceOnTarget !== Piece.None && Piece.isColor(pieceOnTarget, board.colorToMove)) break;

                moves.push(new Move(startSquare, targetSquare));

                // captured enemy piece
                if (pieceOnTarget !== Piece.None && !Piece.isColor(pieceOnTarget, board.colorToMove)) break;
            }
        }

        return moves;
    }

    static #generateKnightMoves(board: Board, startSquare: number) {
        const moves: Move[] = [];
        
        for (const offset of this.knightOffsetsForSquare[startSquare]) {
            const targetSquare = startSquare + offset;
            const pieceOnTarget = board.squares[targetSquare];

            // can't move here if it's a friendly piece
            if (pieceOnTarget !== Piece.None && Piece.isColor(pieceOnTarget, board.colorToMove)) continue;

            moves.push(new Move(startSquare, targetSquare));
        }

        return moves;
    }

    static #generateKingMoves(board: Board, startSquare: number) {
        const moves: Move[] = [];

        for (const offset of this.kingOffsetsForSquare[startSquare]) {
            const targetSquare = startSquare + offset;
            const pieceOnTarget = board.squares[targetSquare];

            // can't move here if it's a friendly piece
            if (pieceOnTarget !== Piece.None && Piece.isColor(pieceOnTarget, board.colorToMove)) continue;

            moves.push(new Move(startSquare, targetSquare));

            // check castling
            const hasKingsideCastleRight  = (board.currentGameState & (board.colorToMove === Piece.White ? 0b0001 : 0b0100)) !== 0;
            const hasQueensideCastleRight = (board.currentGameState & (board.colorToMove === Piece.White ? 0b0010 : 0b1000)) !== 0;

            if ((targetSquare === BoardRepresentation.f1 || targetSquare === BoardRepresentation.f8) && hasKingsideCastleRight) {
                const kingsideSquare = targetSquare + 1;

                if (board.squares[kingsideSquare] === Piece.None) {
                    // need to check kingsideSquare is under attack too
                    moves.push(new Move(startSquare, kingsideSquare, Move.Flag.Castling));
                }
            }

            if ((targetSquare === BoardRepresentation.d1 || targetSquare === BoardRepresentation.d8) && hasQueensideCastleRight) {
                const queensideSquare = targetSquare - 1;

                if (board.squares[queensideSquare] === Piece.None && board.squares[queensideSquare - 1] === Piece.None) {
                    // need to check if queensideSquare is under attack too
                    moves.push(new Move(startSquare, queensideSquare, Move.Flag.Castling));
                }
            }
        }

        return moves;
    }

    static #generatePawnMoves(board: Board, startSquare: number) {
        const moves: Move[] = [];

        const whiteToMove         = board.colorToMove === Piece.White;
        const colorToMoveIndex    = whiteToMove ? Board.whiteIndex : Board.blackIndex;

        const pawnOffset          = whiteToMove ? 8 : -8;
        const startRank           = whiteToMove ? 1 :  6;
        const rankBeforePromotion = whiteToMove ? 6 :  1;

        const enPassantFile       = ((board.currentGameState >> 4) & 0b1111) - 1;
        const enPassantSquare     = enPassantFile === -1 ? -1 : (8 * (whiteToMove ? 5 : 2)) + enPassantFile;

        const rank                = BoardRepresentation.rankIndex(startSquare);
        const isAboutToPromote    = rank === rankBeforePromotion;

        const oneSquareForward    = startSquare + pawnOffset;

        if (board.squares[oneSquareForward] === Piece.None) {
            if (isAboutToPromote) {
                moves.push(...this.#generatePromotionMoves(startSquare, oneSquareForward));
            } else {
                moves.push(new Move(startSquare, oneSquareForward));
            }

            // double pawn push if it hasn't been moved
            if (rank === startRank) {
                const twoSquareForward = oneSquareForward + pawnOffset;

                if (board.squares[twoSquareForward] === Piece.None) {
                    moves.push(new Move(startSquare, twoSquareForward, Move.Flag.DoublePawnPush));
                }
            }
        }

        for (let dir = 0; dir < 2; dir++) {
            if (this.squaresToEdge[startSquare][this.pawnAttackDirections[colorToMoveIndex][dir]] > 0) {
                const pawnCaptureDir = this.directionOffsets[this.pawnAttackDirections[colorToMoveIndex][dir]];
                const targetSquare   = startSquare + pawnCaptureDir;
                const targetPiece    = board.squares[targetSquare];

                if (targetPiece && !Piece.isColor(targetPiece, board.colorToMove)) {
                    if (isAboutToPromote) {
                        moves.push(...this.#generatePromotionMoves(startSquare, targetSquare));
                    } else {
                        moves.push(new Move(startSquare, targetSquare));
                    }
                }

                if (targetSquare === enPassantSquare) {
                    // const capturedPawnSquare = targetSquare + (whiteToMove ? -8 : 8);

                    moves.push(new Move(startSquare, targetSquare, Move.Flag.EnPassantCapture));
                }
            }
        }

        return moves;
    }

    static #generatePromotionMoves(startSquare: number, targetSquare: number) {
        const moves: Move[] = [];

        moves.push(new Move(startSquare, targetSquare, Move.Flag.PromoteToQueen));
        moves.push(new Move(startSquare, targetSquare, Move.Flag.PromoteToRook));
        moves.push(new Move(startSquare, targetSquare, Move.Flag.PromoteToBishop));
        moves.push(new Move(startSquare, targetSquare, Move.Flag.PromoteToKnight));

        return moves;
    }
}