import { createContext } from "react";
import { Board } from "../../dist/index";

export const BoardContext = createContext(new Board().loadStartingPosition());
