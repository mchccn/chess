import { appendFileSync, createWriteStream } from "fs";
import { BoardRepresentation, FEN, Move, Piece, PieceList, Zobrist } from "./index.js";

const DEBUG_WRITE_STREAM = createWriteStream("./log");

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

    readonly kingSquare: [number, number] = [-1, -1];
    readonly pawns: [PieceList, PieceList] = [new PieceList(), new PieceList()];
    readonly knights: [PieceList, PieceList] = [new PieceList(), new PieceList()];
    readonly bishops: [PieceList, PieceList] = [new PieceList(), new PieceList()];
    readonly rooks: [PieceList, PieceList] = [new PieceList(), new PieceList()];
    readonly queens: [PieceList, PieceList] = [new PieceList(), new PieceList()];

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

    constructor () {}

    setSquares(squares: number[]) { this.#squares = squares }

    #getPieceList(pieceType: number, colorIndex: 0 | 1) {
        return this.#allPieceLists[colorIndex * 8 + pieceType];
    }

    makeMove(move: Move) {
        appendFileSync("./log", `move ${move.name}\n`);

        const enPassantFile     = (this.#currentGameState >> 4) & 0b1111;
        const castlingRights    = (this.#currentGameState >> 0) & 0b1111;
        let   newCastlingRights = castlingRights;
        
        this.#currentGameState  = 0;

        const colorToMoveIndex  = this.#colorToMove === Piece.White ? Board.whiteIndex : Board.blackIndex;
        const enemyToMoveIndex  = (1 - colorToMoveIndex) as 0 | 1;

        const movedFrom         = move.startSquare ;
        const movedTo           = move.targetSquare;
        const pieceOnStart      = this.#squares[move.startSquare ];
        const pieceOnTarget     = this.#squares[move.targetSquare];
        const pieceOnStartType  = Piece.getType(pieceOnStart );
        const pieceOnTargetType = Piece.getType(pieceOnTarget);

        const moveFlag          = move.moveFlag;
        const isPromotion       = move.isPromotion;
        const isEnPassant       = move.moveFlag === Move.Flag.EnPassantCapture;

        // update captured piece type
        this.#currentGameState |= pieceOnTargetType << 8;
        
        if (pieceOnTarget !== Piece.None && !isEnPassant) {
            this.#zobristKey ^= Zobrist.piecesArray[pieceOnTargetType][enemyToMoveIndex][movedTo];
            this.#getPieceList(pieceOnTargetType, enemyToMoveIndex).removePiece(movedTo);
        }

        if (pieceOnStartType === Piece.King) {
            this.kingSquare[colorToMoveIndex] = movedTo;
            newCastlingRights &= this.#colorToMove === Piece.White ? Board.whiteCastleMask : Board.blackCastleMask;
        } else {
            this.#getPieceList(pieceOnStartType, colorToMoveIndex).movePiece(movedFrom, movedTo);
        }

        let pieceEndingOnTargetSquare = pieceOnStart;

        if (isPromotion) {
            let promotionType = 0;

            switch (moveFlag) {
                case Move.Flag.PromoteToQueen: {
                    promotionType = Piece.Queen;
                    this.queens[colorToMoveIndex].addPiece(movedTo);
                    break;
                };
                case Move.Flag.PromoteToRook: {
                    promotionType = Piece.Rook;
                    this.rooks[colorToMoveIndex].addPiece(movedTo);
                    break;
                };
                case Move.Flag.PromoteToBishop: {
                    promotionType = Piece.Bishop;
                    this.bishops[colorToMoveIndex].addPiece(movedTo);
                    break;
                };
                case Move.Flag.PromoteToKnight: {
                    promotionType = Piece.Knight;
                    this.knights[colorToMoveIndex].addPiece(movedTo);
                    break;
                };
            }

            pieceEndingOnTargetSquare = this.#colorToMove | promotionType;
            this.pawns[colorToMoveIndex].removePiece(movedTo);
        } else if (isEnPassant) {
            const enPassantPawnSquareIndex = movedTo + (this.#colorToMove === Piece.White ? -8 : 8);

            // add pawn as capture type
            this.#currentGameState |= this.#squares[enPassantPawnSquareIndex] << 8;

            this.#squares[enPassantPawnSquareIndex] = Piece.None;

            this.pawns[enemyToMoveIndex].removePiece(enPassantPawnSquareIndex);

            this.#zobristKey ^= Zobrist.piecesArray[Piece.Pawn][enemyToMoveIndex][enPassantPawnSquareIndex];
        } else if (moveFlag === Move.Flag.Castling) {
            const kingside = movedTo === BoardRepresentation.g1 || movedTo === BoardRepresentation.g8;
            const castlingRookFrom = kingside ? movedTo + 1 : movedTo - 2;
            const castlingRookTo   = kingside ? movedTo - 1 : movedTo + 1;

            this.#squares[castlingRookFrom] = Piece.None;
            this.#squares[castlingRookTo  ] = this.#colorToMove | Piece.Rook;

            this.rooks[colorToMoveIndex].movePiece(castlingRookFrom, castlingRookTo);

            this.#zobristKey ^= Zobrist.piecesArray[Piece.Rook][colorToMoveIndex][castlingRookFrom];
            this.#zobristKey ^= Zobrist.piecesArray[Piece.Rook][colorToMoveIndex][castlingRookTo  ];
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
        if (castlingRights !== 0) {
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

        this.#zobristKey ^= Zobrist.sideToMove;
        this.#zobristKey ^= Zobrist.piecesArray[pieceOnStartType             ][colorToMoveIndex][movedFrom];
        this.#zobristKey ^= Zobrist.piecesArray[pieceEndingOnTargetSquareType][colorToMoveIndex][movedTo  ];

        const newEnPassantFile = (this.#currentGameState >> 4) & 0b1111;

        // update en passant file
        if (newEnPassantFile !== enPassantFile) {
            this.#zobristKey ^= Zobrist.enPassantFile[enPassantFile   ];
            this.#zobristKey ^= Zobrist.enPassantFile[newEnPassantFile];
        }

        // update castling rights
        if (newCastlingRights !== castlingRights) {
            this.#zobristKey ^= Zobrist.castlingRights[castlingRights   ];
            this.#zobristKey ^= Zobrist.castlingRights[newCastlingRights];
        }

        this.#currentGameState |= newCastlingRights;
        this.#currentGameState |= this.#fiftyMoveCounter << 11;

        this.#gameStateHistory.push(this.#currentGameState);

        // switch turns
        this.#colorToMove = this.#colorToMove === Piece.White ? Piece.Black : Piece.White;

        this.#plyCount++;
        this.#fiftyMoveCounter++;
        
        // reset fifty move counter if a pawn was moved or if a capture was made
        if (pieceOnStartType === Piece.Pawn || pieceOnTargetType !== Piece.None || isEnPassant)
            this.#fiftyMoveCounter = 0;
    }

    unmakeMove(move: Move) {
        appendFileSync("./log", `undo ${move.name}\n`);

        const unmakingWhiteMove = this.#colorToMove === Piece.Black;
        const colorMovedIndex   = unmakingWhiteMove ? Board.whiteIndex : Board.blackIndex;
        const enemyMovedIndex   = (1 - colorMovedIndex) as 0 | 1;
        const enemyColor        = unmakingWhiteMove ? Piece.Black : Piece.White;

        this.#colorToMove       = this.#colorToMove === Piece.White ? Piece.Black : Piece.White;

        const castlingRights    = this.#currentGameState & 0b1111;

        const capturedPieceType = (this.#currentGameState >> 8) & 0b111;
        const capturedPiece     = capturedPieceType === Piece.None ? Piece.None : enemyColor | capturedPieceType;

        const movedFrom         = move.startSquare;
        const movedTo           = move.targetSquare;
        const moveFlag          = move.moveFlag;
        const isEnPassant       = moveFlag === Move.Flag.EnPassantCapture;
        const isPromotion       = move.isPromotion;

        const targetSquareType  = Piece.getType(this.#squares[movedTo]);
        const movedPieceType    = isPromotion ? Piece.Pawn : targetSquareType;

        this.#zobristKey ^= Zobrist.sideToMove;
        this.#zobristKey ^= Zobrist.piecesArray[movedPieceType  ][colorMovedIndex][movedFrom];
        this.#zobristKey ^= Zobrist.piecesArray[targetSquareType][colorMovedIndex][movedTo  ];

        const enPassantFile = (this.#currentGameState >> 4) & 0b1111;

        // handle en passant captures later
        if (capturedPieceType !== Piece.None && !isEnPassant) {
            this.#zobristKey ^= Zobrist.piecesArray[capturedPieceType][enemyMovedIndex][movedTo];
            this.#getPieceList(capturedPieceType, enemyMovedIndex).addPiece(movedTo);
        }

        if (movedPieceType === Piece.King) {
            this.kingSquare[colorMovedIndex] = movedFrom;
        } else if (!isPromotion) {
            this.#getPieceList(movedPieceType, colorMovedIndex).movePiece(movedTo, movedFrom);
        }

        this.#squares[movedFrom] = this.#colorToMove | movedPieceType;
        this.#squares[movedTo  ] = capturedPiece;

        if (isPromotion) {
            this.pawns[colorMovedIndex].addPiece(movedFrom);

            switch (moveFlag) {
                case Move.Flag.PromoteToQueen: {
                    this.queens[colorMovedIndex].removePiece(movedTo);
                    break;
                };
                case Move.Flag.PromoteToRook: {
                    this.rooks[colorMovedIndex].removePiece(movedTo);
                    break;
                };
                case Move.Flag.PromoteToBishop: {
                    this.bishops[colorMovedIndex].removePiece(movedTo);
                    break;
                };
                case Move.Flag.PromoteToKnight: {
                    this.knights[colorMovedIndex].removePiece(movedTo);
                    break;
                };
            }
        } else if (isEnPassant) {
            const enPassantIndex = movedTo + (this.#colorToMove === Piece.White ? -8 : 8);

            // put en passant captured pawn on right square
            this.#squares[movedTo       ] = Piece.None;
            this.#squares[enPassantIndex] = capturedPiece;

            this.pawns[enemyMovedIndex].addPiece(enPassantIndex);

            this.#zobristKey ^= Zobrist.piecesArray[Piece.Pawn][enemyMovedIndex][enPassantIndex];
        } else if (moveFlag === Move.Flag.Castling) {
            const kingside = movedTo === 6 || movedTo === 62;

            const castlingRookFrom = kingside ? movedTo + 1 : movedTo - 2;
            const castlingRookTo   = kingside ? movedTo - 1 : movedTo + 1;

            this.#squares[castlingRookTo  ] = Piece.None;
            this.#squares[castlingRookFrom] = this.#colorToMove | Piece.Rook;

            this.rooks[colorMovedIndex].movePiece(castlingRookTo, castlingRookFrom);

            this.#zobristKey ^= Zobrist.piecesArray[Piece.Rook][colorMovedIndex][castlingRookFrom];
            this.#zobristKey ^= Zobrist.piecesArray[Piece.Rook][colorMovedIndex][castlingRookTo  ];
        }

        this.#gameStateHistory.pop();

        this.#currentGameState = this.#gameStateHistory.at(-1)!;

        this.#fiftyMoveCounter = this.#currentGameState >> 11;

        const newEnPassantFile = (this.#currentGameState >> 4) & 0b1111;

        // update en passant file
        if (newEnPassantFile !== enPassantFile)  {
            this.#zobristKey ^= Zobrist.enPassantFile[enPassantFile   ];
            this.#zobristKey ^= Zobrist.enPassantFile[newEnPassantFile];
        }

        const newCastlingRights = this.#currentGameState & 0b1111;

        // update castling rights
        if (newCastlingRights !== castlingRights) {
            this.#zobristKey ^= Zobrist.castlingRights[castlingRights   ];
            this.#zobristKey ^= Zobrist.castlingRights[newCastlingRights];
        }

        this.#plyCount--;
    }

    get squares() {
        return Object.freeze([...this.#squares]);
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

        this.#gameStateHistory.push(initialGameState);
        this.#currentGameState = initialGameState;

        this.#zobristKey = Zobrist.calculateZobristKey(this);

        return this;
    }
}
