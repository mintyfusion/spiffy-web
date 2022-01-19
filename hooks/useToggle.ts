import React from "react";

/**
 * Hook to store a value and generate callbacks for setting the value to true or false.
 * The identity of the callbacks will always stay the same.
 *
 * @param initialState - Initial value
 * @returns Array with the current value and an object containing the updater callbacks.
 */
export default function useToggle(initialState: boolean): [boolean, { toggle: () => void }] {
    const [value, setValue] = React.useState(initialState);

    const toggle = React.useCallback(() => {
        setValue((currentValue: boolean) => !currentValue);
    }, []);

    return [value, { toggle }];
}