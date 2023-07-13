/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/iconMap.ts":
/*!************************!*\
  !*** ./src/iconMap.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   iconMap: () => (/* binding */ iconMap)
/* harmony export */ });
/* harmony import */ var _dist_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dist/index.js */ "../dist/index.js");

const iconMap = {
    [_dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None]: "none.svg",
    [_dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White | _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.King]: "white_king.svg",
    [_dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White | _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Pawn]: "white_pawn.svg",
    [_dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White | _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Knight]: "white_knight.svg",
    [_dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White | _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Bishop]: "white_bishop.svg",
    [_dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White | _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Rook]: "white_rook.svg",
    [_dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White | _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Queen]: "white_queen.svg",
    [_dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Black | _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.King]: "black_king.svg",
    [_dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Black | _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Pawn]: "black_pawn.svg",
    [_dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Black | _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Knight]: "black_knight.svg",
    [_dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Black | _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Bishop]: "black_bishop.svg",
    [_dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Black | _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Rook]: "black_rook.svg",
    [_dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Black | _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Queen]: "black_queen.svg",
};


/***/ }),

/***/ "./src/render.ts":
/*!***********************!*\
  !*** ./src/render.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   boardElement: () => (/* binding */ boardElement),
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _dist_BoardRepresentation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dist/BoardRepresentation.js */ "../dist/BoardRepresentation.js");
/* harmony import */ var _iconMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iconMap.js */ "./src/iconMap.ts");
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state.js */ "./src/state.ts");



const boardElement = document.querySelector(".board");
function render() {
    boardElement.querySelectorAll(".cell").forEach((e) => e.remove());
    for (let i = 0; i < 64; i++) {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        const imgElement = document.createElement("img");
        imgElement.classList.add("cell-img");
        imgElement.draggable = false;
        const file = i & 0b111;
        const rank = 7 - (i >> 3);
        const index = rank * 8 + file;
        const isLightSquare = _dist_BoardRepresentation_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.isLightSquare(file, rank);
        cellElement.dataset.index = index.toString();
        cellElement.classList.add(isLightSquare ? "light" : "dark");
        imgElement.src = "assets/pieces/" + _iconMap_js__WEBPACK_IMPORTED_MODULE_1__.iconMap[_state_js__WEBPACK_IMPORTED_MODULE_2__.state.board.squares[index]];
        cellElement.append(imgElement);
        boardElement.append(cellElement);
        if (index === _state_js__WEBPACK_IMPORTED_MODULE_2__.state.selected) {
            cellElement.classList.add(isLightSquare ? "light-selected" : "dark-selected");
        }
        if (_state_js__WEBPACK_IMPORTED_MODULE_2__.state.legalMoves.some((move) => (move.startSquare === _state_js__WEBPACK_IMPORTED_MODULE_2__.state.selected && move.targetSquare === index))) {
            cellElement.classList.add(isLightSquare ? "light-highlighted" : "dark-highlighted");
        }
    }
}


/***/ }),

/***/ "./src/setup.ts":
/*!**********************!*\
  !*** ./src/setup.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setup: () => (/* binding */ setup)
/* harmony export */ });
/* harmony import */ var _dist_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dist/index.js */ "../dist/index.js");

function setup() {
    const filesElement = document.querySelector(".files");
    const ranksElement = document.querySelector(".ranks");
    for (const f of _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.fileNames) {
        const fileDiv = document.createElement("div");
        fileDiv.textContent = f;
        filesElement.append(fileDiv);
    }
    for (const r of _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.rankNames) {
        const rankDiv = document.createElement("div");
        rankDiv.textContent = r;
        ranksElement.append(rankDiv);
    }
}


/***/ }),

/***/ "./src/state.ts":
/*!**********************!*\
  !*** ./src/state.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   state: () => (/* binding */ state)
/* harmony export */ });
/* harmony import */ var _dist_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dist/index.js */ "../dist/index.js");

const board = new _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Board().loadStartingPosition();
const state = {
    board,
    selected: -1,
    legalMoves: new _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.MoveGenerator(board).generateMoves(),
    movesMade: [],
    gameOver: false,
};


/***/ }),

/***/ "../dist/Bitboard.js":
/*!***************************!*\
  !*** ../dist/Bitboard.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bitboard: () => (/* binding */ Bitboard)
/* harmony export */ });
class Bitboard {
    static containsSquare(bitboard, square) {
        return ((bitboard >> BigInt(square)) & 1n) !== 0n;
    }
    static reverse(bitboard) {
        bitboard = (bitboard & 4294967295n) << 32n
            | (bitboard & 18446744069414584320n) >> 32n;
        bitboard = (bitboard & 281470681808895n) << 16n
            | (bitboard & 18446462603027742720n) >> 16n;
        bitboard = (bitboard & 71777214294589695n) << 8n
            | (bitboard & 18374966859414961920n) >> 8n;
        bitboard = (bitboard & 1085102592571150095n) << 4n
            | (bitboard & 17361641481138401520n) >> 4n;
        bitboard = (bitboard & 3689348814741910323n) << 2n
            | (bitboard & 14757395258967641292n) >> 2n;
        bitboard = (bitboard & 6148914691236517205n) << 1n
            | (bitboard & 12297829382473034410n) >> 1n;
        return bitboard;
    }
    static #bitScanMagic = 0x07edd5e59a4e28c2n;
    static #bitScanTable = [
        63, 0, 58, 1, 59, 47, 53, 2,
        60, 39, 48, 27, 54, 33, 42, 3,
        61, 51, 37, 40, 49, 18, 28, 20,
        55, 30, 34, 11, 43, 14, 22, 4,
        62, 57, 46, 52, 38, 26, 32, 41,
        50, 36, 17, 19, 29, 10, 13, 21,
        56, 45, 25, 31, 35, 16, 9, 12,
        44, 24, 15, 8, 23, 7, 6, 5,
    ];
    static #u64 = new BigUint64Array(1);
    static popLSB(bitboard) {
        this.#u64[0] = bitboard;
        this.#u64[0] &= -bitboard;
        this.#u64[0] *= this.#bitScanMagic;
        this.#u64[0] >>= 58n;
        return [
            bitboard & (bitboard - 1n),
            this.#bitScanTable[Number(this.#u64[0])],
        ];
    }
    static overflowMultU64(a, b) {
        this.#u64[0] = a;
        this.#u64[0] *= b;
        return this.#u64[0];
    }
    static randomU64() {
        if (typeof window !== "undefined") {
            const array = new Uint8Array(8);
            for (let i = 0; i < 8; i++)
                array[i] = Math.floor(Math.random() * 256);
            return new DataView(array.buffer).getBigUint64(0);
        }
        const array = [];
        for (let i = 0; i < 8; i++)
            array.push(Math.floor(Math.random() * 256));
        return Buffer.from(array).readBigUInt64BE();
    }
}


/***/ }),

/***/ "../dist/Board.js":
/*!************************!*\
  !*** ../dist/Board.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Board: () => (/* binding */ Board)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../dist/index.js");

class Board {
    static whiteIndex = 0;
    static blackIndex = 1;
    static whiteCastleKingsideMask = 0b1111111111111110;
    static whiteCastleQueensideMask = 0b1111111111111101;
    static blackCastleKingsideMask = 0b1111111111111011;
    static blackCastleQueensideMask = 0b1111111111110111;
    static whiteCastleMask = this.whiteCastleKingsideMask & this.whiteCastleQueensideMask;
    static blackCastleMask = this.blackCastleKingsideMask & this.blackCastleQueensideMask;
    #squares = new Array(64).fill(0);
    #colorToMove = 0;
    #plyCount = 0;
    #fiftyMoveCounter = 0;
    #currentGameState = 0;
    #gameStateHistory = [];
    #zobristKey = 0n;
    #repetitionHistory = [];
    kingSquare = [-1, -1];
    pawns = [new _index_js__WEBPACK_IMPORTED_MODULE_0__.PieceList(), new _index_js__WEBPACK_IMPORTED_MODULE_0__.PieceList()];
    queens = [new _index_js__WEBPACK_IMPORTED_MODULE_0__.PieceList(), new _index_js__WEBPACK_IMPORTED_MODULE_0__.PieceList()];
    knights = [new _index_js__WEBPACK_IMPORTED_MODULE_0__.PieceList(), new _index_js__WEBPACK_IMPORTED_MODULE_0__.PieceList()];
    bishops = [new _index_js__WEBPACK_IMPORTED_MODULE_0__.PieceList(), new _index_js__WEBPACK_IMPORTED_MODULE_0__.PieceList()];
    rooks = [new _index_js__WEBPACK_IMPORTED_MODULE_0__.PieceList(), new _index_js__WEBPACK_IMPORTED_MODULE_0__.PieceList()];
    #allPieceLists = [
        _index_js__WEBPACK_IMPORTED_MODULE_0__.PieceList.empty,
        _index_js__WEBPACK_IMPORTED_MODULE_0__.PieceList.empty,
        this.pawns[Board.whiteIndex],
        this.knights[Board.whiteIndex],
        _index_js__WEBPACK_IMPORTED_MODULE_0__.PieceList.empty,
        this.bishops[Board.whiteIndex],
        this.rooks[Board.whiteIndex],
        this.queens[Board.whiteIndex],
        _index_js__WEBPACK_IMPORTED_MODULE_0__.PieceList.empty,
        _index_js__WEBPACK_IMPORTED_MODULE_0__.PieceList.empty,
        this.pawns[Board.blackIndex],
        this.knights[Board.blackIndex],
        _index_js__WEBPACK_IMPORTED_MODULE_0__.PieceList.empty,
        this.bishops[Board.blackIndex],
        this.rooks[Board.blackIndex],
        this.queens[Board.blackIndex],
    ];
    static get #defaultOptions() {
        return { disableTakingTurns: false };
    }
    #options = Board.#defaultOptions;
    constructor(options = {}) {
        this.#options = {
            ...Board.#defaultOptions,
            ...options
        };
    }
    #getPieceList(pieceType, colorIndex) {
        return this.#allPieceLists[colorIndex * 8 + pieceType];
    }
    makeMove(move) {
        const oldEnPassantFile = (this.#currentGameState >> 4) & 0b1111;
        const oldCastlingRights = (this.#currentGameState >> 0) & 0b1111;
        let newCastlingRights = oldCastlingRights;
        this.#currentGameState = 0;
        const friendlyColorIndex = this.#colorToMove === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White ? Board.whiteIndex : Board.blackIndex;
        const opponentColorIndex = (1 - friendlyColorIndex);
        const movedFrom = move.startSquare;
        const movedTo = move.targetSquare;
        const pieceOnStart = this.#squares[move.startSquare];
        const pieceOnTarget = this.#squares[move.targetSquare];
        const pieceOnStartType = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.getType(pieceOnStart);
        const pieceOnTargetType = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.getType(pieceOnTarget);
        const moveFlag = move.moveFlag;
        const isPromotion = move.isPromotion;
        const isEnPassant = move.moveFlag === _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.EnPassantCapture;
        this.#currentGameState |= pieceOnTargetType << 8;
        if (pieceOnTarget !== _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None && !isEnPassant) {
            this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.piecesArray[pieceOnTargetType][opponentColorIndex][movedTo];
            this.#getPieceList(pieceOnTargetType, opponentColorIndex).removePiece(movedTo);
        }
        if (pieceOnStartType === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.King) {
            this.kingSquare[friendlyColorIndex] = movedTo;
            newCastlingRights &= this.#colorToMove === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White ? Board.whiteCastleMask : Board.blackCastleMask;
        }
        else {
            this.#getPieceList(pieceOnStartType, friendlyColorIndex).movePiece(movedFrom, movedTo);
        }
        let pieceEndingOnTargetSquare = pieceOnStart;
        if (isPromotion) {
            let promotionType = 0;
            switch (moveFlag) {
                case _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.PromoteToQueen:
                    {
                        promotionType = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Queen;
                        this.queens[friendlyColorIndex].addPiece(movedTo);
                        break;
                    }
                    ;
                case _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.PromoteToRook:
                    {
                        promotionType = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Rook;
                        this.rooks[friendlyColorIndex].addPiece(movedTo);
                        break;
                    }
                    ;
                case _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.PromoteToBishop:
                    {
                        promotionType = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Bishop;
                        this.bishops[friendlyColorIndex].addPiece(movedTo);
                        break;
                    }
                    ;
                case _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.PromoteToKnight:
                    {
                        promotionType = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Knight;
                        this.knights[friendlyColorIndex].addPiece(movedTo);
                        break;
                    }
                    ;
            }
            pieceEndingOnTargetSquare = this.#colorToMove | promotionType;
            this.pawns[friendlyColorIndex].removePiece(movedTo);
        }
        else if (isEnPassant) {
            const enPassantPawnSquareIndex = movedTo + (this.#colorToMove === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White ? -8 : 8);
            this.#currentGameState |= this.#squares[enPassantPawnSquareIndex] << 8;
            this.#squares[enPassantPawnSquareIndex] = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None;
            this.pawns[opponentColorIndex].removePiece(enPassantPawnSquareIndex);
            this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.piecesArray[_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Pawn][opponentColorIndex][enPassantPawnSquareIndex];
        }
        else if (moveFlag === _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.Castling) {
            const kingside = movedTo === _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.g1 || movedTo === _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.g8;
            const castlingRookFrom = kingside ? movedTo + 1 : movedTo - 2;
            const castlingRookTo = kingside ? movedTo - 1 : movedTo + 1;
            this.#squares[castlingRookFrom] = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None;
            this.#squares[castlingRookTo] = this.#colorToMove | _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Rook;
            this.rooks[friendlyColorIndex].movePiece(castlingRookFrom, castlingRookTo);
            this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.piecesArray[_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Rook][friendlyColorIndex][castlingRookFrom];
            this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.piecesArray[_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Rook][friendlyColorIndex][castlingRookTo];
        }
        this.#squares[move.targetSquare] = pieceEndingOnTargetSquare;
        this.#squares[move.startSquare] = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None;
        if (moveFlag === _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.DoublePawnPush) {
            const file = _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.fileIndex(movedFrom) + 1;
            this.#currentGameState |= file << 4;
        }
        if (oldCastlingRights !== 0) {
            if (movedTo === _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.h1 || movedFrom === _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.h1) {
                newCastlingRights &= Board.whiteCastleKingsideMask;
            }
            else if (movedTo === _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.a1 || movedFrom === _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.a1) {
                newCastlingRights &= Board.whiteCastleQueensideMask;
            }
            if (movedTo === _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.h8 || movedFrom === _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.h8) {
                newCastlingRights &= Board.blackCastleKingsideMask;
            }
            else if (movedTo === _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.a8 || movedFrom === _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.a8) {
                newCastlingRights &= Board.blackCastleQueensideMask;
            }
        }
        const pieceEndingOnTargetSquareType = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.getType(pieceEndingOnTargetSquare);
        this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.piecesArray[pieceOnStartType][friendlyColorIndex][movedFrom];
        this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.piecesArray[pieceEndingOnTargetSquareType][friendlyColorIndex][movedTo];
        const newEnPassantFile = (this.#currentGameState >> 4) & 0b1111;
        if (newEnPassantFile !== oldEnPassantFile) {
            this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.enPassantFile[oldEnPassantFile];
            this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.enPassantFile[newEnPassantFile];
        }
        if (newCastlingRights !== oldCastlingRights) {
            this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.castlingRights[oldCastlingRights];
            this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.castlingRights[newCastlingRights];
        }
        this.#currentGameState |= newCastlingRights;
        this.#currentGameState |= this.#fiftyMoveCounter << 11;
        this.#gameStateHistory.push(this.#currentGameState);
        if (!this.#options.disableTakingTurns) {
            this.#colorToMove = this.#colorToMove === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White ? _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Black : _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White;
            this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.sideToMove;
        }
        this.#plyCount++;
        this.#fiftyMoveCounter++;
        if (pieceOnStartType === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Pawn || pieceOnTargetType !== _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None || isEnPassant) {
            this.#repetitionHistory.length = 0;
            this.#fiftyMoveCounter = 0;
        }
        else {
            this.#repetitionHistory.push(this.#zobristKey);
        }
    }
    unmakeMove(move) {
        const unmakingWhiteMove = this.#colorToMove === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Black;
        const friendlyColorIndex = unmakingWhiteMove ? Board.whiteIndex : Board.blackIndex;
        const opponentColorIndex = (1 - friendlyColorIndex);
        const enemyColor = unmakingWhiteMove ? _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Black : _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White;
        const oldCastlingRights = this.#currentGameState & 0b1111;
        const capturedPieceType = (this.#currentGameState >> 8) & 0b111;
        const capturedPiece = capturedPieceType === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None ? _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None : enemyColor | capturedPieceType;
        const movedFrom = move.startSquare;
        const movedTo = move.targetSquare;
        const moveFlag = move.moveFlag;
        const isEnPassant = moveFlag === _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.EnPassantCapture;
        const isPromotion = move.isPromotion;
        const targetSquareType = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.getType(this.#squares[movedTo]);
        const movedPieceType = isPromotion ? _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Pawn : targetSquareType;
        if (!this.#options.disableTakingTurns) {
            this.#colorToMove = this.#colorToMove === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White ? _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Black : _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White;
            this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.sideToMove;
        }
        this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.piecesArray[movedPieceType][friendlyColorIndex][movedFrom];
        this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.piecesArray[targetSquareType][friendlyColorIndex][movedTo];
        const oldEnPassantFile = (this.#currentGameState >> 4) & 0b1111;
        if (capturedPieceType !== _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None && !isEnPassant) {
            this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.piecesArray[capturedPieceType][opponentColorIndex][movedTo];
            this.#getPieceList(capturedPieceType, opponentColorIndex).addPiece(movedTo);
        }
        if (movedPieceType === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.King) {
            this.kingSquare[friendlyColorIndex] = movedFrom;
        }
        else if (!isPromotion) {
            this.#getPieceList(movedPieceType, friendlyColorIndex).movePiece(movedTo, movedFrom);
        }
        this.#squares[movedFrom] = this.#colorToMove | movedPieceType;
        this.#squares[movedTo] = capturedPiece;
        if (isPromotion) {
            this.pawns[friendlyColorIndex].addPiece(movedFrom);
            switch (moveFlag) {
                case _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.PromoteToQueen:
                    {
                        this.queens[friendlyColorIndex].removePiece(movedTo);
                        break;
                    }
                    ;
                case _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.PromoteToRook:
                    {
                        this.rooks[friendlyColorIndex].removePiece(movedTo);
                        break;
                    }
                    ;
                case _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.PromoteToBishop:
                    {
                        this.bishops[friendlyColorIndex].removePiece(movedTo);
                        break;
                    }
                    ;
                case _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.PromoteToKnight:
                    {
                        this.knights[friendlyColorIndex].removePiece(movedTo);
                        break;
                    }
                    ;
            }
        }
        else if (isEnPassant) {
            const enPassantIndex = movedTo + (this.#colorToMove === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White ? -8 : 8);
            this.#squares[movedTo] = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None;
            this.#squares[enPassantIndex] = capturedPiece;
            this.pawns[opponentColorIndex].addPiece(enPassantIndex);
            this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.piecesArray[_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Pawn][opponentColorIndex][enPassantIndex];
        }
        else if (moveFlag === _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.Castling) {
            const kingside = movedTo === 6 || movedTo === 62;
            const castlingRookFrom = kingside ? movedTo + 1 : movedTo - 2;
            const castlingRookTo = kingside ? movedTo - 1 : movedTo + 1;
            this.#squares[castlingRookTo] = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None;
            this.#squares[castlingRookFrom] = this.#colorToMove | _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Rook;
            this.rooks[friendlyColorIndex].movePiece(castlingRookTo, castlingRookFrom);
            this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.piecesArray[_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Rook][friendlyColorIndex][castlingRookFrom];
            this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.piecesArray[_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Rook][friendlyColorIndex][castlingRookTo];
        }
        this.#gameStateHistory.pop();
        this.#currentGameState = this.#gameStateHistory.at(-1);
        this.#fiftyMoveCounter = this.#currentGameState >> 11;
        const newEnPassantFile = (this.#currentGameState >> 4) & 0b1111;
        if (newEnPassantFile !== oldEnPassantFile) {
            this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.enPassantFile[oldEnPassantFile];
            this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.enPassantFile[newEnPassantFile];
        }
        const newCastlingRights = this.#currentGameState & 0b1111;
        if (newCastlingRights !== oldCastlingRights) {
            this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.castlingRights[oldCastlingRights];
            this.#zobristKey ^= _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.castlingRights[newCastlingRights];
        }
        this.#plyCount--;
        this.#repetitionHistory.pop();
    }
    gameState() {
        const moveGenerator = new _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveGenerator(this);
        const moves = moveGenerator.generateMoves();
        if (moves.length === 0) {
            if (moveGenerator.inCheck) {
                return this.#colorToMove === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White ? _index_js__WEBPACK_IMPORTED_MODULE_0__.GameState.BlackCheckmatedWhite : _index_js__WEBPACK_IMPORTED_MODULE_0__.GameState.WhiteCheckmatedBlack;
            }
            return _index_js__WEBPACK_IMPORTED_MODULE_0__.GameState.Stalemate;
        }
        if (this.#fiftyMoveCounter >= 100)
            return _index_js__WEBPACK_IMPORTED_MODULE_0__.GameState.FiftyMoveRule;
        const repeats = this.#repetitionHistory.filter((x) => x === this.#zobristKey).length;
        if (repeats >= 3)
            return _index_js__WEBPACK_IMPORTED_MODULE_0__.GameState.Repetition;
        const pawnCount = this.pawns[0].count + this.pawns[1].count;
        const rookCount = this.rooks[0].count + this.rooks[1].count;
        const queenCount = this.queens[0].count + this.queens[1].count;
        const knightCount = this.knights[0].count + this.knights[1].count;
        const bishopCount = this.bishops[0].count + this.bishops[1].count;
        if (pawnCount + rookCount + queenCount === 0) {
            if (knightCount === 1 || bishopCount === 1)
                return _index_js__WEBPACK_IMPORTED_MODULE_0__.GameState.InsufficientMaterial;
        }
        return _index_js__WEBPACK_IMPORTED_MODULE_0__.GameState.Playing;
    }
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
        this.loadPosition(_index_js__WEBPACK_IMPORTED_MODULE_0__.FEN.startingPosition);
        return this;
    }
    loadPosition(fen) {
        const info = _index_js__WEBPACK_IMPORTED_MODULE_0__.FEN.fromFENString(fen);
        for (let squareIndex = 0; squareIndex < 64; squareIndex++) {
            const piece = info.squares[squareIndex];
            if (piece !== _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None) {
                const pieceType = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.getType(piece);
                const colorIndex = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.isColor(piece, _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White) ? Board.whiteIndex : Board.blackIndex;
                if (pieceType === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Queen)
                    this.queens[colorIndex].addPiece(squareIndex);
                else if (pieceType === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Rook)
                    this.rooks[colorIndex].addPiece(squareIndex);
                else if (pieceType === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Bishop)
                    this.bishops[colorIndex].addPiece(squareIndex);
                else if (pieceType === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Knight)
                    this.knights[colorIndex].addPiece(squareIndex);
                else if (pieceType === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Pawn)
                    this.pawns[colorIndex].addPiece(squareIndex);
                else if (pieceType === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.King)
                    this.kingSquare[colorIndex] = squareIndex;
            }
        }
        this.#squares = info.squares;
        this.#colorToMove = info.colorToMove;
        this.#plyCount = (info.fullmoves - 1) * 2 + (info.colorToMove === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White ? 0 : 1);
        this.#fiftyMoveCounter = info.halfmoves;
        const whiteCastlingRights = ((info.whiteCastleKingside) ? 1 << 0 : 0) | ((info.whiteCastleQueenside) ? 1 << 1 : 0);
        const blackCastlingRights = ((info.blackCastleKingside) ? 1 << 2 : 0) | ((info.blackCastleQueenside) ? 1 << 3 : 0);
        const enPassantState = info.enPassantFile << 4;
        const initialGameState = whiteCastlingRights | blackCastlingRights | enPassantState;
        this.#gameStateHistory = [initialGameState];
        this.#currentGameState = initialGameState;
        this.#zobristKey = _index_js__WEBPACK_IMPORTED_MODULE_0__.Zobrist.calculateZobristKey(this);
        this.#repetitionHistory = [];
        return this;
    }
}


/***/ }),

/***/ "../dist/BoardRepresentation.js":
/*!**************************************!*\
  !*** ../dist/BoardRepresentation.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BoardRepresentation: () => (/* binding */ BoardRepresentation)
/* harmony export */ });
class BoardRepresentation {
    static rankNames = "12345678";
    static fileNames = "abcdefgh";
    static a1 = 0;
    static b1 = 1;
    static c1 = 2;
    static d1 = 3;
    static e1 = 4;
    static f1 = 5;
    static g1 = 6;
    static h1 = 7;
    static a8 = 56;
    static b8 = 57;
    static c8 = 58;
    static d8 = 59;
    static e8 = 60;
    static f8 = 61;
    static g8 = 62;
    static h8 = 63;
    static rankIndex(index) {
        return index >> 3;
    }
    static fileIndex(index) {
        return index & 0b111;
    }
    static indexFromCoord(file, rank) {
        return rank * 8 + file;
    }
    static isLightSquare(file, rank) {
        return (file + rank) % 2 !== 0;
    }
    static squareName(file, rank) {
        if (typeof rank === "undefined")
            [file, rank] = [this.fileIndex(file), this.rankIndex(file)];
        return this.fileNames[file] + (rank + 1);
    }
}


/***/ }),

/***/ "../dist/FEN.js":
/*!**********************!*\
  !*** ../dist/FEN.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FEN: () => (/* binding */ FEN)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../dist/index.js");

class FEN {
    static startingPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    static #symbolToType = {
        k: _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.King,
        p: _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Pawn,
        n: _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Knight,
        b: _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Bishop,
        r: _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Rook,
        q: _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Queen,
    };
    static #typeToSymbol = [
        "?",
        "k",
        "p",
        "n",
        "?",
        "b",
        "r",
        "q",
    ];
    static fromFENString(fen) {
        const [positions, sideToMove, castlingRights, enPassantTarget, halfmoveClock, fullmoveNumber] = fen.split(" ");
        const squares = new Array(64).fill(0);
        for (let i = 0, cell = 0; i < positions.length; i++) {
            const char = positions[i];
            if (char === "/")
                continue;
            if (/\d/.test(char)) {
                cell += Number(char);
            }
            else {
                const pieceColor = char.toUpperCase() === char ? _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White : _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Black;
                const pieceType = this.#symbolToType[char.toLowerCase()];
                const rank = 7 - (cell >> 3);
                const file = cell & 0b111;
                squares[rank * 8 + file] = pieceColor | pieceType;
                cell++;
            }
        }
        const colorToMove = sideToMove === "w" ? _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White : _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Black;
        const enPassantFile = enPassantTarget === "-" ? 0 : _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.fileNames.indexOf(enPassantTarget[0]) + 1;
        const halfmoves = Number(halfmoveClock);
        const fullmoves = Number(fullmoveNumber);
        const whiteCastleKingside = castlingRights.includes("K");
        const whiteCastleQueenside = castlingRights.includes("Q");
        const blackCastleKingside = castlingRights.includes("k");
        const blackCastleQueenside = castlingRights.includes("q");
        return {
            squares,
            colorToMove,
            enPassantFile,
            halfmoves,
            fullmoves,
            whiteCastleKingside,
            whiteCastleQueenside,
            blackCastleKingside,
            blackCastleQueenside,
        };
    }
    static toFENString(board) {
        let fen = "";
        for (let rank = 7; rank >= 0; rank--) {
            for (let file = 0; file < 8; file++) {
                const cell = board.squares[rank * 8 + file];
                const j = file;
                while (!board.squares[rank * 8 + file] && file < 8)
                    file++;
                if (file !== j) {
                    fen += file-- - j;
                }
                else {
                    const type = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.getType(cell);
                    const casing = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.getColor(cell) === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White ? "toUpperCase" : "toLowerCase";
                    fen += this.#typeToSymbol[type][casing]();
                }
            }
            if (rank)
                fen += "/";
        }
        fen += " ";
        fen += board.colorToMove === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White ? "w" : "b";
        fen += " ";
        fen += (board.currentGameState >> 0 & 1) === 1 ? "K" : "";
        fen += (board.currentGameState >> 1 & 1) === 1 ? "Q" : "";
        fen += (board.currentGameState >> 2 & 1) === 1 ? "k" : "";
        fen += (board.currentGameState >> 3 & 1) === 1 ? "q" : "";
        fen += (board.currentGameState & 0b1111) === 0 ? "-" : "";
        const enPassantFile = board.currentGameState >> 4 & 0b1111;
        fen += " ";
        if (!enPassantFile) {
            fen += "-";
        }
        else {
            const enPassantRank = board.colorToMove === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White ? 6 : 3;
            fen += _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.fileNames[enPassantFile - 1] + enPassantRank;
        }
        fen += " ";
        fen += board.fiftyMoveCounter;
        fen += " ";
        fen += Math.floor(board.plyCount / 2) + 1;
        return fen;
    }
}


/***/ }),

/***/ "../dist/GameState.js":
/*!****************************!*\
  !*** ../dist/GameState.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameState: () => (/* binding */ GameState)
/* harmony export */ });
class GameState {
    static Playing = 0b00000;
    static WhiteCheckmatedBlack = 0b00010;
    static BlackCheckmatedWhite = 0b00011;
    static Stalemate = 0b10000;
    static Repetition = 0b10100;
    static FiftyMoveRule = 0b11000;
    static InsufficientMaterial = 0b10100;
    static isWinLose(state) {
        return ((state >> 1) & 1) !== 0;
    }
    static isDraw(state) {
        return ((state >> 4) & 1) !== 0;
    }
}


/***/ }),

/***/ "../dist/Magics.js":
/*!*************************!*\
  !*** ../dist/Magics.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Magics: () => (/* binding */ Magics)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../dist/index.js");

class Magics {
    static #initialized = false;
    static rookAttackBitboards = [];
    static bishopAttackBitboards = [];
    static rookBlockerBitboards = [];
    static bishopBlockerBitboards = [];
    static rookMovesForSquare = [];
    static bishopMovesForSquare = [];
    static rookShifts = [
        52n, 53n, 53n, 53n, 53n, 53n, 53n, 52n,
        53n, 54n, 54n, 54n, 54n, 54n, 54n, 53n,
        53n, 54n, 54n, 54n, 54n, 54n, 54n, 53n,
        53n, 54n, 54n, 54n, 54n, 54n, 54n, 53n,
        53n, 54n, 54n, 54n, 54n, 54n, 54n, 53n,
        53n, 54n, 54n, 54n, 54n, 54n, 54n, 53n,
        53n, 54n, 54n, 54n, 54n, 54n, 54n, 53n,
        52n, 53n, 53n, 53n, 53n, 53n, 53n, 52n,
    ];
    static bishopShifts = [
        58n, 59n, 59n, 59n, 59n, 59n, 59n, 58n,
        59n, 59n, 59n, 59n, 59n, 59n, 59n, 59n,
        59n, 59n, 57n, 57n, 57n, 57n, 59n, 59n,
        59n, 59n, 57n, 55n, 55n, 57n, 59n, 59n,
        59n, 59n, 57n, 55n, 55n, 57n, 59n, 59n,
        59n, 59n, 57n, 57n, 57n, 57n, 59n, 59n,
        59n, 59n, 59n, 59n, 59n, 59n, 59n, 59n,
        58n, 59n, 59n, 59n, 59n, 59n, 59n, 58n,
    ];
    static rookMagics = [
        0x8080001082284004n, 0x540004010002002n, 0x80082000801004n, 0x1100100100a09428n,
        0x180240008004680n, 0x1000c0002080100n, 0x100208100020004n, 0x8080008001526900n,
        0x88001400080a1n, 0xa004101208200n, 0x80500280a000n, 0x411002100089000n,
        0x4424808044000800n, 0x800401020080n, 0x402000908640200n, 0x401a800100044080n,
        0x80004040002000n, 0x800a404010006004n, 0x20008020100482n, 0x9100100090410a0n,
        0x101010010040800n, 0x40080110200440n, 0x8c8080800a000100n, 0x1082001080c401n,
        0x1004400080208000n, 0x281022500400080n, 0xca00100080802000n, 0x1018008080085000n,
        0x484c80180240080n, 0x4000440080800200n, 0x2108410400020810n, 0x80500010026d082n,
        0x8000200040014cn, 0x440010081004360n, 0x2000100080802000n, 0x4082000812004022n,
        0x1444080080800c00n, 0x800c00800200n, 0x101001102400a80an, 0x84282000104n,
        0x202080c0088004n, 0x840002881010043n, 0x20012011050040n, 0x1028100008008080n,
        0x1000240008008080n, 0x40100882c010012n, 0x245008900a140001n, 0x4009014504820004n,
        0x4168208004400080n, 0x4000200080400080n, 0x90200504b1204300n, 0x1002008100100n,
        0x12110801002500n, 0x28400800200a480n, 0x40021001080400n, 0x8008408412200n,
        0x4001204810042a2n, 0x5082804003002011n, 0x10200101c0100dn, 0x8001002090000429n,
        0x2000420100802n, 0x8001001804002289n, 0x4100a81020804n, 0x12810c00802042n,
    ];
    static bishopMagics = [
        0x4410690108008300n, 0xc410100200a02010n, 0x404102008d022020n, 0x114140080086007n,
        0x2b0a021000080004n, 0x4412010051510n, 0xa03a18820102020n, 0x2800820042200400n,
        0x2010201410008701n, 0x8000801080201c0n, 0x410028109c018004n, 0x8040040414808800n,
        0x40423000502n, 0x210348c02000n, 0x4180508841101000n, 0x208002202022000n,
        0x14c0003010220698n, 0xa442003010020092n, 0x5020010018a0008n, 0xa0800802810020n,
        0x21000090401000n, 0x2842000860842000n, 0xa2021101100300n, 0x2401001030921000n,
        0x934048420200400n, 0xe6a00108280282n, 0x108080214022020n, 0x8024040088009010n,
        0x81001045004000n, 0x3020002480451n, 0x121850024012800n, 0x84102004808412n,
        0x482602080300289n, 0x1004100a10046400n, 0xc0040a080100100n, 0x1221010800210040n,
        0x4020084010601a0n, 0x819020080080800n, 0x48022680040080n, 0x809010200a22201n,
        0x4104040268004100n, 0x802081104054860n, 0x4022282098009000n, 0x54010420200n,
        0x4040010a12010400n, 0x804362080a004040n, 0x111890803041982n, 0x424448202001951n,
        0x4124020250040802n, 0x1082188601101040n, 0x1102444c4104000n, 0x1502001642022100n,
        0x402848d040008n, 0x28410408088040n, 0x2040a90841014000n, 0x8108089800504400n,
        0x3940405008201cn, 0x80a003202300400n, 0x4012520111d800n, 0x2022000080208802n,
        0x804010060a20n, 0x408334004080480n, 0x4025842008024890n, 0x2010020281021200n,
    ];
    static boardCornerMask = BigInt("0b\
        01111110\
        11111111\
        11111111\
        11111111\
        11111111\
        11111111\
        11111111\
        01111110\
    ".replaceAll(" ", ""));
    static boardEdgeMask = BigInt("0b\
        10000001\
        01111110\
        01111110\
        01111110\
        01111110\
        01111110\
        01111110\
        10000001\
    ".replaceAll(" ", ""));
    static fileA = 0x0101010101010101n;
    static rank1 = 0x00000000000000ffn;
    static initialize() {
        if (this.#initialized)
            throw new Error("magics data has already been initialized");
        for (let squareIndex = 0; squareIndex < 64; squareIndex++) {
            const rookBitboard = this.#computeAttackBitboard(squareIndex, 0, 4);
            const bishopBitboard = this.#computeAttackBitboard(squareIndex, 4, 8);
            this.rookAttackBitboards.push(rookBitboard);
            this.bishopAttackBitboards.push(bishopBitboard);
            const rookBitsSet = this.#countBitsSet(rookBitboard);
            const bishopBitsSet = this.#countBitsSet(bishopBitboard);
            this.rookBlockerBitboards[squareIndex] = [];
            this.rookMovesForSquare[squareIndex] = [];
            for (let index = 0; index < (1 << rookBitsSet); index++) {
                const rookBlockers = this.#computeBlockerBitboard(index, rookBitboard);
                this.rookBlockerBitboards[squareIndex][index] = rookBlockers;
                let rookMoves = 0n;
                for (let i = 0; i < 4; i++) {
                    const dirOffset = _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.directionOffsets[i];
                    for (let n = 0; n < _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.squaresToEdge[squareIndex][i]; n++) {
                        const targetSquare = squareIndex + dirOffset * (n + 1);
                        const pieceOnTarget = _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.containsSquare(rookBlockers, targetSquare);
                        rookMoves |= 1n << BigInt(targetSquare);
                        if (pieceOnTarget)
                            break;
                    }
                }
                const key = _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.overflowMultU64(rookBlockers, this.rookMagics[squareIndex]) >> this.rookShifts[squareIndex];
                this.rookMovesForSquare[squareIndex][Number(key)] = rookMoves;
            }
            this.bishopBlockerBitboards[squareIndex] = [];
            this.bishopMovesForSquare[squareIndex] = [];
            for (let index = 0; index < (1 << bishopBitsSet); index++) {
                const bishopBlockers = this.#computeBlockerBitboard(index, bishopBitboard);
                this.bishopBlockerBitboards[squareIndex][index] = bishopBlockers;
                let bishopMoves = 0n;
                for (let i = 4; i < 8; i++) {
                    const dirOffset = _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.directionOffsets[i];
                    for (let n = 0; n < _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.squaresToEdge[squareIndex][i]; n++) {
                        const targetSquare = squareIndex + dirOffset * (n + 1);
                        const pieceOnTarget = _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.containsSquare(bishopBlockers, targetSquare);
                        bishopMoves |= 1n << BigInt(targetSquare);
                        if (pieceOnTarget)
                            break;
                    }
                }
                const key = _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.overflowMultU64(bishopBlockers, this.bishopMagics[squareIndex]) >> this.bishopShifts[squareIndex];
                this.bishopMovesForSquare[squareIndex][Number(key)] = bishopMoves;
            }
        }
        this.#initialized = true;
    }
    static getQueenMoves(square, blockers) {
        return this.getRookMoves(square, blockers) | this.getBishopMoves(square, blockers);
    }
    static getRookMoves(square, blockers) {
        if (!this.#initialized)
            throw new Error("magics data hasn't been initialized yet");
        blockers = _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.reverse(blockers);
        blockers &= this.rookAttackBitboards[square];
        const index = _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.overflowMultU64(blockers, this.rookMagics[square]) >> this.rookShifts[square];
        return this.rookMovesForSquare[square][Number(index)];
    }
    static getBishopMoves(square, blockers) {
        if (!this.#initialized)
            throw new Error("magics data hasn't been initialized yet");
        blockers = _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.reverse(blockers);
        blockers &= this.bishopAttackBitboards[square];
        const index = _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.overflowMultU64(blockers, this.bishopMagics[square]) >> this.bishopShifts[square];
        return this.bishopMovesForSquare[square][Number(index)];
    }
    static computeRookMagics(options = {}) {
        if (!this.#initialized)
            throw new Error("magics data hasn't been initialized yet");
        const bestMagicsSoFar = [];
        for (let squareIndex = 0; squareIndex < 64; squareIndex++) {
            const blockers = this.rookBlockerBitboards[squareIndex];
            let candidate = 0n, set;
            do {
                candidate = _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.randomU64() & _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.randomU64() & _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.randomU64();
                set = new Set(blockers.map((blocker) => _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.overflowMultU64(blocker, candidate) >> this.rookShifts[squareIndex]));
            } while (set.size !== blockers.length);
            bestMagicsSoFar.push(candidate);
            if (options.logging)
                console.log(`${_index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.squareName(squareIndex)}: ${candidate.toString(options.radix ?? 10)}`);
        }
        return bestMagicsSoFar;
    }
    static computeBishopMagics(options = {}) {
        if (!this.#initialized)
            throw new Error("magics data hasn't been initialized yet");
        const bestMagicsSoFar = [];
        for (let squareIndex = 0; squareIndex < 64; squareIndex++) {
            const blockers = this.bishopBlockerBitboards[squareIndex];
            let candidate = 0n, set;
            do {
                candidate = _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.randomU64() & _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.randomU64() & _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.randomU64();
                set = new Set(blockers.map((blocker) => _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.overflowMultU64(blocker, candidate) >> this.bishopShifts[squareIndex]));
            } while (set.size !== blockers.length);
            bestMagicsSoFar.push(candidate);
            if (options.logging)
                console.log(`${_index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.squareName(squareIndex)}: ${candidate.toString(options.radix ?? 10)}`);
        }
        return bestMagicsSoFar;
    }
    static #computeBlockerBitboard(index, bitboard) {
        const bits = this.#countBitsSet(bitboard);
        let blockers = 0n;
        for (let i = 0, j = 0; i < bits; i++) {
            [bitboard, j] = _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.popLSB(bitboard);
            if (index & (1 << i))
                blockers |= 1n << BigInt(j);
        }
        return blockers;
    }
    static #countBitsSet(v) {
        let count;
        for (count = 0; v; count++)
            v &= v - 1n;
        return count;
    }
    static #computeAttackBitboard(startSquare, startIndex, endIndex) {
        let attackBitboard = 0n;
        const startFile = _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.fileIndex(startSquare);
        const startRank = _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.rankIndex(startSquare);
        let pruneEdgeMask = this.boardEdgeMask;
        if (startFile === 0 || startFile === 7)
            pruneEdgeMask |= this.fileA << BigInt(startFile);
        if (startRank === 0 || startRank === 7)
            pruneEdgeMask |= this.rank1 << (8n * BigInt(startRank));
        for (let i = startIndex; i < endIndex; i++) {
            const dirOffset = _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.directionOffsets[i];
            for (let n = 0; n < _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.squaresToEdge[startSquare][i]; n++) {
                const targetSquare = startSquare + dirOffset * (n + 1);
                attackBitboard |= 1n << BigInt(targetSquare);
            }
        }
        attackBitboard &= pruneEdgeMask;
        attackBitboard &= this.boardCornerMask;
        return attackBitboard;
    }
}


/***/ }),

/***/ "../dist/Move.js":
/*!***********************!*\
  !*** ../dist/Move.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Move: () => (/* binding */ Move)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../dist/index.js");

class Move {
    static Flag = {
        None: 0b0000,
        EnPassantCapture: 0b0001,
        Castling: 0b0010,
        DoublePawnPush: 0b0011,
        PromoteToQueen: 0b0100,
        PromoteToKnight: 0b0101,
        PromoteToRook: 0b0110,
        PromoteToBishop: 0b0111,
    };
    static #startSquareMask = 0b0000000000111111;
    static #targetSquareMask = 0b0000111111000000;
    #bits;
    constructor(start, target, flag = 0) {
        this.#bits = start | target << 6 | flag << 12;
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
        _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None,
        _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None,
        _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None,
        _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None,
        _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Queen,
        _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Knight,
        _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Rook,
        _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Bishop,
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
        let name = _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.squareName(this.startSquare) + _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.squareName(this.targetSquare);
        if (this.isPromotion) {
            if (this.moveFlag === Move.Flag.PromoteToQueen)
                name += "q";
            if (this.moveFlag === Move.Flag.PromoteToRook)
                name += "r";
            if (this.moveFlag === Move.Flag.PromoteToBishop)
                name += "b";
            if (this.moveFlag === Move.Flag.PromoteToKnight)
                name += "n";
        }
        return name;
    }
    static #moveRegex = /^(?<start>[a-h][1-8])(?<target>[a-h][1-8])(?<promotion>q|r|b|n)?$/;
    static parseMove(move, board) {
        if (!this.#moveRegex.test(move))
            return this.invalidMove();
        const { start, target, promotion } = move.match(this.#moveRegex).groups;
        const startFile = _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.fileNames.indexOf(start[0]);
        const startRank = _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.rankNames.indexOf(start[1]);
        const targetFile = _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.fileNames.indexOf(target[0]);
        const targetRank = _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.rankNames.indexOf(target[1]);
        const startIndex = _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.indexFromCoord(startFile, startRank);
        const targetIndex = _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.indexFromCoord(targetFile, targetRank);
        let moveFlag = 0;
        if (promotion) {
            if (promotion === "q")
                moveFlag = Move.Flag.PromoteToQueen;
            if (promotion === "r")
                moveFlag = Move.Flag.PromoteToRook;
            if (promotion === "b")
                moveFlag = Move.Flag.PromoteToBishop;
            if (promotion === "n")
                moveFlag = Move.Flag.PromoteToKnight;
        }
        else {
            const movedPiece = board.squares[startIndex];
            const movedPieceType = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.getType(movedPiece);
            if (movedPieceType === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.King && Math.abs(startFile - targetFile) > 1)
                moveFlag = Move.Flag.Castling;
            if (movedPieceType === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Pawn && Math.abs(startRank - targetRank) > 1)
                moveFlag = Move.Flag.DoublePawnPush;
            const enPassantFile = ((board.currentGameState >> 4) & 0b1111) - 1;
            const enPassantRank = (board.colorToMove === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White ? 6 : 3) - 1;
            if (movedPieceType === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Pawn && targetFile === enPassantFile && targetRank === enPassantRank)
                moveFlag = Move.Flag.EnPassantCapture;
        }
        return new Move(startIndex, targetIndex, moveFlag);
    }
    static equals(a, b) {
        return a.#bits === b.#bits;
    }
    static invalidMove() {
        return new Move(0, 0, 0);
    }
}


/***/ }),

/***/ "../dist/MoveData.js":
/*!***************************!*\
  !*** ../dist/MoveData.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MoveData: () => (/* binding */ MoveData)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../dist/index.js");

class MoveData {
    static directionOffsets = [8, -8, -1, 1, 7, -7, 9, -9];
    static pawnAttackDirections = [[4, 6], [7, 5]];
    static knightAttackBitboards = [];
    static knightOffsets = [15, 17, -17, -15, 10, -6, 6, -10];
    static knightOffsetsForSquare = [...Array(64).keys()].map((squareIndex) => {
        const ifile = squareIndex & 0b111;
        const irank = 7 - (squareIndex >> 3);
        let knightBitboard = 0n;
        const offsets = this.knightOffsets.filter((offset) => {
            const destinationIndex = squareIndex + offset;
            if (destinationIndex < 0 || destinationIndex > 63)
                return false;
            const jfile = destinationIndex & 0b111;
            const jrank = 7 - (destinationIndex >> 3);
            const distance = Math.max(Math.abs(ifile - jfile), Math.abs(irank - jrank));
            const valid = distance === 2;
            if (valid) {
                knightBitboard |= 1n << BigInt(destinationIndex);
                return true;
            }
            return false;
        });
        this.knightAttackBitboards[squareIndex] = knightBitboard;
        return offsets;
    });
    static kingAttackBitboards = [];
    static kingOffsets = this.directionOffsets;
    static kingOffsetsForSquare = [...Array(64).keys()].map((squareIndex) => {
        const ifile = squareIndex & 0b111;
        const irank = 7 - (squareIndex >> 3);
        this.kingAttackBitboards[squareIndex] = 0n;
        return this.kingOffsets.filter((offset) => {
            const destinationIndex = squareIndex + offset;
            if (destinationIndex < 0 || destinationIndex > 63)
                return false;
            const jfile = destinationIndex & 0b111;
            const jrank = 7 - (destinationIndex >> 3);
            const distance = Math.max(Math.abs(ifile - jfile), Math.abs(irank - jrank));
            const valid = distance === 1;
            if (valid) {
                this.kingAttackBitboards[squareIndex] |= 1n << BigInt(destinationIndex);
                return true;
            }
            return false;
        });
    });
    static pawnAttacksWhite = [];
    static pawnAttacksBlack = [];
    static pawnAttackBitboards = [...Array(64).keys()].map((squareIndex) => {
        const file = squareIndex & 0b111;
        const rank = 7 - (squareIndex >> 3);
        const whiteCaptures = [];
        const blackCaptures = [];
        const bitboards = [0n, 0n];
        if (file > 0) {
            if (rank < 7) {
                whiteCaptures.push(squareIndex + 7);
                bitboards[_index_js__WEBPACK_IMPORTED_MODULE_0__.Board.whiteIndex] |= 1n << BigInt(squareIndex + 7);
            }
            if (rank > 0) {
                blackCaptures.push(squareIndex - 9);
                bitboards[_index_js__WEBPACK_IMPORTED_MODULE_0__.Board.blackIndex] |= 1n << BigInt(squareIndex - 9);
            }
        }
        if (file < 7) {
            if (rank < 7) {
                whiteCaptures.push(squareIndex + 9);
                bitboards[_index_js__WEBPACK_IMPORTED_MODULE_0__.Board.whiteIndex] |= 1n << BigInt(squareIndex + 9);
            }
            if (rank > 0) {
                blackCaptures.push(squareIndex - 7);
                bitboards[_index_js__WEBPACK_IMPORTED_MODULE_0__.Board.blackIndex] |= 1n << BigInt(squareIndex - 7);
            }
        }
        this.pawnAttacksWhite[squareIndex] = whiteCaptures;
        this.pawnAttacksBlack[squareIndex] = blackCaptures;
        return bitboards;
    });
    static directionLookup = [...Array(127).keys()].map((difference) => {
        const offset = difference - 63;
        const absoluteOffset = Math.abs(offset);
        const absoluteDir = absoluteOffset % 9 === 0 ? 9 :
            absoluteOffset % 8 === 0 ? 8 :
                absoluteOffset % 7 === 0 ? 7 : 1;
        return absoluteDir * Math.sign(offset);
    });
    static squaresToEdge = [...Array(64).keys()].map((i) => {
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
}


/***/ }),

/***/ "../dist/MoveGenerator.js":
/*!********************************!*\
  !*** ../dist/MoveGenerator.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MoveGenerator: () => (/* binding */ MoveGenerator)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../dist/index.js");

class MoveGenerator {
    #board;
    #moves;
    #whiteToMove;
    #friendlyColor;
    #opponentColor;
    #friendlyKingSquare;
    #friendlyColorIndex;
    #opponentColorIndex;
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
    get inCheck() { return this.#inCheck; }
    get checkRayBitmask() { return this.#checkRayBitmask; }
    get pinRayBitmask() { return this.#pinRayBitmask; }
    get opponentAttackMap() { return this.#opponentAttackMap; }
    static get #defaultOptions() {
        return { excludeQuietMoves: false };
    }
    #options = MoveGenerator.#defaultOptions;
    constructor(board) {
        this.#board = board;
        this.#moves = [];
        this.#whiteToMove = board.colorToMove === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White;
        this.#friendlyColor = board.colorToMove;
        this.#opponentColor = board.colorToMove === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White ? _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Black : _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White;
        this.#friendlyColorIndex = this.#whiteToMove ? _index_js__WEBPACK_IMPORTED_MODULE_0__.Board.whiteIndex : _index_js__WEBPACK_IMPORTED_MODULE_0__.Board.blackIndex;
        this.#opponentColorIndex = (1 - this.#friendlyColorIndex);
        this.#friendlyKingSquare = board.kingSquare[this.#friendlyColorIndex];
    }
    generateMoves(options = {}) {
        this.#options = {
            ...MoveGenerator.#defaultOptions,
            ...options
        };
        this.#moves.length = 0;
        this.#computeAttacks();
        this.#generateKingMoves();
        if (this.#inDoubleCheck)
            return this.#moves;
        this.#generateSlidingMoves();
        this.#generateKnightMoves();
        this.#generatePawnMoves();
        return this.#moves;
    }
    #generateSlidingMoves() {
        for (const rookSquare of this.#board.rooks[this.#friendlyColorIndex].squares)
            this.#generateSlidingPieceMoves(rookSquare, 0, 4);
        for (const bishopSquare of this.#board.bishops[this.#friendlyColorIndex].squares)
            this.#generateSlidingPieceMoves(bishopSquare, 4, 8);
        for (const queenSquare of this.#board.queens[this.#friendlyColorIndex].squares)
            this.#generateSlidingPieceMoves(queenSquare, 0, 8);
    }
    #generateSlidingPieceMoves(startSquare, startIndex, endIndex) {
        const isPinned = this.#isPinned(startSquare);
        if (this.#inCheck && isPinned)
            return;
        for (let i = startIndex; i < endIndex; i++) {
            const dirOffset = _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.directionOffsets[i];
            if (this.#friendlyKingSquare !== -1 && isPinned && !this.#isAlongRay(dirOffset, this.#friendlyKingSquare, startSquare))
                continue;
            for (let n = 0; n < _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.squaresToEdge[startSquare][i]; n++) {
                const targetSquare = startSquare + dirOffset * (n + 1);
                const pieceOnTarget = this.#board.squares[targetSquare];
                if (_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.isColor(pieceOnTarget, this.#board.colorToMove))
                    break;
                const isCapture = pieceOnTarget !== _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None;
                const preventsCheck = this.#inCheckRay(targetSquare);
                if (!this.#inCheck || preventsCheck) {
                    if (!this.#options.excludeQuietMoves || isCapture) {
                        this.#moves.push(new _index_js__WEBPACK_IMPORTED_MODULE_0__.Move(startSquare, targetSquare));
                    }
                }
                if (isCapture || preventsCheck)
                    break;
            }
        }
    }
    #generateKnightMoves() {
        for (const startSquare of this.#board.knights[this.#friendlyColorIndex].squares) {
            if (this.#isPinned(startSquare))
                continue;
            for (const offset of _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.knightOffsetsForSquare[startSquare]) {
                const targetSquare = startSquare + offset;
                const pieceOnTarget = this.#board.squares[targetSquare];
                const isCapture = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.isColor(pieceOnTarget, this.#opponentColor);
                if (!this.#options.excludeQuietMoves || isCapture) {
                    if (_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.isColor(pieceOnTarget, this.#friendlyColor) || (this.#inCheck && !this.#inCheckRay(targetSquare)))
                        continue;
                    this.#moves.push(new _index_js__WEBPACK_IMPORTED_MODULE_0__.Move(startSquare, targetSquare));
                }
            }
        }
    }
    #generateKingMoves() {
        if (this.#friendlyKingSquare === -1)
            return;
        for (const offset of _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.kingOffsetsForSquare[this.#friendlyKingSquare]) {
            const targetSquare = this.#friendlyKingSquare + offset;
            const pieceOnTarget = this.#board.squares[targetSquare];
            if (pieceOnTarget !== _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None && _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.isColor(pieceOnTarget, this.#friendlyColor))
                continue;
            const isCapture = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.isColor(pieceOnTarget, this.#opponentColor);
            if (!isCapture && (this.#options.excludeQuietMoves || this.#inCheckRay(targetSquare)))
                continue;
            if (!this.#squareIsAttacked(targetSquare)) {
                this.#moves.push(new _index_js__WEBPACK_IMPORTED_MODULE_0__.Move(this.#friendlyKingSquare, targetSquare));
                if (!this.#inCheck && !isCapture) {
                    const hasKingsideCastleRight = (this.#board.currentGameState & (this.#whiteToMove ? 0b0001 : 0b0100)) !== 0;
                    const hasQueensideCastleRight = (this.#board.currentGameState & (this.#whiteToMove ? 0b0010 : 0b1000)) !== 0;
                    if ((targetSquare === _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.f1 || targetSquare === _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.f8) && hasKingsideCastleRight) {
                        const kingsideSquare = targetSquare + 1;
                        if (this.#board.squares[kingsideSquare] === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None && !this.#squareIsAttacked(kingsideSquare)) {
                            this.#moves.push(new _index_js__WEBPACK_IMPORTED_MODULE_0__.Move(this.#friendlyKingSquare, kingsideSquare, _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.Castling));
                        }
                    }
                    if ((targetSquare === _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.d1 || targetSquare === _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.d8) && hasQueensideCastleRight) {
                        const queensideSquare = targetSquare - 1;
                        if (this.#board.squares[queensideSquare] === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None &&
                            this.#board.squares[queensideSquare - 1] === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None &&
                            !this.#squareIsAttacked(queensideSquare)) {
                            this.#moves.push(new _index_js__WEBPACK_IMPORTED_MODULE_0__.Move(this.#friendlyKingSquare, queensideSquare, _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.Castling));
                        }
                    }
                }
            }
        }
    }
    #generatePawnMoves() {
        const whiteToMove = this.#board.colorToMove === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White;
        const colorToMoveIndex = whiteToMove ? _index_js__WEBPACK_IMPORTED_MODULE_0__.Board.whiteIndex : _index_js__WEBPACK_IMPORTED_MODULE_0__.Board.blackIndex;
        const pawnOffset = whiteToMove ? 8 : -8;
        const startRank = whiteToMove ? 1 : 6;
        const rankBeforePromotion = whiteToMove ? 6 : 1;
        const enPassantFile = ((this.#board.currentGameState >> 4) & 0b1111) - 1;
        const enPassantSquare = enPassantFile === -1 ? -1 : (8 * (whiteToMove ? 5 : 2)) + enPassantFile;
        for (const startSquare of this.#board.pawns[this.#friendlyColorIndex].squares) {
            const rank = _index_js__WEBPACK_IMPORTED_MODULE_0__.BoardRepresentation.rankIndex(startSquare);
            const isAboutToPromote = rank === rankBeforePromotion;
            if (!this.#options.excludeQuietMoves) {
                const oneSquareForward = startSquare + pawnOffset;
                if (this.#board.squares[oneSquareForward] === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None) {
                    if (!this.#isPinned(startSquare) || (this.#friendlyKingSquare !== -1 && this.#isAlongRay(pawnOffset, startSquare, this.#friendlyKingSquare))) {
                        if (!this.#inCheck || this.#inCheckRay(oneSquareForward)) {
                            if (isAboutToPromote) {
                                this.#generatePromotionMoves(startSquare, oneSquareForward);
                            }
                            else {
                                this.#moves.push(new _index_js__WEBPACK_IMPORTED_MODULE_0__.Move(startSquare, oneSquareForward));
                            }
                        }
                        if (rank === startRank) {
                            const twoSquareForward = oneSquareForward + pawnOffset;
                            if (this.#board.squares[twoSquareForward] === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None) {
                                if (!this.#inCheck || this.#inCheckRay(twoSquareForward)) {
                                    this.#moves.push(new _index_js__WEBPACK_IMPORTED_MODULE_0__.Move(startSquare, twoSquareForward, _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.DoublePawnPush));
                                }
                            }
                        }
                    }
                }
            }
            for (let dir = 0; dir < 2; dir++) {
                if (_index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.squaresToEdge[startSquare][_index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.pawnAttackDirections[colorToMoveIndex][dir]] > 0) {
                    const pawnCaptureDir = _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.directionOffsets[_index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.pawnAttackDirections[colorToMoveIndex][dir]];
                    const targetSquare = startSquare + pawnCaptureDir;
                    const targetPiece = this.#board.squares[targetSquare];
                    if (this.#friendlyKingSquare !== -1 && this.#isPinned(startSquare) && !this.#isAlongRay(pawnCaptureDir, this.#friendlyKingSquare, startSquare))
                        continue;
                    if (targetPiece && !_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.isColor(targetPiece, this.#board.colorToMove)) {
                        if (this.#inCheck && !this.#inCheckRay(targetSquare))
                            continue;
                        if (isAboutToPromote) {
                            this.#generatePromotionMoves(startSquare, targetSquare);
                        }
                        else {
                            this.#moves.push(new _index_js__WEBPACK_IMPORTED_MODULE_0__.Move(startSquare, targetSquare));
                        }
                    }
                    if (targetSquare === enPassantSquare) {
                        const capturedPawnSquare = targetSquare + (whiteToMove ? -8 : 8);
                        if (!this.#inCheckAfterEnPassant(startSquare, targetSquare, capturedPawnSquare)) {
                            this.#moves.push(new _index_js__WEBPACK_IMPORTED_MODULE_0__.Move(startSquare, targetSquare, _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.EnPassantCapture));
                        }
                    }
                }
            }
        }
    }
    #generatePromotionMoves(startSquare, targetSquare) {
        this.#moves.push(new _index_js__WEBPACK_IMPORTED_MODULE_0__.Move(startSquare, targetSquare, _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.PromoteToQueen));
        this.#moves.push(new _index_js__WEBPACK_IMPORTED_MODULE_0__.Move(startSquare, targetSquare, _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.PromoteToRook));
        this.#moves.push(new _index_js__WEBPACK_IMPORTED_MODULE_0__.Move(startSquare, targetSquare, _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.PromoteToBishop));
        this.#moves.push(new _index_js__WEBPACK_IMPORTED_MODULE_0__.Move(startSquare, targetSquare, _index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.PromoteToKnight));
    }
    #isAlongRay(rayDir, startSquare, targetSquare) {
        if (this.#friendlyKingSquare === -1)
            return false;
        const moveDir = _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.directionLookup[targetSquare - startSquare + 63];
        return rayDir === moveDir || -rayDir === moveDir;
    }
    #isPinned(square) {
        if (this.#friendlyKingSquare === -1)
            return false;
        return this.#pinsExistInPosition && _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.containsSquare(this.#pinRayBitmask, square);
    }
    #inCheckRay(square) {
        if (this.#friendlyKingSquare === -1)
            return false;
        return this.#inCheck && _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.containsSquare(this.#checkRayBitmask, square);
    }
    #squareIsAttacked(square) {
        if (this.#friendlyKingSquare === -1)
            return false;
        return _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.containsSquare(this.#opponentAttackMap, square);
    }
    #inCheckAfterEnPassant(startSquare, targetSquare, enPassantCapturedSquare) {
        if (this.#friendlyKingSquare === -1)
            return false;
        this.#board.squares[targetSquare] = this.#board.squares[startSquare];
        this.#board.squares[startSquare] = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None;
        this.#board.squares[enPassantCapturedSquare] = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None;
        const inCheckAfterCapture = this.#squareAttackedAfterEnPassant(enPassantCapturedSquare);
        this.#board.squares[targetSquare] = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None;
        this.#board.squares[startSquare] = this.#friendlyColor | _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Pawn;
        this.#board.squares[enPassantCapturedSquare] = this.#opponentColor | _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Pawn;
        return inCheckAfterCapture;
    }
    #squareAttackedAfterEnPassant(enPassantCapturedSquare) {
        if (_index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.containsSquare(this.#opponentAttackMapNoPawns, this.#friendlyKingSquare))
            return true;
        const dirIndex = enPassantCapturedSquare < this.#friendlyKingSquare ? 2 : 3;
        for (let n = 0; n < _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.squaresToEdge[this.#friendlyKingSquare][dirIndex]; n++) {
            const squareIndex = this.#friendlyKingSquare + _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.directionOffsets[dirIndex] * (n + 1);
            const piece = this.#board.squares[squareIndex];
            if (piece === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None)
                continue;
            if (_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.isColor(piece, this.#friendlyColor))
                break;
            if (_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.isRookOrQueen(piece))
                return true;
            else
                break;
        }
        for (let i = 0; i < 2; i++) {
            if (_index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.squaresToEdge[this.#friendlyKingSquare][_index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.pawnAttackDirections[this.#friendlyColorIndex][i]] > 0) {
                const piece = this.#board.squares[this.#friendlyKingSquare + _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.directionOffsets[_index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.pawnAttackDirections[this.#friendlyColorIndex][i]]];
                if (piece === (this.#opponentColor | _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Pawn))
                    return true;
            }
        }
        return false;
    }
    #computeAttacks() {
        if (this.#friendlyKingSquare === -1)
            return;
        this.#computeSlidingAttackMap();
        const startDirIndex = this.#board.queens[this.#opponentColorIndex].count !== 0 ||
            this.#board.rooks[this.#opponentColorIndex].count !== 0 ? 0 : 4;
        const endDirIndex = this.#board.queens[this.#opponentColorIndex].count !== 0 ||
            this.#board.bishops[this.#opponentColorIndex].count !== 0 ? 8 : 4;
        for (let dir = startDirIndex; dir < endDirIndex; dir++) {
            const isDiagonal = dir >= 4;
            const n = _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.squaresToEdge[this.#friendlyKingSquare][dir];
            const offset = _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.directionOffsets[dir];
            let friendlyPieceInRay = false;
            let rayMask = 0n;
            for (let i = 0; i < n; i++) {
                const squareIndex = this.#friendlyKingSquare + offset * (i + 1);
                rayMask |= 1n << BigInt(squareIndex);
                const piece = this.#board.squares[squareIndex];
                if (piece === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None)
                    continue;
                if (_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.isColor(piece, this.#friendlyColor)) {
                    if (!friendlyPieceInRay)
                        friendlyPieceInRay = true;
                    else
                        break;
                    continue;
                }
                const pieceType = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.getType(piece);
                if ((isDiagonal && _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.isBishopOrQueen(pieceType)) || (!isDiagonal && _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.isRookOrQueen(pieceType))) {
                    if (friendlyPieceInRay) {
                        this.#pinsExistInPosition = true;
                        this.#pinRayBitmask |= rayMask;
                    }
                    else {
                        this.#checkRayBitmask |= rayMask;
                        this.#inDoubleCheck = this.#inCheck;
                        this.#inCheck = true;
                    }
                }
                break;
            }
            if (this.#inDoubleCheck)
                break;
        }
        this.#opponentKnightAttacks = 0n;
        let isKnightCheck = false;
        for (const startSquare of this.#board.knights[this.#opponentColorIndex].squares) {
            this.#opponentKnightAttacks |= _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.knightAttackBitboards[startSquare];
            if (!isKnightCheck && _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.containsSquare(this.#opponentKnightAttacks, this.#friendlyKingSquare)) {
                isKnightCheck = true;
                this.#inDoubleCheck = this.#inCheck;
                this.#inCheck = true;
                this.#checkRayBitmask |= 1n << BigInt(startSquare);
            }
        }
        this.#opponentPawnAttackMap = 0n;
        let isPawnCheck = false;
        for (const startSquare of this.#board.pawns[this.#opponentColorIndex].squares) {
            const pawnAttacks = _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.pawnAttackBitboards[startSquare][this.#opponentColorIndex];
            this.#opponentPawnAttackMap |= pawnAttacks;
            if (!isPawnCheck && _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.containsSquare(pawnAttacks, this.#friendlyKingSquare)) {
                isPawnCheck = true;
                this.#inDoubleCheck = this.#inCheck;
                this.#inCheck = true;
                this.#checkRayBitmask |= 1n << BigInt(startSquare);
            }
        }
        const enemyKingSquare = this.#board.kingSquare[this.#opponentColorIndex];
        this.#opponentAttackMapNoPawns =
            this.#opponentSlidingAttackMap |
                this.#opponentKnightAttacks |
                (enemyKingSquare === -1 ? 0n : _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.kingAttackBitboards[enemyKingSquare]);
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
    #computeSlidingAttack(startSquare, startDirIndex, endDirIndex) {
        for (let dir = startDirIndex; dir < endDirIndex; dir++) {
            const offset = _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.directionOffsets[dir];
            for (let n = 0; n < _index_js__WEBPACK_IMPORTED_MODULE_0__.MoveData.squaresToEdge[startSquare][dir]; n++) {
                const targetSquare = startSquare + offset * (n + 1);
                const targetSquarePiece = this.#board.squares[targetSquare];
                this.#opponentSlidingAttackMap |= 1n << BigInt(targetSquare);
                if (targetSquare !== this.#friendlyKingSquare && targetSquarePiece !== _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None)
                    break;
            }
        }
    }
}


/***/ }),

/***/ "../dist/Piece.js":
/*!************************!*\
  !*** ../dist/Piece.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Piece: () => (/* binding */ Piece)
/* harmony export */ });
class Piece {
    static None = 0b00000;
    static King = 0b00001;
    static Pawn = 0b00010;
    static Knight = 0b00011;
    static Bishop = 0b00101;
    static Rook = 0b00110;
    static Queen = 0b00111;
    static White = 0b01000;
    static Black = 0b10000;
    static #typeMask = 0b00111;
    static #colorMask = 0b11000;
    static isColor(piece, color) {
        return this.getColor(piece) === color;
    }
    static getColor(piece) {
        return piece & this.#colorMask;
    }
    static getType(piece) {
        return piece & this.#typeMask;
    }
    static isType(piece, type) {
        return this.getType(piece) === type;
    }
    static isRookOrQueen(piece) {
        return (piece & 0b110) === 0b110;
    }
    static isBishopOrQueen(piece) {
        return (piece & 0b101) === 0b101;
    }
    static isSlidingPiece(piece) {
        return (piece & 0b100) !== 0;
    }
}


/***/ }),

/***/ "../dist/PieceList.js":
/*!****************************!*\
  !*** ../dist/PieceList.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PieceList: () => (/* binding */ PieceList)
/* harmony export */ });
class PieceList {
    #squares = [];
    addPiece(square) {
        this.#squares.push(square);
    }
    removePiece(square) {
        const index = this.#squares.indexOf(square);
        if (index >= 0)
            this.#squares.splice(index, 1);
    }
    movePiece(startSquare, targetSquare) {
        const index = this.#squares.indexOf(startSquare);
        this.#squares[index] = targetSquare;
    }
    get squares() {
        return this.#squares;
    }
    get count() {
        return this.#squares.length;
    }
    static empty = new PieceList();
}


/***/ }),

/***/ "../dist/Zobrist.js":
/*!**************************!*\
  !*** ../dist/Zobrist.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Zobrist: () => (/* binding */ Zobrist)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../dist/index.js");

class Zobrist {
    static filename = "zobrist.txt";
    static piecesArray = [];
    static castlingRights = [];
    static enPassantFile = [];
    static sideToMove = _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.randomU64();
    static {
        for (let pieceIndex = 0; pieceIndex < 8; pieceIndex++) {
            this.piecesArray.push([[], []]);
            for (let squareIndex = 0; squareIndex < 64; squareIndex++) {
                this.piecesArray[pieceIndex][_index_js__WEBPACK_IMPORTED_MODULE_0__.Board.whiteIndex][squareIndex] = _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.randomU64();
                this.piecesArray[pieceIndex][_index_js__WEBPACK_IMPORTED_MODULE_0__.Board.blackIndex][squareIndex] = _index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.randomU64();
            }
        }
        for (let i = 0; i < 16; i++)
            this.castlingRights.push(_index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.randomU64());
        for (let i = 0; i < 9; i++)
            this.enPassantFile.push(_index_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard.randomU64());
    }
    static calculateZobristKey(board) {
        let zobristKey = 0n;
        for (let squareIndex = 0; squareIndex < 64; squareIndex++) {
            if (board.squares[squareIndex] !== _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None) {
                const pieceType = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.getType(board.squares[squareIndex]);
                const pieceColor = _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.getColor(board.squares[squareIndex]);
                zobristKey ^= this.piecesArray[pieceType][pieceColor === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.White ? _index_js__WEBPACK_IMPORTED_MODULE_0__.Board.whiteIndex : _index_js__WEBPACK_IMPORTED_MODULE_0__.Board.blackIndex][squareIndex];
            }
        }
        const enPassantIndex = (board.currentGameState >> 4) & 0b1111;
        zobristKey ^= this.enPassantFile[enPassantIndex];
        if (board.colorToMove === _index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.Black)
            zobristKey ^= this.sideToMove;
        zobristKey ^= this.castlingRights[board.currentGameState & 0b1111];
        return zobristKey;
    }
}


/***/ }),

/***/ "../dist/index.js":
/*!************************!*\
  !*** ../dist/index.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bitboard: () => (/* reexport safe */ _Bitboard_js__WEBPACK_IMPORTED_MODULE_0__.Bitboard),
/* harmony export */   Board: () => (/* reexport safe */ _Board_js__WEBPACK_IMPORTED_MODULE_5__.Board),
/* harmony export */   BoardRepresentation: () => (/* reexport safe */ _BoardRepresentation_js__WEBPACK_IMPORTED_MODULE_1__.BoardRepresentation),
/* harmony export */   FEN: () => (/* reexport safe */ _FEN_js__WEBPACK_IMPORTED_MODULE_7__.FEN),
/* harmony export */   GameState: () => (/* reexport safe */ _GameState_js__WEBPACK_IMPORTED_MODULE_2__.GameState),
/* harmony export */   Magics: () => (/* reexport safe */ _Magics_js__WEBPACK_IMPORTED_MODULE_8__.Magics),
/* harmony export */   Move: () => (/* reexport safe */ _Move_js__WEBPACK_IMPORTED_MODULE_9__.Move),
/* harmony export */   MoveData: () => (/* reexport safe */ _MoveData_js__WEBPACK_IMPORTED_MODULE_6__.MoveData),
/* harmony export */   MoveGenerator: () => (/* reexport safe */ _MoveGenerator_js__WEBPACK_IMPORTED_MODULE_10__.MoveGenerator),
/* harmony export */   Piece: () => (/* reexport safe */ _Piece_js__WEBPACK_IMPORTED_MODULE_3__.Piece),
/* harmony export */   PieceList: () => (/* reexport safe */ _PieceList_js__WEBPACK_IMPORTED_MODULE_4__.PieceList),
/* harmony export */   Zobrist: () => (/* reexport safe */ _Zobrist_js__WEBPACK_IMPORTED_MODULE_11__.Zobrist)
/* harmony export */ });
/* harmony import */ var _Bitboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bitboard.js */ "../dist/Bitboard.js");
/* harmony import */ var _BoardRepresentation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BoardRepresentation.js */ "../dist/BoardRepresentation.js");
/* harmony import */ var _GameState_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameState.js */ "../dist/GameState.js");
/* harmony import */ var _Piece_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Piece.js */ "../dist/Piece.js");
/* harmony import */ var _PieceList_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PieceList.js */ "../dist/PieceList.js");
/* harmony import */ var _Board_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Board.js */ "../dist/Board.js");
/* harmony import */ var _MoveData_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MoveData.js */ "../dist/MoveData.js");
/* harmony import */ var _FEN_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FEN.js */ "../dist/FEN.js");
/* harmony import */ var _Magics_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Magics.js */ "../dist/Magics.js");
/* harmony import */ var _Move_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Move.js */ "../dist/Move.js");
/* harmony import */ var _MoveGenerator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./MoveGenerator.js */ "../dist/MoveGenerator.js");
/* harmony import */ var _Zobrist_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Zobrist.js */ "../dist/Zobrist.js");














/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dist_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dist/index.js */ "../dist/index.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ "./src/render.ts");
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setup.js */ "./src/setup.ts");
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state.js */ "./src/state.ts");




(0,_setup_js__WEBPACK_IMPORTED_MODULE_2__.setup)();
(0,_render_js__WEBPACK_IMPORTED_MODULE_1__.render)();
function makeMoveOnBoard(move) {
    if (_state_js__WEBPACK_IMPORTED_MODULE_3__.state.gameOver)
        return;
    // move on board
    _state_js__WEBPACK_IMPORTED_MODULE_3__.state.board.makeMove(move);
    // update state
    _state_js__WEBPACK_IMPORTED_MODULE_3__.state.movesMade.push(move);
    _state_js__WEBPACK_IMPORTED_MODULE_3__.state.legalMoves = new _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.MoveGenerator(_state_js__WEBPACK_IMPORTED_MODULE_3__.state.board).generateMoves();
}
_render_js__WEBPACK_IMPORTED_MODULE_1__.boardElement.addEventListener("click", function clickHandler(e) {
    if (!(e.target instanceof HTMLElement))
        return;
    const cell = e.target.closest(".cell");
    if (!cell)
        return;
    // selected the same cell
    if (_state_js__WEBPACK_IMPORTED_MODULE_3__.state.selected === Number(cell.dataset.index)) {
        _state_js__WEBPACK_IMPORTED_MODULE_3__.state.selected = -1;
    }
    else {
        const index = Number(cell.dataset.index);
        const attemptedMove = _state_js__WEBPACK_IMPORTED_MODULE_3__.state.legalMoves.find((move) => (move.startSquare === _state_js__WEBPACK_IMPORTED_MODULE_3__.state.selected && move.targetSquare === index));
        if (attemptedMove) {
            // made a move, deselect cell
            _state_js__WEBPACK_IMPORTED_MODULE_3__.state.selected = -1;
            let audio;
            if (attemptedMove.isPromotion) {
                // replace with ui and await user input later
                const promotionInput = prompt("promotion (q/n/b/r):")?.[0]?.toLowerCase() ?? "q";
                const promotionFlag = "qnbr".includes(promotionInput) ? {
                    q: _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.PromoteToQueen,
                    n: _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.PromoteToKnight,
                    b: _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.PromoteToBishop,
                    r: _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.PromoteToRook,
                }[promotionInput] : _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.PromoteToQueen;
                makeMoveOnBoard(new _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Move(attemptedMove.startSquare, attemptedMove.targetSquare, promotionFlag));
                audio = new Audio("assets/sounds/move-promote.mp3");
            }
            else {
                if (attemptedMove.moveFlag === _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.Castling) {
                    audio = new Audio("assets/sounds/castle.mp3");
                }
                else if (attemptedMove.moveFlag === _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Move.Flag.EnPassantCapture || (_state_js__WEBPACK_IMPORTED_MODULE_3__.state.board.squares[attemptedMove.targetSquare] !== _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None && !_dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.isColor(_state_js__WEBPACK_IMPORTED_MODULE_3__.state.board.squares[attemptedMove.targetSquare], _state_js__WEBPACK_IMPORTED_MODULE_3__.state.board.colorToMove))) {
                    audio = new Audio("assets/sounds/capture.mp3");
                }
                else {
                    audio = new Audio("assets/sounds/move-self.mp3");
                }
                // move on board
                makeMoveOnBoard(attemptedMove);
                const mg = new _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.MoveGenerator(_state_js__WEBPACK_IMPORTED_MODULE_3__.state.board);
                mg.generateMoves();
                if (mg.inCheck)
                    audio = new Audio("assets/sounds/move-check.mp3");
            }
            const gameState = _state_js__WEBPACK_IMPORTED_MODULE_3__.state.board.gameState();
            if (gameState !== _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.GameState.Playing) {
                audio = new Audio("assets/sounds/game-end.mp3");
                _state_js__WEBPACK_IMPORTED_MODULE_3__.state.gameOver = true;
                _render_js__WEBPACK_IMPORTED_MODULE_1__.boardElement.removeEventListener("click", clickHandler);
            }
            audio.play();
        }
        else if (_state_js__WEBPACK_IMPORTED_MODULE_3__.state.board.squares[index] === _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.None || !_dist_index_js__WEBPACK_IMPORTED_MODULE_0__.Piece.isColor(_state_js__WEBPACK_IMPORTED_MODULE_3__.state.board.squares[index], _state_js__WEBPACK_IMPORTED_MODULE_3__.state.board.colorToMove)) {
            // can't select enemy piece or empty cell
            _state_js__WEBPACK_IMPORTED_MODULE_3__.state.selected = -1;
        }
        else {
            _state_js__WEBPACK_IMPORTED_MODULE_3__.state.selected = index;
        }
    }
    (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.render)();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LDRDQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFFbkIsSUFBSSxFQUFFLENBQUMsT0FBTztvQkFBRSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQzthQUNyRTtZQUVELE1BQU0sU0FBUyxHQUFHLDRDQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBRTFDLElBQUksU0FBUyxLQUFLLHFEQUFTLENBQUMsT0FBTyxFQUFFO2dCQUNqQyxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztnQkFFaEQsNENBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUV0QixvREFBWSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQzthQUMzRDtZQUVELEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNoQjthQUFNLElBQUksNENBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLGlEQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsaURBQUssQ0FBQyxPQUFPLENBQUMsNENBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLDRDQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3pILHlDQUF5QztZQUN6Qyw0Q0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN2QjthQUFNO1lBQ0gsNENBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQzFCO0tBQ0o7SUFFRCxrREFBTSxFQUFFLENBQUM7QUFDYixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FwcC8uL3NyYy9pY29uTWFwLnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9yZW5kZXIudHMiLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL3NldHVwLnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9zdGF0ZS50cyIsIndlYnBhY2s6Ly9hcHAvLi4vZGlzdC9CaXRib2FyZC5qcyIsIndlYnBhY2s6Ly9hcHAvLi4vZGlzdC9Cb2FyZC5qcyIsIndlYnBhY2s6Ly9hcHAvLi4vZGlzdC9Cb2FyZFJlcHJlc2VudGF0aW9uLmpzIiwid2VicGFjazovL2FwcC8uLi9kaXN0L0ZFTi5qcyIsIndlYnBhY2s6Ly9hcHAvLi4vZGlzdC9HYW1lU3RhdGUuanMiLCJ3ZWJwYWNrOi8vYXBwLy4uL2Rpc3QvTWFnaWNzLmpzIiwid2VicGFjazovL2FwcC8uLi9kaXN0L01vdmUuanMiLCJ3ZWJwYWNrOi8vYXBwLy4uL2Rpc3QvTW92ZURhdGEuanMiLCJ3ZWJwYWNrOi8vYXBwLy4uL2Rpc3QvTW92ZUdlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly9hcHAvLi4vZGlzdC9QaWVjZS5qcyIsIndlYnBhY2s6Ly9hcHAvLi4vZGlzdC9QaWVjZUxpc3QuanMiLCJ3ZWJwYWNrOi8vYXBwLy4uL2Rpc3QvWm9icmlzdC5qcyIsIndlYnBhY2s6Ly9hcHAvLi4vZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGllY2UgfSBmcm9tIFwiLi4vLi4vZGlzdC9pbmRleC5qc1wiO1xuXG5leHBvcnQgY29uc3QgaWNvbk1hcCA9IHtcbiAgICBbUGllY2UuTm9uZSAgICAgICAgICAgICAgICBdOiBcIm5vbmUuc3ZnXCIgICAgICAgICxcbiAgICBbUGllY2UuV2hpdGUgfCBQaWVjZS5LaW5nICBdOiBcIndoaXRlX2tpbmcuc3ZnXCIgICxcbiAgICBbUGllY2UuV2hpdGUgfCBQaWVjZS5QYXduICBdOiBcIndoaXRlX3Bhd24uc3ZnXCIgICxcbiAgICBbUGllY2UuV2hpdGUgfCBQaWVjZS5LbmlnaHRdOiBcIndoaXRlX2tuaWdodC5zdmdcIixcbiAgICBbUGllY2UuV2hpdGUgfCBQaWVjZS5CaXNob3BdOiBcIndoaXRlX2Jpc2hvcC5zdmdcIixcbiAgICBbUGllY2UuV2hpdGUgfCBQaWVjZS5Sb29rICBdOiBcIndoaXRlX3Jvb2suc3ZnXCIgICxcbiAgICBbUGllY2UuV2hpdGUgfCBQaWVjZS5RdWVlbiBdOiBcIndoaXRlX3F1ZWVuLnN2Z1wiICxcbiAgICBbUGllY2UuQmxhY2sgfCBQaWVjZS5LaW5nICBdOiBcImJsYWNrX2tpbmcuc3ZnXCIgICxcbiAgICBbUGllY2UuQmxhY2sgfCBQaWVjZS5QYXduICBdOiBcImJsYWNrX3Bhd24uc3ZnXCIgICxcbiAgICBbUGllY2UuQmxhY2sgfCBQaWVjZS5LbmlnaHRdOiBcImJsYWNrX2tuaWdodC5zdmdcIixcbiAgICBbUGllY2UuQmxhY2sgfCBQaWVjZS5CaXNob3BdOiBcImJsYWNrX2Jpc2hvcC5zdmdcIixcbiAgICBbUGllY2UuQmxhY2sgfCBQaWVjZS5Sb29rICBdOiBcImJsYWNrX3Jvb2suc3ZnXCIgICxcbiAgICBbUGllY2UuQmxhY2sgfCBQaWVjZS5RdWVlbiBdOiBcImJsYWNrX3F1ZWVuLnN2Z1wiICxcbn07IiwiaW1wb3J0IHsgQm9hcmRSZXByZXNlbnRhdGlvbiB9IGZyb20gXCIuLi8uLi9kaXN0L0JvYXJkUmVwcmVzZW50YXRpb24uanNcIjtcbmltcG9ydCB7IGljb25NYXAgfSBmcm9tIFwiLi9pY29uTWFwLmpzXCI7XG5pbXBvcnQgeyBzdGF0ZSB9IGZyb20gXCIuL3N0YXRlLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBib2FyZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIi5ib2FyZFwiKSE7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgYm9hcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2VsbFwiKS5mb3JFYWNoKChlKSA9PiBlLnJlbW92ZSgpKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuICAgICAgICBjb25zdCBjZWxsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgaW1nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIGltZ0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNlbGwtaW1nXCIpO1xuICAgICAgICBpbWdFbGVtZW50LmRyYWdnYWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IGZpbGUgPSBpICYgMGIxMTE7XG4gICAgICAgIGNvbnN0IHJhbmsgPSA3IC0gKGkgPj4gMyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcmFuayAqIDggKyBmaWxlO1xuXG4gICAgICAgIGNvbnN0IGlzTGlnaHRTcXVhcmUgPSBCb2FyZFJlcHJlc2VudGF0aW9uLmlzTGlnaHRTcXVhcmUoZmlsZSwgcmFuayk7XG5cbiAgICAgICAgY2VsbEVsZW1lbnQuZGF0YXNldC5pbmRleCA9IGluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoaXNMaWdodFNxdWFyZSA/IFwibGlnaHRcIiA6IFwiZGFya1wiKTtcbiAgICAgICAgaW1nRWxlbWVudC5zcmMgPSBcImFzc2V0cy9waWVjZXMvXCIgKyBpY29uTWFwW3N0YXRlLmJvYXJkLnNxdWFyZXNbaW5kZXhdXTtcblxuICAgICAgICBjZWxsRWxlbWVudC5hcHBlbmQoaW1nRWxlbWVudCk7XG4gICAgICAgIGJvYXJkRWxlbWVudC5hcHBlbmQoY2VsbEVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChpbmRleCA9PT0gc3RhdGUuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoaXNMaWdodFNxdWFyZSA/IFwibGlnaHQtc2VsZWN0ZWRcIiA6IFwiZGFyay1zZWxlY3RlZFwiKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlLmxlZ2FsTW92ZXMuc29tZSgobW92ZSkgPT4gKFxuICAgICAgICAgICAgbW92ZS5zdGFydFNxdWFyZSA9PT0gc3RhdGUuc2VsZWN0ZWQgJiYgbW92ZS50YXJnZXRTcXVhcmUgPT09IGluZGV4XG4gICAgICAgICkpKSB7XG4gICAgICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKGlzTGlnaHRTcXVhcmUgPyBcImxpZ2h0LWhpZ2hsaWdodGVkXCIgOiBcImRhcmstaGlnaGxpZ2h0ZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBCb2FyZFJlcHJlc2VudGF0aW9uIH0gZnJvbSBcIi4uLy4uL2Rpc3QvaW5kZXguanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwKCkge1xuICAgIGNvbnN0IGZpbGVzRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmlsZXNcIikhO1xuICAgIGNvbnN0IHJhbmtzRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmFua3NcIikhO1xuXG4gICAgZm9yIChjb25zdCBmIG9mIEJvYXJkUmVwcmVzZW50YXRpb24uZmlsZU5hbWVzKSB7XG4gICAgICAgIGNvbnN0IGZpbGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBmaWxlRGl2LnRleHRDb250ZW50ID0gZjtcblxuICAgICAgICBmaWxlc0VsZW1lbnQuYXBwZW5kKGZpbGVEaXYpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgciBvZiBCb2FyZFJlcHJlc2VudGF0aW9uLnJhbmtOYW1lcykge1xuICAgICAgICBjb25zdCByYW5rRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcmFua0Rpdi50ZXh0Q29udGVudCA9IHI7XG5cbiAgICAgICAgcmFua3NFbGVtZW50LmFwcGVuZChyYW5rRGl2KTtcbiAgICB9XG59IiwiaW1wb3J0IHsgQm9hcmQsIE1vdmUsIE1vdmVHZW5lcmF0b3IgfSBmcm9tIFwiLi4vLi4vZGlzdC9pbmRleC5qc1wiO1xuXG5jb25zdCBib2FyZCA9IG5ldyBCb2FyZCgpLmxvYWRTdGFydGluZ1Bvc2l0aW9uKCk7XG5cbmV4cG9ydCBjb25zdCBzdGF0ZSA9IHtcbiAgICBib2FyZCxcbiAgICBzZWxlY3RlZDogLTEsXG4gICAgbGVnYWxNb3ZlczogbmV3IE1vdmVHZW5lcmF0b3IoYm9hcmQpLmdlbmVyYXRlTW92ZXMoKSxcbiAgICBtb3Zlc01hZGU6IFtdIGFzIE1vdmVbXSxcbiAgICBnYW1lT3ZlcjogZmFsc2UsXG59OyIsImV4cG9ydCBjbGFzcyBCaXRib2FyZCB7XG4gICAgc3RhdGljIGNvbnRhaW5zU3F1YXJlKGJpdGJvYXJkLCBzcXVhcmUpIHtcbiAgICAgICAgcmV0dXJuICgoYml0Ym9hcmQgPj4gQmlnSW50KHNxdWFyZSkpICYgMW4pICE9PSAwbjtcbiAgICB9XG4gICAgc3RhdGljIHJldmVyc2UoYml0Ym9hcmQpIHtcbiAgICAgICAgYml0Ym9hcmQgPSAoYml0Ym9hcmQgJiA0Mjk0OTY3Mjk1bikgPDwgMzJuXG4gICAgICAgICAgICB8IChiaXRib2FyZCAmIDE4NDQ2NzQ0MDY5NDE0NTg0MzIwbikgPj4gMzJuO1xuICAgICAgICBiaXRib2FyZCA9IChiaXRib2FyZCAmIDI4MTQ3MDY4MTgwODg5NW4pIDw8IDE2blxuICAgICAgICAgICAgfCAoYml0Ym9hcmQgJiAxODQ0NjQ2MjYwMzAyNzc0MjcyMG4pID4+IDE2bjtcbiAgICAgICAgYml0Ym9hcmQgPSAoYml0Ym9hcmQgJiA3MTc3NzIxNDI5NDU4OTY5NW4pIDw8IDhuXG4gICAgICAgICAgICB8IChiaXRib2FyZCAmIDE4Mzc0OTY2ODU5NDE0OTYxOTIwbikgPj4gOG47XG4gICAgICAgIGJpdGJvYXJkID0gKGJpdGJvYXJkICYgMTA4NTEwMjU5MjU3MTE1MDA5NW4pIDw8IDRuXG4gICAgICAgICAgICB8IChiaXRib2FyZCAmIDE3MzYxNjQxNDgxMTM4NDAxNTIwbikgPj4gNG47XG4gICAgICAgIGJpdGJvYXJkID0gKGJpdGJvYXJkICYgMzY4OTM0ODgxNDc0MTkxMDMyM24pIDw8IDJuXG4gICAgICAgICAgICB8IChiaXRib2FyZCAmIDE0NzU3Mzk1MjU4OTY3NjQxMjkybikgPj4gMm47XG4gICAgICAgIGJpdGJvYXJkID0gKGJpdGJvYXJkICYgNjE0ODkxNDY5MTIzNjUxNzIwNW4pIDw8IDFuXG4gICAgICAgICAgICB8IChiaXRib2FyZCAmIDEyMjk3ODI5MzgyNDczMDM0NDEwbikgPj4gMW47XG4gICAgICAgIHJldHVybiBiaXRib2FyZDtcbiAgICB9XG4gICAgc3RhdGljICNiaXRTY2FuTWFnaWMgPSAweDA3ZWRkNWU1OWE0ZTI4YzJuO1xuICAgIHN0YXRpYyAjYml0U2NhblRhYmxlID0gW1xuICAgICAgICA2MywgMCwgNTgsIDEsIDU5LCA0NywgNTMsIDIsXG4gICAgICAgIDYwLCAzOSwgNDgsIDI3LCA1NCwgMzMsIDQyLCAzLFxuICAgICAgICA2MSwgNTEsIDM3LCA0MCwgNDksIDE4LCAyOCwgMjAsXG4gICAgICAgIDU1LCAzMCwgMzQsIDExLCA0MywgMTQsIDIyLCA0LFxuICAgICAgICA2MiwgNTcsIDQ2LCA1MiwgMzgsIDI2LCAzMiwgNDEsXG4gICAgICAgIDUwLCAzNiwgMTcsIDE5LCAyOSwgMTAsIDEzLCAyMSxcbiAgICAgICAgNTYsIDQ1LCAyNSwgMzEsIDM1LCAxNiwgOSwgMTIsXG4gICAgICAgIDQ0LCAyNCwgMTUsIDgsIDIzLCA3LCA2LCA1LFxuICAgIF07XG4gICAgc3RhdGljICN1NjQgPSBuZXcgQmlnVWludDY0QXJyYXkoMSk7XG4gICAgc3RhdGljIHBvcExTQihiaXRib2FyZCkge1xuICAgICAgICB0aGlzLiN1NjRbMF0gPSBiaXRib2FyZDtcbiAgICAgICAgdGhpcy4jdTY0WzBdICY9IC1iaXRib2FyZDtcbiAgICAgICAgdGhpcy4jdTY0WzBdICo9IHRoaXMuI2JpdFNjYW5NYWdpYztcbiAgICAgICAgdGhpcy4jdTY0WzBdID4+PSA1OG47XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBiaXRib2FyZCAmIChiaXRib2FyZCAtIDFuKSxcbiAgICAgICAgICAgIHRoaXMuI2JpdFNjYW5UYWJsZVtOdW1iZXIodGhpcy4jdTY0WzBdKV0sXG4gICAgICAgIF07XG4gICAgfVxuICAgIHN0YXRpYyBvdmVyZmxvd011bHRVNjQoYSwgYikge1xuICAgICAgICB0aGlzLiN1NjRbMF0gPSBhO1xuICAgICAgICB0aGlzLiN1NjRbMF0gKj0gYjtcbiAgICAgICAgcmV0dXJuIHRoaXMuI3U2NFswXTtcbiAgICB9XG4gICAgc3RhdGljIHJhbmRvbVU2NCgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoOCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKylcbiAgICAgICAgICAgICAgICBhcnJheVtpXSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1Nik7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGFWaWV3KGFycmF5LmJ1ZmZlcikuZ2V0QmlnVWludDY0KDApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFycmF5ID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKVxuICAgICAgICAgICAgYXJyYXkucHVzaChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpKTtcbiAgICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKGFycmF5KS5yZWFkQmlnVUludDY0QkUoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBCb2FyZFJlcHJlc2VudGF0aW9uLCBGRU4sIEdhbWVTdGF0ZSwgTW92ZSwgTW92ZUdlbmVyYXRvciwgUGllY2UsIFBpZWNlTGlzdCwgWm9icmlzdCB9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5leHBvcnQgY2xhc3MgQm9hcmQge1xuICAgIHN0YXRpYyB3aGl0ZUluZGV4ID0gMDtcbiAgICBzdGF0aWMgYmxhY2tJbmRleCA9IDE7XG4gICAgc3RhdGljIHdoaXRlQ2FzdGxlS2luZ3NpZGVNYXNrID0gMGIxMTExMTExMTExMTExMTEwO1xuICAgIHN0YXRpYyB3aGl0ZUNhc3RsZVF1ZWVuc2lkZU1hc2sgPSAwYjExMTExMTExMTExMTExMDE7XG4gICAgc3RhdGljIGJsYWNrQ2FzdGxlS2luZ3NpZGVNYXNrID0gMGIxMTExMTExMTExMTExMDExO1xuICAgIHN0YXRpYyBibGFja0Nhc3RsZVF1ZWVuc2lkZU1hc2sgPSAwYjExMTExMTExMTExMTAxMTE7XG4gICAgc3RhdGljIHdoaXRlQ2FzdGxlTWFzayA9IHRoaXMud2hpdGVDYXN0bGVLaW5nc2lkZU1hc2sgJiB0aGlzLndoaXRlQ2FzdGxlUXVlZW5zaWRlTWFzaztcbiAgICBzdGF0aWMgYmxhY2tDYXN0bGVNYXNrID0gdGhpcy5ibGFja0Nhc3RsZUtpbmdzaWRlTWFzayAmIHRoaXMuYmxhY2tDYXN0bGVRdWVlbnNpZGVNYXNrO1xuICAgICNzcXVhcmVzID0gbmV3IEFycmF5KDY0KS5maWxsKDApO1xuICAgICNjb2xvclRvTW92ZSA9IDA7XG4gICAgI3BseUNvdW50ID0gMDtcbiAgICAjZmlmdHlNb3ZlQ291bnRlciA9IDA7XG4gICAgI2N1cnJlbnRHYW1lU3RhdGUgPSAwO1xuICAgICNnYW1lU3RhdGVIaXN0b3J5ID0gW107XG4gICAgI3pvYnJpc3RLZXkgPSAwbjtcbiAgICAjcmVwZXRpdGlvbkhpc3RvcnkgPSBbXTtcbiAgICBraW5nU3F1YXJlID0gWy0xLCAtMV07XG4gICAgcGF3bnMgPSBbbmV3IFBpZWNlTGlzdCgpLCBuZXcgUGllY2VMaXN0KCldO1xuICAgIHF1ZWVucyA9IFtuZXcgUGllY2VMaXN0KCksIG5ldyBQaWVjZUxpc3QoKV07XG4gICAga25pZ2h0cyA9IFtuZXcgUGllY2VMaXN0KCksIG5ldyBQaWVjZUxpc3QoKV07XG4gICAgYmlzaG9wcyA9IFtuZXcgUGllY2VMaXN0KCksIG5ldyBQaWVjZUxpc3QoKV07XG4gICAgcm9va3MgPSBbbmV3IFBpZWNlTGlzdCgpLCBuZXcgUGllY2VMaXN0KCldO1xuICAgICNhbGxQaWVjZUxpc3RzID0gW1xuICAgICAgICBQaWVjZUxpc3QuZW1wdHksXG4gICAgICAgIFBpZWNlTGlzdC5lbXB0eSxcbiAgICAgICAgdGhpcy5wYXduc1tCb2FyZC53aGl0ZUluZGV4XSxcbiAgICAgICAgdGhpcy5rbmlnaHRzW0JvYXJkLndoaXRlSW5kZXhdLFxuICAgICAgICBQaWVjZUxpc3QuZW1wdHksXG4gICAgICAgIHRoaXMuYmlzaG9wc1tCb2FyZC53aGl0ZUluZGV4XSxcbiAgICAgICAgdGhpcy5yb29rc1tCb2FyZC53aGl0ZUluZGV4XSxcbiAgICAgICAgdGhpcy5xdWVlbnNbQm9hcmQud2hpdGVJbmRleF0sXG4gICAgICAgIFBpZWNlTGlzdC5lbXB0eSxcbiAgICAgICAgUGllY2VMaXN0LmVtcHR5LFxuICAgICAgICB0aGlzLnBhd25zW0JvYXJkLmJsYWNrSW5kZXhdLFxuICAgICAgICB0aGlzLmtuaWdodHNbQm9hcmQuYmxhY2tJbmRleF0sXG4gICAgICAgIFBpZWNlTGlzdC5lbXB0eSxcbiAgICAgICAgdGhpcy5iaXNob3BzW0JvYXJkLmJsYWNrSW5kZXhdLFxuICAgICAgICB0aGlzLnJvb2tzW0JvYXJkLmJsYWNrSW5kZXhdLFxuICAgICAgICB0aGlzLnF1ZWVuc1tCb2FyZC5ibGFja0luZGV4XSxcbiAgICBdO1xuICAgIHN0YXRpYyBnZXQgI2RlZmF1bHRPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4geyBkaXNhYmxlVGFraW5nVHVybnM6IGZhbHNlIH07XG4gICAgfVxuICAgICNvcHRpb25zID0gQm9hcmQuI2RlZmF1bHRPcHRpb25zO1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLiNvcHRpb25zID0ge1xuICAgICAgICAgICAgLi4uQm9hcmQuI2RlZmF1bHRPcHRpb25zLFxuICAgICAgICAgICAgLi4ub3B0aW9uc1xuICAgICAgICB9O1xuICAgIH1cbiAgICAjZ2V0UGllY2VMaXN0KHBpZWNlVHlwZSwgY29sb3JJbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jYWxsUGllY2VMaXN0c1tjb2xvckluZGV4ICogOCArIHBpZWNlVHlwZV07XG4gICAgfVxuICAgIG1ha2VNb3ZlKG1vdmUpIHtcbiAgICAgICAgY29uc3Qgb2xkRW5QYXNzYW50RmlsZSA9ICh0aGlzLiNjdXJyZW50R2FtZVN0YXRlID4+IDQpICYgMGIxMTExO1xuICAgICAgICBjb25zdCBvbGRDYXN0bGluZ1JpZ2h0cyA9ICh0aGlzLiNjdXJyZW50R2FtZVN0YXRlID4+IDApICYgMGIxMTExO1xuICAgICAgICBsZXQgbmV3Q2FzdGxpbmdSaWdodHMgPSBvbGRDYXN0bGluZ1JpZ2h0cztcbiAgICAgICAgdGhpcy4jY3VycmVudEdhbWVTdGF0ZSA9IDA7XG4gICAgICAgIGNvbnN0IGZyaWVuZGx5Q29sb3JJbmRleCA9IHRoaXMuI2NvbG9yVG9Nb3ZlID09PSBQaWVjZS5XaGl0ZSA/IEJvYXJkLndoaXRlSW5kZXggOiBCb2FyZC5ibGFja0luZGV4O1xuICAgICAgICBjb25zdCBvcHBvbmVudENvbG9ySW5kZXggPSAoMSAtIGZyaWVuZGx5Q29sb3JJbmRleCk7XG4gICAgICAgIGNvbnN0IG1vdmVkRnJvbSA9IG1vdmUuc3RhcnRTcXVhcmU7XG4gICAgICAgIGNvbnN0IG1vdmVkVG8gPSBtb3ZlLnRhcmdldFNxdWFyZTtcbiAgICAgICAgY29uc3QgcGllY2VPblN0YXJ0ID0gdGhpcy4jc3F1YXJlc1ttb3ZlLnN0YXJ0U3F1YXJlXTtcbiAgICAgICAgY29uc3QgcGllY2VPblRhcmdldCA9IHRoaXMuI3NxdWFyZXNbbW92ZS50YXJnZXRTcXVhcmVdO1xuICAgICAgICBjb25zdCBwaWVjZU9uU3RhcnRUeXBlID0gUGllY2UuZ2V0VHlwZShwaWVjZU9uU3RhcnQpO1xuICAgICAgICBjb25zdCBwaWVjZU9uVGFyZ2V0VHlwZSA9IFBpZWNlLmdldFR5cGUocGllY2VPblRhcmdldCk7XG4gICAgICAgIGNvbnN0IG1vdmVGbGFnID0gbW92ZS5tb3ZlRmxhZztcbiAgICAgICAgY29uc3QgaXNQcm9tb3Rpb24gPSBtb3ZlLmlzUHJvbW90aW9uO1xuICAgICAgICBjb25zdCBpc0VuUGFzc2FudCA9IG1vdmUubW92ZUZsYWcgPT09IE1vdmUuRmxhZy5FblBhc3NhbnRDYXB0dXJlO1xuICAgICAgICB0aGlzLiNjdXJyZW50R2FtZVN0YXRlIHw9IHBpZWNlT25UYXJnZXRUeXBlIDw8IDg7XG4gICAgICAgIGlmIChwaWVjZU9uVGFyZ2V0ICE9PSBQaWVjZS5Ob25lICYmICFpc0VuUGFzc2FudCkge1xuICAgICAgICAgICAgdGhpcy4jem9icmlzdEtleSBePSBab2JyaXN0LnBpZWNlc0FycmF5W3BpZWNlT25UYXJnZXRUeXBlXVtvcHBvbmVudENvbG9ySW5kZXhdW21vdmVkVG9dO1xuICAgICAgICAgICAgdGhpcy4jZ2V0UGllY2VMaXN0KHBpZWNlT25UYXJnZXRUeXBlLCBvcHBvbmVudENvbG9ySW5kZXgpLnJlbW92ZVBpZWNlKG1vdmVkVG8pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwaWVjZU9uU3RhcnRUeXBlID09PSBQaWVjZS5LaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmtpbmdTcXVhcmVbZnJpZW5kbHlDb2xvckluZGV4XSA9IG1vdmVkVG87XG4gICAgICAgICAgICBuZXdDYXN0bGluZ1JpZ2h0cyAmPSB0aGlzLiNjb2xvclRvTW92ZSA9PT0gUGllY2UuV2hpdGUgPyBCb2FyZC53aGl0ZUNhc3RsZU1hc2sgOiBCb2FyZC5ibGFja0Nhc3RsZU1hc2s7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiNnZXRQaWVjZUxpc3QocGllY2VPblN0YXJ0VHlwZSwgZnJpZW5kbHlDb2xvckluZGV4KS5tb3ZlUGllY2UobW92ZWRGcm9tLCBtb3ZlZFRvKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcGllY2VFbmRpbmdPblRhcmdldFNxdWFyZSA9IHBpZWNlT25TdGFydDtcbiAgICAgICAgaWYgKGlzUHJvbW90aW9uKSB7XG4gICAgICAgICAgICBsZXQgcHJvbW90aW9uVHlwZSA9IDA7XG4gICAgICAgICAgICBzd2l0Y2ggKG1vdmVGbGFnKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBNb3ZlLkZsYWcuUHJvbW90ZVRvUXVlZW46XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21vdGlvblR5cGUgPSBQaWVjZS5RdWVlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucXVlZW5zW2ZyaWVuZGx5Q29sb3JJbmRleF0uYWRkUGllY2UobW92ZWRUbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgY2FzZSBNb3ZlLkZsYWcuUHJvbW90ZVRvUm9vazpcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbW90aW9uVHlwZSA9IFBpZWNlLlJvb2s7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb2tzW2ZyaWVuZGx5Q29sb3JJbmRleF0uYWRkUGllY2UobW92ZWRUbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgY2FzZSBNb3ZlLkZsYWcuUHJvbW90ZVRvQmlzaG9wOlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9tb3Rpb25UeXBlID0gUGllY2UuQmlzaG9wO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaXNob3BzW2ZyaWVuZGx5Q29sb3JJbmRleF0uYWRkUGllY2UobW92ZWRUbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgY2FzZSBNb3ZlLkZsYWcuUHJvbW90ZVRvS25pZ2h0OlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9tb3Rpb25UeXBlID0gUGllY2UuS25pZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5rbmlnaHRzW2ZyaWVuZGx5Q29sb3JJbmRleF0uYWRkUGllY2UobW92ZWRUbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwaWVjZUVuZGluZ09uVGFyZ2V0U3F1YXJlID0gdGhpcy4jY29sb3JUb01vdmUgfCBwcm9tb3Rpb25UeXBlO1xuICAgICAgICAgICAgdGhpcy5wYXduc1tmcmllbmRseUNvbG9ySW5kZXhdLnJlbW92ZVBpZWNlKG1vdmVkVG8pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzRW5QYXNzYW50KSB7XG4gICAgICAgICAgICBjb25zdCBlblBhc3NhbnRQYXduU3F1YXJlSW5kZXggPSBtb3ZlZFRvICsgKHRoaXMuI2NvbG9yVG9Nb3ZlID09PSBQaWVjZS5XaGl0ZSA/IC04IDogOCk7XG4gICAgICAgICAgICB0aGlzLiNjdXJyZW50R2FtZVN0YXRlIHw9IHRoaXMuI3NxdWFyZXNbZW5QYXNzYW50UGF3blNxdWFyZUluZGV4XSA8PCA4O1xuICAgICAgICAgICAgdGhpcy4jc3F1YXJlc1tlblBhc3NhbnRQYXduU3F1YXJlSW5kZXhdID0gUGllY2UuTm9uZTtcbiAgICAgICAgICAgIHRoaXMucGF3bnNbb3Bwb25lbnRDb2xvckluZGV4XS5yZW1vdmVQaWVjZShlblBhc3NhbnRQYXduU3F1YXJlSW5kZXgpO1xuICAgICAgICAgICAgdGhpcy4jem9icmlzdEtleSBePSBab2JyaXN0LnBpZWNlc0FycmF5W1BpZWNlLlBhd25dW29wcG9uZW50Q29sb3JJbmRleF1bZW5QYXNzYW50UGF3blNxdWFyZUluZGV4XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtb3ZlRmxhZyA9PT0gTW92ZS5GbGFnLkNhc3RsaW5nKSB7XG4gICAgICAgICAgICBjb25zdCBraW5nc2lkZSA9IG1vdmVkVG8gPT09IEJvYXJkUmVwcmVzZW50YXRpb24uZzEgfHwgbW92ZWRUbyA9PT0gQm9hcmRSZXByZXNlbnRhdGlvbi5nODtcbiAgICAgICAgICAgIGNvbnN0IGNhc3RsaW5nUm9va0Zyb20gPSBraW5nc2lkZSA/IG1vdmVkVG8gKyAxIDogbW92ZWRUbyAtIDI7XG4gICAgICAgICAgICBjb25zdCBjYXN0bGluZ1Jvb2tUbyA9IGtpbmdzaWRlID8gbW92ZWRUbyAtIDEgOiBtb3ZlZFRvICsgMTtcbiAgICAgICAgICAgIHRoaXMuI3NxdWFyZXNbY2FzdGxpbmdSb29rRnJvbV0gPSBQaWVjZS5Ob25lO1xuICAgICAgICAgICAgdGhpcy4jc3F1YXJlc1tjYXN0bGluZ1Jvb2tUb10gPSB0aGlzLiNjb2xvclRvTW92ZSB8IFBpZWNlLlJvb2s7XG4gICAgICAgICAgICB0aGlzLnJvb2tzW2ZyaWVuZGx5Q29sb3JJbmRleF0ubW92ZVBpZWNlKGNhc3RsaW5nUm9va0Zyb20sIGNhc3RsaW5nUm9va1RvKTtcbiAgICAgICAgICAgIHRoaXMuI3pvYnJpc3RLZXkgXj0gWm9icmlzdC5waWVjZXNBcnJheVtQaWVjZS5Sb29rXVtmcmllbmRseUNvbG9ySW5kZXhdW2Nhc3RsaW5nUm9va0Zyb21dO1xuICAgICAgICAgICAgdGhpcy4jem9icmlzdEtleSBePSBab2JyaXN0LnBpZWNlc0FycmF5W1BpZWNlLlJvb2tdW2ZyaWVuZGx5Q29sb3JJbmRleF1bY2FzdGxpbmdSb29rVG9dO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuI3NxdWFyZXNbbW92ZS50YXJnZXRTcXVhcmVdID0gcGllY2VFbmRpbmdPblRhcmdldFNxdWFyZTtcbiAgICAgICAgdGhpcy4jc3F1YXJlc1ttb3ZlLnN0YXJ0U3F1YXJlXSA9IFBpZWNlLk5vbmU7XG4gICAgICAgIGlmIChtb3ZlRmxhZyA9PT0gTW92ZS5GbGFnLkRvdWJsZVBhd25QdXNoKSB7XG4gICAgICAgICAgICBjb25zdCBmaWxlID0gQm9hcmRSZXByZXNlbnRhdGlvbi5maWxlSW5kZXgobW92ZWRGcm9tKSArIDE7XG4gICAgICAgICAgICB0aGlzLiNjdXJyZW50R2FtZVN0YXRlIHw9IGZpbGUgPDwgNDtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2xkQ2FzdGxpbmdSaWdodHMgIT09IDApIHtcbiAgICAgICAgICAgIGlmIChtb3ZlZFRvID09PSBCb2FyZFJlcHJlc2VudGF0aW9uLmgxIHx8IG1vdmVkRnJvbSA9PT0gQm9hcmRSZXByZXNlbnRhdGlvbi5oMSkge1xuICAgICAgICAgICAgICAgIG5ld0Nhc3RsaW5nUmlnaHRzICY9IEJvYXJkLndoaXRlQ2FzdGxlS2luZ3NpZGVNYXNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobW92ZWRUbyA9PT0gQm9hcmRSZXByZXNlbnRhdGlvbi5hMSB8fCBtb3ZlZEZyb20gPT09IEJvYXJkUmVwcmVzZW50YXRpb24uYTEpIHtcbiAgICAgICAgICAgICAgICBuZXdDYXN0bGluZ1JpZ2h0cyAmPSBCb2FyZC53aGl0ZUNhc3RsZVF1ZWVuc2lkZU1hc2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobW92ZWRUbyA9PT0gQm9hcmRSZXByZXNlbnRhdGlvbi5oOCB8fCBtb3ZlZEZyb20gPT09IEJvYXJkUmVwcmVzZW50YXRpb24uaDgpIHtcbiAgICAgICAgICAgICAgICBuZXdDYXN0bGluZ1JpZ2h0cyAmPSBCb2FyZC5ibGFja0Nhc3RsZUtpbmdzaWRlTWFzaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG1vdmVkVG8gPT09IEJvYXJkUmVwcmVzZW50YXRpb24uYTggfHwgbW92ZWRGcm9tID09PSBCb2FyZFJlcHJlc2VudGF0aW9uLmE4KSB7XG4gICAgICAgICAgICAgICAgbmV3Q2FzdGxpbmdSaWdodHMgJj0gQm9hcmQuYmxhY2tDYXN0bGVRdWVlbnNpZGVNYXNrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBpZWNlRW5kaW5nT25UYXJnZXRTcXVhcmVUeXBlID0gUGllY2UuZ2V0VHlwZShwaWVjZUVuZGluZ09uVGFyZ2V0U3F1YXJlKTtcbiAgICAgICAgdGhpcy4jem9icmlzdEtleSBePSBab2JyaXN0LnBpZWNlc0FycmF5W3BpZWNlT25TdGFydFR5cGVdW2ZyaWVuZGx5Q29sb3JJbmRleF1bbW92ZWRGcm9tXTtcbiAgICAgICAgdGhpcy4jem9icmlzdEtleSBePSBab2JyaXN0LnBpZWNlc0FycmF5W3BpZWNlRW5kaW5nT25UYXJnZXRTcXVhcmVUeXBlXVtmcmllbmRseUNvbG9ySW5kZXhdW21vdmVkVG9dO1xuICAgICAgICBjb25zdCBuZXdFblBhc3NhbnRGaWxlID0gKHRoaXMuI2N1cnJlbnRHYW1lU3RhdGUgPj4gNCkgJiAwYjExMTE7XG4gICAgICAgIGlmIChuZXdFblBhc3NhbnRGaWxlICE9PSBvbGRFblBhc3NhbnRGaWxlKSB7XG4gICAgICAgICAgICB0aGlzLiN6b2JyaXN0S2V5IF49IFpvYnJpc3QuZW5QYXNzYW50RmlsZVtvbGRFblBhc3NhbnRGaWxlXTtcbiAgICAgICAgICAgIHRoaXMuI3pvYnJpc3RLZXkgXj0gWm9icmlzdC5lblBhc3NhbnRGaWxlW25ld0VuUGFzc2FudEZpbGVdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdDYXN0bGluZ1JpZ2h0cyAhPT0gb2xkQ2FzdGxpbmdSaWdodHMpIHtcbiAgICAgICAgICAgIHRoaXMuI3pvYnJpc3RLZXkgXj0gWm9icmlzdC5jYXN0bGluZ1JpZ2h0c1tvbGRDYXN0bGluZ1JpZ2h0c107XG4gICAgICAgICAgICB0aGlzLiN6b2JyaXN0S2V5IF49IFpvYnJpc3QuY2FzdGxpbmdSaWdodHNbbmV3Q2FzdGxpbmdSaWdodHNdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuI2N1cnJlbnRHYW1lU3RhdGUgfD0gbmV3Q2FzdGxpbmdSaWdodHM7XG4gICAgICAgIHRoaXMuI2N1cnJlbnRHYW1lU3RhdGUgfD0gdGhpcy4jZmlmdHlNb3ZlQ291bnRlciA8PCAxMTtcbiAgICAgICAgdGhpcy4jZ2FtZVN0YXRlSGlzdG9yeS5wdXNoKHRoaXMuI2N1cnJlbnRHYW1lU3RhdGUpO1xuICAgICAgICBpZiAoIXRoaXMuI29wdGlvbnMuZGlzYWJsZVRha2luZ1R1cm5zKSB7XG4gICAgICAgICAgICB0aGlzLiNjb2xvclRvTW92ZSA9IHRoaXMuI2NvbG9yVG9Nb3ZlID09PSBQaWVjZS5XaGl0ZSA/IFBpZWNlLkJsYWNrIDogUGllY2UuV2hpdGU7XG4gICAgICAgICAgICB0aGlzLiN6b2JyaXN0S2V5IF49IFpvYnJpc3Quc2lkZVRvTW92ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiNwbHlDb3VudCsrO1xuICAgICAgICB0aGlzLiNmaWZ0eU1vdmVDb3VudGVyKys7XG4gICAgICAgIGlmIChwaWVjZU9uU3RhcnRUeXBlID09PSBQaWVjZS5QYXduIHx8IHBpZWNlT25UYXJnZXRUeXBlICE9PSBQaWVjZS5Ob25lIHx8IGlzRW5QYXNzYW50KSB7XG4gICAgICAgICAgICB0aGlzLiNyZXBldGl0aW9uSGlzdG9yeS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdGhpcy4jZmlmdHlNb3ZlQ291bnRlciA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiNyZXBldGl0aW9uSGlzdG9yeS5wdXNoKHRoaXMuI3pvYnJpc3RLZXkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVubWFrZU1vdmUobW92ZSkge1xuICAgICAgICBjb25zdCB1bm1ha2luZ1doaXRlTW92ZSA9IHRoaXMuI2NvbG9yVG9Nb3ZlID09PSBQaWVjZS5CbGFjaztcbiAgICAgICAgY29uc3QgZnJpZW5kbHlDb2xvckluZGV4ID0gdW5tYWtpbmdXaGl0ZU1vdmUgPyBCb2FyZC53aGl0ZUluZGV4IDogQm9hcmQuYmxhY2tJbmRleDtcbiAgICAgICAgY29uc3Qgb3Bwb25lbnRDb2xvckluZGV4ID0gKDEgLSBmcmllbmRseUNvbG9ySW5kZXgpO1xuICAgICAgICBjb25zdCBlbmVteUNvbG9yID0gdW5tYWtpbmdXaGl0ZU1vdmUgPyBQaWVjZS5CbGFjayA6IFBpZWNlLldoaXRlO1xuICAgICAgICBjb25zdCBvbGRDYXN0bGluZ1JpZ2h0cyA9IHRoaXMuI2N1cnJlbnRHYW1lU3RhdGUgJiAwYjExMTE7XG4gICAgICAgIGNvbnN0IGNhcHR1cmVkUGllY2VUeXBlID0gKHRoaXMuI2N1cnJlbnRHYW1lU3RhdGUgPj4gOCkgJiAwYjExMTtcbiAgICAgICAgY29uc3QgY2FwdHVyZWRQaWVjZSA9IGNhcHR1cmVkUGllY2VUeXBlID09PSBQaWVjZS5Ob25lID8gUGllY2UuTm9uZSA6IGVuZW15Q29sb3IgfCBjYXB0dXJlZFBpZWNlVHlwZTtcbiAgICAgICAgY29uc3QgbW92ZWRGcm9tID0gbW92ZS5zdGFydFNxdWFyZTtcbiAgICAgICAgY29uc3QgbW92ZWRUbyA9IG1vdmUudGFyZ2V0U3F1YXJlO1xuICAgICAgICBjb25zdCBtb3ZlRmxhZyA9IG1vdmUubW92ZUZsYWc7XG4gICAgICAgIGNvbnN0IGlzRW5QYXNzYW50ID0gbW92ZUZsYWcgPT09IE1vdmUuRmxhZy5FblBhc3NhbnRDYXB0dXJlO1xuICAgICAgICBjb25zdCBpc1Byb21vdGlvbiA9IG1vdmUuaXNQcm9tb3Rpb247XG4gICAgICAgIGNvbnN0IHRhcmdldFNxdWFyZVR5cGUgPSBQaWVjZS5nZXRUeXBlKHRoaXMuI3NxdWFyZXNbbW92ZWRUb10pO1xuICAgICAgICBjb25zdCBtb3ZlZFBpZWNlVHlwZSA9IGlzUHJvbW90aW9uID8gUGllY2UuUGF3biA6IHRhcmdldFNxdWFyZVR5cGU7XG4gICAgICAgIGlmICghdGhpcy4jb3B0aW9ucy5kaXNhYmxlVGFraW5nVHVybnMpIHtcbiAgICAgICAgICAgIHRoaXMuI2NvbG9yVG9Nb3ZlID0gdGhpcy4jY29sb3JUb01vdmUgPT09IFBpZWNlLldoaXRlID8gUGllY2UuQmxhY2sgOiBQaWVjZS5XaGl0ZTtcbiAgICAgICAgICAgIHRoaXMuI3pvYnJpc3RLZXkgXj0gWm9icmlzdC5zaWRlVG9Nb3ZlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuI3pvYnJpc3RLZXkgXj0gWm9icmlzdC5waWVjZXNBcnJheVttb3ZlZFBpZWNlVHlwZV1bZnJpZW5kbHlDb2xvckluZGV4XVttb3ZlZEZyb21dO1xuICAgICAgICB0aGlzLiN6b2JyaXN0S2V5IF49IFpvYnJpc3QucGllY2VzQXJyYXlbdGFyZ2V0U3F1YXJlVHlwZV1bZnJpZW5kbHlDb2xvckluZGV4XVttb3ZlZFRvXTtcbiAgICAgICAgY29uc3Qgb2xkRW5QYXNzYW50RmlsZSA9ICh0aGlzLiNjdXJyZW50R2FtZVN0YXRlID4+IDQpICYgMGIxMTExO1xuICAgICAgICBpZiAoY2FwdHVyZWRQaWVjZVR5cGUgIT09IFBpZWNlLk5vbmUgJiYgIWlzRW5QYXNzYW50KSB7XG4gICAgICAgICAgICB0aGlzLiN6b2JyaXN0S2V5IF49IFpvYnJpc3QucGllY2VzQXJyYXlbY2FwdHVyZWRQaWVjZVR5cGVdW29wcG9uZW50Q29sb3JJbmRleF1bbW92ZWRUb107XG4gICAgICAgICAgICB0aGlzLiNnZXRQaWVjZUxpc3QoY2FwdHVyZWRQaWVjZVR5cGUsIG9wcG9uZW50Q29sb3JJbmRleCkuYWRkUGllY2UobW92ZWRUbyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1vdmVkUGllY2VUeXBlID09PSBQaWVjZS5LaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmtpbmdTcXVhcmVbZnJpZW5kbHlDb2xvckluZGV4XSA9IG1vdmVkRnJvbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghaXNQcm9tb3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuI2dldFBpZWNlTGlzdChtb3ZlZFBpZWNlVHlwZSwgZnJpZW5kbHlDb2xvckluZGV4KS5tb3ZlUGllY2UobW92ZWRUbywgbW92ZWRGcm9tKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiNzcXVhcmVzW21vdmVkRnJvbV0gPSB0aGlzLiNjb2xvclRvTW92ZSB8IG1vdmVkUGllY2VUeXBlO1xuICAgICAgICB0aGlzLiNzcXVhcmVzW21vdmVkVG9dID0gY2FwdHVyZWRQaWVjZTtcbiAgICAgICAgaWYgKGlzUHJvbW90aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnBhd25zW2ZyaWVuZGx5Q29sb3JJbmRleF0uYWRkUGllY2UobW92ZWRGcm9tKTtcbiAgICAgICAgICAgIHN3aXRjaCAobW92ZUZsYWcpIHtcbiAgICAgICAgICAgICAgICBjYXNlIE1vdmUuRmxhZy5Qcm9tb3RlVG9RdWVlbjpcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWVlbnNbZnJpZW5kbHlDb2xvckluZGV4XS5yZW1vdmVQaWVjZShtb3ZlZFRvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICBjYXNlIE1vdmUuRmxhZy5Qcm9tb3RlVG9Sb29rOlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb2tzW2ZyaWVuZGx5Q29sb3JJbmRleF0ucmVtb3ZlUGllY2UobW92ZWRUbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgY2FzZSBNb3ZlLkZsYWcuUHJvbW90ZVRvQmlzaG9wOlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpc2hvcHNbZnJpZW5kbHlDb2xvckluZGV4XS5yZW1vdmVQaWVjZShtb3ZlZFRvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICBjYXNlIE1vdmUuRmxhZy5Qcm9tb3RlVG9LbmlnaHQ6XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMua25pZ2h0c1tmcmllbmRseUNvbG9ySW5kZXhdLnJlbW92ZVBpZWNlKG1vdmVkVG8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzRW5QYXNzYW50KSB7XG4gICAgICAgICAgICBjb25zdCBlblBhc3NhbnRJbmRleCA9IG1vdmVkVG8gKyAodGhpcy4jY29sb3JUb01vdmUgPT09IFBpZWNlLldoaXRlID8gLTggOiA4KTtcbiAgICAgICAgICAgIHRoaXMuI3NxdWFyZXNbbW92ZWRUb10gPSBQaWVjZS5Ob25lO1xuICAgICAgICAgICAgdGhpcy4jc3F1YXJlc1tlblBhc3NhbnRJbmRleF0gPSBjYXB0dXJlZFBpZWNlO1xuICAgICAgICAgICAgdGhpcy5wYXduc1tvcHBvbmVudENvbG9ySW5kZXhdLmFkZFBpZWNlKGVuUGFzc2FudEluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuI3pvYnJpc3RLZXkgXj0gWm9icmlzdC5waWVjZXNBcnJheVtQaWVjZS5QYXduXVtvcHBvbmVudENvbG9ySW5kZXhdW2VuUGFzc2FudEluZGV4XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtb3ZlRmxhZyA9PT0gTW92ZS5GbGFnLkNhc3RsaW5nKSB7XG4gICAgICAgICAgICBjb25zdCBraW5nc2lkZSA9IG1vdmVkVG8gPT09IDYgfHwgbW92ZWRUbyA9PT0gNjI7XG4gICAgICAgICAgICBjb25zdCBjYXN0bGluZ1Jvb2tGcm9tID0ga2luZ3NpZGUgPyBtb3ZlZFRvICsgMSA6IG1vdmVkVG8gLSAyO1xuICAgICAgICAgICAgY29uc3QgY2FzdGxpbmdSb29rVG8gPSBraW5nc2lkZSA/IG1vdmVkVG8gLSAxIDogbW92ZWRUbyArIDE7XG4gICAgICAgICAgICB0aGlzLiNzcXVhcmVzW2Nhc3RsaW5nUm9va1RvXSA9IFBpZWNlLk5vbmU7XG4gICAgICAgICAgICB0aGlzLiNzcXVhcmVzW2Nhc3RsaW5nUm9va0Zyb21dID0gdGhpcy4jY29sb3JUb01vdmUgfCBQaWVjZS5Sb29rO1xuICAgICAgICAgICAgdGhpcy5yb29rc1tmcmllbmRseUNvbG9ySW5kZXhdLm1vdmVQaWVjZShjYXN0bGluZ1Jvb2tUbywgY2FzdGxpbmdSb29rRnJvbSk7XG4gICAgICAgICAgICB0aGlzLiN6b2JyaXN0S2V5IF49IFpvYnJpc3QucGllY2VzQXJyYXlbUGllY2UuUm9va11bZnJpZW5kbHlDb2xvckluZGV4XVtjYXN0bGluZ1Jvb2tGcm9tXTtcbiAgICAgICAgICAgIHRoaXMuI3pvYnJpc3RLZXkgXj0gWm9icmlzdC5waWVjZXNBcnJheVtQaWVjZS5Sb29rXVtmcmllbmRseUNvbG9ySW5kZXhdW2Nhc3RsaW5nUm9va1RvXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiNnYW1lU3RhdGVIaXN0b3J5LnBvcCgpO1xuICAgICAgICB0aGlzLiNjdXJyZW50R2FtZVN0YXRlID0gdGhpcy4jZ2FtZVN0YXRlSGlzdG9yeS5hdCgtMSk7XG4gICAgICAgIHRoaXMuI2ZpZnR5TW92ZUNvdW50ZXIgPSB0aGlzLiNjdXJyZW50R2FtZVN0YXRlID4+IDExO1xuICAgICAgICBjb25zdCBuZXdFblBhc3NhbnRGaWxlID0gKHRoaXMuI2N1cnJlbnRHYW1lU3RhdGUgPj4gNCkgJiAwYjExMTE7XG4gICAgICAgIGlmIChuZXdFblBhc3NhbnRGaWxlICE9PSBvbGRFblBhc3NhbnRGaWxlKSB7XG4gICAgICAgICAgICB0aGlzLiN6b2JyaXN0S2V5IF49IFpvYnJpc3QuZW5QYXNzYW50RmlsZVtvbGRFblBhc3NhbnRGaWxlXTtcbiAgICAgICAgICAgIHRoaXMuI3pvYnJpc3RLZXkgXj0gWm9icmlzdC5lblBhc3NhbnRGaWxlW25ld0VuUGFzc2FudEZpbGVdO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld0Nhc3RsaW5nUmlnaHRzID0gdGhpcy4jY3VycmVudEdhbWVTdGF0ZSAmIDBiMTExMTtcbiAgICAgICAgaWYgKG5ld0Nhc3RsaW5nUmlnaHRzICE9PSBvbGRDYXN0bGluZ1JpZ2h0cykge1xuICAgICAgICAgICAgdGhpcy4jem9icmlzdEtleSBePSBab2JyaXN0LmNhc3RsaW5nUmlnaHRzW29sZENhc3RsaW5nUmlnaHRzXTtcbiAgICAgICAgICAgIHRoaXMuI3pvYnJpc3RLZXkgXj0gWm9icmlzdC5jYXN0bGluZ1JpZ2h0c1tuZXdDYXN0bGluZ1JpZ2h0c107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4jcGx5Q291bnQtLTtcbiAgICAgICAgdGhpcy4jcmVwZXRpdGlvbkhpc3RvcnkucG9wKCk7XG4gICAgfVxuICAgIGdhbWVTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgbW92ZUdlbmVyYXRvciA9IG5ldyBNb3ZlR2VuZXJhdG9yKHRoaXMpO1xuICAgICAgICBjb25zdCBtb3ZlcyA9IG1vdmVHZW5lcmF0b3IuZ2VuZXJhdGVNb3ZlcygpO1xuICAgICAgICBpZiAobW92ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBpZiAobW92ZUdlbmVyYXRvci5pbkNoZWNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuI2NvbG9yVG9Nb3ZlID09PSBQaWVjZS5XaGl0ZSA/IEdhbWVTdGF0ZS5CbGFja0NoZWNrbWF0ZWRXaGl0ZSA6IEdhbWVTdGF0ZS5XaGl0ZUNoZWNrbWF0ZWRCbGFjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBHYW1lU3RhdGUuU3RhbGVtYXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLiNmaWZ0eU1vdmVDb3VudGVyID49IDEwMClcbiAgICAgICAgICAgIHJldHVybiBHYW1lU3RhdGUuRmlmdHlNb3ZlUnVsZTtcbiAgICAgICAgY29uc3QgcmVwZWF0cyA9IHRoaXMuI3JlcGV0aXRpb25IaXN0b3J5LmZpbHRlcigoeCkgPT4geCA9PT0gdGhpcy4jem9icmlzdEtleSkubGVuZ3RoO1xuICAgICAgICBpZiAocmVwZWF0cyA+PSAzKVxuICAgICAgICAgICAgcmV0dXJuIEdhbWVTdGF0ZS5SZXBldGl0aW9uO1xuICAgICAgICBjb25zdCBwYXduQ291bnQgPSB0aGlzLnBhd25zWzBdLmNvdW50ICsgdGhpcy5wYXduc1sxXS5jb3VudDtcbiAgICAgICAgY29uc3Qgcm9va0NvdW50ID0gdGhpcy5yb29rc1swXS5jb3VudCArIHRoaXMucm9va3NbMV0uY291bnQ7XG4gICAgICAgIGNvbnN0IHF1ZWVuQ291bnQgPSB0aGlzLnF1ZWVuc1swXS5jb3VudCArIHRoaXMucXVlZW5zWzFdLmNvdW50O1xuICAgICAgICBjb25zdCBrbmlnaHRDb3VudCA9IHRoaXMua25pZ2h0c1swXS5jb3VudCArIHRoaXMua25pZ2h0c1sxXS5jb3VudDtcbiAgICAgICAgY29uc3QgYmlzaG9wQ291bnQgPSB0aGlzLmJpc2hvcHNbMF0uY291bnQgKyB0aGlzLmJpc2hvcHNbMV0uY291bnQ7XG4gICAgICAgIGlmIChwYXduQ291bnQgKyByb29rQ291bnQgKyBxdWVlbkNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoa25pZ2h0Q291bnQgPT09IDEgfHwgYmlzaG9wQ291bnQgPT09IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEdhbWVTdGF0ZS5JbnN1ZmZpY2llbnRNYXRlcmlhbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gR2FtZVN0YXRlLlBsYXlpbmc7XG4gICAgfVxuICAgIGdldCBzcXVhcmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jc3F1YXJlcztcbiAgICB9XG4gICAgZ2V0IGNvbG9yVG9Nb3ZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jY29sb3JUb01vdmU7XG4gICAgfVxuICAgIGdldCBwbHlDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI3BseUNvdW50O1xuICAgIH1cbiAgICBnZXQgZmlmdHlNb3ZlQ291bnRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2ZpZnR5TW92ZUNvdW50ZXI7XG4gICAgfVxuICAgIGdldCBjdXJyZW50R2FtZVN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jY3VycmVudEdhbWVTdGF0ZTtcbiAgICB9XG4gICAgbG9hZFN0YXJ0aW5nUG9zaXRpb24oKSB7XG4gICAgICAgIHRoaXMubG9hZFBvc2l0aW9uKEZFTi5zdGFydGluZ1Bvc2l0aW9uKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGxvYWRQb3NpdGlvbihmZW4pIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IEZFTi5mcm9tRkVOU3RyaW5nKGZlbik7XG4gICAgICAgIGZvciAobGV0IHNxdWFyZUluZGV4ID0gMDsgc3F1YXJlSW5kZXggPCA2NDsgc3F1YXJlSW5kZXgrKykge1xuICAgICAgICAgICAgY29uc3QgcGllY2UgPSBpbmZvLnNxdWFyZXNbc3F1YXJlSW5kZXhdO1xuICAgICAgICAgICAgaWYgKHBpZWNlICE9PSBQaWVjZS5Ob25lKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGllY2VUeXBlID0gUGllY2UuZ2V0VHlwZShwaWVjZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3JJbmRleCA9IFBpZWNlLmlzQ29sb3IocGllY2UsIFBpZWNlLldoaXRlKSA/IEJvYXJkLndoaXRlSW5kZXggOiBCb2FyZC5ibGFja0luZGV4O1xuICAgICAgICAgICAgICAgIGlmIChwaWVjZVR5cGUgPT09IFBpZWNlLlF1ZWVuKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZWVuc1tjb2xvckluZGV4XS5hZGRQaWVjZShzcXVhcmVJbmRleCk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocGllY2VUeXBlID09PSBQaWVjZS5Sb29rKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb2tzW2NvbG9ySW5kZXhdLmFkZFBpZWNlKHNxdWFyZUluZGV4KTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwaWVjZVR5cGUgPT09IFBpZWNlLkJpc2hvcClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaXNob3BzW2NvbG9ySW5kZXhdLmFkZFBpZWNlKHNxdWFyZUluZGV4KTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwaWVjZVR5cGUgPT09IFBpZWNlLktuaWdodClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rbmlnaHRzW2NvbG9ySW5kZXhdLmFkZFBpZWNlKHNxdWFyZUluZGV4KTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwaWVjZVR5cGUgPT09IFBpZWNlLlBhd24pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF3bnNbY29sb3JJbmRleF0uYWRkUGllY2Uoc3F1YXJlSW5kZXgpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBpZWNlVHlwZSA9PT0gUGllY2UuS2luZylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5raW5nU3F1YXJlW2NvbG9ySW5kZXhdID0gc3F1YXJlSW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4jc3F1YXJlcyA9IGluZm8uc3F1YXJlcztcbiAgICAgICAgdGhpcy4jY29sb3JUb01vdmUgPSBpbmZvLmNvbG9yVG9Nb3ZlO1xuICAgICAgICB0aGlzLiNwbHlDb3VudCA9IChpbmZvLmZ1bGxtb3ZlcyAtIDEpICogMiArIChpbmZvLmNvbG9yVG9Nb3ZlID09PSBQaWVjZS5XaGl0ZSA/IDAgOiAxKTtcbiAgICAgICAgdGhpcy4jZmlmdHlNb3ZlQ291bnRlciA9IGluZm8uaGFsZm1vdmVzO1xuICAgICAgICBjb25zdCB3aGl0ZUNhc3RsaW5nUmlnaHRzID0gKChpbmZvLndoaXRlQ2FzdGxlS2luZ3NpZGUpID8gMSA8PCAwIDogMCkgfCAoKGluZm8ud2hpdGVDYXN0bGVRdWVlbnNpZGUpID8gMSA8PCAxIDogMCk7XG4gICAgICAgIGNvbnN0IGJsYWNrQ2FzdGxpbmdSaWdodHMgPSAoKGluZm8uYmxhY2tDYXN0bGVLaW5nc2lkZSkgPyAxIDw8IDIgOiAwKSB8ICgoaW5mby5ibGFja0Nhc3RsZVF1ZWVuc2lkZSkgPyAxIDw8IDMgOiAwKTtcbiAgICAgICAgY29uc3QgZW5QYXNzYW50U3RhdGUgPSBpbmZvLmVuUGFzc2FudEZpbGUgPDwgNDtcbiAgICAgICAgY29uc3QgaW5pdGlhbEdhbWVTdGF0ZSA9IHdoaXRlQ2FzdGxpbmdSaWdodHMgfCBibGFja0Nhc3RsaW5nUmlnaHRzIHwgZW5QYXNzYW50U3RhdGU7XG4gICAgICAgIHRoaXMuI2dhbWVTdGF0ZUhpc3RvcnkgPSBbaW5pdGlhbEdhbWVTdGF0ZV07XG4gICAgICAgIHRoaXMuI2N1cnJlbnRHYW1lU3RhdGUgPSBpbml0aWFsR2FtZVN0YXRlO1xuICAgICAgICB0aGlzLiN6b2JyaXN0S2V5ID0gWm9icmlzdC5jYWxjdWxhdGVab2JyaXN0S2V5KHRoaXMpO1xuICAgICAgICB0aGlzLiNyZXBldGl0aW9uSGlzdG9yeSA9IFtdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQm9hcmRSZXByZXNlbnRhdGlvbiB7XG4gICAgc3RhdGljIHJhbmtOYW1lcyA9IFwiMTIzNDU2NzhcIjtcbiAgICBzdGF0aWMgZmlsZU5hbWVzID0gXCJhYmNkZWZnaFwiO1xuICAgIHN0YXRpYyBhMSA9IDA7XG4gICAgc3RhdGljIGIxID0gMTtcbiAgICBzdGF0aWMgYzEgPSAyO1xuICAgIHN0YXRpYyBkMSA9IDM7XG4gICAgc3RhdGljIGUxID0gNDtcbiAgICBzdGF0aWMgZjEgPSA1O1xuICAgIHN0YXRpYyBnMSA9IDY7XG4gICAgc3RhdGljIGgxID0gNztcbiAgICBzdGF0aWMgYTggPSA1NjtcbiAgICBzdGF0aWMgYjggPSA1NztcbiAgICBzdGF0aWMgYzggPSA1ODtcbiAgICBzdGF0aWMgZDggPSA1OTtcbiAgICBzdGF0aWMgZTggPSA2MDtcbiAgICBzdGF0aWMgZjggPSA2MTtcbiAgICBzdGF0aWMgZzggPSA2MjtcbiAgICBzdGF0aWMgaDggPSA2MztcbiAgICBzdGF0aWMgcmFua0luZGV4KGluZGV4KSB7XG4gICAgICAgIHJldHVybiBpbmRleCA+PiAzO1xuICAgIH1cbiAgICBzdGF0aWMgZmlsZUluZGV4KGluZGV4KSB7XG4gICAgICAgIHJldHVybiBpbmRleCAmIDBiMTExO1xuICAgIH1cbiAgICBzdGF0aWMgaW5kZXhGcm9tQ29vcmQoZmlsZSwgcmFuaykge1xuICAgICAgICByZXR1cm4gcmFuayAqIDggKyBmaWxlO1xuICAgIH1cbiAgICBzdGF0aWMgaXNMaWdodFNxdWFyZShmaWxlLCByYW5rKSB7XG4gICAgICAgIHJldHVybiAoZmlsZSArIHJhbmspICUgMiAhPT0gMDtcbiAgICB9XG4gICAgc3RhdGljIHNxdWFyZU5hbWUoZmlsZSwgcmFuaykge1xuICAgICAgICBpZiAodHlwZW9mIHJhbmsgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICBbZmlsZSwgcmFua10gPSBbdGhpcy5maWxlSW5kZXgoZmlsZSksIHRoaXMucmFua0luZGV4KGZpbGUpXTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZU5hbWVzW2ZpbGVdICsgKHJhbmsgKyAxKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBCb2FyZFJlcHJlc2VudGF0aW9uLCBQaWVjZSB9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5leHBvcnQgY2xhc3MgRkVOIHtcbiAgICBzdGF0aWMgc3RhcnRpbmdQb3NpdGlvbiA9IFwicm5icWtibnIvcHBwcHBwcHAvOC84LzgvOC9QUFBQUFBQUC9STkJRS0JOUiB3IEtRa3EgLSAwIDFcIjtcbiAgICBzdGF0aWMgI3N5bWJvbFRvVHlwZSA9IHtcbiAgICAgICAgazogUGllY2UuS2luZyxcbiAgICAgICAgcDogUGllY2UuUGF3bixcbiAgICAgICAgbjogUGllY2UuS25pZ2h0LFxuICAgICAgICBiOiBQaWVjZS5CaXNob3AsXG4gICAgICAgIHI6IFBpZWNlLlJvb2ssXG4gICAgICAgIHE6IFBpZWNlLlF1ZWVuLFxuICAgIH07XG4gICAgc3RhdGljICN0eXBlVG9TeW1ib2wgPSBbXG4gICAgICAgIFwiP1wiLFxuICAgICAgICBcImtcIixcbiAgICAgICAgXCJwXCIsXG4gICAgICAgIFwiblwiLFxuICAgICAgICBcIj9cIixcbiAgICAgICAgXCJiXCIsXG4gICAgICAgIFwiclwiLFxuICAgICAgICBcInFcIixcbiAgICBdO1xuICAgIHN0YXRpYyBmcm9tRkVOU3RyaW5nKGZlbikge1xuICAgICAgICBjb25zdCBbcG9zaXRpb25zLCBzaWRlVG9Nb3ZlLCBjYXN0bGluZ1JpZ2h0cywgZW5QYXNzYW50VGFyZ2V0LCBoYWxmbW92ZUNsb2NrLCBmdWxsbW92ZU51bWJlcl0gPSBmZW4uc3BsaXQoXCIgXCIpO1xuICAgICAgICBjb25zdCBzcXVhcmVzID0gbmV3IEFycmF5KDY0KS5maWxsKDApO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgY2VsbCA9IDA7IGkgPCBwb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYXIgPSBwb3NpdGlvbnNbaV07XG4gICAgICAgICAgICBpZiAoY2hhciA9PT0gXCIvXCIpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAoL1xcZC8udGVzdChjaGFyKSkge1xuICAgICAgICAgICAgICAgIGNlbGwgKz0gTnVtYmVyKGNoYXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGllY2VDb2xvciA9IGNoYXIudG9VcHBlckNhc2UoKSA9PT0gY2hhciA/IFBpZWNlLldoaXRlIDogUGllY2UuQmxhY2s7XG4gICAgICAgICAgICAgICAgY29uc3QgcGllY2VUeXBlID0gdGhpcy4jc3ltYm9sVG9UeXBlW2NoYXIudG9Mb3dlckNhc2UoKV07XG4gICAgICAgICAgICAgICAgY29uc3QgcmFuayA9IDcgLSAoY2VsbCA+PiAzKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gY2VsbCAmIDBiMTExO1xuICAgICAgICAgICAgICAgIHNxdWFyZXNbcmFuayAqIDggKyBmaWxlXSA9IHBpZWNlQ29sb3IgfCBwaWVjZVR5cGU7XG4gICAgICAgICAgICAgICAgY2VsbCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbG9yVG9Nb3ZlID0gc2lkZVRvTW92ZSA9PT0gXCJ3XCIgPyBQaWVjZS5XaGl0ZSA6IFBpZWNlLkJsYWNrO1xuICAgICAgICBjb25zdCBlblBhc3NhbnRGaWxlID0gZW5QYXNzYW50VGFyZ2V0ID09PSBcIi1cIiA/IDAgOiBCb2FyZFJlcHJlc2VudGF0aW9uLmZpbGVOYW1lcy5pbmRleE9mKGVuUGFzc2FudFRhcmdldFswXSkgKyAxO1xuICAgICAgICBjb25zdCBoYWxmbW92ZXMgPSBOdW1iZXIoaGFsZm1vdmVDbG9jayk7XG4gICAgICAgIGNvbnN0IGZ1bGxtb3ZlcyA9IE51bWJlcihmdWxsbW92ZU51bWJlcik7XG4gICAgICAgIGNvbnN0IHdoaXRlQ2FzdGxlS2luZ3NpZGUgPSBjYXN0bGluZ1JpZ2h0cy5pbmNsdWRlcyhcIktcIik7XG4gICAgICAgIGNvbnN0IHdoaXRlQ2FzdGxlUXVlZW5zaWRlID0gY2FzdGxpbmdSaWdodHMuaW5jbHVkZXMoXCJRXCIpO1xuICAgICAgICBjb25zdCBibGFja0Nhc3RsZUtpbmdzaWRlID0gY2FzdGxpbmdSaWdodHMuaW5jbHVkZXMoXCJrXCIpO1xuICAgICAgICBjb25zdCBibGFja0Nhc3RsZVF1ZWVuc2lkZSA9IGNhc3RsaW5nUmlnaHRzLmluY2x1ZGVzKFwicVwiKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNxdWFyZXMsXG4gICAgICAgICAgICBjb2xvclRvTW92ZSxcbiAgICAgICAgICAgIGVuUGFzc2FudEZpbGUsXG4gICAgICAgICAgICBoYWxmbW92ZXMsXG4gICAgICAgICAgICBmdWxsbW92ZXMsXG4gICAgICAgICAgICB3aGl0ZUNhc3RsZUtpbmdzaWRlLFxuICAgICAgICAgICAgd2hpdGVDYXN0bGVRdWVlbnNpZGUsXG4gICAgICAgICAgICBibGFja0Nhc3RsZUtpbmdzaWRlLFxuICAgICAgICAgICAgYmxhY2tDYXN0bGVRdWVlbnNpZGUsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHN0YXRpYyB0b0ZFTlN0cmluZyhib2FyZCkge1xuICAgICAgICBsZXQgZmVuID0gXCJcIjtcbiAgICAgICAgZm9yIChsZXQgcmFuayA9IDc7IHJhbmsgPj0gMDsgcmFuay0tKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBmaWxlID0gMDsgZmlsZSA8IDg7IGZpbGUrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBib2FyZC5zcXVhcmVzW3JhbmsgKiA4ICsgZmlsZV07XG4gICAgICAgICAgICAgICAgY29uc3QgaiA9IGZpbGU7XG4gICAgICAgICAgICAgICAgd2hpbGUgKCFib2FyZC5zcXVhcmVzW3JhbmsgKiA4ICsgZmlsZV0gJiYgZmlsZSA8IDgpXG4gICAgICAgICAgICAgICAgICAgIGZpbGUrKztcbiAgICAgICAgICAgICAgICBpZiAoZmlsZSAhPT0gaikge1xuICAgICAgICAgICAgICAgICAgICBmZW4gKz0gZmlsZS0tIC0gajtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBQaWVjZS5nZXRUeXBlKGNlbGwpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXNpbmcgPSBQaWVjZS5nZXRDb2xvcihjZWxsKSA9PT0gUGllY2UuV2hpdGUgPyBcInRvVXBwZXJDYXNlXCIgOiBcInRvTG93ZXJDYXNlXCI7XG4gICAgICAgICAgICAgICAgICAgIGZlbiArPSB0aGlzLiN0eXBlVG9TeW1ib2xbdHlwZV1bY2FzaW5nXSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyYW5rKVxuICAgICAgICAgICAgICAgIGZlbiArPSBcIi9cIjtcbiAgICAgICAgfVxuICAgICAgICBmZW4gKz0gXCIgXCI7XG4gICAgICAgIGZlbiArPSBib2FyZC5jb2xvclRvTW92ZSA9PT0gUGllY2UuV2hpdGUgPyBcIndcIiA6IFwiYlwiO1xuICAgICAgICBmZW4gKz0gXCIgXCI7XG4gICAgICAgIGZlbiArPSAoYm9hcmQuY3VycmVudEdhbWVTdGF0ZSA+PiAwICYgMSkgPT09IDEgPyBcIktcIiA6IFwiXCI7XG4gICAgICAgIGZlbiArPSAoYm9hcmQuY3VycmVudEdhbWVTdGF0ZSA+PiAxICYgMSkgPT09IDEgPyBcIlFcIiA6IFwiXCI7XG4gICAgICAgIGZlbiArPSAoYm9hcmQuY3VycmVudEdhbWVTdGF0ZSA+PiAyICYgMSkgPT09IDEgPyBcImtcIiA6IFwiXCI7XG4gICAgICAgIGZlbiArPSAoYm9hcmQuY3VycmVudEdhbWVTdGF0ZSA+PiAzICYgMSkgPT09IDEgPyBcInFcIiA6IFwiXCI7XG4gICAgICAgIGZlbiArPSAoYm9hcmQuY3VycmVudEdhbWVTdGF0ZSAmIDBiMTExMSkgPT09IDAgPyBcIi1cIiA6IFwiXCI7XG4gICAgICAgIGNvbnN0IGVuUGFzc2FudEZpbGUgPSBib2FyZC5jdXJyZW50R2FtZVN0YXRlID4+IDQgJiAwYjExMTE7XG4gICAgICAgIGZlbiArPSBcIiBcIjtcbiAgICAgICAgaWYgKCFlblBhc3NhbnRGaWxlKSB7XG4gICAgICAgICAgICBmZW4gKz0gXCItXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBlblBhc3NhbnRSYW5rID0gYm9hcmQuY29sb3JUb01vdmUgPT09IFBpZWNlLldoaXRlID8gNiA6IDM7XG4gICAgICAgICAgICBmZW4gKz0gQm9hcmRSZXByZXNlbnRhdGlvbi5maWxlTmFtZXNbZW5QYXNzYW50RmlsZSAtIDFdICsgZW5QYXNzYW50UmFuaztcbiAgICAgICAgfVxuICAgICAgICBmZW4gKz0gXCIgXCI7XG4gICAgICAgIGZlbiArPSBib2FyZC5maWZ0eU1vdmVDb3VudGVyO1xuICAgICAgICBmZW4gKz0gXCIgXCI7XG4gICAgICAgIGZlbiArPSBNYXRoLmZsb29yKGJvYXJkLnBseUNvdW50IC8gMikgKyAxO1xuICAgICAgICByZXR1cm4gZmVuO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBHYW1lU3RhdGUge1xuICAgIHN0YXRpYyBQbGF5aW5nID0gMGIwMDAwMDtcbiAgICBzdGF0aWMgV2hpdGVDaGVja21hdGVkQmxhY2sgPSAwYjAwMDEwO1xuICAgIHN0YXRpYyBCbGFja0NoZWNrbWF0ZWRXaGl0ZSA9IDBiMDAwMTE7XG4gICAgc3RhdGljIFN0YWxlbWF0ZSA9IDBiMTAwMDA7XG4gICAgc3RhdGljIFJlcGV0aXRpb24gPSAwYjEwMTAwO1xuICAgIHN0YXRpYyBGaWZ0eU1vdmVSdWxlID0gMGIxMTAwMDtcbiAgICBzdGF0aWMgSW5zdWZmaWNpZW50TWF0ZXJpYWwgPSAwYjEwMTAwO1xuICAgIHN0YXRpYyBpc1dpbkxvc2Uoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuICgoc3RhdGUgPj4gMSkgJiAxKSAhPT0gMDtcbiAgICB9XG4gICAgc3RhdGljIGlzRHJhdyhzdGF0ZSkge1xuICAgICAgICByZXR1cm4gKChzdGF0ZSA+PiA0KSAmIDEpICE9PSAwO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJpdGJvYXJkLCBCb2FyZFJlcHJlc2VudGF0aW9uLCBNb3ZlRGF0YSB9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5leHBvcnQgY2xhc3MgTWFnaWNzIHtcbiAgICBzdGF0aWMgI2luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgc3RhdGljIHJvb2tBdHRhY2tCaXRib2FyZHMgPSBbXTtcbiAgICBzdGF0aWMgYmlzaG9wQXR0YWNrQml0Ym9hcmRzID0gW107XG4gICAgc3RhdGljIHJvb2tCbG9ja2VyQml0Ym9hcmRzID0gW107XG4gICAgc3RhdGljIGJpc2hvcEJsb2NrZXJCaXRib2FyZHMgPSBbXTtcbiAgICBzdGF0aWMgcm9va01vdmVzRm9yU3F1YXJlID0gW107XG4gICAgc3RhdGljIGJpc2hvcE1vdmVzRm9yU3F1YXJlID0gW107XG4gICAgc3RhdGljIHJvb2tTaGlmdHMgPSBbXG4gICAgICAgIDUybiwgNTNuLCA1M24sIDUzbiwgNTNuLCA1M24sIDUzbiwgNTJuLFxuICAgICAgICA1M24sIDU0biwgNTRuLCA1NG4sIDU0biwgNTRuLCA1NG4sIDUzbixcbiAgICAgICAgNTNuLCA1NG4sIDU0biwgNTRuLCA1NG4sIDU0biwgNTRuLCA1M24sXG4gICAgICAgIDUzbiwgNTRuLCA1NG4sIDU0biwgNTRuLCA1NG4sIDU0biwgNTNuLFxuICAgICAgICA1M24sIDU0biwgNTRuLCA1NG4sIDU0biwgNTRuLCA1NG4sIDUzbixcbiAgICAgICAgNTNuLCA1NG4sIDU0biwgNTRuLCA1NG4sIDU0biwgNTRuLCA1M24sXG4gICAgICAgIDUzbiwgNTRuLCA1NG4sIDU0biwgNTRuLCA1NG4sIDU0biwgNTNuLFxuICAgICAgICA1Mm4sIDUzbiwgNTNuLCA1M24sIDUzbiwgNTNuLCA1M24sIDUybixcbiAgICBdO1xuICAgIHN0YXRpYyBiaXNob3BTaGlmdHMgPSBbXG4gICAgICAgIDU4biwgNTluLCA1OW4sIDU5biwgNTluLCA1OW4sIDU5biwgNThuLFxuICAgICAgICA1OW4sIDU5biwgNTluLCA1OW4sIDU5biwgNTluLCA1OW4sIDU5bixcbiAgICAgICAgNTluLCA1OW4sIDU3biwgNTduLCA1N24sIDU3biwgNTluLCA1OW4sXG4gICAgICAgIDU5biwgNTluLCA1N24sIDU1biwgNTVuLCA1N24sIDU5biwgNTluLFxuICAgICAgICA1OW4sIDU5biwgNTduLCA1NW4sIDU1biwgNTduLCA1OW4sIDU5bixcbiAgICAgICAgNTluLCA1OW4sIDU3biwgNTduLCA1N24sIDU3biwgNTluLCA1OW4sXG4gICAgICAgIDU5biwgNTluLCA1OW4sIDU5biwgNTluLCA1OW4sIDU5biwgNTluLFxuICAgICAgICA1OG4sIDU5biwgNTluLCA1OW4sIDU5biwgNTluLCA1OW4sIDU4bixcbiAgICBdO1xuICAgIHN0YXRpYyByb29rTWFnaWNzID0gW1xuICAgICAgICAweDgwODAwMDEwODIyODQwMDRuLCAweDU0MDAwNDAxMDAwMjAwMm4sIDB4ODAwODIwMDA4MDEwMDRuLCAweDExMDAxMDAxMDBhMDk0MjhuLFxuICAgICAgICAweDE4MDI0MDAwODAwNDY4MG4sIDB4MTAwMGMwMDAyMDgwMTAwbiwgMHgxMDAyMDgxMDAwMjAwMDRuLCAweDgwODAwMDgwMDE1MjY5MDBuLFxuICAgICAgICAweDg4MDAxNDAwMDgwYTFuLCAweGEwMDQxMDEyMDgyMDBuLCAweDgwNTAwMjgwYTAwMG4sIDB4NDExMDAyMTAwMDg5MDAwbixcbiAgICAgICAgMHg0NDI0ODA4MDQ0MDAwODAwbiwgMHg4MDA0MDEwMjAwODBuLCAweDQwMjAwMDkwODY0MDIwMG4sIDB4NDAxYTgwMDEwMDA0NDA4MG4sXG4gICAgICAgIDB4ODAwMDQwNDAwMDIwMDBuLCAweDgwMGE0MDQwMTAwMDYwMDRuLCAweDIwMDA4MDIwMTAwNDgybiwgMHg5MTAwMTAwMDkwNDEwYTBuLFxuICAgICAgICAweDEwMTAxMDAxMDA0MDgwMG4sIDB4NDAwODAxMTAyMDA0NDBuLCAweDhjODA4MDgwMGEwMDAxMDBuLCAweDEwODIwMDEwODBjNDAxbixcbiAgICAgICAgMHgxMDA0NDAwMDgwMjA4MDAwbiwgMHgyODEwMjI1MDA0MDAwODBuLCAweGNhMDAxMDAwODA4MDIwMDBuLCAweDEwMTgwMDgwODAwODUwMDBuLFxuICAgICAgICAweDQ4NGM4MDE4MDI0MDA4MG4sIDB4NDAwMDQ0MDA4MDgwMDIwMG4sIDB4MjEwODQxMDQwMDAyMDgxMG4sIDB4ODA1MDAwMTAwMjZkMDgybixcbiAgICAgICAgMHg4MDAwMjAwMDQwMDE0Y24sIDB4NDQwMDEwMDgxMDA0MzYwbiwgMHgyMDAwMTAwMDgwODAyMDAwbiwgMHg0MDgyMDAwODEyMDA0MDIybixcbiAgICAgICAgMHgxNDQ0MDgwMDgwODAwYzAwbiwgMHg4MDBjMDA4MDAyMDBuLCAweDEwMTAwMTEwMjQwMGE4MGFuLCAweDg0MjgyMDAwMTA0bixcbiAgICAgICAgMHgyMDIwODBjMDA4ODAwNG4sIDB4ODQwMDAyODgxMDEwMDQzbiwgMHgyMDAxMjAxMTA1MDA0MG4sIDB4MTAyODEwMDAwODAwODA4MG4sXG4gICAgICAgIDB4MTAwMDI0MDAwODAwODA4MG4sIDB4NDAxMDA4ODJjMDEwMDEybiwgMHgyNDUwMDg5MDBhMTQwMDAxbiwgMHg0MDA5MDE0NTA0ODIwMDA0bixcbiAgICAgICAgMHg0MTY4MjA4MDA0NDAwMDgwbiwgMHg0MDAwMjAwMDgwNDAwMDgwbiwgMHg5MDIwMDUwNGIxMjA0MzAwbiwgMHgxMDAyMDA4MTAwMTAwbixcbiAgICAgICAgMHgxMjExMDgwMTAwMjUwMG4sIDB4Mjg0MDA4MDAyMDBhNDgwbiwgMHg0MDAyMTAwMTA4MDQwMG4sIDB4ODAwODQwODQxMjIwMG4sXG4gICAgICAgIDB4NDAwMTIwNDgxMDA0MmEybiwgMHg1MDgyODA0MDAzMDAyMDExbiwgMHgxMDIwMDEwMWMwMTAwZG4sIDB4ODAwMTAwMjA5MDAwMDQyOW4sXG4gICAgICAgIDB4MjAwMDQyMDEwMDgwMm4sIDB4ODAwMTAwMTgwNDAwMjI4OW4sIDB4NDEwMGE4MTAyMDgwNG4sIDB4MTI4MTBjMDA4MDIwNDJuLFxuICAgIF07XG4gICAgc3RhdGljIGJpc2hvcE1hZ2ljcyA9IFtcbiAgICAgICAgMHg0NDEwNjkwMTA4MDA4MzAwbiwgMHhjNDEwMTAwMjAwYTAyMDEwbiwgMHg0MDQxMDIwMDhkMDIyMDIwbiwgMHgxMTQxNDAwODAwODYwMDduLFxuICAgICAgICAweDJiMGEwMjEwMDAwODAwMDRuLCAweDQ0MTIwMTAwNTE1MTBuLCAweGEwM2ExODgyMDEwMjAyMG4sIDB4MjgwMDgyMDA0MjIwMDQwMG4sXG4gICAgICAgIDB4MjAxMDIwMTQxMDAwODcwMW4sIDB4ODAwMDgwMTA4MDIwMWMwbiwgMHg0MTAwMjgxMDljMDE4MDA0biwgMHg4MDQwMDQwNDE0ODA4ODAwbixcbiAgICAgICAgMHg0MDQyMzAwMDUwMm4sIDB4MjEwMzQ4YzAyMDAwbiwgMHg0MTgwNTA4ODQxMTAxMDAwbiwgMHgyMDgwMDIyMDIwMjIwMDBuLFxuICAgICAgICAweDE0YzAwMDMwMTAyMjA2OThuLCAweGE0NDIwMDMwMTAwMjAwOTJuLCAweDUwMjAwMTAwMThhMDAwOG4sIDB4YTA4MDA4MDI4MTAwMjBuLFxuICAgICAgICAweDIxMDAwMDkwNDAxMDAwbiwgMHgyODQyMDAwODYwODQyMDAwbiwgMHhhMjAyMTEwMTEwMDMwMG4sIDB4MjQwMTAwMTAzMDkyMTAwMG4sXG4gICAgICAgIDB4OTM0MDQ4NDIwMjAwNDAwbiwgMHhlNmEwMDEwODI4MDI4Mm4sIDB4MTA4MDgwMjE0MDIyMDIwbiwgMHg4MDI0MDQwMDg4MDA5MDEwbixcbiAgICAgICAgMHg4MTAwMTA0NTAwNDAwMG4sIDB4MzAyMDAwMjQ4MDQ1MW4sIDB4MTIxODUwMDI0MDEyODAwbiwgMHg4NDEwMjAwNDgwODQxMm4sXG4gICAgICAgIDB4NDgyNjAyMDgwMzAwMjg5biwgMHgxMDA0MTAwYTEwMDQ2NDAwbiwgMHhjMDA0MGEwODAxMDAxMDBuLCAweDEyMjEwMTA4MDAyMTAwNDBuLFxuICAgICAgICAweDQwMjAwODQwMTA2MDFhMG4sIDB4ODE5MDIwMDgwMDgwODAwbiwgMHg0ODAyMjY4MDA0MDA4MG4sIDB4ODA5MDEwMjAwYTIyMjAxbixcbiAgICAgICAgMHg0MTA0MDQwMjY4MDA0MTAwbiwgMHg4MDIwODExMDQwNTQ4NjBuLCAweDQwMjIyODIwOTgwMDkwMDBuLCAweDU0MDEwNDIwMjAwbixcbiAgICAgICAgMHg0MDQwMDEwYTEyMDEwNDAwbiwgMHg4MDQzNjIwODBhMDA0MDQwbiwgMHgxMTE4OTA4MDMwNDE5ODJuLCAweDQyNDQ0ODIwMjAwMTk1MW4sXG4gICAgICAgIDB4NDEyNDAyMDI1MDA0MDgwMm4sIDB4MTA4MjE4ODYwMTEwMTA0MG4sIDB4MTEwMjQ0NGM0MTA0MDAwbiwgMHgxNTAyMDAxNjQyMDIyMTAwbixcbiAgICAgICAgMHg0MDI4NDhkMDQwMDA4biwgMHgyODQxMDQwODA4ODA0MG4sIDB4MjA0MGE5MDg0MTAxNDAwMG4sIDB4ODEwODA4OTgwMDUwNDQwMG4sXG4gICAgICAgIDB4Mzk0MDQwNTAwODIwMWNuLCAweDgwYTAwMzIwMjMwMDQwMG4sIDB4NDAxMjUyMDExMWQ4MDBuLCAweDIwMjIwMDAwODAyMDg4MDJuLFxuICAgICAgICAweDgwNDAxMDA2MGEyMG4sIDB4NDA4MzM0MDA0MDgwNDgwbiwgMHg0MDI1ODQyMDA4MDI0ODkwbiwgMHgyMDEwMDIwMjgxMDIxMjAwbixcbiAgICBdO1xuICAgIHN0YXRpYyBib2FyZENvcm5lck1hc2sgPSBCaWdJbnQoXCIwYlxcXG4gICAgICAgIDAxMTExMTEwXFxcbiAgICAgICAgMTExMTExMTFcXFxuICAgICAgICAxMTExMTExMVxcXG4gICAgICAgIDExMTExMTExXFxcbiAgICAgICAgMTExMTExMTFcXFxuICAgICAgICAxMTExMTExMVxcXG4gICAgICAgIDExMTExMTExXFxcbiAgICAgICAgMDExMTExMTBcXFxuICAgIFwiLnJlcGxhY2VBbGwoXCIgXCIsIFwiXCIpKTtcbiAgICBzdGF0aWMgYm9hcmRFZGdlTWFzayA9IEJpZ0ludChcIjBiXFxcbiAgICAgICAgMTAwMDAwMDFcXFxuICAgICAgICAwMTExMTExMFxcXG4gICAgICAgIDAxMTExMTEwXFxcbiAgICAgICAgMDExMTExMTBcXFxuICAgICAgICAwMTExMTExMFxcXG4gICAgICAgIDAxMTExMTEwXFxcbiAgICAgICAgMDExMTExMTBcXFxuICAgICAgICAxMDAwMDAwMVxcXG4gICAgXCIucmVwbGFjZUFsbChcIiBcIiwgXCJcIikpO1xuICAgIHN0YXRpYyBmaWxlQSA9IDB4MDEwMTAxMDEwMTAxMDEwMW47XG4gICAgc3RhdGljIHJhbmsxID0gMHgwMDAwMDAwMDAwMDAwMGZmbjtcbiAgICBzdGF0aWMgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuI2luaXRpYWxpemVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibWFnaWNzIGRhdGEgaGFzIGFscmVhZHkgYmVlbiBpbml0aWFsaXplZFwiKTtcbiAgICAgICAgZm9yIChsZXQgc3F1YXJlSW5kZXggPSAwOyBzcXVhcmVJbmRleCA8IDY0OyBzcXVhcmVJbmRleCsrKSB7XG4gICAgICAgICAgICBjb25zdCByb29rQml0Ym9hcmQgPSB0aGlzLiNjb21wdXRlQXR0YWNrQml0Ym9hcmQoc3F1YXJlSW5kZXgsIDAsIDQpO1xuICAgICAgICAgICAgY29uc3QgYmlzaG9wQml0Ym9hcmQgPSB0aGlzLiNjb21wdXRlQXR0YWNrQml0Ym9hcmQoc3F1YXJlSW5kZXgsIDQsIDgpO1xuICAgICAgICAgICAgdGhpcy5yb29rQXR0YWNrQml0Ym9hcmRzLnB1c2gocm9va0JpdGJvYXJkKTtcbiAgICAgICAgICAgIHRoaXMuYmlzaG9wQXR0YWNrQml0Ym9hcmRzLnB1c2goYmlzaG9wQml0Ym9hcmQpO1xuICAgICAgICAgICAgY29uc3Qgcm9va0JpdHNTZXQgPSB0aGlzLiNjb3VudEJpdHNTZXQocm9va0JpdGJvYXJkKTtcbiAgICAgICAgICAgIGNvbnN0IGJpc2hvcEJpdHNTZXQgPSB0aGlzLiNjb3VudEJpdHNTZXQoYmlzaG9wQml0Ym9hcmQpO1xuICAgICAgICAgICAgdGhpcy5yb29rQmxvY2tlckJpdGJvYXJkc1tzcXVhcmVJbmRleF0gPSBbXTtcbiAgICAgICAgICAgIHRoaXMucm9va01vdmVzRm9yU3F1YXJlW3NxdWFyZUluZGV4XSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8ICgxIDw8IHJvb2tCaXRzU2V0KTsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvb2tCbG9ja2VycyA9IHRoaXMuI2NvbXB1dGVCbG9ja2VyQml0Ym9hcmQoaW5kZXgsIHJvb2tCaXRib2FyZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29rQmxvY2tlckJpdGJvYXJkc1tzcXVhcmVJbmRleF1baW5kZXhdID0gcm9va0Jsb2NrZXJzO1xuICAgICAgICAgICAgICAgIGxldCByb29rTW92ZXMgPSAwbjtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXJPZmZzZXQgPSBNb3ZlRGF0YS5kaXJlY3Rpb25PZmZzZXRzW2ldO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IE1vdmVEYXRhLnNxdWFyZXNUb0VkZ2Vbc3F1YXJlSW5kZXhdW2ldOyBuKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFNxdWFyZSA9IHNxdWFyZUluZGV4ICsgZGlyT2Zmc2V0ICogKG4gKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBpZWNlT25UYXJnZXQgPSBCaXRib2FyZC5jb250YWluc1NxdWFyZShyb29rQmxvY2tlcnMsIHRhcmdldFNxdWFyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByb29rTW92ZXMgfD0gMW4gPDwgQmlnSW50KHRhcmdldFNxdWFyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGllY2VPblRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBCaXRib2FyZC5vdmVyZmxvd011bHRVNjQocm9va0Jsb2NrZXJzLCB0aGlzLnJvb2tNYWdpY3Nbc3F1YXJlSW5kZXhdKSA+PiB0aGlzLnJvb2tTaGlmdHNbc3F1YXJlSW5kZXhdO1xuICAgICAgICAgICAgICAgIHRoaXMucm9va01vdmVzRm9yU3F1YXJlW3NxdWFyZUluZGV4XVtOdW1iZXIoa2V5KV0gPSByb29rTW92ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmJpc2hvcEJsb2NrZXJCaXRib2FyZHNbc3F1YXJlSW5kZXhdID0gW107XG4gICAgICAgICAgICB0aGlzLmJpc2hvcE1vdmVzRm9yU3F1YXJlW3NxdWFyZUluZGV4XSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8ICgxIDw8IGJpc2hvcEJpdHNTZXQpOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmlzaG9wQmxvY2tlcnMgPSB0aGlzLiNjb21wdXRlQmxvY2tlckJpdGJvYXJkKGluZGV4LCBiaXNob3BCaXRib2FyZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5iaXNob3BCbG9ja2VyQml0Ym9hcmRzW3NxdWFyZUluZGV4XVtpbmRleF0gPSBiaXNob3BCbG9ja2VycztcbiAgICAgICAgICAgICAgICBsZXQgYmlzaG9wTW92ZXMgPSAwbjtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gNDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXJPZmZzZXQgPSBNb3ZlRGF0YS5kaXJlY3Rpb25PZmZzZXRzW2ldO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IE1vdmVEYXRhLnNxdWFyZXNUb0VkZ2Vbc3F1YXJlSW5kZXhdW2ldOyBuKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFNxdWFyZSA9IHNxdWFyZUluZGV4ICsgZGlyT2Zmc2V0ICogKG4gKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBpZWNlT25UYXJnZXQgPSBCaXRib2FyZC5jb250YWluc1NxdWFyZShiaXNob3BCbG9ja2VycywgdGFyZ2V0U3F1YXJlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpc2hvcE1vdmVzIHw9IDFuIDw8IEJpZ0ludCh0YXJnZXRTcXVhcmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBpZWNlT25UYXJnZXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gQml0Ym9hcmQub3ZlcmZsb3dNdWx0VTY0KGJpc2hvcEJsb2NrZXJzLCB0aGlzLmJpc2hvcE1hZ2ljc1tzcXVhcmVJbmRleF0pID4+IHRoaXMuYmlzaG9wU2hpZnRzW3NxdWFyZUluZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLmJpc2hvcE1vdmVzRm9yU3F1YXJlW3NxdWFyZUluZGV4XVtOdW1iZXIoa2V5KV0gPSBiaXNob3BNb3ZlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLiNpbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRRdWVlbk1vdmVzKHNxdWFyZSwgYmxvY2tlcnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Um9va01vdmVzKHNxdWFyZSwgYmxvY2tlcnMpIHwgdGhpcy5nZXRCaXNob3BNb3ZlcyhzcXVhcmUsIGJsb2NrZXJzKTtcbiAgICB9XG4gICAgc3RhdGljIGdldFJvb2tNb3ZlcyhzcXVhcmUsIGJsb2NrZXJzKSB7XG4gICAgICAgIGlmICghdGhpcy4jaW5pdGlhbGl6ZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJtYWdpY3MgZGF0YSBoYXNuJ3QgYmVlbiBpbml0aWFsaXplZCB5ZXRcIik7XG4gICAgICAgIGJsb2NrZXJzID0gQml0Ym9hcmQucmV2ZXJzZShibG9ja2Vycyk7XG4gICAgICAgIGJsb2NrZXJzICY9IHRoaXMucm9va0F0dGFja0JpdGJvYXJkc1tzcXVhcmVdO1xuICAgICAgICBjb25zdCBpbmRleCA9IEJpdGJvYXJkLm92ZXJmbG93TXVsdFU2NChibG9ja2VycywgdGhpcy5yb29rTWFnaWNzW3NxdWFyZV0pID4+IHRoaXMucm9va1NoaWZ0c1tzcXVhcmVdO1xuICAgICAgICByZXR1cm4gdGhpcy5yb29rTW92ZXNGb3JTcXVhcmVbc3F1YXJlXVtOdW1iZXIoaW5kZXgpXTtcbiAgICB9XG4gICAgc3RhdGljIGdldEJpc2hvcE1vdmVzKHNxdWFyZSwgYmxvY2tlcnMpIHtcbiAgICAgICAgaWYgKCF0aGlzLiNpbml0aWFsaXplZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm1hZ2ljcyBkYXRhIGhhc24ndCBiZWVuIGluaXRpYWxpemVkIHlldFwiKTtcbiAgICAgICAgYmxvY2tlcnMgPSBCaXRib2FyZC5yZXZlcnNlKGJsb2NrZXJzKTtcbiAgICAgICAgYmxvY2tlcnMgJj0gdGhpcy5iaXNob3BBdHRhY2tCaXRib2FyZHNbc3F1YXJlXTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBCaXRib2FyZC5vdmVyZmxvd011bHRVNjQoYmxvY2tlcnMsIHRoaXMuYmlzaG9wTWFnaWNzW3NxdWFyZV0pID4+IHRoaXMuYmlzaG9wU2hpZnRzW3NxdWFyZV07XG4gICAgICAgIHJldHVybiB0aGlzLmJpc2hvcE1vdmVzRm9yU3F1YXJlW3NxdWFyZV1bTnVtYmVyKGluZGV4KV07XG4gICAgfVxuICAgIHN0YXRpYyBjb21wdXRlUm9va01hZ2ljcyhvcHRpb25zID0ge30pIHtcbiAgICAgICAgaWYgKCF0aGlzLiNpbml0aWFsaXplZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm1hZ2ljcyBkYXRhIGhhc24ndCBiZWVuIGluaXRpYWxpemVkIHlldFwiKTtcbiAgICAgICAgY29uc3QgYmVzdE1hZ2ljc1NvRmFyID0gW107XG4gICAgICAgIGZvciAobGV0IHNxdWFyZUluZGV4ID0gMDsgc3F1YXJlSW5kZXggPCA2NDsgc3F1YXJlSW5kZXgrKykge1xuICAgICAgICAgICAgY29uc3QgYmxvY2tlcnMgPSB0aGlzLnJvb2tCbG9ja2VyQml0Ym9hcmRzW3NxdWFyZUluZGV4XTtcbiAgICAgICAgICAgIGxldCBjYW5kaWRhdGUgPSAwbiwgc2V0O1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGNhbmRpZGF0ZSA9IEJpdGJvYXJkLnJhbmRvbVU2NCgpICYgQml0Ym9hcmQucmFuZG9tVTY0KCkgJiBCaXRib2FyZC5yYW5kb21VNjQoKTtcbiAgICAgICAgICAgICAgICBzZXQgPSBuZXcgU2V0KGJsb2NrZXJzLm1hcCgoYmxvY2tlcikgPT4gQml0Ym9hcmQub3ZlcmZsb3dNdWx0VTY0KGJsb2NrZXIsIGNhbmRpZGF0ZSkgPj4gdGhpcy5yb29rU2hpZnRzW3NxdWFyZUluZGV4XSkpO1xuICAgICAgICAgICAgfSB3aGlsZSAoc2V0LnNpemUgIT09IGJsb2NrZXJzLmxlbmd0aCk7XG4gICAgICAgICAgICBiZXN0TWFnaWNzU29GYXIucHVzaChjYW5kaWRhdGUpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMubG9nZ2luZylcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtCb2FyZFJlcHJlc2VudGF0aW9uLnNxdWFyZU5hbWUoc3F1YXJlSW5kZXgpfTogJHtjYW5kaWRhdGUudG9TdHJpbmcob3B0aW9ucy5yYWRpeCA/PyAxMCl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJlc3RNYWdpY3NTb0ZhcjtcbiAgICB9XG4gICAgc3RhdGljIGNvbXB1dGVCaXNob3BNYWdpY3Mob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGlmICghdGhpcy4jaW5pdGlhbGl6ZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJtYWdpY3MgZGF0YSBoYXNuJ3QgYmVlbiBpbml0aWFsaXplZCB5ZXRcIik7XG4gICAgICAgIGNvbnN0IGJlc3RNYWdpY3NTb0ZhciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBzcXVhcmVJbmRleCA9IDA7IHNxdWFyZUluZGV4IDwgNjQ7IHNxdWFyZUluZGV4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJsb2NrZXJzID0gdGhpcy5iaXNob3BCbG9ja2VyQml0Ym9hcmRzW3NxdWFyZUluZGV4XTtcbiAgICAgICAgICAgIGxldCBjYW5kaWRhdGUgPSAwbiwgc2V0O1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGNhbmRpZGF0ZSA9IEJpdGJvYXJkLnJhbmRvbVU2NCgpICYgQml0Ym9hcmQucmFuZG9tVTY0KCkgJiBCaXRib2FyZC5yYW5kb21VNjQoKTtcbiAgICAgICAgICAgICAgICBzZXQgPSBuZXcgU2V0KGJsb2NrZXJzLm1hcCgoYmxvY2tlcikgPT4gQml0Ym9hcmQub3ZlcmZsb3dNdWx0VTY0KGJsb2NrZXIsIGNhbmRpZGF0ZSkgPj4gdGhpcy5iaXNob3BTaGlmdHNbc3F1YXJlSW5kZXhdKSk7XG4gICAgICAgICAgICB9IHdoaWxlIChzZXQuc2l6ZSAhPT0gYmxvY2tlcnMubGVuZ3RoKTtcbiAgICAgICAgICAgIGJlc3RNYWdpY3NTb0Zhci5wdXNoKGNhbmRpZGF0ZSk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sb2dnaW5nKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke0JvYXJkUmVwcmVzZW50YXRpb24uc3F1YXJlTmFtZShzcXVhcmVJbmRleCl9OiAke2NhbmRpZGF0ZS50b1N0cmluZyhvcHRpb25zLnJhZGl4ID8/IDEwKX1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmVzdE1hZ2ljc1NvRmFyO1xuICAgIH1cbiAgICBzdGF0aWMgI2NvbXB1dGVCbG9ja2VyQml0Ym9hcmQoaW5kZXgsIGJpdGJvYXJkKSB7XG4gICAgICAgIGNvbnN0IGJpdHMgPSB0aGlzLiNjb3VudEJpdHNTZXQoYml0Ym9hcmQpO1xuICAgICAgICBsZXQgYmxvY2tlcnMgPSAwbjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGogPSAwOyBpIDwgYml0czsgaSsrKSB7XG4gICAgICAgICAgICBbYml0Ym9hcmQsIGpdID0gQml0Ym9hcmQucG9wTFNCKGJpdGJvYXJkKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAmICgxIDw8IGkpKVxuICAgICAgICAgICAgICAgIGJsb2NrZXJzIHw9IDFuIDw8IEJpZ0ludChqKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmxvY2tlcnM7XG4gICAgfVxuICAgIHN0YXRpYyAjY291bnRCaXRzU2V0KHYpIHtcbiAgICAgICAgbGV0IGNvdW50O1xuICAgICAgICBmb3IgKGNvdW50ID0gMDsgdjsgY291bnQrKylcbiAgICAgICAgICAgIHYgJj0gdiAtIDFuO1xuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgfVxuICAgIHN0YXRpYyAjY29tcHV0ZUF0dGFja0JpdGJvYXJkKHN0YXJ0U3F1YXJlLCBzdGFydEluZGV4LCBlbmRJbmRleCkge1xuICAgICAgICBsZXQgYXR0YWNrQml0Ym9hcmQgPSAwbjtcbiAgICAgICAgY29uc3Qgc3RhcnRGaWxlID0gQm9hcmRSZXByZXNlbnRhdGlvbi5maWxlSW5kZXgoc3RhcnRTcXVhcmUpO1xuICAgICAgICBjb25zdCBzdGFydFJhbmsgPSBCb2FyZFJlcHJlc2VudGF0aW9uLnJhbmtJbmRleChzdGFydFNxdWFyZSk7XG4gICAgICAgIGxldCBwcnVuZUVkZ2VNYXNrID0gdGhpcy5ib2FyZEVkZ2VNYXNrO1xuICAgICAgICBpZiAoc3RhcnRGaWxlID09PSAwIHx8IHN0YXJ0RmlsZSA9PT0gNylcbiAgICAgICAgICAgIHBydW5lRWRnZU1hc2sgfD0gdGhpcy5maWxlQSA8PCBCaWdJbnQoc3RhcnRGaWxlKTtcbiAgICAgICAgaWYgKHN0YXJ0UmFuayA9PT0gMCB8fCBzdGFydFJhbmsgPT09IDcpXG4gICAgICAgICAgICBwcnVuZUVkZ2VNYXNrIHw9IHRoaXMucmFuazEgPDwgKDhuICogQmlnSW50KHN0YXJ0UmFuaykpO1xuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGVuZEluZGV4OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGRpck9mZnNldCA9IE1vdmVEYXRhLmRpcmVjdGlvbk9mZnNldHNbaV07XG4gICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IE1vdmVEYXRhLnNxdWFyZXNUb0VkZ2Vbc3RhcnRTcXVhcmVdW2ldOyBuKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRTcXVhcmUgPSBzdGFydFNxdWFyZSArIGRpck9mZnNldCAqIChuICsgMSk7XG4gICAgICAgICAgICAgICAgYXR0YWNrQml0Ym9hcmQgfD0gMW4gPDwgQmlnSW50KHRhcmdldFNxdWFyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXR0YWNrQml0Ym9hcmQgJj0gcHJ1bmVFZGdlTWFzaztcbiAgICAgICAgYXR0YWNrQml0Ym9hcmQgJj0gdGhpcy5ib2FyZENvcm5lck1hc2s7XG4gICAgICAgIHJldHVybiBhdHRhY2tCaXRib2FyZDtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBCb2FyZFJlcHJlc2VudGF0aW9uLCBQaWVjZSB9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5leHBvcnQgY2xhc3MgTW92ZSB7XG4gICAgc3RhdGljIEZsYWcgPSB7XG4gICAgICAgIE5vbmU6IDBiMDAwMCxcbiAgICAgICAgRW5QYXNzYW50Q2FwdHVyZTogMGIwMDAxLFxuICAgICAgICBDYXN0bGluZzogMGIwMDEwLFxuICAgICAgICBEb3VibGVQYXduUHVzaDogMGIwMDExLFxuICAgICAgICBQcm9tb3RlVG9RdWVlbjogMGIwMTAwLFxuICAgICAgICBQcm9tb3RlVG9LbmlnaHQ6IDBiMDEwMSxcbiAgICAgICAgUHJvbW90ZVRvUm9vazogMGIwMTEwLFxuICAgICAgICBQcm9tb3RlVG9CaXNob3A6IDBiMDExMSxcbiAgICB9O1xuICAgIHN0YXRpYyAjc3RhcnRTcXVhcmVNYXNrID0gMGIwMDAwMDAwMDAwMTExMTExO1xuICAgIHN0YXRpYyAjdGFyZ2V0U3F1YXJlTWFzayA9IDBiMDAwMDExMTExMTAwMDAwMDtcbiAgICAjYml0cztcbiAgICBjb25zdHJ1Y3RvcihzdGFydCwgdGFyZ2V0LCBmbGFnID0gMCkge1xuICAgICAgICB0aGlzLiNiaXRzID0gc3RhcnQgfCB0YXJnZXQgPDwgNiB8IGZsYWcgPDwgMTI7XG4gICAgfVxuICAgIGdldCBzdGFydFNxdWFyZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2JpdHMgJiBNb3ZlLiNzdGFydFNxdWFyZU1hc2s7XG4gICAgfVxuICAgIGdldCB0YXJnZXRTcXVhcmUoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy4jYml0cyAmIE1vdmUuI3RhcmdldFNxdWFyZU1hc2spID4+IDY7XG4gICAgfVxuICAgIGdldCBtb3ZlRmxhZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2JpdHMgPj4gMTI7XG4gICAgfVxuICAgIGdldCBpc1Byb21vdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLiNiaXRzID4+IDEyICYgMGIwMTAwKSA9PT0gMGIwMTAwO1xuICAgIH1cbiAgICBzdGF0aWMgI3Byb21vdGlvbkxvb2t1cCA9IFtcbiAgICAgICAgUGllY2UuTm9uZSxcbiAgICAgICAgUGllY2UuTm9uZSxcbiAgICAgICAgUGllY2UuTm9uZSxcbiAgICAgICAgUGllY2UuTm9uZSxcbiAgICAgICAgUGllY2UuUXVlZW4sXG4gICAgICAgIFBpZWNlLktuaWdodCxcbiAgICAgICAgUGllY2UuUm9vayxcbiAgICAgICAgUGllY2UuQmlzaG9wLFxuICAgIF07XG4gICAgZ2V0IHByb21vdGlvblBpZWNlVHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIE1vdmUuI3Byb21vdGlvbkxvb2t1cFt0aGlzLm1vdmVGbGFnXTtcbiAgICB9XG4gICAgZ2V0IGJpdHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNiaXRzO1xuICAgIH1cbiAgICBnZXQgaXNJbnZhbGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jYml0cyA9PT0gMDtcbiAgICB9XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIGxldCBuYW1lID0gQm9hcmRSZXByZXNlbnRhdGlvbi5zcXVhcmVOYW1lKHRoaXMuc3RhcnRTcXVhcmUpICsgQm9hcmRSZXByZXNlbnRhdGlvbi5zcXVhcmVOYW1lKHRoaXMudGFyZ2V0U3F1YXJlKTtcbiAgICAgICAgaWYgKHRoaXMuaXNQcm9tb3Rpb24pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vdmVGbGFnID09PSBNb3ZlLkZsYWcuUHJvbW90ZVRvUXVlZW4pXG4gICAgICAgICAgICAgICAgbmFtZSArPSBcInFcIjtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vdmVGbGFnID09PSBNb3ZlLkZsYWcuUHJvbW90ZVRvUm9vaylcbiAgICAgICAgICAgICAgICBuYW1lICs9IFwiclwiO1xuICAgICAgICAgICAgaWYgKHRoaXMubW92ZUZsYWcgPT09IE1vdmUuRmxhZy5Qcm9tb3RlVG9CaXNob3ApXG4gICAgICAgICAgICAgICAgbmFtZSArPSBcImJcIjtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vdmVGbGFnID09PSBNb3ZlLkZsYWcuUHJvbW90ZVRvS25pZ2h0KVxuICAgICAgICAgICAgICAgIG5hbWUgKz0gXCJuXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuICAgIHN0YXRpYyAjbW92ZVJlZ2V4ID0gL14oPzxzdGFydD5bYS1oXVsxLThdKSg/PHRhcmdldD5bYS1oXVsxLThdKSg/PHByb21vdGlvbj5xfHJ8YnxuKT8kLztcbiAgICBzdGF0aWMgcGFyc2VNb3ZlKG1vdmUsIGJvYXJkKSB7XG4gICAgICAgIGlmICghdGhpcy4jbW92ZVJlZ2V4LnRlc3QobW92ZSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnZhbGlkTW92ZSgpO1xuICAgICAgICBjb25zdCB7IHN0YXJ0LCB0YXJnZXQsIHByb21vdGlvbiB9ID0gbW92ZS5tYXRjaCh0aGlzLiNtb3ZlUmVnZXgpLmdyb3VwcztcbiAgICAgICAgY29uc3Qgc3RhcnRGaWxlID0gQm9hcmRSZXByZXNlbnRhdGlvbi5maWxlTmFtZXMuaW5kZXhPZihzdGFydFswXSk7XG4gICAgICAgIGNvbnN0IHN0YXJ0UmFuayA9IEJvYXJkUmVwcmVzZW50YXRpb24ucmFua05hbWVzLmluZGV4T2Yoc3RhcnRbMV0pO1xuICAgICAgICBjb25zdCB0YXJnZXRGaWxlID0gQm9hcmRSZXByZXNlbnRhdGlvbi5maWxlTmFtZXMuaW5kZXhPZih0YXJnZXRbMF0pO1xuICAgICAgICBjb25zdCB0YXJnZXRSYW5rID0gQm9hcmRSZXByZXNlbnRhdGlvbi5yYW5rTmFtZXMuaW5kZXhPZih0YXJnZXRbMV0pO1xuICAgICAgICBjb25zdCBzdGFydEluZGV4ID0gQm9hcmRSZXByZXNlbnRhdGlvbi5pbmRleEZyb21Db29yZChzdGFydEZpbGUsIHN0YXJ0UmFuayk7XG4gICAgICAgIGNvbnN0IHRhcmdldEluZGV4ID0gQm9hcmRSZXByZXNlbnRhdGlvbi5pbmRleEZyb21Db29yZCh0YXJnZXRGaWxlLCB0YXJnZXRSYW5rKTtcbiAgICAgICAgbGV0IG1vdmVGbGFnID0gMDtcbiAgICAgICAgaWYgKHByb21vdGlvbikge1xuICAgICAgICAgICAgaWYgKHByb21vdGlvbiA9PT0gXCJxXCIpXG4gICAgICAgICAgICAgICAgbW92ZUZsYWcgPSBNb3ZlLkZsYWcuUHJvbW90ZVRvUXVlZW47XG4gICAgICAgICAgICBpZiAocHJvbW90aW9uID09PSBcInJcIilcbiAgICAgICAgICAgICAgICBtb3ZlRmxhZyA9IE1vdmUuRmxhZy5Qcm9tb3RlVG9Sb29rO1xuICAgICAgICAgICAgaWYgKHByb21vdGlvbiA9PT0gXCJiXCIpXG4gICAgICAgICAgICAgICAgbW92ZUZsYWcgPSBNb3ZlLkZsYWcuUHJvbW90ZVRvQmlzaG9wO1xuICAgICAgICAgICAgaWYgKHByb21vdGlvbiA9PT0gXCJuXCIpXG4gICAgICAgICAgICAgICAgbW92ZUZsYWcgPSBNb3ZlLkZsYWcuUHJvbW90ZVRvS25pZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbW92ZWRQaWVjZSA9IGJvYXJkLnNxdWFyZXNbc3RhcnRJbmRleF07XG4gICAgICAgICAgICBjb25zdCBtb3ZlZFBpZWNlVHlwZSA9IFBpZWNlLmdldFR5cGUobW92ZWRQaWVjZSk7XG4gICAgICAgICAgICBpZiAobW92ZWRQaWVjZVR5cGUgPT09IFBpZWNlLktpbmcgJiYgTWF0aC5hYnMoc3RhcnRGaWxlIC0gdGFyZ2V0RmlsZSkgPiAxKVxuICAgICAgICAgICAgICAgIG1vdmVGbGFnID0gTW92ZS5GbGFnLkNhc3RsaW5nO1xuICAgICAgICAgICAgaWYgKG1vdmVkUGllY2VUeXBlID09PSBQaWVjZS5QYXduICYmIE1hdGguYWJzKHN0YXJ0UmFuayAtIHRhcmdldFJhbmspID4gMSlcbiAgICAgICAgICAgICAgICBtb3ZlRmxhZyA9IE1vdmUuRmxhZy5Eb3VibGVQYXduUHVzaDtcbiAgICAgICAgICAgIGNvbnN0IGVuUGFzc2FudEZpbGUgPSAoKGJvYXJkLmN1cnJlbnRHYW1lU3RhdGUgPj4gNCkgJiAwYjExMTEpIC0gMTtcbiAgICAgICAgICAgIGNvbnN0IGVuUGFzc2FudFJhbmsgPSAoYm9hcmQuY29sb3JUb01vdmUgPT09IFBpZWNlLldoaXRlID8gNiA6IDMpIC0gMTtcbiAgICAgICAgICAgIGlmIChtb3ZlZFBpZWNlVHlwZSA9PT0gUGllY2UuUGF3biAmJiB0YXJnZXRGaWxlID09PSBlblBhc3NhbnRGaWxlICYmIHRhcmdldFJhbmsgPT09IGVuUGFzc2FudFJhbmspXG4gICAgICAgICAgICAgICAgbW92ZUZsYWcgPSBNb3ZlLkZsYWcuRW5QYXNzYW50Q2FwdHVyZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IE1vdmUoc3RhcnRJbmRleCwgdGFyZ2V0SW5kZXgsIG1vdmVGbGFnKTtcbiAgICB9XG4gICAgc3RhdGljIGVxdWFscyhhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLiNiaXRzID09PSBiLiNiaXRzO1xuICAgIH1cbiAgICBzdGF0aWMgaW52YWxpZE1vdmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgTW92ZSgwLCAwLCAwKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBCb2FyZCB9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5leHBvcnQgY2xhc3MgTW92ZURhdGEge1xuICAgIHN0YXRpYyBkaXJlY3Rpb25PZmZzZXRzID0gWzgsIC04LCAtMSwgMSwgNywgLTcsIDksIC05XTtcbiAgICBzdGF0aWMgcGF3bkF0dGFja0RpcmVjdGlvbnMgPSBbWzQsIDZdLCBbNywgNV1dO1xuICAgIHN0YXRpYyBrbmlnaHRBdHRhY2tCaXRib2FyZHMgPSBbXTtcbiAgICBzdGF0aWMga25pZ2h0T2Zmc2V0cyA9IFsxNSwgMTcsIC0xNywgLTE1LCAxMCwgLTYsIDYsIC0xMF07XG4gICAgc3RhdGljIGtuaWdodE9mZnNldHNGb3JTcXVhcmUgPSBbLi4uQXJyYXkoNjQpLmtleXMoKV0ubWFwKChzcXVhcmVJbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBpZmlsZSA9IHNxdWFyZUluZGV4ICYgMGIxMTE7XG4gICAgICAgIGNvbnN0IGlyYW5rID0gNyAtIChzcXVhcmVJbmRleCA+PiAzKTtcbiAgICAgICAgbGV0IGtuaWdodEJpdGJvYXJkID0gMG47XG4gICAgICAgIGNvbnN0IG9mZnNldHMgPSB0aGlzLmtuaWdodE9mZnNldHMuZmlsdGVyKChvZmZzZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uSW5kZXggPSBzcXVhcmVJbmRleCArIG9mZnNldDtcbiAgICAgICAgICAgIGlmIChkZXN0aW5hdGlvbkluZGV4IDwgMCB8fCBkZXN0aW5hdGlvbkluZGV4ID4gNjMpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgamZpbGUgPSBkZXN0aW5hdGlvbkluZGV4ICYgMGIxMTE7XG4gICAgICAgICAgICBjb25zdCBqcmFuayA9IDcgLSAoZGVzdGluYXRpb25JbmRleCA+PiAzKTtcbiAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5tYXgoTWF0aC5hYnMoaWZpbGUgLSBqZmlsZSksIE1hdGguYWJzKGlyYW5rIC0ganJhbmspKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gZGlzdGFuY2UgPT09IDI7XG4gICAgICAgICAgICBpZiAodmFsaWQpIHtcbiAgICAgICAgICAgICAgICBrbmlnaHRCaXRib2FyZCB8PSAxbiA8PCBCaWdJbnQoZGVzdGluYXRpb25JbmRleCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmtuaWdodEF0dGFja0JpdGJvYXJkc1tzcXVhcmVJbmRleF0gPSBrbmlnaHRCaXRib2FyZDtcbiAgICAgICAgcmV0dXJuIG9mZnNldHM7XG4gICAgfSk7XG4gICAgc3RhdGljIGtpbmdBdHRhY2tCaXRib2FyZHMgPSBbXTtcbiAgICBzdGF0aWMga2luZ09mZnNldHMgPSB0aGlzLmRpcmVjdGlvbk9mZnNldHM7XG4gICAgc3RhdGljIGtpbmdPZmZzZXRzRm9yU3F1YXJlID0gWy4uLkFycmF5KDY0KS5rZXlzKCldLm1hcCgoc3F1YXJlSW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgaWZpbGUgPSBzcXVhcmVJbmRleCAmIDBiMTExO1xuICAgICAgICBjb25zdCBpcmFuayA9IDcgLSAoc3F1YXJlSW5kZXggPj4gMyk7XG4gICAgICAgIHRoaXMua2luZ0F0dGFja0JpdGJvYXJkc1tzcXVhcmVJbmRleF0gPSAwbjtcbiAgICAgICAgcmV0dXJuIHRoaXMua2luZ09mZnNldHMuZmlsdGVyKChvZmZzZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uSW5kZXggPSBzcXVhcmVJbmRleCArIG9mZnNldDtcbiAgICAgICAgICAgIGlmIChkZXN0aW5hdGlvbkluZGV4IDwgMCB8fCBkZXN0aW5hdGlvbkluZGV4ID4gNjMpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgamZpbGUgPSBkZXN0aW5hdGlvbkluZGV4ICYgMGIxMTE7XG4gICAgICAgICAgICBjb25zdCBqcmFuayA9IDcgLSAoZGVzdGluYXRpb25JbmRleCA+PiAzKTtcbiAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5tYXgoTWF0aC5hYnMoaWZpbGUgLSBqZmlsZSksIE1hdGguYWJzKGlyYW5rIC0ganJhbmspKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gZGlzdGFuY2UgPT09IDE7XG4gICAgICAgICAgICBpZiAodmFsaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtpbmdBdHRhY2tCaXRib2FyZHNbc3F1YXJlSW5kZXhdIHw9IDFuIDw8IEJpZ0ludChkZXN0aW5hdGlvbkluZGV4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgc3RhdGljIHBhd25BdHRhY2tzV2hpdGUgPSBbXTtcbiAgICBzdGF0aWMgcGF3bkF0dGFja3NCbGFjayA9IFtdO1xuICAgIHN0YXRpYyBwYXduQXR0YWNrQml0Ym9hcmRzID0gWy4uLkFycmF5KDY0KS5rZXlzKCldLm1hcCgoc3F1YXJlSW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgZmlsZSA9IHNxdWFyZUluZGV4ICYgMGIxMTE7XG4gICAgICAgIGNvbnN0IHJhbmsgPSA3IC0gKHNxdWFyZUluZGV4ID4+IDMpO1xuICAgICAgICBjb25zdCB3aGl0ZUNhcHR1cmVzID0gW107XG4gICAgICAgIGNvbnN0IGJsYWNrQ2FwdHVyZXMgPSBbXTtcbiAgICAgICAgY29uc3QgYml0Ym9hcmRzID0gWzBuLCAwbl07XG4gICAgICAgIGlmIChmaWxlID4gMCkge1xuICAgICAgICAgICAgaWYgKHJhbmsgPCA3KSB7XG4gICAgICAgICAgICAgICAgd2hpdGVDYXB0dXJlcy5wdXNoKHNxdWFyZUluZGV4ICsgNyk7XG4gICAgICAgICAgICAgICAgYml0Ym9hcmRzW0JvYXJkLndoaXRlSW5kZXhdIHw9IDFuIDw8IEJpZ0ludChzcXVhcmVJbmRleCArIDcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJhbmsgPiAwKSB7XG4gICAgICAgICAgICAgICAgYmxhY2tDYXB0dXJlcy5wdXNoKHNxdWFyZUluZGV4IC0gOSk7XG4gICAgICAgICAgICAgICAgYml0Ym9hcmRzW0JvYXJkLmJsYWNrSW5kZXhdIHw9IDFuIDw8IEJpZ0ludChzcXVhcmVJbmRleCAtIDkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChmaWxlIDwgNykge1xuICAgICAgICAgICAgaWYgKHJhbmsgPCA3KSB7XG4gICAgICAgICAgICAgICAgd2hpdGVDYXB0dXJlcy5wdXNoKHNxdWFyZUluZGV4ICsgOSk7XG4gICAgICAgICAgICAgICAgYml0Ym9hcmRzW0JvYXJkLndoaXRlSW5kZXhdIHw9IDFuIDw8IEJpZ0ludChzcXVhcmVJbmRleCArIDkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJhbmsgPiAwKSB7XG4gICAgICAgICAgICAgICAgYmxhY2tDYXB0dXJlcy5wdXNoKHNxdWFyZUluZGV4IC0gNyk7XG4gICAgICAgICAgICAgICAgYml0Ym9hcmRzW0JvYXJkLmJsYWNrSW5kZXhdIHw9IDFuIDw8IEJpZ0ludChzcXVhcmVJbmRleCAtIDcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF3bkF0dGFja3NXaGl0ZVtzcXVhcmVJbmRleF0gPSB3aGl0ZUNhcHR1cmVzO1xuICAgICAgICB0aGlzLnBhd25BdHRhY2tzQmxhY2tbc3F1YXJlSW5kZXhdID0gYmxhY2tDYXB0dXJlcztcbiAgICAgICAgcmV0dXJuIGJpdGJvYXJkcztcbiAgICB9KTtcbiAgICBzdGF0aWMgZGlyZWN0aW9uTG9va3VwID0gWy4uLkFycmF5KDEyNykua2V5cygpXS5tYXAoKGRpZmZlcmVuY2UpID0+IHtcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gZGlmZmVyZW5jZSAtIDYzO1xuICAgICAgICBjb25zdCBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gICAgICAgIGNvbnN0IGFic29sdXRlRGlyID0gYWJzb2x1dGVPZmZzZXQgJSA5ID09PSAwID8gOSA6XG4gICAgICAgICAgICBhYnNvbHV0ZU9mZnNldCAlIDggPT09IDAgPyA4IDpcbiAgICAgICAgICAgICAgICBhYnNvbHV0ZU9mZnNldCAlIDcgPT09IDAgPyA3IDogMTtcbiAgICAgICAgcmV0dXJuIGFic29sdXRlRGlyICogTWF0aC5zaWduKG9mZnNldCk7XG4gICAgfSk7XG4gICAgc3RhdGljIHNxdWFyZXNUb0VkZ2UgPSBbLi4uQXJyYXkoNjQpLmtleXMoKV0ubWFwKChpKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vcnRoID0gNyAtIChpID4+IDMpO1xuICAgICAgICBjb25zdCBzb3V0aCA9IGkgPj4gMztcbiAgICAgICAgY29uc3Qgd2VzdCA9IGkgJiAwYjExMTtcbiAgICAgICAgY29uc3QgZWFzdCA9IDcgLSAoaSAmIDBiMTExKTtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIG5vcnRoLCBzb3V0aCwgd2VzdCwgZWFzdCxcbiAgICAgICAgICAgIE1hdGgubWluKG5vcnRoLCB3ZXN0KSxcbiAgICAgICAgICAgIE1hdGgubWluKHNvdXRoLCBlYXN0KSxcbiAgICAgICAgICAgIE1hdGgubWluKG5vcnRoLCBlYXN0KSxcbiAgICAgICAgICAgIE1hdGgubWluKHNvdXRoLCB3ZXN0KSxcbiAgICAgICAgXTtcbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IEJpdGJvYXJkLCBCb2FyZCwgQm9hcmRSZXByZXNlbnRhdGlvbiwgTW92ZSwgTW92ZURhdGEsIFBpZWNlIH0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmV4cG9ydCBjbGFzcyBNb3ZlR2VuZXJhdG9yIHtcbiAgICAjYm9hcmQ7XG4gICAgI21vdmVzO1xuICAgICN3aGl0ZVRvTW92ZTtcbiAgICAjZnJpZW5kbHlDb2xvcjtcbiAgICAjb3Bwb25lbnRDb2xvcjtcbiAgICAjZnJpZW5kbHlLaW5nU3F1YXJlO1xuICAgICNmcmllbmRseUNvbG9ySW5kZXg7XG4gICAgI29wcG9uZW50Q29sb3JJbmRleDtcbiAgICAjaW5DaGVjayA9IGZhbHNlO1xuICAgICNpbkRvdWJsZUNoZWNrID0gZmFsc2U7XG4gICAgI3BpbnNFeGlzdEluUG9zaXRpb24gPSBmYWxzZTtcbiAgICAjY2hlY2tSYXlCaXRtYXNrID0gMG47XG4gICAgI3BpblJheUJpdG1hc2sgPSAwbjtcbiAgICAjb3Bwb25lbnRLbmlnaHRBdHRhY2tzID0gMG47XG4gICAgI29wcG9uZW50QXR0YWNrTWFwTm9QYXducyA9IDBuO1xuICAgICNvcHBvbmVudEF0dGFja01hcCA9IDBuO1xuICAgICNvcHBvbmVudFBhd25BdHRhY2tNYXAgPSAwbjtcbiAgICAjb3Bwb25lbnRTbGlkaW5nQXR0YWNrTWFwID0gMG47XG4gICAgZ2V0IGluQ2hlY2soKSB7IHJldHVybiB0aGlzLiNpbkNoZWNrOyB9XG4gICAgZ2V0IGNoZWNrUmF5Qml0bWFzaygpIHsgcmV0dXJuIHRoaXMuI2NoZWNrUmF5Qml0bWFzazsgfVxuICAgIGdldCBwaW5SYXlCaXRtYXNrKCkgeyByZXR1cm4gdGhpcy4jcGluUmF5Qml0bWFzazsgfVxuICAgIGdldCBvcHBvbmVudEF0dGFja01hcCgpIHsgcmV0dXJuIHRoaXMuI29wcG9uZW50QXR0YWNrTWFwOyB9XG4gICAgc3RhdGljIGdldCAjZGVmYXVsdE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB7IGV4Y2x1ZGVRdWlldE1vdmVzOiBmYWxzZSB9O1xuICAgIH1cbiAgICAjb3B0aW9ucyA9IE1vdmVHZW5lcmF0b3IuI2RlZmF1bHRPcHRpb25zO1xuICAgIGNvbnN0cnVjdG9yKGJvYXJkKSB7XG4gICAgICAgIHRoaXMuI2JvYXJkID0gYm9hcmQ7XG4gICAgICAgIHRoaXMuI21vdmVzID0gW107XG4gICAgICAgIHRoaXMuI3doaXRlVG9Nb3ZlID0gYm9hcmQuY29sb3JUb01vdmUgPT09IFBpZWNlLldoaXRlO1xuICAgICAgICB0aGlzLiNmcmllbmRseUNvbG9yID0gYm9hcmQuY29sb3JUb01vdmU7XG4gICAgICAgIHRoaXMuI29wcG9uZW50Q29sb3IgPSBib2FyZC5jb2xvclRvTW92ZSA9PT0gUGllY2UuV2hpdGUgPyBQaWVjZS5CbGFjayA6IFBpZWNlLldoaXRlO1xuICAgICAgICB0aGlzLiNmcmllbmRseUNvbG9ySW5kZXggPSB0aGlzLiN3aGl0ZVRvTW92ZSA/IEJvYXJkLndoaXRlSW5kZXggOiBCb2FyZC5ibGFja0luZGV4O1xuICAgICAgICB0aGlzLiNvcHBvbmVudENvbG9ySW5kZXggPSAoMSAtIHRoaXMuI2ZyaWVuZGx5Q29sb3JJbmRleCk7XG4gICAgICAgIHRoaXMuI2ZyaWVuZGx5S2luZ1NxdWFyZSA9IGJvYXJkLmtpbmdTcXVhcmVbdGhpcy4jZnJpZW5kbHlDb2xvckluZGV4XTtcbiAgICB9XG4gICAgZ2VuZXJhdGVNb3ZlcyhvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy4jb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIC4uLk1vdmVHZW5lcmF0b3IuI2RlZmF1bHRPcHRpb25zLFxuICAgICAgICAgICAgLi4ub3B0aW9uc1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLiNtb3Zlcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLiNjb21wdXRlQXR0YWNrcygpO1xuICAgICAgICB0aGlzLiNnZW5lcmF0ZUtpbmdNb3ZlcygpO1xuICAgICAgICBpZiAodGhpcy4jaW5Eb3VibGVDaGVjaylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiNtb3ZlcztcbiAgICAgICAgdGhpcy4jZ2VuZXJhdGVTbGlkaW5nTW92ZXMoKTtcbiAgICAgICAgdGhpcy4jZ2VuZXJhdGVLbmlnaHRNb3ZlcygpO1xuICAgICAgICB0aGlzLiNnZW5lcmF0ZVBhd25Nb3ZlcygpO1xuICAgICAgICByZXR1cm4gdGhpcy4jbW92ZXM7XG4gICAgfVxuICAgICNnZW5lcmF0ZVNsaWRpbmdNb3ZlcygpIHtcbiAgICAgICAgZm9yIChjb25zdCByb29rU3F1YXJlIG9mIHRoaXMuI2JvYXJkLnJvb2tzW3RoaXMuI2ZyaWVuZGx5Q29sb3JJbmRleF0uc3F1YXJlcylcbiAgICAgICAgICAgIHRoaXMuI2dlbmVyYXRlU2xpZGluZ1BpZWNlTW92ZXMocm9va1NxdWFyZSwgMCwgNCk7XG4gICAgICAgIGZvciAoY29uc3QgYmlzaG9wU3F1YXJlIG9mIHRoaXMuI2JvYXJkLmJpc2hvcHNbdGhpcy4jZnJpZW5kbHlDb2xvckluZGV4XS5zcXVhcmVzKVxuICAgICAgICAgICAgdGhpcy4jZ2VuZXJhdGVTbGlkaW5nUGllY2VNb3ZlcyhiaXNob3BTcXVhcmUsIDQsIDgpO1xuICAgICAgICBmb3IgKGNvbnN0IHF1ZWVuU3F1YXJlIG9mIHRoaXMuI2JvYXJkLnF1ZWVuc1t0aGlzLiNmcmllbmRseUNvbG9ySW5kZXhdLnNxdWFyZXMpXG4gICAgICAgICAgICB0aGlzLiNnZW5lcmF0ZVNsaWRpbmdQaWVjZU1vdmVzKHF1ZWVuU3F1YXJlLCAwLCA4KTtcbiAgICB9XG4gICAgI2dlbmVyYXRlU2xpZGluZ1BpZWNlTW92ZXMoc3RhcnRTcXVhcmUsIHN0YXJ0SW5kZXgsIGVuZEluZGV4KSB7XG4gICAgICAgIGNvbnN0IGlzUGlubmVkID0gdGhpcy4jaXNQaW5uZWQoc3RhcnRTcXVhcmUpO1xuICAgICAgICBpZiAodGhpcy4jaW5DaGVjayAmJiBpc1Bpbm5lZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0SW5kZXg7IGkgPCBlbmRJbmRleDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkaXJPZmZzZXQgPSBNb3ZlRGF0YS5kaXJlY3Rpb25PZmZzZXRzW2ldO1xuICAgICAgICAgICAgaWYgKHRoaXMuI2ZyaWVuZGx5S2luZ1NxdWFyZSAhPT0gLTEgJiYgaXNQaW5uZWQgJiYgIXRoaXMuI2lzQWxvbmdSYXkoZGlyT2Zmc2V0LCB0aGlzLiNmcmllbmRseUtpbmdTcXVhcmUsIHN0YXJ0U3F1YXJlKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgTW92ZURhdGEuc3F1YXJlc1RvRWRnZVtzdGFydFNxdWFyZV1baV07IG4rKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFNxdWFyZSA9IHN0YXJ0U3F1YXJlICsgZGlyT2Zmc2V0ICogKG4gKyAxKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwaWVjZU9uVGFyZ2V0ID0gdGhpcy4jYm9hcmQuc3F1YXJlc1t0YXJnZXRTcXVhcmVdO1xuICAgICAgICAgICAgICAgIGlmIChQaWVjZS5pc0NvbG9yKHBpZWNlT25UYXJnZXQsIHRoaXMuI2JvYXJkLmNvbG9yVG9Nb3ZlKSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNDYXB0dXJlID0gcGllY2VPblRhcmdldCAhPT0gUGllY2UuTm9uZTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2ZW50c0NoZWNrID0gdGhpcy4jaW5DaGVja1JheSh0YXJnZXRTcXVhcmUpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy4jaW5DaGVjayB8fCBwcmV2ZW50c0NoZWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy4jb3B0aW9ucy5leGNsdWRlUXVpZXRNb3ZlcyB8fCBpc0NhcHR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuI21vdmVzLnB1c2gobmV3IE1vdmUoc3RhcnRTcXVhcmUsIHRhcmdldFNxdWFyZSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc0NhcHR1cmUgfHwgcHJldmVudHNDaGVjaylcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgI2dlbmVyYXRlS25pZ2h0TW92ZXMoKSB7XG4gICAgICAgIGZvciAoY29uc3Qgc3RhcnRTcXVhcmUgb2YgdGhpcy4jYm9hcmQua25pZ2h0c1t0aGlzLiNmcmllbmRseUNvbG9ySW5kZXhdLnNxdWFyZXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiNpc1Bpbm5lZChzdGFydFNxdWFyZSkpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9mZnNldCBvZiBNb3ZlRGF0YS5rbmlnaHRPZmZzZXRzRm9yU3F1YXJlW3N0YXJ0U3F1YXJlXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFNxdWFyZSA9IHN0YXJ0U3F1YXJlICsgb2Zmc2V0O1xuICAgICAgICAgICAgICAgIGNvbnN0IHBpZWNlT25UYXJnZXQgPSB0aGlzLiNib2FyZC5zcXVhcmVzW3RhcmdldFNxdWFyZV07XG4gICAgICAgICAgICAgICAgY29uc3QgaXNDYXB0dXJlID0gUGllY2UuaXNDb2xvcihwaWVjZU9uVGFyZ2V0LCB0aGlzLiNvcHBvbmVudENvbG9yKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuI29wdGlvbnMuZXhjbHVkZVF1aWV0TW92ZXMgfHwgaXNDYXB0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChQaWVjZS5pc0NvbG9yKHBpZWNlT25UYXJnZXQsIHRoaXMuI2ZyaWVuZGx5Q29sb3IpIHx8ICh0aGlzLiNpbkNoZWNrICYmICF0aGlzLiNpbkNoZWNrUmF5KHRhcmdldFNxdWFyZSkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuI21vdmVzLnB1c2gobmV3IE1vdmUoc3RhcnRTcXVhcmUsIHRhcmdldFNxdWFyZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAjZ2VuZXJhdGVLaW5nTW92ZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLiNmcmllbmRseUtpbmdTcXVhcmUgPT09IC0xKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBmb3IgKGNvbnN0IG9mZnNldCBvZiBNb3ZlRGF0YS5raW5nT2Zmc2V0c0ZvclNxdWFyZVt0aGlzLiNmcmllbmRseUtpbmdTcXVhcmVdKSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRTcXVhcmUgPSB0aGlzLiNmcmllbmRseUtpbmdTcXVhcmUgKyBvZmZzZXQ7XG4gICAgICAgICAgICBjb25zdCBwaWVjZU9uVGFyZ2V0ID0gdGhpcy4jYm9hcmQuc3F1YXJlc1t0YXJnZXRTcXVhcmVdO1xuICAgICAgICAgICAgaWYgKHBpZWNlT25UYXJnZXQgIT09IFBpZWNlLk5vbmUgJiYgUGllY2UuaXNDb2xvcihwaWVjZU9uVGFyZ2V0LCB0aGlzLiNmcmllbmRseUNvbG9yKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IGlzQ2FwdHVyZSA9IFBpZWNlLmlzQ29sb3IocGllY2VPblRhcmdldCwgdGhpcy4jb3Bwb25lbnRDb2xvcik7XG4gICAgICAgICAgICBpZiAoIWlzQ2FwdHVyZSAmJiAodGhpcy4jb3B0aW9ucy5leGNsdWRlUXVpZXRNb3ZlcyB8fCB0aGlzLiNpbkNoZWNrUmF5KHRhcmdldFNxdWFyZSkpKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKCF0aGlzLiNzcXVhcmVJc0F0dGFja2VkKHRhcmdldFNxdWFyZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiNtb3Zlcy5wdXNoKG5ldyBNb3ZlKHRoaXMuI2ZyaWVuZGx5S2luZ1NxdWFyZSwgdGFyZ2V0U3F1YXJlKSk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLiNpbkNoZWNrICYmICFpc0NhcHR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzS2luZ3NpZGVDYXN0bGVSaWdodCA9ICh0aGlzLiNib2FyZC5jdXJyZW50R2FtZVN0YXRlICYgKHRoaXMuI3doaXRlVG9Nb3ZlID8gMGIwMDAxIDogMGIwMTAwKSkgIT09IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc1F1ZWVuc2lkZUNhc3RsZVJpZ2h0ID0gKHRoaXMuI2JvYXJkLmN1cnJlbnRHYW1lU3RhdGUgJiAodGhpcy4jd2hpdGVUb01vdmUgPyAwYjAwMTAgOiAwYjEwMDApKSAhPT0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh0YXJnZXRTcXVhcmUgPT09IEJvYXJkUmVwcmVzZW50YXRpb24uZjEgfHwgdGFyZ2V0U3F1YXJlID09PSBCb2FyZFJlcHJlc2VudGF0aW9uLmY4KSAmJiBoYXNLaW5nc2lkZUNhc3RsZVJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBraW5nc2lkZVNxdWFyZSA9IHRhcmdldFNxdWFyZSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy4jYm9hcmQuc3F1YXJlc1traW5nc2lkZVNxdWFyZV0gPT09IFBpZWNlLk5vbmUgJiYgIXRoaXMuI3NxdWFyZUlzQXR0YWNrZWQoa2luZ3NpZGVTcXVhcmUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4jbW92ZXMucHVzaChuZXcgTW92ZSh0aGlzLiNmcmllbmRseUtpbmdTcXVhcmUsIGtpbmdzaWRlU3F1YXJlLCBNb3ZlLkZsYWcuQ2FzdGxpbmcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoKHRhcmdldFNxdWFyZSA9PT0gQm9hcmRSZXByZXNlbnRhdGlvbi5kMSB8fCB0YXJnZXRTcXVhcmUgPT09IEJvYXJkUmVwcmVzZW50YXRpb24uZDgpICYmIGhhc1F1ZWVuc2lkZUNhc3RsZVJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBxdWVlbnNpZGVTcXVhcmUgPSB0YXJnZXRTcXVhcmUgLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuI2JvYXJkLnNxdWFyZXNbcXVlZW5zaWRlU3F1YXJlXSA9PT0gUGllY2UuTm9uZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuI2JvYXJkLnNxdWFyZXNbcXVlZW5zaWRlU3F1YXJlIC0gMV0gPT09IFBpZWNlLk5vbmUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhdGhpcy4jc3F1YXJlSXNBdHRhY2tlZChxdWVlbnNpZGVTcXVhcmUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4jbW92ZXMucHVzaChuZXcgTW92ZSh0aGlzLiNmcmllbmRseUtpbmdTcXVhcmUsIHF1ZWVuc2lkZVNxdWFyZSwgTW92ZS5GbGFnLkNhc3RsaW5nKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgI2dlbmVyYXRlUGF3bk1vdmVzKCkge1xuICAgICAgICBjb25zdCB3aGl0ZVRvTW92ZSA9IHRoaXMuI2JvYXJkLmNvbG9yVG9Nb3ZlID09PSBQaWVjZS5XaGl0ZTtcbiAgICAgICAgY29uc3QgY29sb3JUb01vdmVJbmRleCA9IHdoaXRlVG9Nb3ZlID8gQm9hcmQud2hpdGVJbmRleCA6IEJvYXJkLmJsYWNrSW5kZXg7XG4gICAgICAgIGNvbnN0IHBhd25PZmZzZXQgPSB3aGl0ZVRvTW92ZSA/IDggOiAtODtcbiAgICAgICAgY29uc3Qgc3RhcnRSYW5rID0gd2hpdGVUb01vdmUgPyAxIDogNjtcbiAgICAgICAgY29uc3QgcmFua0JlZm9yZVByb21vdGlvbiA9IHdoaXRlVG9Nb3ZlID8gNiA6IDE7XG4gICAgICAgIGNvbnN0IGVuUGFzc2FudEZpbGUgPSAoKHRoaXMuI2JvYXJkLmN1cnJlbnRHYW1lU3RhdGUgPj4gNCkgJiAwYjExMTEpIC0gMTtcbiAgICAgICAgY29uc3QgZW5QYXNzYW50U3F1YXJlID0gZW5QYXNzYW50RmlsZSA9PT0gLTEgPyAtMSA6ICg4ICogKHdoaXRlVG9Nb3ZlID8gNSA6IDIpKSArIGVuUGFzc2FudEZpbGU7XG4gICAgICAgIGZvciAoY29uc3Qgc3RhcnRTcXVhcmUgb2YgdGhpcy4jYm9hcmQucGF3bnNbdGhpcy4jZnJpZW5kbHlDb2xvckluZGV4XS5zcXVhcmVzKSB7XG4gICAgICAgICAgICBjb25zdCByYW5rID0gQm9hcmRSZXByZXNlbnRhdGlvbi5yYW5rSW5kZXgoc3RhcnRTcXVhcmUpO1xuICAgICAgICAgICAgY29uc3QgaXNBYm91dFRvUHJvbW90ZSA9IHJhbmsgPT09IHJhbmtCZWZvcmVQcm9tb3Rpb247XG4gICAgICAgICAgICBpZiAoIXRoaXMuI29wdGlvbnMuZXhjbHVkZVF1aWV0TW92ZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvbmVTcXVhcmVGb3J3YXJkID0gc3RhcnRTcXVhcmUgKyBwYXduT2Zmc2V0O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLiNib2FyZC5zcXVhcmVzW29uZVNxdWFyZUZvcndhcmRdID09PSBQaWVjZS5Ob25lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy4jaXNQaW5uZWQoc3RhcnRTcXVhcmUpIHx8ICh0aGlzLiNmcmllbmRseUtpbmdTcXVhcmUgIT09IC0xICYmIHRoaXMuI2lzQWxvbmdSYXkocGF3bk9mZnNldCwgc3RhcnRTcXVhcmUsIHRoaXMuI2ZyaWVuZGx5S2luZ1NxdWFyZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuI2luQ2hlY2sgfHwgdGhpcy4jaW5DaGVja1JheShvbmVTcXVhcmVGb3J3YXJkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0Fib3V0VG9Qcm9tb3RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuI2dlbmVyYXRlUHJvbW90aW9uTW92ZXMoc3RhcnRTcXVhcmUsIG9uZVNxdWFyZUZvcndhcmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4jbW92ZXMucHVzaChuZXcgTW92ZShzdGFydFNxdWFyZSwgb25lU3F1YXJlRm9yd2FyZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYW5rID09PSBzdGFydFJhbmspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0d29TcXVhcmVGb3J3YXJkID0gb25lU3F1YXJlRm9yd2FyZCArIHBhd25PZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuI2JvYXJkLnNxdWFyZXNbdHdvU3F1YXJlRm9yd2FyZF0gPT09IFBpZWNlLk5vbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLiNpbkNoZWNrIHx8IHRoaXMuI2luQ2hlY2tSYXkodHdvU3F1YXJlRm9yd2FyZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuI21vdmVzLnB1c2gobmV3IE1vdmUoc3RhcnRTcXVhcmUsIHR3b1NxdWFyZUZvcndhcmQsIE1vdmUuRmxhZy5Eb3VibGVQYXduUHVzaCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgZGlyID0gMDsgZGlyIDwgMjsgZGlyKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoTW92ZURhdGEuc3F1YXJlc1RvRWRnZVtzdGFydFNxdWFyZV1bTW92ZURhdGEucGF3bkF0dGFja0RpcmVjdGlvbnNbY29sb3JUb01vdmVJbmRleF1bZGlyXV0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhd25DYXB0dXJlRGlyID0gTW92ZURhdGEuZGlyZWN0aW9uT2Zmc2V0c1tNb3ZlRGF0YS5wYXduQXR0YWNrRGlyZWN0aW9uc1tjb2xvclRvTW92ZUluZGV4XVtkaXJdXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0U3F1YXJlID0gc3RhcnRTcXVhcmUgKyBwYXduQ2FwdHVyZURpcjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0UGllY2UgPSB0aGlzLiNib2FyZC5zcXVhcmVzW3RhcmdldFNxdWFyZV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLiNmcmllbmRseUtpbmdTcXVhcmUgIT09IC0xICYmIHRoaXMuI2lzUGlubmVkKHN0YXJ0U3F1YXJlKSAmJiAhdGhpcy4jaXNBbG9uZ1JheShwYXduQ2FwdHVyZURpciwgdGhpcy4jZnJpZW5kbHlLaW5nU3F1YXJlLCBzdGFydFNxdWFyZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldFBpZWNlICYmICFQaWVjZS5pc0NvbG9yKHRhcmdldFBpZWNlLCB0aGlzLiNib2FyZC5jb2xvclRvTW92ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLiNpbkNoZWNrICYmICF0aGlzLiNpbkNoZWNrUmF5KHRhcmdldFNxdWFyZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNBYm91dFRvUHJvbW90ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuI2dlbmVyYXRlUHJvbW90aW9uTW92ZXMoc3RhcnRTcXVhcmUsIHRhcmdldFNxdWFyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiNtb3Zlcy5wdXNoKG5ldyBNb3ZlKHN0YXJ0U3F1YXJlLCB0YXJnZXRTcXVhcmUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0U3F1YXJlID09PSBlblBhc3NhbnRTcXVhcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcHR1cmVkUGF3blNxdWFyZSA9IHRhcmdldFNxdWFyZSArICh3aGl0ZVRvTW92ZSA/IC04IDogOCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuI2luQ2hlY2tBZnRlckVuUGFzc2FudChzdGFydFNxdWFyZSwgdGFyZ2V0U3F1YXJlLCBjYXB0dXJlZFBhd25TcXVhcmUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4jbW92ZXMucHVzaChuZXcgTW92ZShzdGFydFNxdWFyZSwgdGFyZ2V0U3F1YXJlLCBNb3ZlLkZsYWcuRW5QYXNzYW50Q2FwdHVyZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgICNnZW5lcmF0ZVByb21vdGlvbk1vdmVzKHN0YXJ0U3F1YXJlLCB0YXJnZXRTcXVhcmUpIHtcbiAgICAgICAgdGhpcy4jbW92ZXMucHVzaChuZXcgTW92ZShzdGFydFNxdWFyZSwgdGFyZ2V0U3F1YXJlLCBNb3ZlLkZsYWcuUHJvbW90ZVRvUXVlZW4pKTtcbiAgICAgICAgdGhpcy4jbW92ZXMucHVzaChuZXcgTW92ZShzdGFydFNxdWFyZSwgdGFyZ2V0U3F1YXJlLCBNb3ZlLkZsYWcuUHJvbW90ZVRvUm9vaykpO1xuICAgICAgICB0aGlzLiNtb3Zlcy5wdXNoKG5ldyBNb3ZlKHN0YXJ0U3F1YXJlLCB0YXJnZXRTcXVhcmUsIE1vdmUuRmxhZy5Qcm9tb3RlVG9CaXNob3ApKTtcbiAgICAgICAgdGhpcy4jbW92ZXMucHVzaChuZXcgTW92ZShzdGFydFNxdWFyZSwgdGFyZ2V0U3F1YXJlLCBNb3ZlLkZsYWcuUHJvbW90ZVRvS25pZ2h0KSk7XG4gICAgfVxuICAgICNpc0Fsb25nUmF5KHJheURpciwgc3RhcnRTcXVhcmUsIHRhcmdldFNxdWFyZSkge1xuICAgICAgICBpZiAodGhpcy4jZnJpZW5kbHlLaW5nU3F1YXJlID09PSAtMSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgbW92ZURpciA9IE1vdmVEYXRhLmRpcmVjdGlvbkxvb2t1cFt0YXJnZXRTcXVhcmUgLSBzdGFydFNxdWFyZSArIDYzXTtcbiAgICAgICAgcmV0dXJuIHJheURpciA9PT0gbW92ZURpciB8fCAtcmF5RGlyID09PSBtb3ZlRGlyO1xuICAgIH1cbiAgICAjaXNQaW5uZWQoc3F1YXJlKSB7XG4gICAgICAgIGlmICh0aGlzLiNmcmllbmRseUtpbmdTcXVhcmUgPT09IC0xKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gdGhpcy4jcGluc0V4aXN0SW5Qb3NpdGlvbiAmJiBCaXRib2FyZC5jb250YWluc1NxdWFyZSh0aGlzLiNwaW5SYXlCaXRtYXNrLCBzcXVhcmUpO1xuICAgIH1cbiAgICAjaW5DaGVja1JheShzcXVhcmUpIHtcbiAgICAgICAgaWYgKHRoaXMuI2ZyaWVuZGx5S2luZ1NxdWFyZSA9PT0gLTEpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzLiNpbkNoZWNrICYmIEJpdGJvYXJkLmNvbnRhaW5zU3F1YXJlKHRoaXMuI2NoZWNrUmF5Qml0bWFzaywgc3F1YXJlKTtcbiAgICB9XG4gICAgI3NxdWFyZUlzQXR0YWNrZWQoc3F1YXJlKSB7XG4gICAgICAgIGlmICh0aGlzLiNmcmllbmRseUtpbmdTcXVhcmUgPT09IC0xKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gQml0Ym9hcmQuY29udGFpbnNTcXVhcmUodGhpcy4jb3Bwb25lbnRBdHRhY2tNYXAsIHNxdWFyZSk7XG4gICAgfVxuICAgICNpbkNoZWNrQWZ0ZXJFblBhc3NhbnQoc3RhcnRTcXVhcmUsIHRhcmdldFNxdWFyZSwgZW5QYXNzYW50Q2FwdHVyZWRTcXVhcmUpIHtcbiAgICAgICAgaWYgKHRoaXMuI2ZyaWVuZGx5S2luZ1NxdWFyZSA9PT0gLTEpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHRoaXMuI2JvYXJkLnNxdWFyZXNbdGFyZ2V0U3F1YXJlXSA9IHRoaXMuI2JvYXJkLnNxdWFyZXNbc3RhcnRTcXVhcmVdO1xuICAgICAgICB0aGlzLiNib2FyZC5zcXVhcmVzW3N0YXJ0U3F1YXJlXSA9IFBpZWNlLk5vbmU7XG4gICAgICAgIHRoaXMuI2JvYXJkLnNxdWFyZXNbZW5QYXNzYW50Q2FwdHVyZWRTcXVhcmVdID0gUGllY2UuTm9uZTtcbiAgICAgICAgY29uc3QgaW5DaGVja0FmdGVyQ2FwdHVyZSA9IHRoaXMuI3NxdWFyZUF0dGFja2VkQWZ0ZXJFblBhc3NhbnQoZW5QYXNzYW50Q2FwdHVyZWRTcXVhcmUpO1xuICAgICAgICB0aGlzLiNib2FyZC5zcXVhcmVzW3RhcmdldFNxdWFyZV0gPSBQaWVjZS5Ob25lO1xuICAgICAgICB0aGlzLiNib2FyZC5zcXVhcmVzW3N0YXJ0U3F1YXJlXSA9IHRoaXMuI2ZyaWVuZGx5Q29sb3IgfCBQaWVjZS5QYXduO1xuICAgICAgICB0aGlzLiNib2FyZC5zcXVhcmVzW2VuUGFzc2FudENhcHR1cmVkU3F1YXJlXSA9IHRoaXMuI29wcG9uZW50Q29sb3IgfCBQaWVjZS5QYXduO1xuICAgICAgICByZXR1cm4gaW5DaGVja0FmdGVyQ2FwdHVyZTtcbiAgICB9XG4gICAgI3NxdWFyZUF0dGFja2VkQWZ0ZXJFblBhc3NhbnQoZW5QYXNzYW50Q2FwdHVyZWRTcXVhcmUpIHtcbiAgICAgICAgaWYgKEJpdGJvYXJkLmNvbnRhaW5zU3F1YXJlKHRoaXMuI29wcG9uZW50QXR0YWNrTWFwTm9QYXducywgdGhpcy4jZnJpZW5kbHlLaW5nU3F1YXJlKSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBjb25zdCBkaXJJbmRleCA9IGVuUGFzc2FudENhcHR1cmVkU3F1YXJlIDwgdGhpcy4jZnJpZW5kbHlLaW5nU3F1YXJlID8gMiA6IDM7XG4gICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgTW92ZURhdGEuc3F1YXJlc1RvRWRnZVt0aGlzLiNmcmllbmRseUtpbmdTcXVhcmVdW2RpckluZGV4XTsgbisrKSB7XG4gICAgICAgICAgICBjb25zdCBzcXVhcmVJbmRleCA9IHRoaXMuI2ZyaWVuZGx5S2luZ1NxdWFyZSArIE1vdmVEYXRhLmRpcmVjdGlvbk9mZnNldHNbZGlySW5kZXhdICogKG4gKyAxKTtcbiAgICAgICAgICAgIGNvbnN0IHBpZWNlID0gdGhpcy4jYm9hcmQuc3F1YXJlc1tzcXVhcmVJbmRleF07XG4gICAgICAgICAgICBpZiAocGllY2UgPT09IFBpZWNlLk5vbmUpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAoUGllY2UuaXNDb2xvcihwaWVjZSwgdGhpcy4jZnJpZW5kbHlDb2xvcikpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBpZiAoUGllY2UuaXNSb29rT3JRdWVlbihwaWVjZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChNb3ZlRGF0YS5zcXVhcmVzVG9FZGdlW3RoaXMuI2ZyaWVuZGx5S2luZ1NxdWFyZV1bTW92ZURhdGEucGF3bkF0dGFja0RpcmVjdGlvbnNbdGhpcy4jZnJpZW5kbHlDb2xvckluZGV4XVtpXV0gPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGllY2UgPSB0aGlzLiNib2FyZC5zcXVhcmVzW3RoaXMuI2ZyaWVuZGx5S2luZ1NxdWFyZSArIE1vdmVEYXRhLmRpcmVjdGlvbk9mZnNldHNbTW92ZURhdGEucGF3bkF0dGFja0RpcmVjdGlvbnNbdGhpcy4jZnJpZW5kbHlDb2xvckluZGV4XVtpXV1dO1xuICAgICAgICAgICAgICAgIGlmIChwaWVjZSA9PT0gKHRoaXMuI29wcG9uZW50Q29sb3IgfCBQaWVjZS5QYXduKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAjY29tcHV0ZUF0dGFja3MoKSB7XG4gICAgICAgIGlmICh0aGlzLiNmcmllbmRseUtpbmdTcXVhcmUgPT09IC0xKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLiNjb21wdXRlU2xpZGluZ0F0dGFja01hcCgpO1xuICAgICAgICBjb25zdCBzdGFydERpckluZGV4ID0gdGhpcy4jYm9hcmQucXVlZW5zW3RoaXMuI29wcG9uZW50Q29sb3JJbmRleF0uY291bnQgIT09IDAgfHxcbiAgICAgICAgICAgIHRoaXMuI2JvYXJkLnJvb2tzW3RoaXMuI29wcG9uZW50Q29sb3JJbmRleF0uY291bnQgIT09IDAgPyAwIDogNDtcbiAgICAgICAgY29uc3QgZW5kRGlySW5kZXggPSB0aGlzLiNib2FyZC5xdWVlbnNbdGhpcy4jb3Bwb25lbnRDb2xvckluZGV4XS5jb3VudCAhPT0gMCB8fFxuICAgICAgICAgICAgdGhpcy4jYm9hcmQuYmlzaG9wc1t0aGlzLiNvcHBvbmVudENvbG9ySW5kZXhdLmNvdW50ICE9PSAwID8gOCA6IDQ7XG4gICAgICAgIGZvciAobGV0IGRpciA9IHN0YXJ0RGlySW5kZXg7IGRpciA8IGVuZERpckluZGV4OyBkaXIrKykge1xuICAgICAgICAgICAgY29uc3QgaXNEaWFnb25hbCA9IGRpciA+PSA0O1xuICAgICAgICAgICAgY29uc3QgbiA9IE1vdmVEYXRhLnNxdWFyZXNUb0VkZ2VbdGhpcy4jZnJpZW5kbHlLaW5nU3F1YXJlXVtkaXJdO1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gTW92ZURhdGEuZGlyZWN0aW9uT2Zmc2V0c1tkaXJdO1xuICAgICAgICAgICAgbGV0IGZyaWVuZGx5UGllY2VJblJheSA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IHJheU1hc2sgPSAwbjtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3F1YXJlSW5kZXggPSB0aGlzLiNmcmllbmRseUtpbmdTcXVhcmUgKyBvZmZzZXQgKiAoaSArIDEpO1xuICAgICAgICAgICAgICAgIHJheU1hc2sgfD0gMW4gPDwgQmlnSW50KHNxdWFyZUluZGV4KTtcbiAgICAgICAgICAgICAgICBjb25zdCBwaWVjZSA9IHRoaXMuI2JvYXJkLnNxdWFyZXNbc3F1YXJlSW5kZXhdO1xuICAgICAgICAgICAgICAgIGlmIChwaWVjZSA9PT0gUGllY2UuTm9uZSlcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgaWYgKFBpZWNlLmlzQ29sb3IocGllY2UsIHRoaXMuI2ZyaWVuZGx5Q29sb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZnJpZW5kbHlQaWVjZUluUmF5KVxuICAgICAgICAgICAgICAgICAgICAgICAgZnJpZW5kbHlQaWVjZUluUmF5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwaWVjZVR5cGUgPSBQaWVjZS5nZXRUeXBlKHBpZWNlKTtcbiAgICAgICAgICAgICAgICBpZiAoKGlzRGlhZ29uYWwgJiYgUGllY2UuaXNCaXNob3BPclF1ZWVuKHBpZWNlVHlwZSkpIHx8ICghaXNEaWFnb25hbCAmJiBQaWVjZS5pc1Jvb2tPclF1ZWVuKHBpZWNlVHlwZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmcmllbmRseVBpZWNlSW5SYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuI3BpbnNFeGlzdEluUG9zaXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4jcGluUmF5Qml0bWFzayB8PSByYXlNYXNrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4jY2hlY2tSYXlCaXRtYXNrIHw9IHJheU1hc2s7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiNpbkRvdWJsZUNoZWNrID0gdGhpcy4jaW5DaGVjaztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuI2luQ2hlY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuI2luRG91YmxlQ2hlY2spXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4jb3Bwb25lbnRLbmlnaHRBdHRhY2tzID0gMG47XG4gICAgICAgIGxldCBpc0tuaWdodENoZWNrID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3Qgc3RhcnRTcXVhcmUgb2YgdGhpcy4jYm9hcmQua25pZ2h0c1t0aGlzLiNvcHBvbmVudENvbG9ySW5kZXhdLnNxdWFyZXMpIHtcbiAgICAgICAgICAgIHRoaXMuI29wcG9uZW50S25pZ2h0QXR0YWNrcyB8PSBNb3ZlRGF0YS5rbmlnaHRBdHRhY2tCaXRib2FyZHNbc3RhcnRTcXVhcmVdO1xuICAgICAgICAgICAgaWYgKCFpc0tuaWdodENoZWNrICYmIEJpdGJvYXJkLmNvbnRhaW5zU3F1YXJlKHRoaXMuI29wcG9uZW50S25pZ2h0QXR0YWNrcywgdGhpcy4jZnJpZW5kbHlLaW5nU3F1YXJlKSkge1xuICAgICAgICAgICAgICAgIGlzS25pZ2h0Q2hlY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuI2luRG91YmxlQ2hlY2sgPSB0aGlzLiNpbkNoZWNrO1xuICAgICAgICAgICAgICAgIHRoaXMuI2luQ2hlY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuI2NoZWNrUmF5Qml0bWFzayB8PSAxbiA8PCBCaWdJbnQoc3RhcnRTcXVhcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuI29wcG9uZW50UGF3bkF0dGFja01hcCA9IDBuO1xuICAgICAgICBsZXQgaXNQYXduQ2hlY2sgPSBmYWxzZTtcbiAgICAgICAgZm9yIChjb25zdCBzdGFydFNxdWFyZSBvZiB0aGlzLiNib2FyZC5wYXduc1t0aGlzLiNvcHBvbmVudENvbG9ySW5kZXhdLnNxdWFyZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhd25BdHRhY2tzID0gTW92ZURhdGEucGF3bkF0dGFja0JpdGJvYXJkc1tzdGFydFNxdWFyZV1bdGhpcy4jb3Bwb25lbnRDb2xvckluZGV4XTtcbiAgICAgICAgICAgIHRoaXMuI29wcG9uZW50UGF3bkF0dGFja01hcCB8PSBwYXduQXR0YWNrcztcbiAgICAgICAgICAgIGlmICghaXNQYXduQ2hlY2sgJiYgQml0Ym9hcmQuY29udGFpbnNTcXVhcmUocGF3bkF0dGFja3MsIHRoaXMuI2ZyaWVuZGx5S2luZ1NxdWFyZSkpIHtcbiAgICAgICAgICAgICAgICBpc1Bhd25DaGVjayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy4jaW5Eb3VibGVDaGVjayA9IHRoaXMuI2luQ2hlY2s7XG4gICAgICAgICAgICAgICAgdGhpcy4jaW5DaGVjayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy4jY2hlY2tSYXlCaXRtYXNrIHw9IDFuIDw8IEJpZ0ludChzdGFydFNxdWFyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZW5lbXlLaW5nU3F1YXJlID0gdGhpcy4jYm9hcmQua2luZ1NxdWFyZVt0aGlzLiNvcHBvbmVudENvbG9ySW5kZXhdO1xuICAgICAgICB0aGlzLiNvcHBvbmVudEF0dGFja01hcE5vUGF3bnMgPVxuICAgICAgICAgICAgdGhpcy4jb3Bwb25lbnRTbGlkaW5nQXR0YWNrTWFwIHxcbiAgICAgICAgICAgICAgICB0aGlzLiNvcHBvbmVudEtuaWdodEF0dGFja3MgfFxuICAgICAgICAgICAgICAgIChlbmVteUtpbmdTcXVhcmUgPT09IC0xID8gMG4gOiBNb3ZlRGF0YS5raW5nQXR0YWNrQml0Ym9hcmRzW2VuZW15S2luZ1NxdWFyZV0pO1xuICAgICAgICB0aGlzLiNvcHBvbmVudEF0dGFja01hcCA9IHRoaXMuI29wcG9uZW50QXR0YWNrTWFwTm9QYXducyB8IHRoaXMuI29wcG9uZW50UGF3bkF0dGFja01hcDtcbiAgICB9XG4gICAgI2NvbXB1dGVTbGlkaW5nQXR0YWNrTWFwKCkge1xuICAgICAgICB0aGlzLiNvcHBvbmVudFNsaWRpbmdBdHRhY2tNYXAgPSAwbjtcbiAgICAgICAgZm9yIChjb25zdCByb29rU3F1YXJlIG9mIHRoaXMuI2JvYXJkLnJvb2tzW3RoaXMuI29wcG9uZW50Q29sb3JJbmRleF0uc3F1YXJlcylcbiAgICAgICAgICAgIHRoaXMuI2NvbXB1dGVTbGlkaW5nQXR0YWNrKHJvb2tTcXVhcmUsIDAsIDQpO1xuICAgICAgICBmb3IgKGNvbnN0IGJpc2hvcFNxdWFyZSBvZiB0aGlzLiNib2FyZC5iaXNob3BzW3RoaXMuI29wcG9uZW50Q29sb3JJbmRleF0uc3F1YXJlcylcbiAgICAgICAgICAgIHRoaXMuI2NvbXB1dGVTbGlkaW5nQXR0YWNrKGJpc2hvcFNxdWFyZSwgNCwgOCk7XG4gICAgICAgIGZvciAoY29uc3QgcXVlZW5TcXVhcmUgb2YgdGhpcy4jYm9hcmQucXVlZW5zW3RoaXMuI29wcG9uZW50Q29sb3JJbmRleF0uc3F1YXJlcylcbiAgICAgICAgICAgIHRoaXMuI2NvbXB1dGVTbGlkaW5nQXR0YWNrKHF1ZWVuU3F1YXJlLCAwLCA4KTtcbiAgICB9XG4gICAgI2NvbXB1dGVTbGlkaW5nQXR0YWNrKHN0YXJ0U3F1YXJlLCBzdGFydERpckluZGV4LCBlbmREaXJJbmRleCkge1xuICAgICAgICBmb3IgKGxldCBkaXIgPSBzdGFydERpckluZGV4OyBkaXIgPCBlbmREaXJJbmRleDsgZGlyKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IE1vdmVEYXRhLmRpcmVjdGlvbk9mZnNldHNbZGlyXTtcbiAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgTW92ZURhdGEuc3F1YXJlc1RvRWRnZVtzdGFydFNxdWFyZV1bZGlyXTsgbisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0U3F1YXJlID0gc3RhcnRTcXVhcmUgKyBvZmZzZXQgKiAobiArIDEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFNxdWFyZVBpZWNlID0gdGhpcy4jYm9hcmQuc3F1YXJlc1t0YXJnZXRTcXVhcmVdO1xuICAgICAgICAgICAgICAgIHRoaXMuI29wcG9uZW50U2xpZGluZ0F0dGFja01hcCB8PSAxbiA8PCBCaWdJbnQodGFyZ2V0U3F1YXJlKTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0U3F1YXJlICE9PSB0aGlzLiNmcmllbmRseUtpbmdTcXVhcmUgJiYgdGFyZ2V0U3F1YXJlUGllY2UgIT09IFBpZWNlLk5vbmUpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFBpZWNlIHtcbiAgICBzdGF0aWMgTm9uZSA9IDBiMDAwMDA7XG4gICAgc3RhdGljIEtpbmcgPSAwYjAwMDAxO1xuICAgIHN0YXRpYyBQYXduID0gMGIwMDAxMDtcbiAgICBzdGF0aWMgS25pZ2h0ID0gMGIwMDAxMTtcbiAgICBzdGF0aWMgQmlzaG9wID0gMGIwMDEwMTtcbiAgICBzdGF0aWMgUm9vayA9IDBiMDAxMTA7XG4gICAgc3RhdGljIFF1ZWVuID0gMGIwMDExMTtcbiAgICBzdGF0aWMgV2hpdGUgPSAwYjAxMDAwO1xuICAgIHN0YXRpYyBCbGFjayA9IDBiMTAwMDA7XG4gICAgc3RhdGljICN0eXBlTWFzayA9IDBiMDAxMTE7XG4gICAgc3RhdGljICNjb2xvck1hc2sgPSAwYjExMDAwO1xuICAgIHN0YXRpYyBpc0NvbG9yKHBpZWNlLCBjb2xvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb2xvcihwaWVjZSkgPT09IGNvbG9yO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0Q29sb3IocGllY2UpIHtcbiAgICAgICAgcmV0dXJuIHBpZWNlICYgdGhpcy4jY29sb3JNYXNrO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0VHlwZShwaWVjZSkge1xuICAgICAgICByZXR1cm4gcGllY2UgJiB0aGlzLiN0eXBlTWFzaztcbiAgICB9XG4gICAgc3RhdGljIGlzVHlwZShwaWVjZSwgdHlwZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUeXBlKHBpZWNlKSA9PT0gdHlwZTtcbiAgICB9XG4gICAgc3RhdGljIGlzUm9va09yUXVlZW4ocGllY2UpIHtcbiAgICAgICAgcmV0dXJuIChwaWVjZSAmIDBiMTEwKSA9PT0gMGIxMTA7XG4gICAgfVxuICAgIHN0YXRpYyBpc0Jpc2hvcE9yUXVlZW4ocGllY2UpIHtcbiAgICAgICAgcmV0dXJuIChwaWVjZSAmIDBiMTAxKSA9PT0gMGIxMDE7XG4gICAgfVxuICAgIHN0YXRpYyBpc1NsaWRpbmdQaWVjZShwaWVjZSkge1xuICAgICAgICByZXR1cm4gKHBpZWNlICYgMGIxMDApICE9PSAwO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBQaWVjZUxpc3Qge1xuICAgICNzcXVhcmVzID0gW107XG4gICAgYWRkUGllY2Uoc3F1YXJlKSB7XG4gICAgICAgIHRoaXMuI3NxdWFyZXMucHVzaChzcXVhcmUpO1xuICAgIH1cbiAgICByZW1vdmVQaWVjZShzcXVhcmUpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLiNzcXVhcmVzLmluZGV4T2Yoc3F1YXJlKTtcbiAgICAgICAgaWYgKGluZGV4ID49IDApXG4gICAgICAgICAgICB0aGlzLiNzcXVhcmVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIG1vdmVQaWVjZShzdGFydFNxdWFyZSwgdGFyZ2V0U3F1YXJlKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy4jc3F1YXJlcy5pbmRleE9mKHN0YXJ0U3F1YXJlKTtcbiAgICAgICAgdGhpcy4jc3F1YXJlc1tpbmRleF0gPSB0YXJnZXRTcXVhcmU7XG4gICAgfVxuICAgIGdldCBzcXVhcmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jc3F1YXJlcztcbiAgICB9XG4gICAgZ2V0IGNvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jc3F1YXJlcy5sZW5ndGg7XG4gICAgfVxuICAgIHN0YXRpYyBlbXB0eSA9IG5ldyBQaWVjZUxpc3QoKTtcbn1cbiIsImltcG9ydCB7IEJpdGJvYXJkLCBCb2FyZCwgUGllY2UgfSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuZXhwb3J0IGNsYXNzIFpvYnJpc3Qge1xuICAgIHN0YXRpYyBmaWxlbmFtZSA9IFwiem9icmlzdC50eHRcIjtcbiAgICBzdGF0aWMgcGllY2VzQXJyYXkgPSBbXTtcbiAgICBzdGF0aWMgY2FzdGxpbmdSaWdodHMgPSBbXTtcbiAgICBzdGF0aWMgZW5QYXNzYW50RmlsZSA9IFtdO1xuICAgIHN0YXRpYyBzaWRlVG9Nb3ZlID0gQml0Ym9hcmQucmFuZG9tVTY0KCk7XG4gICAgc3RhdGljIHtcbiAgICAgICAgZm9yIChsZXQgcGllY2VJbmRleCA9IDA7IHBpZWNlSW5kZXggPCA4OyBwaWVjZUluZGV4KyspIHtcbiAgICAgICAgICAgIHRoaXMucGllY2VzQXJyYXkucHVzaChbW10sIFtdXSk7XG4gICAgICAgICAgICBmb3IgKGxldCBzcXVhcmVJbmRleCA9IDA7IHNxdWFyZUluZGV4IDwgNjQ7IHNxdWFyZUluZGV4KyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBpZWNlc0FycmF5W3BpZWNlSW5kZXhdW0JvYXJkLndoaXRlSW5kZXhdW3NxdWFyZUluZGV4XSA9IEJpdGJvYXJkLnJhbmRvbVU2NCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucGllY2VzQXJyYXlbcGllY2VJbmRleF1bQm9hcmQuYmxhY2tJbmRleF1bc3F1YXJlSW5kZXhdID0gQml0Ym9hcmQucmFuZG9tVTY0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgaSsrKVxuICAgICAgICAgICAgdGhpcy5jYXN0bGluZ1JpZ2h0cy5wdXNoKEJpdGJvYXJkLnJhbmRvbVU2NCgpKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspXG4gICAgICAgICAgICB0aGlzLmVuUGFzc2FudEZpbGUucHVzaChCaXRib2FyZC5yYW5kb21VNjQoKSk7XG4gICAgfVxuICAgIHN0YXRpYyBjYWxjdWxhdGVab2JyaXN0S2V5KGJvYXJkKSB7XG4gICAgICAgIGxldCB6b2JyaXN0S2V5ID0gMG47XG4gICAgICAgIGZvciAobGV0IHNxdWFyZUluZGV4ID0gMDsgc3F1YXJlSW5kZXggPCA2NDsgc3F1YXJlSW5kZXgrKykge1xuICAgICAgICAgICAgaWYgKGJvYXJkLnNxdWFyZXNbc3F1YXJlSW5kZXhdICE9PSBQaWVjZS5Ob25lKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGllY2VUeXBlID0gUGllY2UuZ2V0VHlwZShib2FyZC5zcXVhcmVzW3NxdWFyZUluZGV4XSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGllY2VDb2xvciA9IFBpZWNlLmdldENvbG9yKGJvYXJkLnNxdWFyZXNbc3F1YXJlSW5kZXhdKTtcbiAgICAgICAgICAgICAgICB6b2JyaXN0S2V5IF49IHRoaXMucGllY2VzQXJyYXlbcGllY2VUeXBlXVtwaWVjZUNvbG9yID09PSBQaWVjZS5XaGl0ZSA/IEJvYXJkLndoaXRlSW5kZXggOiBCb2FyZC5ibGFja0luZGV4XVtzcXVhcmVJbmRleF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZW5QYXNzYW50SW5kZXggPSAoYm9hcmQuY3VycmVudEdhbWVTdGF0ZSA+PiA0KSAmIDBiMTExMTtcbiAgICAgICAgem9icmlzdEtleSBePSB0aGlzLmVuUGFzc2FudEZpbGVbZW5QYXNzYW50SW5kZXhdO1xuICAgICAgICBpZiAoYm9hcmQuY29sb3JUb01vdmUgPT09IFBpZWNlLkJsYWNrKVxuICAgICAgICAgICAgem9icmlzdEtleSBePSB0aGlzLnNpZGVUb01vdmU7XG4gICAgICAgIHpvYnJpc3RLZXkgXj0gdGhpcy5jYXN0bGluZ1JpZ2h0c1tib2FyZC5jdXJyZW50R2FtZVN0YXRlICYgMGIxMTExXTtcbiAgICAgICAgcmV0dXJuIHpvYnJpc3RLZXk7XG4gICAgfVxufVxuIiwiZXhwb3J0IHsgQml0Ym9hcmQgfSBmcm9tIFwiLi9CaXRib2FyZC5qc1wiO1xuZXhwb3J0IHsgQm9hcmRSZXByZXNlbnRhdGlvbiB9IGZyb20gXCIuL0JvYXJkUmVwcmVzZW50YXRpb24uanNcIjtcbmV4cG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuL0dhbWVTdGF0ZS5qc1wiO1xuZXhwb3J0IHsgUGllY2UgfSBmcm9tIFwiLi9QaWVjZS5qc1wiO1xuZXhwb3J0IHsgUGllY2VMaXN0IH0gZnJvbSBcIi4vUGllY2VMaXN0LmpzXCI7XG5leHBvcnQgeyBCb2FyZCB9IGZyb20gXCIuL0JvYXJkLmpzXCI7XG5leHBvcnQgeyBNb3ZlRGF0YSB9IGZyb20gXCIuL01vdmVEYXRhLmpzXCI7XG5leHBvcnQgeyBGRU4gfSBmcm9tIFwiLi9GRU4uanNcIjtcbmV4cG9ydCB7IE1hZ2ljcyB9IGZyb20gXCIuL01hZ2ljcy5qc1wiO1xuZXhwb3J0IHsgTW92ZSB9IGZyb20gXCIuL01vdmUuanNcIjtcbmV4cG9ydCB7IE1vdmVHZW5lcmF0b3IgfSBmcm9tIFwiLi9Nb3ZlR2VuZXJhdG9yLmpzXCI7XG5leHBvcnQgeyBab2JyaXN0IH0gZnJvbSBcIi4vWm9icmlzdC5qc1wiO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHYW1lU3RhdGUsIE1vdmUsIE1vdmVHZW5lcmF0b3IsIFBpZWNlIH0gZnJvbSBcIi4uLy4uL2Rpc3QvaW5kZXguanNcIjtcbmltcG9ydCB7IGJvYXJkRWxlbWVudCwgcmVuZGVyIH0gZnJvbSBcIi4vcmVuZGVyLmpzXCI7XG5pbXBvcnQgeyBzZXR1cCB9IGZyb20gXCIuL3NldHVwLmpzXCI7XG5pbXBvcnQgeyBzdGF0ZSB9IGZyb20gXCIuL3N0YXRlLmpzXCI7XG5cbnNldHVwKCk7XG5cbnJlbmRlcigpO1xuXG5mdW5jdGlvbiBtYWtlTW92ZU9uQm9hcmQobW92ZTogTW92ZSkge1xuICAgIGlmIChzdGF0ZS5nYW1lT3ZlcikgcmV0dXJuO1xuICAgIFxuICAgIC8vIG1vdmUgb24gYm9hcmRcbiAgICBzdGF0ZS5ib2FyZC5tYWtlTW92ZShtb3ZlKTtcblxuICAgIC8vIHVwZGF0ZSBzdGF0ZVxuICAgIHN0YXRlLm1vdmVzTWFkZS5wdXNoKG1vdmUpO1xuXG4gICAgc3RhdGUubGVnYWxNb3ZlcyA9IG5ldyBNb3ZlR2VuZXJhdG9yKHN0YXRlLmJvYXJkKS5nZW5lcmF0ZU1vdmVzKCk7XG59XG5cbmJvYXJkRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gY2xpY2tIYW5kbGVyKGUpIHtcbiAgICBpZiAoIShlLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgY29uc3QgY2VsbCA9IGUudGFyZ2V0LmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLmNlbGxcIik7XG5cbiAgICBpZiAoIWNlbGwpIHJldHVybjtcblxuICAgIC8vIHNlbGVjdGVkIHRoZSBzYW1lIGNlbGxcbiAgICBpZiAoc3RhdGUuc2VsZWN0ZWQgPT09IE51bWJlcihjZWxsLmRhdGFzZXQuaW5kZXgpKSB7XG4gICAgICAgIHN0YXRlLnNlbGVjdGVkID0gLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBOdW1iZXIoY2VsbC5kYXRhc2V0LmluZGV4KTtcblxuICAgICAgICBjb25zdCBhdHRlbXB0ZWRNb3ZlID0gc3RhdGUubGVnYWxNb3Zlcy5maW5kKChtb3ZlKSA9PiAoXG4gICAgICAgICAgICBtb3ZlLnN0YXJ0U3F1YXJlID09PSBzdGF0ZS5zZWxlY3RlZCAmJiBtb3ZlLnRhcmdldFNxdWFyZSA9PT0gaW5kZXhcbiAgICAgICAgKSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoYXR0ZW1wdGVkTW92ZSkge1xuICAgICAgICAgICAgLy8gbWFkZSBhIG1vdmUsIGRlc2VsZWN0IGNlbGxcbiAgICAgICAgICAgIHN0YXRlLnNlbGVjdGVkID0gLTE7XG5cbiAgICAgICAgICAgIGxldCBhdWRpbzogSFRNTEF1ZGlvRWxlbWVudDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGF0dGVtcHRlZE1vdmUuaXNQcm9tb3Rpb24pIHtcbiAgICAgICAgICAgICAgICAvLyByZXBsYWNlIHdpdGggdWkgYW5kIGF3YWl0IHVzZXIgaW5wdXQgbGF0ZXJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9tb3Rpb25JbnB1dCA9IHByb21wdChcInByb21vdGlvbiAocS9uL2Ivcik6XCIpPy5bMF0/LnRvTG93ZXJDYXNlKCkgPz8gXCJxXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvbW90aW9uRmxhZyA9IFwicW5iclwiLmluY2x1ZGVzKHByb21vdGlvbklucHV0KSA/IHtcbiAgICAgICAgICAgICAgICAgICAgcTogTW92ZS5GbGFnLlByb21vdGVUb1F1ZWVuLFxuICAgICAgICAgICAgICAgICAgICBuOiBNb3ZlLkZsYWcuUHJvbW90ZVRvS25pZ2h0LFxuICAgICAgICAgICAgICAgICAgICBiOiBNb3ZlLkZsYWcuUHJvbW90ZVRvQmlzaG9wLFxuICAgICAgICAgICAgICAgICAgICByOiBNb3ZlLkZsYWcuUHJvbW90ZVRvUm9vayxcbiAgICAgICAgICAgICAgICB9W3Byb21vdGlvbklucHV0XSA6IE1vdmUuRmxhZy5Qcm9tb3RlVG9RdWVlbjtcblxuICAgICAgICAgICAgICAgIG1ha2VNb3ZlT25Cb2FyZChuZXcgTW92ZShcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdGVkTW92ZS5zdGFydFNxdWFyZSxcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdGVkTW92ZS50YXJnZXRTcXVhcmUsXG4gICAgICAgICAgICAgICAgICAgIHByb21vdGlvbkZsYWcsXG4gICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYXVkaW8gPSBuZXcgQXVkaW8oXCJhc3NldHMvc291bmRzL21vdmUtcHJvbW90ZS5tcDNcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChhdHRlbXB0ZWRNb3ZlLm1vdmVGbGFnID09PSBNb3ZlLkZsYWcuQ2FzdGxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgYXVkaW8gPSBuZXcgQXVkaW8oXCJhc3NldHMvc291bmRzL2Nhc3RsZS5tcDNcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhdHRlbXB0ZWRNb3ZlLm1vdmVGbGFnID09PSBNb3ZlLkZsYWcuRW5QYXNzYW50Q2FwdHVyZSB8fCAoc3RhdGUuYm9hcmQuc3F1YXJlc1thdHRlbXB0ZWRNb3ZlLnRhcmdldFNxdWFyZV0gIT09IFBpZWNlLk5vbmUgJiYgIVBpZWNlLmlzQ29sb3Ioc3RhdGUuYm9hcmQuc3F1YXJlc1thdHRlbXB0ZWRNb3ZlLnRhcmdldFNxdWFyZV0sIHN0YXRlLmJvYXJkLmNvbG9yVG9Nb3ZlKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXVkaW8gPSBuZXcgQXVkaW8oXCJhc3NldHMvc291bmRzL2NhcHR1cmUubXAzXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF1ZGlvID0gbmV3IEF1ZGlvKFwiYXNzZXRzL3NvdW5kcy9tb3ZlLXNlbGYubXAzXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBtb3ZlIG9uIGJvYXJkXG4gICAgICAgICAgICAgICAgbWFrZU1vdmVPbkJvYXJkKGF0dGVtcHRlZE1vdmUpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbWcgPSBuZXcgTW92ZUdlbmVyYXRvcihzdGF0ZS5ib2FyZCk7XG4gICAgICAgICAgICAgICAgbWcuZ2VuZXJhdGVNb3ZlcygpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1nLmluQ2hlY2spIGF1ZGlvID0gbmV3IEF1ZGlvKFwiYXNzZXRzL3NvdW5kcy9tb3ZlLWNoZWNrLm1wM1wiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZ2FtZVN0YXRlID0gc3RhdGUuYm9hcmQuZ2FtZVN0YXRlKCk7XG5cbiAgICAgICAgICAgIGlmIChnYW1lU3RhdGUgIT09IEdhbWVTdGF0ZS5QbGF5aW5nKSB7XG4gICAgICAgICAgICAgICAgYXVkaW8gPSBuZXcgQXVkaW8oXCJhc3NldHMvc291bmRzL2dhbWUtZW5kLm1wM1wiKTtcblxuICAgICAgICAgICAgICAgIHN0YXRlLmdhbWVPdmVyID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGJvYXJkRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2tIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlLmJvYXJkLnNxdWFyZXNbaW5kZXhdID09PSBQaWVjZS5Ob25lIHx8ICFQaWVjZS5pc0NvbG9yKHN0YXRlLmJvYXJkLnNxdWFyZXNbaW5kZXhdLCBzdGF0ZS5ib2FyZC5jb2xvclRvTW92ZSkpIHtcbiAgICAgICAgICAgIC8vIGNhbid0IHNlbGVjdCBlbmVteSBwaWVjZSBvciBlbXB0eSBjZWxsXG4gICAgICAgICAgICBzdGF0ZS5zZWxlY3RlZCA9IC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWQgPSBpbmRleDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpO1xufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9