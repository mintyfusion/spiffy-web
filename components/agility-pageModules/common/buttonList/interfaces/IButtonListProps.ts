interface IButtonListProps {
    selected: string;
    lisItems: string[];
    onButtonClick: (key: string) => void;
    valuePrefix?: string;
    valueSuffix?: string;
}

export default IButtonListProps;