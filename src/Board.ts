import { BoardRepresentation, FEN, GameState, Move, MoveGenerator, Piece, PieceList, Zobrist } from "./index.js";

export type BoardOptions = { disableTakingTurns: boolean };

export class Board {
    static readonly whiteIndex               = 0;
    static readonly blackIndex               = 1;

    static readonly whiteCastleKingsideMask  = 0b1111111111111110;
    static readonly whiteCastleQueensideMask = 0b1111111111111101;
    static readonly blackCastleKingsideMask  = 0b1111111111111011;
    static readonly blackCastleQueensideMask = 0b1111111111110111;

    static readonly whiteCastleMask          = this.whiteCastleKingsideMask & this.whiteCastleQueensideMask;
    static readonly blackCastleMask          = this.blackCastleKingsideMask & this.blackCastleQueensideMask;

    #squares = new Array<number>(64).fill(0);
    
    #colorToMove = 0;
    
    #plyCount = 0;

    /** counted in ply, so when it reaches 100 the game is a draw */
    #fiftyMoveCounter = 0;

    /** 7 | 3 | 4 | 4  - 0000000 | 000 | 0000 | 0000 - fifty move counter (in ply) | captured piece type | en passant file | castling rights */
    #currentGameState = 0;

    #gameStateHistory: number[] = [];

    #zobristKey = 0n;

    #repetitionHistory: bigint[] = [];

    readonly kingSquare: [number, number]       = [-1, -1];
    readonly pawns     : [PieceList, PieceList] = [new PieceList(), new PieceList()];
    readonly queens    : [PieceList, PieceList] = [new PieceList(), new PieceList()];
    readonly knights   : [PieceList, PieceList] = [new PieceList(), new PieceList()];
    readonly bishops   : [PieceList, PieceList] = [new PieceList(), new PieceList()];
    readonly rooks     : [PieceList, PieceList] = [new PieceList(), new PieceList()];

    #allPieceLists: PieceList[] = [
        PieceList.empty,
        PieceList.empty,
        this.pawns[Board.whiteIndex],
        this.knights[Board.whiteIndex],
        PieceList.empty,
        this.bishops[Board.whiteIndex],
        this.rooks[Board.whiteIndex],
        this.queens[Board.whiteIndex],
        PieceList.empty,
        PieceList.empty,
        this.pawns[Board.blackIndex],
        this.knights[Board.blackIndex],
        PieceList.empty,
        this.bishops[Board.blackIndex],
        this.rooks[Board.blackIndex],
        this.queens[Board.blackIndex],
    ];

    static get #defaultOptions() {
        return { disableTakingTurns: false };
    }

    #options: BoardOptions = Board.#defaultOptions;

    constructor(options: Partial<BoardOptions> = {}) {
        this.#options = {
            ...Board.#defaultOptions,
            ...options
        };
    }

    #getPieceList(pieceType: number, colorIndex: 0 | 1) {
        return this.#allPieceLists[colorIndex * 8 + pieceType];
    }

    makeMove(move: Move) {
        const oldEnPassantFile   = (this.#currentGameState >> 4) & 0b1111;
        const oldCastlingRights  = (this.#currentGameState >> 0) & 0b1111;
        let   newCastlingRights  = oldCastlingRights;
        
        this.#currentGameState   = 0;

        const friendlyColorIndex = this.#colorToMove === Piece.White ? Board.whiteIndex : Board.blackIndex;
        const opponentColorIndex = (1 - friendlyColorIndex) as 0 | 1;

        const movedFrom          = move.startSquare ;
        const movedTo            = move.targetSquare;
        const pieceOnStart       = this.#squares[move.startSquare ];
        const pieceOnTarget      = this.#squares[move.targetSquare];
        const pieceOnStartType   = Piece.getType(pieceOnStart );
        const pieceOnTargetType  = Piece.getType(pieceOnTarget);

        const moveFlag           = move.moveFlag;
        const isPromotion        = move.isPromotion;
        const isEnPassant        = move.moveFlag === Move.Flag.EnPassantCapture;

        // update captured piece type
        this.#currentGameState |= pieceOnTargetType << 8;
        
        if (pieceOnTarget !== Piece.None && !isEnPassant) {
            this.#zobristKey ^= Zobrist.piecesArray[pieceOnTargetType][opponentColorIndex][movedTo];
            this.#getPieceList(pieceOnTargetType, opponentColorIndex).removePiece(movedTo);
        }

        if (pieceOnStartType === Piece.King) {
            this.kingSquare[friendlyColorIndex] = movedTo;
            newCastlingRights &= this.#colorToMove === Piece.White ? Board.whiteCastleMask : Board.blackCastleMask;
        } else {
            this.#getPieceList(pieceOnStartType, friendlyColorIndex).movePiece(movedFrom, movedTo);
        }

        let pieceEndingOnTargetSquare = pieceOnStart;

        if (isPromotion) {
            let promotionType = 0;

            switch (moveFlag) {
                case Move.Flag.PromoteToQueen: {
                    promotionType = Piece.Queen;
                    this.queens[friendlyColorIndex].addPiece(movedTo);
                    break;
                };
                case Move.Flag.PromoteToRook: {
                    promotionType = Piece.Rook;
                    this.rooks[friendlyColorIndex].addPiece(movedTo);
                    break;
                };
                case Move.Flag.PromoteToBishop: {
                    promotionType = Piece.Bishop;
                    this.bishops[friendlyColorIndex].addPiece(movedTo);
                    break;
                };
                case Move.Flag.PromoteToKnight: {
                    promotionType = Piece.Knight;
                    this.knights[friendlyColorIndex].addPiece(movedTo);
                    break;
                };
            }

            pieceEndingOnTargetSquare = this.#colorToMove | promotionType;
            this.pawns[friendlyColorIndex].removePiece(movedTo);
        } else if (isEnPassant) {
            const enPassantPawnSquareIndex = movedTo + (this.#colorToMove === Piece.White ? -8 : 8);

            // add pawn as capture type
            this.#currentGameState |= this.#squares[enPassantPawnSquareIndex] << 8;

            this.#squares[enPassantPawnSquareIndex] = Piece.None;

            this.pawns[opponentColorIndex].removePiece(enPassantPawnSquareIndex);

            this.#zobristKey ^= Zobrist.piecesArray[Piece.Pawn][opponentColorIndex][enPassantPawnSquareIndex];
        } else if (moveFlag === Move.Flag.Castling) {
            const kingside = movedTo === BoardRepresentation.g1 || movedTo === BoardRepresentation.g8;
            const castlingRookFrom = kingside ? movedTo + 1 : movedTo - 2;
            const castlingRookTo   = kingside ? movedTo - 1 : movedTo + 1;

            this.#squares[castlingRookFrom] = Piece.None;
            this.#squares[castlingRookTo  ] = this.#colorToMove | Piece.Rook;

            this.rooks[friendlyColorIndex].movePiece(castlingRookFrom, castlingRookTo);

            this.#zobristKey ^= Zobrist.piecesArray[Piece.Rook][friendlyColorIndex][castlingRookFrom];
            this.#zobristKey ^= Zobrist.piecesArray[Piece.Rook][friendlyColorIndex][castlingRookTo  ];
        }

        // update board
        this.#squares[move.targetSquare] = pieceEndingOnTargetSquare;
        this.#squares[move.startSquare ] = Piece.None;

        // double pawn push, store en passant file in game state
        if (moveFlag === Move.Flag.DoublePawnPush) {
            const file = BoardRepresentation.fileIndex(movedFrom) + 1;

            this.#currentGameState |= file << 4;
        }

        // moving to/from original rook positions removes castling rights
        if (oldCastlingRights !== 0) {
            if (       movedTo === BoardRepresentation.h1 || movedFrom === BoardRepresentation.h1) {
                newCastlingRights &= Board.whiteCastleKingsideMask;
            } else if (movedTo === BoardRepresentation.a1 || movedFrom === BoardRepresentation.a1) {
                newCastlingRights &= Board.whiteCastleQueensideMask;
            }

            if (       movedTo === BoardRepresentation.h8 || movedFrom === BoardRepresentation.h8) {
                newCastlingRights &= Board.blackCastleKingsideMask;
            } else if (movedTo === BoardRepresentation.a8 || movedFrom === BoardRepresentation.a8) {
                newCastlingRights &= Board.blackCastleQueensideMask;
            }
        }

        const pieceEndingOnTargetSquareType = Piece.getType(pieceEndingOnTargetSquare);

        this.#zobristKey ^= Zobrist.piecesArray[pieceOnStartType             ][friendlyColorIndex][movedFrom];
        this.#zobristKey ^= Zobrist.piecesArray[pieceEndingOnTargetSquareType][friendlyColorIndex][movedTo  ];

        const newEnPassantFile = (this.#currentGameState >> 4) & 0b1111;

        // update en passant file
        if (newEnPassantFile !== oldEnPassantFile) {
            this.#zobristKey ^= Zobrist.enPassantFile[oldEnPassantFile   ];
            this.#zobristKey ^= Zobrist.enPassantFile[newEnPassantFile];
        }

        // update castling rights
        if (newCastlingRights !== oldCastlingRights) {
            this.#zobristKey ^= Zobrist.castlingRights[oldCastlingRights   ];
            this.#zobristKey ^= Zobrist.castlingRights[newCastlingRights];
        }

        this.#currentGameState |= newCastlingRights;
        this.#currentGameState |= this.#fiftyMoveCounter << 11;

        this.#gameStateHistory.push(this.#currentGameState);

        // switch turns
        if (!this.#options.disableTakingTurns) {
            this.#colorToMove = this.#colorToMove === Piece.White ? Piece.Black : Piece.White;

            this.#zobristKey ^= Zobrist.sideToMove;
        }

        this.#plyCount++;
        this.#fiftyMoveCounter++;
        
        // reset fifty move counter if a pawn was moved or if a capture was made
        if (pieceOnStartType === Piece.Pawn || pieceOnTargetType !== Piece.None || isEnPassant) {
            this.#repetitionHistory.length = 0;
            this.#fiftyMoveCounter = 0;
        } else {
            this.#repetitionHistory.push(this.#zobristKey);
        }
    }

    unmakeMove(move: Move) {
        const unmakingWhiteMove  = this.#colorToMove === Piece.Black;
        const friendlyColorIndex = unmakingWhiteMove ? Board.whiteIndex : Board.blackIndex;
        const opponentColorIndex = (1 - friendlyColorIndex) as 0 | 1;
        const enemyColor         = unmakingWhiteMove ? Piece.Black : Piece.White;

        const oldCastlingRights  = this.#currentGameState & 0b1111;

        const capturedPieceType  = (this.#currentGameState >> 8) & 0b111;
        const capturedPiece      = capturedPieceType === Piece.None ? Piece.None : enemyColor | capturedPieceType;

        const movedFrom          = move.startSquare;
        const movedTo            = move.targetSquare;
        const moveFlag           = move.moveFlag;
        const isEnPassant        = moveFlag === Move.Flag.EnPassantCapture;
        const isPromotion        = move.isPromotion;

        const targetSquareType   = Piece.getType(this.#squares[movedTo]);
        const movedPieceType     = isPromotion ? Piece.Pawn : targetSquareType;

        if (!this.#options.disableTakingTurns) {
            this.#colorToMove = this.#colorToMove === Piece.White ? Piece.Black : Piece.White;

            this.#zobristKey ^= Zobrist.sideToMove;
        }

        this.#zobristKey ^= Zobrist.piecesArray[movedPieceType  ][friendlyColorIndex][movedFrom];
        this.#zobristKey ^= Zobrist.piecesArray[targetSquareType][friendlyColorIndex][movedTo  ];

        const oldEnPassantFile  = (this.#currentGameState >> 4) & 0b1111;

        // handle en passant captures later
        if (capturedPieceType !== Piece.None && !isEnPassant) {
            this.#zobristKey ^= Zobrist.piecesArray[capturedPieceType][opponentColorIndex][movedTo];
            this.#getPieceList(capturedPieceType, opponentColorIndex).addPiece(movedTo);
        }

        if (movedPieceType === Piece.King) {
            this.kingSquare[friendlyColorIndex] = movedFrom;
        } else if (!isPromotion) {
            this.#getPieceList(movedPieceType, friendlyColorIndex).movePiece(movedTo, movedFrom);
        }

        this.#squares[movedFrom] = this.#colorToMove | movedPieceType;
        this.#squares[movedTo  ] = capturedPiece;

        if (isPromotion) {
            this.pawns[friendlyColorIndex].addPiece(movedFrom);

            switch (moveFlag) {
                case Move.Flag.PromoteToQueen: {
                    this.queens[friendlyColorIndex].removePiece(movedTo);
                    break;
                };
                case Move.Flag.PromoteToRook: {
                    this.rooks[friendlyColorIndex].removePiece(movedTo);
                    break;
                };
                case Move.Flag.PromoteToBishop: {
                    this.bishops[friendlyColorIndex].removePiece(movedTo);
                    break;
                };
                case Move.Flag.PromoteToKnight: {
                    this.knights[friendlyColorIndex].removePiece(movedTo);
                    break;
                };
            }
        } else if (isEnPassant) {
            const enPassantIndex = movedTo + (this.#colorToMove === Piece.White ? -8 : 8);

            // put en passant captured pawn on right square
            this.#squares[movedTo       ] = Piece.None;
            this.#squares[enPassantIndex] = capturedPiece;

            this.pawns[opponentColorIndex].addPiece(enPassantIndex);

            this.#zobristKey ^= Zobrist.piecesArray[Piece.Pawn][opponentColorIndex][enPassantIndex];
        } else if (moveFlag === Move.Flag.Castling) {
            const kingside = movedTo === 6 || movedTo === 62;

            const castlingRookFrom = kingside ? movedTo + 1 : movedTo - 2;
            const castlingRookTo   = kingside ? movedTo - 1 : movedTo + 1;

            this.#squares[castlingRookTo  ] = Piece.None;
            this.#squares[castlingRookFrom] = this.#colorToMove | Piece.Rook;

            this.rooks[friendlyColorIndex].movePiece(castlingRookTo, castlingRookFrom);

            this.#zobristKey ^= Zobrist.piecesArray[Piece.Rook][friendlyColorIndex][castlingRookFrom];
            this.#zobristKey ^= Zobrist.piecesArray[Piece.Rook][friendlyColorIndex][castlingRookTo  ];
        }

        this.#gameStateHistory.pop();

        this.#currentGameState = this.#gameStateHistory.at(-1)!;

        this.#fiftyMoveCounter = this.#currentGameState >> 11;

        const newEnPassantFile = (this.#currentGameState >> 4) & 0b1111;

        // update en passant file
        if (newEnPassantFile !== oldEnPassantFile)  {
            this.#zobristKey ^= Zobrist.enPassantFile[oldEnPassantFile   ];
            this.#zobristKey ^= Zobrist.enPassantFile[newEnPassantFile];
        }

        const newCastlingRights = this.#currentGameState & 0b1111;

        // update castling rights
        if (newCastlingRights !== oldCastlingRights) {
            this.#zobristKey ^= Zobrist.castlingRights[oldCastlingRights   ];
            this.#zobristKey ^= Zobrist.castlingRights[newCastlingRights];
        }

        this.#plyCount--;

        this.#repetitionHistory.pop();
    }

    gameState() {
        const moveGenerator = new MoveGenerator(this);
        const moves         = moveGenerator.generateMoves();

        if (moves.length === 0) {
            if (moveGenerator.inCheck) {
                return this.#colorToMove === Piece.White ? GameState.BlackCheckmatedWhite : GameState.WhiteCheckmatedBlack;
            }

            return GameState.Stalemate;
        }

        if (this.#fiftyMoveCounter >= 100) return GameState.FiftyMoveRule;

        const repeats = this.#repetitionHistory.filter((x) => x === this.#zobristKey).length;

        if (repeats >= 3) return GameState.Repetition;

        const pawnCount   = this.pawns  [0].count + this.pawns  [1].count;
        const rookCount   = this.rooks  [0].count + this.rooks  [1].count;
        const queenCount  = this.queens [0].count + this.queens [1].count;
        const knightCount = this.knights[0].count + this.knights[1].count;
        const bishopCount = this.bishops[0].count + this.bishops[1].count;

        if (pawnCount + rookCount + queenCount === 0) {
            if (knightCount === 1 || bishopCount === 1) return GameState.InsufficientMaterial;
        }

        return GameState.Playing;
    }

    /** warning: do not mutate */
    get squares() {
        return this.#squares;
    }

    get colorToMove() {
        return this.#colorToMove;
    }

    get plyCount() {
        return this.#plyCount;
    }

    get fiftyMoveCounter() {
        return this.#fiftyMoveCounter;
    }

    get currentGameState() {
        return this.#currentGameState;
    }

    loadStartingPosition() {
        this.loadPosition(FEN.startingPosition);

        return this;
    }

    loadPosition(fen: string) {
        const info = FEN.fromFENString(fen);

        for (let squareIndex = 0; squareIndex < 64; squareIndex++) {
            const piece = info.squares[squareIndex];

            if (piece !== Piece.None) {
                const pieceType = Piece.getType(piece);
                const colorIndex = Piece.isColor(piece, Piece.White) ? Board.whiteIndex : Board.blackIndex;

                     if (pieceType === Piece.Queen ) this.queens    [colorIndex].addPiece(squareIndex);
                else if (pieceType === Piece.Rook  ) this.rooks     [colorIndex].addPiece(squareIndex);
                else if (pieceType === Piece.Bishop) this.bishops   [colorIndex].addPiece(squareIndex);
                else if (pieceType === Piece.Knight) this.knights   [colorIndex].addPiece(squareIndex);
                else if (pieceType === Piece.Pawn  ) this.pawns     [colorIndex].addPiece(squareIndex);
                else if (pieceType === Piece.King  ) this.kingSquare[colorIndex] = squareIndex;
            }
        }

        this.#squares = info.squares;
        this.#colorToMove = info.colorToMove;
        this.#plyCount = (info.fullmoves - 1) * 2 + (info.colorToMove === Piece.White ? 0 : 1);
        this.#fiftyMoveCounter = info.halfmoves;

        const whiteCastlingRights = ((info.whiteCastleKingside) ? 1 << 0 : 0) | ((info.whiteCastleQueenside) ? 1 << 1 : 0);
        const blackCastlingRights = ((info.blackCastleKingside) ? 1 << 2 : 0) | ((info.blackCastleQueenside) ? 1 << 3 : 0);
        const enPassantState = info.enPassantFile << 4;
        const initialGameState = whiteCastlingRights | blackCastlingRights | enPassantState;

        this.#gameStateHistory = [initialGameState];
        this.#currentGameState = initialGameState;

        this.#zobristKey = Zobrist.calculateZobristKey(this);
        this.#repetitionHistory = [];

        return this;
    }
}
