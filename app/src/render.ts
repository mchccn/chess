import { BoardRepresentation } from "../../dist/BoardRepresentation.js";
import { iconMap } from "./iconMap.js";
import { state } from "./state.js";

export const boardElement = document.querySelector<HTMLElement>(".board")!;

export function render() {
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
        imgElement.src = "assets/pieces/" + iconMap[state.board.squares[index]];

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
