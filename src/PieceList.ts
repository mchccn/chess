export class PieceList {
    readonly #squares: number[] = [];

    addPiece(square: number) {
        if (!this.#squares.includes(square)) this.#squares.push(square);
    }

    removePiece(square: number) {
        const index = this.#squares.indexOf(square);

        if (index >= 0) this.#squares.splice(index, 1);
    }

    movePiece(startSquare: number, targetSquare: number) {
        const index = this.#squares.indexOf(startSquare);

        this.#squares[index] = targetSquare;
    }
    
    /** warning: do not mutate */
    get squares() {
        return this.#squares;
    }

    get count() {
        return this.#squares.length;
    }

    static readonly empty = new PieceList();
}