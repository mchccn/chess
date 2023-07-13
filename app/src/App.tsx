import { MutableRefObject, useContext, useRef } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { BoardContext } from "./BoardContext";
import MainMenu from "./components/MainMenu";
import SpectateMatch from "./components/SpectateMatch";
import VsAdversary from "./components/VsAdversary";
import VsYourself from "./components/VsYourself";

export interface TransitioningElementProps {
    transitioningElementRef: MutableRefObject<HTMLDivElement | null>;
}

function App() {
    const board = useContext(BoardContext);
    const location = useLocation();
    const transitioningElementRef = useRef<HTMLDivElement>(null);

    board.loadStartingPosition();

    return (
        <SwitchTransition>
            <CSSTransition
                nodeRef={transitioningElementRef}
                key={location.pathname}
                classNames={"fade-out"}
                timeout={300}
            >
                <Routes location={location}>
                    <Route
                        path="/"
                        element={
                            <MainMenu
                                transitioningElementRef={
                                    transitioningElementRef
                                }
                            />
                        }
                    />
                    <Route
                        path="/vs/yourself"
                        element={
                            <VsYourself
                                transitioningElementRef={
                                    transitioningElementRef
                                }
                            />
                        }
                    />
                    <Route
                        path="/vs/:adversary"
                        element={
                            <VsAdversary
                                transitioningElementRef={
                                    transitioningElementRef
                                }
                            />
                        }
                    />
                    <Route
                        path="/spectate/:playerOne/vs/:playerTwo"
                        element={
                            <SpectateMatch
                                transitioningElementRef={
                                    transitioningElementRef
                                }
                            />
                        }
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/" replace={true} />}
                    />
                </Routes>
            </CSSTransition>
        </SwitchTransition>
    );
}

export default App;
