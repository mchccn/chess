import { Board, BoardRepresentation, FEN, MoveGenerator, Piece } from "./index.js";

export class Move {
    static readonly Flag = {
        None             : 0b0000,
        EnPassantCapture : 0b0001,
        Castling         : 0b0010,
        DoublePawnPush   : 0b0011,
        PromoteToQueen   : 0b0100,
        PromoteToKnight  : 0b0101,
        PromoteToRook    : 0b0110,
        PromoteToBishop  : 0b0111,
    } as const;

    static readonly #startSquareMask  = 0b0000000000111111;
    static readonly #targetSquareMask = 0b0000111111000000;

    readonly #bits: number;

    constructor(value: number);
    constructor(start: number, target: number, flag?: number);
    constructor(start: number, target?: number, flag = 0) {
        if (typeof target !== "undefined") {
            this.#bits = start | target << 6 | flag << 12;
        } else {
            this.#bits = start;
        }
    }

    get startSquare() {
        return this.#bits & Move.#startSquareMask;
    }

    get targetSquare() {
        return (this.#bits & Move.#targetSquareMask) >> 6;
    }

    get moveFlag() {
        return this.#bits >> 12;
    }

    get isPromotion() {
        return (this.#bits >> 12 & 0b0100) === 0b0100;
    }

    static #promotionLookup = [
        Piece.None,
        Piece.None,
        Piece.None,
        Piece.None,
        Piece.Queen,
        Piece.Knight,
        Piece.Rook,
        Piece.Bishop,
    ];

    get promotionPieceType() {
        return Move.#promotionLookup[this.moveFlag];
    }

    get bits() {
        return this.#bits;
    }

    get isInvalid() {
        return this.#bits === 0;
    }

    get name() {
        let name = BoardRepresentation.squareName(this.startSquare) + BoardRepresentation.squareName(this.targetSquare);

        if (this.isPromotion) {
            if (this.moveFlag === Move.Flag.PromoteToQueen ) name += "q";
            if (this.moveFlag === Move.Flag.PromoteToRook  ) name += "r";
            if (this.moveFlag === Move.Flag.PromoteToBishop) name += "b";
            if (this.moveFlag === Move.Flag.PromoteToKnight) name += "n";
        }

        return name;
    }

    static #moveRegex = /^(?<start>[a-h][1-8])(?<target>[a-h][1-8])(?<promotion>q|r|b|n)?$/

    // board is needed for context (for castling/en passant/double pawn push)
    /** format: `[a-8][1-8][a-h][1-8](q|b|n|r)?` */
    static parseMove(move: string, board: Board) {
        if (!this.#moveRegex.test(move)) throw new SyntaxError("invalid move");

        const { start, target, promotion } = move.match(this.#moveRegex)!.groups!;

        const startFile   = BoardRepresentation.fileNames.indexOf(start[0]);
        const startRank   = BoardRepresentation.rankNames.indexOf(start[1]);

        const targetFile  = BoardRepresentation.fileNames.indexOf(target[0]);
        const targetRank  = BoardRepresentation.rankNames.indexOf(target[1]);

        const startIndex  = BoardRepresentation.indexFromCoord(startFile, startRank);
        const targetIndex = BoardRepresentation.indexFromCoord(targetFile, targetRank);

        let moveFlag = 0;

        if (promotion) {
            if (promotion === "q") moveFlag = Move.Flag.PromoteToQueen ;
            if (promotion === "r") moveFlag = Move.Flag.PromoteToRook  ;
            if (promotion === "b") moveFlag = Move.Flag.PromoteToBishop;
            if (promotion === "n") moveFlag = Move.Flag.PromoteToKnight;
        } else {
            const movedPiece     = board.squares[startIndex];
            const movedPieceType = Piece.getType(movedPiece);

            // probably castling if the king moved more than 1 square
            if (movedPieceType === Piece.King && Math.abs(startFile - targetFile) > 1)
                moveFlag = Move.Flag.Castling;

            // probably a double pawn push if a pawn moved more than 1 square
            if (movedPieceType === Piece.Pawn && Math.abs(startRank - targetRank) > 1)
                moveFlag = Move.Flag.DoublePawnPush;

            const enPassantFile = ((board.currentGameState >> 4) & 0b1111) - 1;
            const enPassantRank = (board.colorToMove === Piece.White ? 6 : 3) - 1;
            
            // probably a capture en passant if the pawn moved to the en passant square
            if (movedPieceType === Piece.Pawn && targetFile === enPassantFile && targetRank === enPassantRank)
                moveFlag = Move.Flag.EnPassantCapture;
        }

        return new Move(startIndex, targetIndex, moveFlag);
    }

    static #notationRegex = /^(?<pieceType>K|N|B|R|Q)?(?<departure>[a-h]?[1-8]?)?(?<isCapture>x)?(?<destination>[a-h][1-8])(?<promotionType>=(?:Q|B|N|R))?(?<isCheck>\+)?(?<isCheckmate>#)?$/;
    // this definitely needs cleanup lol i wrote it at 1:00 am
    // board is definitely needed for context
    /** tries to parse a move in chess algebraic notation */
    static parseAlgebraicNotation(move: string, board: Board) {
        // scorings aren't moves
        if (
            ["1-0"    , "0-1" ,
             "1/2-1/2", "0-0" ,
             "1/2-0"  , "0-1/2"
            ].includes(move)
        ) throw new SyntaxError("scorings are not valid moves");

        // check for queenside castle first since O-O-O starts with O-O and that messes things up
        
        // queenside castle (using includes because O-O-O+ or O-O-O# are possible)
        if (move.startsWith("O-O-O")) {
            const from = board.colorToMove === Piece.White ? 4 : 60;
            const to   = board.colorToMove === Piece.White ? 2 : 58;

            return new Move(from, to, Move.Flag.Castling);
        }

        // kingside castle (using includes because O-O+ or O-O# are possible)
        if (move.startsWith("O-O")) {
            const from = board.colorToMove === Piece.White ? 4 : 60;
            const to   = board.colorToMove === Piece.White ? 6 : 62;

            return new Move(from, to, Move.Flag.Castling);
        }

        if (!this.#notationRegex.test(move)) throw new SyntaxError("invalid move");

        const { pieceType, departure, destination, promotionType } = move.match(this.#notationRegex)!.groups!;

        const type = pieceType ? FEN.symbolToType[pieceType.toLowerCase()] : Piece.Pawn;

        const friendlyColorIndex = board.colorToMove === Piece.White ? Board.whiteIndex : Board.blackIndex;

        const legalMoves = new MoveGenerator(board).generateMoves();

        const pieceList = type === Piece.King ? { squares: [board.kingSquare[friendlyColorIndex]] } : board.getPieceList(type, friendlyColorIndex);

        const promotion = promotionType ? {
            "=Q": Move.Flag.PromoteToQueen,
            "=R": Move.Flag.PromoteToRook,
            "=B": Move.Flag.PromoteToBishop,
            "=N": Move.Flag.PromoteToKnight,
        }[promotionType] : undefined;

        const departureFile = departure && BoardRepresentation.fileNames.includes(departure[0]) ? BoardRepresentation.fileNames.indexOf(departure) : undefined;
        const departureRank = departure
            ? BoardRepresentation.rankNames.includes(departure[0])
                ? BoardRepresentation.rankNames.indexOf(departure[0])
                : BoardRepresentation.rankNames.includes(departure[1])
                    ? BoardRepresentation.rankNames.indexOf(departure[1])
                    : undefined
            : undefined;

        const destinationFile = BoardRepresentation.fileNames.indexOf(destination[0]);
        const destinationRank = BoardRepresentation.rankNames.indexOf(destination[1]);

        const destinationIndex = destinationRank * 8 + destinationFile;

        const legal = legalMoves.find((move) => {
            if (move.targetSquare !== destinationIndex) return false;

            if (typeof promotion !== "undefined" && move.moveFlag !== promotion) return false;

            if (!pieceList.squares.includes(move.startSquare)) return false;

            if (typeof departureFile !== "undefined" && BoardRepresentation.fileIndex(move.startSquare) !== departureFile) return false;

            if (typeof departureRank !== "undefined" && BoardRepresentation.rankIndex(move.startSquare) !== departureRank) return false;

            return true;
        });

        if (!legal) throw new ReferenceError("impossible move for given board");

        return legal;
    }

    static equals(a: Move, b: Move) {
        return a.#bits === b.#bits;
    }

    static invalidMove() {
        return new Move(0, 0, 0);
    }
}