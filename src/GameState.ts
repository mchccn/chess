// 0 indicates the game is still being played out
// 2nd bit indicates win/lose for a side
// 5th bit indicates a draw
export class GameState {
    static readonly Playing              = 0b00000;
    static readonly WhiteCheckmatedBlack = 0b00010;
    static readonly BlackCheckmatedWhite = 0b00011;
    static readonly Stalemate            = 0b10000;
    static readonly ThreeFoldRepetition  = 0b10100;
    static readonly FiftyMoveRule        = 0b11000;
    static readonly InsufficientMaterial = 0b10100;

    static isWinLose(state: number) {
        return ((state >> 1) & 1) !== 0;
    }

    static isDraw(state: number) {
        return ((state >> 4) & 1) !== 0;
    }

    static getName(state: number) {
        for (const key in this)
            if (state === Number(this[key as never]))
                return key.split(/(?=[A-Z])/).join(" ").toLowerCase();

        throw new TypeError("unknown state");
    }
}