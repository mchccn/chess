import { ReactNode } from "react";
import { TransitioningElementProps } from "../App";
import BoardComponent, { BoardProps } from "./Board";
import "./BoardWrapper.css";

export interface BoardWrapperProps extends TransitioningElementProps {
    boardProps: BoardProps;
    left?: ReactNode;
    right?: ReactNode;
}

export default function BoardWrapper(props: BoardWrapperProps) {
    return (
        <div ref={props.transitioningElementRef} className="board-wrapper fade-out-other-side">
            {props.left && <div className="left">{props.left}</div>}
            <BoardComponent {...props.boardProps} />
            {props.right && <div className="right">{props.right}</div>}
        </div>
    );
}
