import { Board } from "../../src/index.js";

const board = new Board();

// implement UCI
process.on("message", (message) => {
    process.send!(message);
});