import { useContext, useRef, useState } from "react";
import { v00_Random } from "../../dist/adversaries/v00_Random";
import { BoardRepresentation, GameState, Move, MoveGenerator, Piece } from "../../dist/index";
import { BoardContext } from "./BoardContext";
import IconMap from "./IconMap";

function reverseRanks(board: number[]) {
    const result = [...board];

    for (let rank = 0; rank < 8; rank++)
        result.splice(rank * 8, 8, ...board.slice((7 - rank) * 8, (8 - rank) * 8));
    
    return result;
}

function App() {
    const board = useContext(BoardContext);

    const adversary = useRef(new v00_Random());

    const [legalMoves, setLegalMoves] = useState(new MoveGenerator(board).generateMoves());
    const [gameState, setGameState] = useState(GameState.Playing);
    const [selected, setSelected] = useState(-1);

    const [playingAs, setPlayingAs] = useState(Piece.White);

    function playMove(move: Move) {
        if (board.gameState() !== GameState.Playing) return;

        setSelected(-1);
    
        const isOurMove = Piece.isColor(board.squares[move.startSquare], playingAs);

        let audio: HTMLAudioElement;
    
        if (move.isPromotion) {
            audio = new Audio("sounds/move-promote.mp3");
        } else if (move.moveFlag === Move.Flag.Castling) {
            audio = new Audio("sounds/castle.mp3");
        } else if (move.moveFlag === Move.Flag.EnPassantCapture || (board.squares[move.targetSquare] !== Piece.None && !Piece.isColor(board.squares[move.targetSquare], board.colorToMove))) {
            audio = new Audio("sounds/capture.mp3");
        } else {
            audio = new Audio(isOurMove ? "sounds/move-self.mp3" : "sounds/move-opponent.mp3");
        }

        if (move.isPromotion && isOurMove) {
            const promotionInput = prompt("promotion (q/n/b/r):")?.[0]?.toLowerCase() ?? "q";
    
            const promotionFlag = "qnbr".includes(promotionInput) ? {
                q: Move.Flag.PromoteToQueen,
                n: Move.Flag.PromoteToKnight,
                b: Move.Flag.PromoteToBishop,
                r: Move.Flag.PromoteToRook,
            }[promotionInput] : Move.Flag.PromoteToQueen;
    
            board.makeMove(new Move(
                move.startSquare,
                move.targetSquare,
                promotionFlag,
            ));
        } else {
            board.makeMove(move);
                                
            const mg = new MoveGenerator(board);
            
            mg.generateMoves();
    
            if (mg.inCheck) audio = new Audio("sounds/move-check.mp3");
        }
    
        const gameState = board.gameState();
    
        setGameState(gameState);
    
        if (gameState !== GameState.Playing)
            audio = new Audio("sounds/game-end.mp3");
    
        audio.play();

        setLegalMoves(new MoveGenerator(board).generateMoves());
    }

    return (
        <>
            <div className="board">
                <div className="ranks">{[...BoardRepresentation.rankNames].map((rank) => <div key={rank}>{rank}</div>)}</div>
                <div className="files">{[...BoardRepresentation.fileNames].map((file) => <div key={file}>{file}</div>)}</div>
                {(playingAs === Piece.White ? reverseRanks(board.squares) : board.squares).map((piece, i) => {
                    const file = BoardRepresentation.fileIndex(i);
                    const rank = playingAs === Piece.White ? 7 - BoardRepresentation.rankIndex(i) : BoardRepresentation.rankIndex(i);
                    const index = rank * 8 + file;

                    const isLightSquare = BoardRepresentation.isLightSquare(file, rank);

                    const classes = ["cell", isLightSquare ? "light" : "dark"];

                    if (selected === index) classes.push(isLightSquare ? "light-selected" : "dark-selected")

                    if (legalMoves.some((move) => move.startSquare === selected && move.targetSquare === index))
                        classes.push(isLightSquare ? "light-highlighted" : "dark-highlighted");

                    return (
                        <div
                            onClick={() => {
                                if (gameState !== GameState.Playing) return;

                                if (selected === index)
                                    return setSelected(-1);

                                const move = legalMoves.find((move) => (
                                    move.startSquare === selected && move.targetSquare === index
                                ));

                                if (move) {
                                    playMove(move);

                                    if (board.gameState() === GameState.Playing)
                                        playMove(adversary.current.bestMove(board));
                                } else if (!Piece.isColor(board.squares[index], board.colorToMove)) {
                                    setSelected(-1);
                                } else {
                                    setSelected(index);
                                }
                            }}
                            className={classes.join(" ")}    
                            key={index}                    
                        >
                            <img className="cell-img" src={`pieces/${IconMap[piece]}`} draggable={false} />
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default App;
