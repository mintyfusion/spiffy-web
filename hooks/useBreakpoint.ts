import React from "react";

import BreakpointChecks from "hooks/enums/breakpointChecks";
import Breakpoints from "common/style/breakpoints";

/**
 * Use breakpoint with the needed conditional check.
 * @param breakpoint Breackpoint need to use.
 * @param check Comparision operator. Default check will be `LessOrEqual`.
 * @returns boolean
 */
export default function useBreakpoint(breakpoint: Breakpoints, check = BreakpointChecks.LessOrEqual): boolean {
    const [isBreakpoint, setBreakpoint] = React.useState<boolean>();

    const handleResize = React.useCallback(() => {
        const hasCheckedBreakpoint = check === BreakpointChecks.LessOrEqual
            ? window.innerWidth <= breakpoint
            : window.innerWidth > breakpoint;

        setBreakpoint(hasCheckedBreakpoint);
    }, [breakpoint, check]);

    React.useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    React.useEffect(() => {
        setBreakpoint(check === BreakpointChecks.LessOrEqual
            ? window.innerWidth <= breakpoint
            : window.innerWidth > breakpoint);
    }, [breakpoint, check]);

    return isBreakpoint;
}