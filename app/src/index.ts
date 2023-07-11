import { Move } from "../../dist/Move.js";
import { Board, BoardRepresentation, MoveGenerator, Piece } from "../../dist/index.js";
import { iconMap } from "./iconMap.js";
import { logElement, setup } from "./setup.js";
import { ws } from "./ws.js";

setup();

// this variable holds the original state of the board
// const startpos = FEN.startingPosition;
// const startpos = "K7/3N4/4Q3/8/3B4/8/pR2p3/7k w KQkq - 0 1";

// debugging positions
// const startpos = "r3k2r/p1ppqpb1/bn2pnN1/3P4/1p2P3/2N2Q1p/PPPBBPPP/R3K2R b KQkq - 0 1";
// const startpos = "r3k2r/p1ppqNb1/bn2pnp1/3P4/1p2P3/2N2Q1p/PPPBBPPP/R3K2R b KQkq - 0 1";
// const startpos = "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1";
// const startpos = "r3k2r/p1ppqp2/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPP1BPPP/R3K2R b KQkq - 0 2";
// const startpos = "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1";
// const startpos = "r3k2r/p1ppqp2/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPP1BPPP/R3K2R b KQkq - 0 2";
const startpos = "r3k2r/Pppp1ppp/1b3nbN/nPq5/B1P1P3/5N2/Pp1P2PP/R2Q1RK1 w kq - 0 2";
// const startpos = "8/8/8/pP7/8/8/8/8 w - a6 0 1";

// const board = new Board().loadStartingPosition();
const board = new Board().loadPosition(startpos);

const WS_SEND = ws.send.bind(ws);

ws.send = function (data: any) {
    logElement.append("> " + data);

    return WS_SEND(data);
};

ws.addEventListener("open", () => {
    ws.send("uci\n");
});

// implement UCI
ws.addEventListener("message", ({ data: message }) => {
    const { data } = message as { data: number[] };

    const string = typeof message === "string" ? message : Buffer.from(data).toString("utf8");

    logElement.append("< " + string);

    const [command, ...args] = string.trimEnd().split(" ");

    switch (command) {
        case "uciok": {
            ws.send("isready\n");
            break;
        };
        case "readyok": {
            ws.send("ucinewgame\n");
            ws.send(`position fen ${startpos}\n`);
            break;
        };
        case "id": {
            return;
        };
        case "bestmove": {
            const [lan] = args; // we don't care about ponders

            const move = Move.parseMove(lan, board);

            return makeMoveOnBoard(move);
        };
        case "info": {
            // nothing to do here (yet)
            return;
        };
        case "option": {
            // display ui with option handlers later
            return;
        };

        // custom commands that aren't part of UCI (mainly for debugging)

        // ignore unknown command
        default:
            return;
    }
});

const boardElement = document.querySelector<HTMLElement>(".board")!;

const state = {
    selected: -1,
    legalMoves: new MoveGenerator(board).generateMoves(),
    movesMade: [] as Move[],
    gameOver: false,
};

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

        const isLightSquare = BoardRepresentation.isLightSquare(file, rank);

        cellElement.dataset.index = index.toString();
        cellElement.classList.add(isLightSquare ? "light" : "dark");
        imgElement.src = "assets/pieces/" + iconMap[board.squares[index]];

        cellElement.append(imgElement);
        boardElement.append(cellElement);
        
        if (index === state.selected) {
            cellElement.classList.add(isLightSquare ? "light-selected" : "dark-selected")
        }

        if (state.legalMoves.some((move) => (
            move.startSquare === state.selected && move.targetSquare === index
        ))) {
            cellElement.classList.add(isLightSquare ? "light-highlighted" : "dark-highlighted");
        }
    }
}

render();

function makeMoveOnBoard(move: Move) {
    if (state.gameOver) return;
    
    // move on board
    board.makeMove(move);

    // update state
    state.movesMade.push(move);

    // send to server
    ws.send(`position fen ${startpos} moves ${state.movesMade.map((move) => move.name).join(" ")}\n`);
    
    state.legalMoves = new MoveGenerator(board).generateMoves();
}

function unmakeMoveOnBoard() {
    if (state.gameOver) return;
    
    if (state.movesMade.length) {
        // unmake move
        board.unmakeMove(state.movesMade.pop()!);

        // send to server
        ws.send(`position fen ${startpos} moves ${state.movesMade.map((move) => move.name).join(" ")}\n`);
        
        state.legalMoves = new MoveGenerator(board).generateMoves();
    }
}

//@ts-ignore
globalThis.board = board;

document.addEventListener("keypress", (e) => {
    if (e.code === "KeyZ") {
        unmakeMoveOnBoard();

        render();
    }
});

boardElement.addEventListener("click", function clickHandler(e) {
    if (!(e.target instanceof HTMLElement)) return;

    const cell = e.target.closest<HTMLElement>(".cell");

    if (!cell) return;

    // selected the same cell
    if (state.selected === Number(cell.dataset.index)) {
        state.selected = -1;
    } else {
        const index = Number(cell.dataset.index);

        const attemptedMove = state.legalMoves.find((move) => (
            move.startSquare === state.selected && move.targetSquare === index
        ));
        
        if (attemptedMove) {
            // made a move, deselect cell
            state.selected = -1;

            let 
            audio: HTMLAudioElement;
            if (attemptedMove.isPromotion) {
                // replace with ui and await user input later
                const promotionInput = prompt("promotion (q/n/b/r):")?.[0]?.toLowerCase() ?? "q";
                
                const promotionFlag = "qnbr".includes(promotionInput) ? {
                    q: Move.Flag.PromoteToQueen,
                    n: Move.Flag.PromoteToKnight,
                    b: Move.Flag.PromoteToBishop,
                    r: Move.Flag.PromoteToRook,
                }[promotionInput] : Move.Flag.PromoteToQueen;

                makeMoveOnBoard(new Move(
                    attemptedMove.startSquare,
                    attemptedMove.targetSquare,
                    promotionFlag,
                ));
                
                audio = new Audio("assets/sounds/move-promote.mp3");
            } else {
                if (attemptedMove.moveFlag === Move.Flag.Castling) {
                    audio = new Audio("assets/sounds/castle.mp3");
                } else if (attemptedMove.moveFlag === Move.Flag.EnPassantCapture || (board.squares[attemptedMove.targetSquare] !== Piece.None && !Piece.isColor(board.squares[attemptedMove.targetSquare], board.colorToMove))) {
                    audio = new Audio("assets/sounds/capture.mp3");
                } else {
                    audio = new Audio("assets/sounds/move-self.mp3");
                }
                
                // move on board
                makeMoveOnBoard(attemptedMove);

                const mg = new MoveGenerator(board);
                mg.generateMoves();

                if (mg.inCheck) audio = new Audio("assets/sounds/move-check.mp3");
            }

            if (state.legalMoves.length === 0) {
                audio = new Audio("assets/sounds/game-end.mp3");

                state.gameOver = true;

                boardElement.removeEventListener("click", clickHandler);
            }

            audio.play();
        } else if (board.squares[index] === Piece.None || !Piece.isColor(board.squares[index], board.colorToMove)) {
            // can't select enemy piece or empty cell
            state.selected = -1;
        } else {
            state.selected = index;
        }
    }

    render();
});