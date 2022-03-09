/**
 * Updater callbacks returned by `useBoolean`.
 */
export default interface IUseBooleanCallbacks {
    /**
     * Set the value to true. Always has the same identity.
     */
    setTrue(): void;
    /**
     * Set the value to false. Always has the same identity.
     */
    setFalse(): void;
    /**
     * Toggle the value. Always has the same identity.
     */
    toggle(): void;
}