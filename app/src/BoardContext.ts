import { createContext } from "react";
import { Board } from "../../dist/Board";

export const BoardContext = createContext(new Board().loadStartingPosition());
