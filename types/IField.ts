export default interface IField {
    type: string;
    label: string;
    placeHolder: string;
    value: string;
    error: string;
    validated: boolean;
    fullWidth: boolean;
    options?: string[];
}