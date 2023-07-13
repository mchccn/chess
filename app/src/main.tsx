import React from "react";
import ReactDOM from "react-dom/client";
import { Board } from "../../dist/index";
import App from "./App.tsx";
import { BoardContext } from "./BoardContext.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BoardContext.Provider value={new Board().loadStartingPosition()}>
            <App />
        </BoardContext.Provider>
    </React.StrictMode>,
);
