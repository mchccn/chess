import { BoardRepresentation } from "../../dist/index.js";

export const logElement = document.querySelector<HTMLElement>(".log")!;

export function setup() {
    const filesElement = document.querySelector(".files")!;
    const ranksElement = document.querySelector(".ranks")!;

    for (const f of BoardRepresentation.fileNames) {
        const fileDiv = document.createElement("div");
        fileDiv.textContent = f;

        filesElement.append(fileDiv);
    }

    for (const r of BoardRepresentation.rankNames) {
        const rankDiv = document.createElement("div");
        rankDiv.textContent = r;

        ranksElement.append(rankDiv);
    }

    // make uci log display keybindings

    document.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
            e.preventDefault();

            logElement.style.display = "block";
        }
    });

    document.addEventListener("keyup", (e) => {
        if (e.key === "Tab") {
            logElement.style.display = "none";
        }
    });

    return { logElement };
}