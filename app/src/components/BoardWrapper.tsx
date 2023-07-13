import { TransitioningElementProps } from "../App";
import BoardComponent, { BoardProps } from "./Board";
import "./BoardWrapper.css";

export interface BoardWrapperProps extends TransitioningElementProps {
    boardProps: BoardProps;
}

export default function BoardWrapper(props: BoardWrapperProps) {
    return (
        <div ref={props.transitioningElementRef} className="fade-out-other-side">
            <BoardComponent {...props.boardProps} />
        </div>
    );
}
