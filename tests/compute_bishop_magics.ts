import { writeFileSync } from "fs";
import { Magics } from "../src/index.js";

Magics.initialize();

const magics = Magics.computeBishopMagics({ logging: true, radix: 16 });

writeFileSync("tests/compute_bishop_magics.txt", magics.map((x) => x.toString(16)).join("\n"), "utf8");
