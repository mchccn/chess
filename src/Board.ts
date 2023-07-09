import { FEN } from "./FEN.js";
import { Move } from "./Move.js";
import { Piece } from "./Piece.js";

export class Board {
    static readonly whiteIndex = 0;
    static readonly blackIndex = 1;

    #squares = new Array<number>(64).fill(0);
    
    #colorToMove = 0;
    
    #plyCount = 0;

    /** counted in ply, so when it reaches 100 the game is a draw */
    #fiftyMoveCounter = 0;

    /** 7 | 5 | 4 | 4  - 0000000 | 00000 | 0000 | 0000 - fifty move counter (in ply) | captured piece | en passant file | castling rights */
    #currentGameState = 0;

    #gameStateHistory: number[] = [];

    constructor () {}

    makeMove(move: Move) {
        const enPassantFile     = (this.#currentGameState >> 4) & 0b1111;
        const castlingRights    = (this.#currentGameState >> 0) & 0b1111;
        let   newCastlingRights = castlingRights;
        
        this.#currentGameState  = 0;

        const movedFrom         = move.startSquare ;
        const movedTo           = move.targetSquare;
        const pieceOnStart      = this.#squares[move.startSquare ];
        const pieceOnTarget     = this.#squares[move.targetSquare];
        const pieceOnStartType  = Piece.getType(pieceOnStart );
        const pieceOnTargetType = Piece.getType(pieceOnTarget);

        this.#currentGameState |= pieceOnTargetType << 8;
        
        // if (capturedPieceType !== 0 && move.moveFlag !== Move.Flag.EnPassantCapture) {
        //     zobrist ^= 
        //     ZobristKey ^= Zobrist.piecesArray[capturedPieceType, opponentColourIndex, moveTo];
        //     GetPieceList (capturedPieceType, opponentColourIndex).RemovePieceAtSquare (moveTo);
        // }

        if (move.moveFlag === Move.Flag.None) {
            this.#squares[move.targetSquare] = this.#squares[move.startSquare];
            this.#squares[move.startSquare] = Piece.None;
        } else {
            
        }

        this.#plyCount++;
        this.#fiftyMoveCounter++;
        
        // reset fifty move counter if a pawn was pushed or if a capture was made
        if (Piece.isType(pieceOnStart, Piece.Pawn) || (pieceOnTarget !== Piece.None && !Piece.isColor(pieceOnTarget, this.#colorToMove)))
            this.#fiftyMoveCounter = 0;

        this.#colorToMove = this.#colorToMove === Piece.White ? Piece.Black : Piece.White;
    }

    unmakeMove(move: Move) {
        // ?
    }

    get squares() {
        return [...this.#squares];
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

        return this;
    }
}
