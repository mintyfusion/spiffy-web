import React from "react";

export default function useWindow(): Window | undefined {
    const [localWindow, setLocalWindow] = React.useState<Window>();

    React.useEffect(() =>
        setLocalWindow(window), []);

    return localWindow;
}