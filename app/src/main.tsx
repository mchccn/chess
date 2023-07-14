import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Board } from "../../src/index";
import App from "./App.tsx";
import { BoardContext } from "./BoardContext.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <HashRouter>
        <BoardContext.Provider value={new Board().loadStartingPosition()}>
            <App />
        </BoardContext.Provider>
    </HashRouter>,
);
