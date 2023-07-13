export class BoardRepresentation {
    static readonly rankNames = "12345678";
    static readonly fileNames = "abcdefgh";

    static readonly a1 = 0;
    static readonly b1 = 1;
    static readonly c1 = 2;
    static readonly d1 = 3;
    static readonly e1 = 4;
    static readonly f1 = 5;
    static readonly g1 = 6;
    static readonly h1 = 7;

    static readonly a8 = 56;
    static readonly b8 = 57;
    static readonly c8 = 58;
    static readonly d8 = 59;
    static readonly e8 = 60;
    static readonly f8 = 61;
    static readonly g8 = 62;
    static readonly h8 = 63;

    static rankIndex(index: number) {
        return index >> 3;
    }

    static fileIndex(index: number) {
        return index & 0b111;
    }

    static indexFromCoord(file: number, rank: number) {
        return rank * 8 + file;
    }

    static isLightSquare(index: number): boolean;
    static isLightSquare(file: number, rank: number): boolean;
    static isLightSquare(file: number, rank?: number) {
        if (typeof rank === "undefined") [file, rank] = [this.fileIndex(file), this.rankIndex(file)];

        return (file + rank) % 2 !== 0;
    }

    static squareName(index: number): string;
    static squareName(file: number, rank: number): string;
    static squareName(file: number, rank?: number) {
        if (typeof rank === "undefined") [file, rank] = [this.fileIndex(file), this.rankIndex(file)];

        return this.fileNames[file] + (rank + 1);
    }
}