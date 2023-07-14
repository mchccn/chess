import { createContext } from "react";
import { Board } from "../../src/index";

export const BoardContext = createContext(new Board().loadStartingPosition());
