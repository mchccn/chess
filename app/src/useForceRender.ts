import { useState } from "react";

export function useForceRender() {
    const [, forceRender] = useState(0);

    return () => forceRender((s) => s + 1);
}