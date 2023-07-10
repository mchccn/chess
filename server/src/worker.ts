import { Board, FEN, Move } from "../../src/index.js";

const board = new Board();

const options: Record<string, {
    type: "check";
    default: boolean;
    value: boolean;
} | {
    type: "spin";
    default: number;
    min: number;
    max: number;
    value: number;
} | {
    type: "combo";
    default: string;
    var: string[];
    value: string;
} | {
    type: "button";
    action: () => void;
} | {
    type: "string";
    default: string;
    value: string;
}> = {};

// implement UCI
process.on("message", (message) => {
    const { data } = message as { data: number[] };

    const [command, ...args] = (typeof message === "string" ? message : Buffer.from(data).toString("utf8")).trimEnd().split(" ");

    switch (command) {
        case "uci": {
            process.send!("id name @kelsny/chess\n");
            process.send!("id author kelsny\n");

            for (const [name, config] of Object.entries(options)) {
                process.send!(`option name ${name} type ${config.type}${
                    "default" in config ? `default ${config.default}` : ""
                }${
                    "min" in config ? `min ${config.min}` : ""
                }${
                    "max" in config ? `max ${config.max}` : ""
                }${
                    "var" in config ? config.var.map((x) => ` var ${x}`).join("") : ""
                }\n`);
            }

            return process.send!("uciok\n");
        };
        case "debug": {
            // toggle debug mode
            return;
        };
        case "isready": {
            return process.send!("readyok\n");
        };
        case "setoption": {
            const valueIndex = args.findIndex((arg) => arg === "value");

            const name = args.slice(0, valueIndex < 0 ? undefined : valueIndex).join(" ");
            const value = args.slice(valueIndex < 0 ? Infinity : valueIndex).join(" ");

            const option = options[name.normalize().toLowerCase()];

            if (option.type === "button") {
                option.action.call(undefined);
            } else if (option.type === "check") {
                option.value = 
                    /^true|on|yes|1|enabled?$/.test(value) ? true :
                    /^false|off|no|0|disabled?$/.test(value) ? false :
                    value === "maybe" ? Math.random() < 0.5 :
                    option.value; // ignore change if it's unrecognized
            } else if (option.type === "combo") {
                // ignore change if it's not in the valid options
                option.value = option.var.includes(value) ? value : option.value;
            } else if (option.type === "spin") {
                option.value = Number.isNaN(Number(value)) ? option.value : Math.max(option.min, Math.min(option.max, Number(value)));
            } else {
                option.value = value;
            }

            return;
        };
        case "ucinewgame": {
            // doesn't mean anything to us
            return;
        };
        case "position": {
            if (args[0] === "startpos") (board.loadStartingPosition(), args.shift());
            else board.loadPosition(args.splice(1, 7).join(" "));
            
            args.shift(); // remove "moves"

            for (const lan of args) {
                const move = Move.parseMove(lan, board);

                board.makeMove(move);
            }

            return;
        };
        case "go": {
            // ...
            return;
        };
        case "stop": {
            // ...
            return;
        };
        case "ponderhit": {
            // don't worry about ponders
            return;
        };
        case "quit": {
            return process.exit(0);
        };

        // custom commands that aren't part of UCI (mainly for debugging)
        
        case "fen": {
            return process.send!("info fen " + FEN.toFENString(board) + "\n");
        };
        
        // ignore unknown command
        default:
            return;
    }
});