export class MoveGenerator {
    static readonly directionOffsets = [8, -8, -1, 1, 7, -7, 9, -9];
    
    static readonly squaresToEdge: [
        north: number,
        south: number,
        west: number,
        east: number,
        minNW: number,
        minSE: number, 
        minNE: number,
        minSW: number,
    ][] = [...Array(64).keys()].map((i) => {
        const north = 7 - (i >> 3);
        const south = i >> 3;
        const west = i & 0b111;
        const east = 7 - (i & 0b111);

        return [
            north, south, east, west,
            Math.min(north, west),
            Math.min(south, east),
            Math.min(north, east),
            Math.min(south, west),
        ];
    });
}