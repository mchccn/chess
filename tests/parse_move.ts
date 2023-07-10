import { Board, BoardRepresentation, Move } from "../src/index.js";

const coord = BoardRepresentation.indexFromCoord;

const tests = [
    [true , "8/8/8/4N3/8/8/8/8 w - - 0 1" , "e5f3" , new Move(coord(4, 4), coord(5, 2), Move.Flag.None            )],
    [true , "8/8/8/1p6/8/8/8/8 b - - 0 1" , "b5b4" , new Move(coord(1, 4), coord(1, 3), Move.Flag.None            )],
    [true , "8/7P/8/8/8/8/8/8 w - - 0 1"  , "h7h8q", new Move(coord(7, 6), coord(7, 7), Move.Flag.PromoteToQueen  )],
    [true , "8/7P/8/8/8/8/8/8 w - - 0 1"  , "h7h8b", new Move(coord(7, 6), coord(7, 7), Move.Flag.PromoteToBishop )],
    [true , "8/8/8/8/8/8/7p/8 b - - 0 1"  , "h2h1n", new Move(coord(7, 1), coord(7, 0), Move.Flag.PromoteToKnight )],
    [true , "8/8/8/8/8/8/7p/8 b - - 0 1"  , "h2h1r", new Move(coord(7, 1), coord(7, 0), Move.Flag.PromoteToRook   )],
    [true , "8/8/8/8/8/8/P7/8 w - - 0 1"  , "a2a4" , new Move(coord(0, 1), coord(0, 3), Move.Flag.DoublePawnPush  )],
    [true , "8/p7/8/8/8/8/8/8 b - - 0 1"  , "a7a5" , new Move(coord(0, 6), coord(0, 4), Move.Flag.DoublePawnPush  )],
    [true , "8/8/8/pP7/8/8/8/8 w - a6 0 1", "b5a6" , new Move(coord(1, 4), coord(0, 5), Move.Flag.EnPassantCapture)],
    [true , "8/8/8/8/Pp7/8/8/8 b - a6 0 1", "b4a3" , new Move(coord(1, 3), coord(0, 2), Move.Flag.EnPassantCapture)],
    [false, "8/7P/8/8/8/8/8/8 w - - 0 1"  , "h7h8b", new Move(coord(7, 6), coord(7, 7), Move.Flag.PromoteToQueen  )],
    [false, "8/8/8/8/8/8/P7/8 w - - 0 1"  , "a2a3" , new Move(coord(0, 1), coord(0, 2), Move.Flag.DoublePawnPush  )],
] as const;

let failed = 0;
let passed = 0;

tests.forEach(([equals, pos, lan, expected]) => {
    const actual = Move.parseMove(lan, new Board().loadPosition(pos));

    if (Move.equals(expected, actual) !== equals) {
        console.log(`❌ TEST FAILED [${expected.name} ${equals ? "≠" : "="} ${actual.name}]`);

        if (equals) {
            console.log(`❌ expected: ${expected.bits}`);
            console.log(`❌ actual: ${actual.bits}`);
        } else {
            console.log(`❌ actual value should be different (${actual.bits} = ${expected.bits})`);
        }

        failed++;
    } else {
        console.log(`✅ TEST PASSED [${expected.name} ${equals ? "=" : "≠"} ${actual.name}]`);

        passed++;
    }

    console.log();
});

console.log(`📋 TEST RESULTS`);
console.log(`✅ ${passed} test${passed === 1 ? "" : "s"} passed`);
console.log(`❌ ${failed} test${failed === 1 ? "" : "s"} failed`);
