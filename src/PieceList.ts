export class PieceList {
    readonly #squares: Uint8Array;
    readonly #map: Uint8Array;

    #count = 0;

    constructor(size: number) {
        // use 64 to represent no piece
        this.#squares = new Uint8Array(Array(size).fill(64));
        this.#map = new Uint8Array(64).fill(this.#squares.length);
    }

    addPiece(square: number) {
        this.#squares[this.#count] = square;
        this.#map[square] = this.#count;
        this.#count++;
    }

    removePiece(square: number) {
        this.#count--;

        const index = this.#map[square];

        this.#squares[index] = this.#squares[this.#count];
        this.#map[this.#squares[this.#count]] = index;
        this.#squares[this.#count] = 64;
        this.#map[square] = this.#squares.length;
    }

    movePiece(startSquare: number, targetSquare: number) {
        const index = this.#map[startSquare];

        this.#squares[index] = targetSquare;
        this.#map[targetSquare] = index;
        this.#map[startSquare] = this.#squares.length;
    }

    /**
     * warning: the value 64 is the null piece
     * 
     * warning: do not mutate
     */
    get squares() {
        return this.#squares;
    }

    /**
     * warning: this should only be used for debugging
     */
    get map() {
        return this.#map;
    }

    get count() {
        return this.#count;
    }

    static readonly empty = new PieceList(0);
}