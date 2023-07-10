export class PieceList {
    readonly #squares: number[] = [];

    addPiece(square: number) {
        this.#squares.push(square);
    }

    removePiece(square: number) {
        const index = this.#squares.indexOf(square);

        if (index >= 0) this.#squares.splice(index, 1);
    }

    movePiece(startSquare: number, targetSquare: number) {
        const index = this.#squares.indexOf(startSquare);

        this.#squares[index] = targetSquare;
    }

    clear() {
        this.#squares.length = 0;
    }

    get squares() {
        return Object.freeze([...this.#squares]);
    }

    get count() {
        return this.#squares.length;
    }

    static readonly empty = new PieceList();
}