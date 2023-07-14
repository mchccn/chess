import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { TransitioningElementProps } from "../App";
import "./Documentation.css";

export interface DocumentationProps extends TransitioningElementProps {
    
}

export default function Documentation(props: DocumentationProps) {
    const [content, setContent] = useState("Loading...");

    useEffect(() => {
        fetch("docs.md")
            .then((res) => res.text())
            .then((docs) => setContent(docs));
    }, []);

    return (
        <div className="docs fade-out-other-side" ref={props.transitioningElementRef}>
            <div>
                <ReactMarkdown>{content as string}</ReactMarkdown>
            </div>
            <footer>
                © 2023 kelsny
            </footer>
        </div>
    );
}
