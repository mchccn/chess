const board = document.querySelector(".board")!;

for (let i = 0; i < 64; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    
    const img = document.createElement("img");
    img.classList.add("cell-img");
    img.draggable = false;
    img.src = "assets/white_pawn.svg";

    cell.append(img);
    board.append(cell);
}