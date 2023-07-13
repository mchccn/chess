import { BoardRepresentation } from "../../dist/index.js";

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
}