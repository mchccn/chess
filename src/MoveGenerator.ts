import { Bitboard, Board, BoardRepresentation, Move, MoveData, Piece } from "./index.js";

const drop: (ident: any) => asserts ident is never = (ident: any) => void ident;

export type MoveGeneratorOptions = { excludeQuietMoves?: boolean };

export class MoveGenerator {
    readonly #board: Board;
    readonly #moves: Move[];

    #whiteToMove: boolean;
    #friendlyColor: number;
    #opponentColor: number;

    #friendlyKingSquare: number;

    #friendlyColorIndex: 0 | 1;
    #opponentColorIndex: 0 | 1;

    #inCheck = false;
    #inDoubleCheck = false;
    #pinsExistInPosition = false;

    #checkRayBitmask = 0n;
    #pinRayBitmask = 0n;
    #opponentKnightAttacks = 0n;
    #opponentAttackMapNoPawns = 0n;
    #opponentAttackMap = 0n;
    #opponentPawnAttackMap = 0n;
    #opponentSlidingAttackMap = 0n;

    #options: MoveGeneratorOptions = {};

    constructor(board: Board) {
        this.#board = board;
        this.#moves = [];

        this.#whiteToMove = board.colorToMove === Piece.White;

        this.#friendlyColor = board.colorToMove;
        this.#opponentColor = board.colorToMove === Piece.White ? Piece.Black : Piece.White;

        this.#friendlyColorIndex = this.#whiteToMove ? Board.whiteIndex : Board.blackIndex;
        this.#opponentColorIndex = (1 - this.#friendlyColorIndex) as 0 | 1;

        this.#friendlyKingSquare = board.kingSquare[this.#friendlyColorIndex];
    }

    generateMoves(options: MoveGeneratorOptions = {}) {
        this.#options = {
            excludeQuietMoves: false,
            ...options
        };

        drop(options);

        this.#moves.length = 0;

        this.#computeAttacks();

        this.#generateKingMoves();

        // only need king moves if in double check
        if (this.#inDoubleCheck) return Object.freeze([...this.#moves]);

        this.#generateSlidingMoves();

        this.#generateKnightMoves();

        this.#generatePawnMoves();

        return Object.freeze([...this.#moves]);
    }

    #generateSlidingMoves() {
        for (const rookSquare of this.#board.rooks[this.#friendlyColorIndex].squares)
            this.#generateSlidingPieceMoves(rookSquare, 0, 4);

        for (const bishopSquare of this.#board.bishops[this.#friendlyColorIndex].squares)
            this.#generateSlidingPieceMoves(bishopSquare, 4, 8);

        for (const queenSquare of this.#board.queens[this.#friendlyColorIndex].squares)
            this.#generateSlidingPieceMoves(queenSquare, 0, 8);
    }

    #generateSlidingPieceMoves(startSquare: number, startIndex: number, endIndex: number) {
        const isPinned = this.#isPinned(startSquare);

        if (this.#inCheck && isPinned) return;

        for (let i = startIndex; i < endIndex; i++) {
            const dirOffset = MoveData.directionOffsets[i];

            if (isPinned && !this.#isAlongRay(dirOffset, this.#friendlyKingSquare, startSquare)) continue;

            for (let n = 0; n < MoveData.squaresToEdge[startSquare][i]; n++) {
                const targetSquare = startSquare + dirOffset * (n + 1);
                const pieceOnTarget = this.#board.squares[targetSquare];

                // blocked by friendly piece
                if (Piece.isColor(pieceOnTarget, this.#board.colorToMove)) break;

                const isCapture     = pieceOnTarget !== Piece.None;
                const preventsCheck = this.#inCheckRay(targetSquare);
                
                if (!this.#inCheck || preventsCheck) {
                    if (!this.#options.excludeQuietMoves || isCapture) {
                        this.#moves.push(new Move(startSquare, targetSquare));
                    }
                }

                // captured enemy piece, or if it blocked a check
                if (isCapture || preventsCheck) break;
            }
        }
    }

    #generateKnightMoves() {
        for (const startSquare of this.#board.knights[this.#friendlyColorIndex].squares) {
            if (this.#isPinned(startSquare)) continue;
            
            for (const offset of MoveData.knightOffsetsForSquare[startSquare]) {
                const targetSquare = startSquare + offset;
                const pieceOnTarget = this.#board.squares[targetSquare];

                const isCapture = Piece.isColor(pieceOnTarget, this.#opponentColor);

                if (!this.#options.excludeQuietMoves || isCapture) {
                    if (Piece.isColor(pieceOnTarget, this.#friendlyColor) || (this.#inCheck && !this.#inCheckRay(targetSquare))) continue;

                    this.#moves.push(new Move(startSquare, targetSquare));
                }
            }
        }
    }

    #generateKingMoves() {
        for (const offset of MoveData.kingOffsetsForSquare[this.#friendlyKingSquare]) {
            const targetSquare = this.#friendlyKingSquare + offset;
            const pieceOnTarget = this.#board.squares[targetSquare];

            // can't move here if it's a friendly piece
            if (pieceOnTarget !== Piece.None && Piece.isColor(pieceOnTarget, this.#friendlyColor)) continue;

            const isCapture = Piece.isColor(pieceOnTarget, this.#opponentColor);

            // can't move into check ray unless it is a capture
            if (!isCapture && (this.#options.excludeQuietMoves || this.#inCheckRay(targetSquare))) continue;

            if (!this.#squareIsAttacked(targetSquare)) {
                this.#moves.push(new Move(this.#friendlyKingSquare, targetSquare));

                // check castling
                if (!this.#inCheck && !isCapture) {
                    const hasKingsideCastleRight  = (this.#board.currentGameState & (this.#whiteToMove ? 0b0001 : 0b0100)) !== 0;
                    const hasQueensideCastleRight = (this.#board.currentGameState & (this.#whiteToMove ? 0b0010 : 0b1000)) !== 0;

                    // kingside
                    if ((targetSquare === BoardRepresentation.f1 || targetSquare === BoardRepresentation.f8) && hasKingsideCastleRight) {
                        const kingsideSquare = targetSquare + 1;

                        if (this.#board.squares[kingsideSquare] === Piece.None && !this.#squareIsAttacked(kingsideSquare)) {
                            this.#moves.push(new Move(this.#friendlyKingSquare, kingsideSquare, Move.Flag.Castling));
                        }
                    }

                    // queenside
                    if ((targetSquare === BoardRepresentation.d1 || targetSquare === BoardRepresentation.d8) && hasQueensideCastleRight) {
                        const queensideSquare = targetSquare - 1;

                        if (this.#board.squares[queensideSquare] === Piece.None &&
                            this.#board.squares[queensideSquare - 1] === Piece.None &&
                            !this.#squareIsAttacked(queensideSquare)
                        ) {
                            this.#moves.push(new Move(this.#friendlyKingSquare, queensideSquare, Move.Flag.Castling));
                        }
                    }
                }
            }
        }
    }

    #generatePawnMoves() {
        const whiteToMove         = this.#board.colorToMove === Piece.White;
        const colorToMoveIndex    = whiteToMove ? Board.whiteIndex : Board.blackIndex;

        const pawnOffset          = whiteToMove ? 8 : -8;
        const startRank           = whiteToMove ? 1 :  6;
        const rankBeforePromotion = whiteToMove ? 6 :  1;

        const enPassantFile       = ((this.#board.currentGameState >> 4) & 0b1111) - 1;
        const enPassantSquare     = enPassantFile === -1 ? -1 : (8 * (whiteToMove ? 5 : 2)) + enPassantFile;

        for (const startSquare of this.#board.pawns[this.#friendlyColorIndex].squares) {
            const rank                = BoardRepresentation.rankIndex(startSquare);
            const isAboutToPromote    = rank === rankBeforePromotion;

            if (!this.#options.excludeQuietMoves) {
                const oneSquareForward = startSquare + pawnOffset;

                if (this.#board.squares[oneSquareForward] === Piece.None) {
                    if (!this.#isPinned(startSquare) || this.#isAlongRay(pawnOffset, startSquare, this.#friendlyKingSquare)) {
                        if (!this.#inCheck || this.#inCheckRay(oneSquareForward)) {
                            if (isAboutToPromote) {
                                this.#generatePromotionMoves(startSquare, oneSquareForward);
                            } else {
                                this.#moves.push(new Move(startSquare, oneSquareForward));
                            }
                        }

                        // double pawn push if it hasn't been moved
                        if (rank === startRank) {
                            const twoSquareForward = oneSquareForward + pawnOffset;

                            if (this.#board.squares[twoSquareForward] === Piece.None) {
                                if (!this.#inCheck || this.#inCheckRay(twoSquareForward)) {
                                    this.#moves.push(new Move(startSquare, twoSquareForward, Move.Flag.DoublePawnPush));
                                }
                            }
                        }
                    }
                }
            }

            for (let dir = 0; dir < 2; dir++) {
                if (MoveData.squaresToEdge[startSquare][MoveData.pawnAttackDirections[colorToMoveIndex][dir]] > 0) {
                    const pawnCaptureDir = MoveData.directionOffsets[MoveData.pawnAttackDirections[colorToMoveIndex][dir]];
                    const targetSquare   = startSquare + pawnCaptureDir;
                    const targetPiece    = this.#board.squares[targetSquare];

                    if (this.#isPinned(startSquare) && !this.#isAlongRay(pawnCaptureDir, this.#friendlyKingSquare, startSquare))
                        continue;    

                    if (targetPiece && !Piece.isColor(targetPiece, this.#board.colorToMove)) {
                        if (this.#inCheck && !this.#inCheckRay(targetSquare)) continue;

                        if (isAboutToPromote) {
                            this.#generatePromotionMoves(startSquare, targetSquare);
                        } else {
                            this.#moves.push(new Move(startSquare, targetSquare));
                        }
                    }

                    if (targetSquare === enPassantSquare) {
                        const capturedPawnSquare = targetSquare + (whiteToMove ? -8 : 8);

                        if (!this.#inCheckAfterEnPassant(startSquare, targetSquare, capturedPawnSquare)) {
                            this.#moves.push(new Move(startSquare, targetSquare, Move.Flag.EnPassantCapture));
                        }
                    }
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

    #isAlongRay(rayDir: number, startSquare: number, targetSquare: number) {
        const moveDir = MoveData.directionLookup[targetSquare - startSquare + 63];

        return rayDir === moveDir || -rayDir === moveDir;
    }

    #isPinned(square: number) {
        return this.#pinsExistInPosition && Bitboard.containsSquare(this.#pinRayBitmask, square);
    }

    #inCheckRay(square: number) {
        return this.#inCheck && Bitboard.containsSquare(this.#checkRayBitmask, square);
    }

    #squareIsAttacked(square: number) {
        return Bitboard.containsSquare(this.#opponentAttackMap, square);
    }

    #inCheckAfterEnPassant(startSquare: number, targetSquare: number, enPassantCapturedSquare: number) {
        this.#board.squares_mut[targetSquare           ] = this.#board.squares[startSquare];
        this.#board.squares_mut[startSquare            ] = Piece.None;
        this.#board.squares_mut[enPassantCapturedSquare] = Piece.None;

        const inCheckAfterCapture = this.#squareAttackedAfterEnPassant(enPassantCapturedSquare, startSquare);

        this.#board.squares_mut[targetSquare           ] = Piece.None;
        this.#board.squares_mut[startSquare            ] = this.#friendlyColor | Piece.Pawn;
        this.#board.squares_mut[enPassantCapturedSquare] = this.#opponentColor | Piece.Pawn;

        return inCheckAfterCapture;
    }

    #squareAttackedAfterEnPassant(enPassantCapturedSquare: number, startSquare: number) {
        if (Bitboard.containsSquare(this.#opponentAttackMapNoPawns, this.#friendlyKingSquare))
            return true; // don't need to check if we're already in check

        const dirIndex = enPassantCapturedSquare < this.#friendlyKingSquare ? 2 : 3;

        for (let n = 0; n < MoveData.squaresToEdge[this.#friendlyKingSquare][dirIndex]; n++) {
            const squareIndex = this.#friendlyKingSquare + MoveData.directionOffsets[dirIndex] * (n + 1);

            const piece = this.#board.squares[squareIndex];

            if (piece === Piece.None) continue;

            if (Piece.isColor(piece, this.#friendlyColor)) break;

            if (Piece.isRookOrQueen(piece)) return true;
            else break; // piece can't move in this direction
        }

        // pawn attack map unavailable since it has been captured
        for (let i = 0; i < 2; i++) {
            if (MoveData.squaresToEdge[this.#friendlyKingSquare][MoveData.pawnAttackDirections[this.#friendlyColorIndex][i]] > 0) {
                const piece = this.#board.squares[this.#friendlyKingSquare + MoveData.directionOffsets[MoveData.pawnAttackDirections[this.#friendlyColorIndex][i]]];

                // is attacked by enemy pawn
                if (piece === (this.#opponentColor | Piece.Pawn)) return true;
            }
        }

        return false;
    }

    #computeAttacks() {
        this.#computeSlidingAttackMap();

        // if there are enemy queens or rooks left, it should start at 0 (otherwise 4)
        const startDirIndex =
            this.#board.queens[this.#opponentColorIndex].count !== 0 ||
            this.#board.rooks [this.#opponentColorIndex].count !== 0 ? 0 : 4;

        // if there are enemy queens or bishops left, it should end at 8 (otherwise 4)
        const endDirIndex =
            this.#board.queens[this.#opponentColorIndex].count !== 0 ||
            this.#board.bishops[this.#opponentColorIndex].count !== 0 ? 8 : 4;

        for (let dir = startDirIndex; dir < endDirIndex; dir++) {
            const isDiagonal = dir >= 4;

            const n      = MoveData.squaresToEdge[this.#friendlyKingSquare][dir];
            const offset = MoveData.directionOffsets[dir];
            
            let friendlyPieceInRay = false;
            let rayMask            = 0n;

            for (let i = 0; i < n; i++) {
                const squareIndex = this.#friendlyKingSquare + offset * (i + 1);
                
                rayMask |= 1n << BigInt(squareIndex);

                const piece = this.#board.squares[squareIndex];

                if (piece === Piece.None) continue;

                if (Piece.isColor(piece, this.#friendlyColor)) {
                    if (!friendlyPieceInRay) friendlyPieceInRay = true;
                    else break; // second friendly piece in ray, so it is not a pin

                    continue;
                }

                const pieceType = Piece.getType(piece);

                if ((isDiagonal && Piece.isBishopOrQueen(pieceType)) || (!isDiagonal && Piece.isRookOrQueen(pieceType))) {
                    if (friendlyPieceInRay) {
                        this.#pinsExistInPosition = true;

                        this.#pinRayBitmask |= rayMask;
                    } else {
                        this.#checkRayBitmask |= rayMask;
                        
                        this.#inDoubleCheck = this.#inCheck; // if already in check, then it's a double check

                        this.#inCheck = true;
                    }
                } else break // enemy piece cannot move in this direction
            }

            if (this.#inDoubleCheck) break; // stop searching if there is a double check (only king can move)
        }

        this.#opponentKnightAttacks = 0n;

        let isKnightCheck = false;

        for (const startSquare of this.#board.knights[this.#opponentColorIndex].squares) {
            this.#opponentKnightAttacks |= MoveData.knightAttackBitboards[startSquare];

            if (!isKnightCheck && Bitboard.containsSquare(this.#opponentKnightAttacks, this.#friendlyKingSquare)) {
                isKnightCheck = true;

                this.#inDoubleCheck = this.#inCheck; // if already in check, then it's a double check

                this.#inCheck = true;

                this.#checkRayBitmask |= 1n << BigInt(startSquare);
            }
        }

        this.#opponentPawnAttackMap = 0n;

        let isPawnCheck = false;

        for (const startSquare of this.#board.pawns[this.#opponentColorIndex].squares) {
            const pawnAttacks = MoveData.pawnAttackBitboards[startSquare][this.#opponentColorIndex];

            this.#opponentPawnAttackMap |= pawnAttacks;

            if (!isPawnCheck && Bitboard.containsSquare(pawnAttacks, this.#friendlyKingSquare)) {
                isPawnCheck = true;

                this.#inDoubleCheck = this.#inCheck; // if already in check, then it's a double check

                this.#inCheck = true;

                this.#checkRayBitmask |= 1n << BigInt(startSquare);
            }
        }

        const enemyKingSquare = this.#board.kingSquare[this.#opponentColorIndex];

        this.#opponentAttackMapNoPawns = this.#opponentSlidingAttackMap | this.#opponentKnightAttacks | MoveData.kingAttackBitboards[enemyKingSquare];
        this.#opponentAttackMap = this.#opponentAttackMapNoPawns | this.#opponentPawnAttackMap;
    }

    #computeSlidingAttackMap() {
        this.#opponentSlidingAttackMap = 0n;

        for (const rookSquare of this.#board.rooks[this.#opponentColorIndex].squares)
            this.#computeSlidingAttack(rookSquare, 0, 4);

        for (const bishopSquare of this.#board.bishops[this.#opponentColorIndex].squares)
            this.#computeSlidingAttack(bishopSquare, 4, 8);

        for (const queenSquare of this.#board.queens[this.#opponentColorIndex].squares)
            this.#computeSlidingAttack(queenSquare, 0, 8);
    }

    #computeSlidingAttack(startSquare: number, startDirIndex: number, endDirIndex: number) {
        for (let dir = startDirIndex; dir < endDirIndex; dir++) {
            const offset = MoveData.directionOffsets[dir];

            for (let n = 0; n < MoveData.squaresToEdge[startSquare][dir]; n++) {
                const targetSquare = startSquare + offset * (n + 1);
                const targetSquarePiece = this.#board.squares[targetSquare];

                this.#opponentSlidingAttackMap |= 1n << BigInt(targetSquare);

                if (targetSquare !== this.#friendlyKingSquare && targetSquarePiece !== Piece.None) break;
            }
        }
    }
}