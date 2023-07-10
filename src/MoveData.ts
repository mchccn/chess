export class MoveData {
    static readonly directionOffsets = [8, -8, -1, 1, 7, -7, 9, -9];

    static readonly pawnAttackDirections: [number[], number[]] = [[4, 6], [7, 5]];

    static readonly knightOffsets = [15, 17, -17, -15, 10, -6, 6, -10];
    static readonly knightOffsetsForSquare: number[][] = [...Array(64).keys()].map((i) => {
        const ifile = i & 0b111;
        const irank = 7 - (i >> 3);

        return this.knightOffsets.filter((offset) => {
            const j = i + offset;

            if (j < 0 || j > 63) return false;

            const jfile = j & 0b111;
            const jrank = 7 - (j >> 3);

            const distance = Math.max(Math.abs(ifile - jfile), Math.abs(irank - jrank));

            // knight can't move more than 2 squares vertically or horizontally
            return distance === 2;
        });
    });

    // king moves one square in every direction
    static readonly kingOffsets = this.directionOffsets;
    static readonly kingOffsetsForSquare: number[][] = [...Array(64).keys()].map((i) => {
        const ifile = i & 0b111;
        const irank = 7 - (i >> 3);

        return this.kingOffsets.filter((offset) => {
            const j = i + offset;

            if (j < 0 || j > 63) return false;

            const jfile = j & 0b111;
            const jrank = 7 - (j >> 3);

            const distance = Math.max(Math.abs(ifile - jfile), Math.abs(irank - jrank));

            return distance === 1;
        });
    });
    
    static readonly squaresToEdge: [
        north : number,
        south : number,
        west  : number,
        east  : number,
        minNW : number,
        minSE : number, 
        minNE : number,
        minSW : number,
    ][] = [...Array(64).keys()].map((i) => {
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