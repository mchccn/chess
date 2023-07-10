import { Board, BoardRepresentation, Move, MoveData, Piece } from "./index.js";

export class MoveGenerator {
    readonly #board: Board;
    readonly #moves: Move[];

    constructor(board: Board) {
        this.#board = board;
        this.#moves = [];
    }

    generateMoves() {
        this.#moves.length = 0;

        for (let startSquare = 0; startSquare < 64; startSquare++) {
            const piece = this.#board.squares[startSquare];

            // skip if there is no piece or the piece is an enemy piece
            if (piece === Piece.None || !Piece.isColor(piece, this.#board.colorToMove)) continue;

                 if (Piece.isType(piece, Piece.Rook  )) this.#generateSlidingMoves(startSquare, 0, 4);
            else if (Piece.isType(piece, Piece.Bishop)) this.#generateSlidingMoves(startSquare, 4, 8);
            else if (Piece.isType(piece, Piece.Queen )) this.#generateSlidingMoves(startSquare, 0, 8);
            else if (Piece.isType(piece, Piece.Knight)) this.#generateKnightMoves (startSquare      );
            else if (Piece.isType(piece, Piece.King  )) this.#generateKingMoves   (startSquare      );
            else if (Piece.isType(piece, Piece.Pawn  )) this.#generatePawnMoves   (startSquare      );
        }

        return Object.freeze([...this.#moves]);
    }

    #generateSlidingMoves(startSquare: number, startIndex: number, endIndex: number) {
        for (let i = startIndex; i < endIndex; i++) {
            for (let n = 0; n < MoveData.squaresToEdge[startSquare][i]; n++) {
                const targetSquare = startSquare + MoveData.directionOffsets[i] * (n + 1);
                const pieceOnTarget = this.#board.squares[targetSquare];

                // blocked by friendly piece
                if (pieceOnTarget !== Piece.None && Piece.isColor(pieceOnTarget, this.#board.colorToMove)) break;

                this.#moves.push(new Move(startSquare, targetSquare));

                // captured enemy piece
                if (pieceOnTarget !== Piece.None && !Piece.isColor(pieceOnTarget, this.#board.colorToMove)) break;
            }
        }
    }

    #generateKnightMoves(startSquare: number) {
        for (const offset of MoveData.knightOffsetsForSquare[startSquare]) {
            const targetSquare = startSquare + offset;
            const pieceOnTarget = this.#board.squares[targetSquare];

            // can't move here if it's a friendly piece
            if (pieceOnTarget !== Piece.None && Piece.isColor(pieceOnTarget, this.#board.colorToMove)) continue;

            this.#moves.push(new Move(startSquare, targetSquare));
        }
    }

    #generateKingMoves(startSquare: number) {
        for (const offset of MoveData.kingOffsetsForSquare[startSquare]) {
            const targetSquare = startSquare + offset;
            const pieceOnTarget = this.#board.squares[targetSquare];

            // can't move here if it's a friendly piece
            if (pieceOnTarget !== Piece.None && Piece.isColor(pieceOnTarget, this.#board.colorToMove)) continue;

            this.#moves.push(new Move(startSquare, targetSquare));

            // check castling
            const hasKingsideCastleRight  = (this.#board.currentGameState & (this.#board.colorToMove === Piece.White ? 0b0001 : 0b0100)) !== 0;
            const hasQueensideCastleRight = (this.#board.currentGameState & (this.#board.colorToMove === Piece.White ? 0b0010 : 0b1000)) !== 0;

            if ((targetSquare === BoardRepresentation.f1 || targetSquare === BoardRepresentation.f8) && hasKingsideCastleRight) {
                const kingsideSquare = targetSquare + 1;

                if (this.#board.squares[kingsideSquare] === Piece.None) {
                    // need to check kingsideSquare is under attack too
                    this.#moves.push(new Move(startSquare, kingsideSquare, Move.Flag.Castling));
                }
            }

            if ((targetSquare === BoardRepresentation.d1 || targetSquare === BoardRepresentation.d8) && hasQueensideCastleRight) {
                const queensideSquare = targetSquare - 1;

                if (this.#board.squares[queensideSquare] === Piece.None && this.#board.squares[queensideSquare - 1] === Piece.None) {
                    // need to check if queensideSquare is under attack too
                    this.#moves.push(new Move(startSquare, queensideSquare, Move.Flag.Castling));
                }
            }
        }
    }

    #generatePawnMoves(startSquare: number) {
        const whiteToMove         = this.#board.colorToMove === Piece.White;
        const colorToMoveIndex    = whiteToMove ? Board.whiteIndex : Board.blackIndex;

        const pawnOffset          = whiteToMove ? 8 : -8;
        const startRank           = whiteToMove ? 1 :  6;
        const rankBeforePromotion = whiteToMove ? 6 :  1;

        const enPassantFile       = ((this.#board.currentGameState >> 4) & 0b1111) - 1;
        const enPassantSquare     = enPassantFile === -1 ? -1 : (8 * (whiteToMove ? 5 : 2)) + enPassantFile;

        const rank                = BoardRepresentation.rankIndex(startSquare);
        const isAboutToPromote    = rank === rankBeforePromotion;

        const oneSquareForward    = startSquare + pawnOffset;

        if (this.#board.squares[oneSquareForward] === Piece.None) {
            if (isAboutToPromote) {
                this.#generatePromotionMoves(startSquare, oneSquareForward);
            } else {
                this.#moves.push(new Move(startSquare, oneSquareForward));
            }

            // double pawn push if it hasn't been moved
            if (rank === startRank) {
                const twoSquareForward = oneSquareForward + pawnOffset;

                if (this.#board.squares[twoSquareForward] === Piece.None) {
                    this.#moves.push(new Move(startSquare, twoSquareForward, Move.Flag.DoublePawnPush));
                }
            }
        }

        for (let dir = 0; dir < 2; dir++) {
            if (MoveData.squaresToEdge[startSquare][MoveData.pawnAttackDirections[colorToMoveIndex][dir]] > 0) {
                const pawnCaptureDir = MoveData.directionOffsets[MoveData.pawnAttackDirections[colorToMoveIndex][dir]];
                const targetSquare   = startSquare + pawnCaptureDir;
                const targetPiece    = this.#board.squares[targetSquare];

                if (targetPiece && !Piece.isColor(targetPiece, this.#board.colorToMove)) {
                    if (isAboutToPromote) {
                        this.#generatePromotionMoves(startSquare, targetSquare);
                    } else {
                        this.#moves.push(new Move(startSquare, targetSquare));
                    }
                }

                if (targetSquare === enPassantSquare) {
                    // const capturedPawnSquare = targetSquare + (whiteToMove ? -8 : 8);

                    this.#moves.push(new Move(startSquare, targetSquare, Move.Flag.EnPassantCapture));
                }
            }
        }
    }

    #generatePromotionMoves(startSquare: number, targetSquare: number) {
        this.#moves.push(new Move(startSquare, targetSquare, Move.Flag.PromoteToQueen));
        this.#moves.push(new Move(startSquare, targetSquare, Move.Flag.PromoteToRook));
        this.#moves.push(new Move(startSquare, targetSquare, Move.Flag.PromoteToBishop));
        this.#moves.push(new Move(startSquare, targetSquare, Move.Flag.PromoteToKnight));
    }
}