import React from "react";

import getUniqueId from "utils/getUniqueId";
import KeyCSS from "hooks/types/keyCss";

type KeyCSSOrCSS = KeyCSS | React.CSSProperties;
type UpdateFunction<T> = (styles?: T) => void;

export default function useStyles<T extends KeyCSSOrCSS>(): [T, string, UpdateFunction<T>] {
    const ref = React.useRef<T>();
    const [uniqueId, setUniqueId] = React.useState("0");
    const update = React.useCallback((styles?: T) => {
        ref.current = { ...ref.current, ...styles };
        setUniqueId(getUniqueId());
    }, []);

    return [ref.current, uniqueId, update];
}
