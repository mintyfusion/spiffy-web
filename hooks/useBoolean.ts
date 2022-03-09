import React from "react";

import IUseBooleanCallbacks from "hooks/interfaces/IUseBooleanCallbacks";
/**
 * Hook to generate callbacks for setting the value to true or false.
 * The identity of the callbacks will always stay the same.
 *
 * @param initialState - Initial value
 * @returns Array with the current value and an object containing the updater callbacks.
 */
export default function useBoolean(initialState: boolean): [boolean, IUseBooleanCallbacks] {
    const [value, setValue] = React.useState(initialState);

    const setTrue = React.useCallback(() => {
        setValue(true);
    }, []);

    const setFalse = React.useCallback(() => {
        setValue(false);
    }, []);

    const toggle = React.useCallback(() => {
        setValue((currentValue: boolean) => !currentValue);
    }, []);

    return [value, { setTrue, setFalse, toggle }];
}