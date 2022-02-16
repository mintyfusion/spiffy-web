interface IGameDonationButtonProps {
    selected: string;
    lisItems: string[];
    onClickHandler: (key: string) => void;
    amount: boolean;
}

export default IGameDonationButtonProps;