import IPercentageValue from "components/game/gameAvatarList/interfaces/IPercentageValue";

const percentages: Record<string, IPercentageValue> = {
    "1": {
        totalAvatarsToShow: 4,
        amount: "2,798",
    },
    "5": {
        totalAvatarsToShow: 8,
        amount: "27,980",
    },
    "10": {
        totalAvatarsToShow: 12,
        amount: "69,950",
    },
    "25": {
        totalAvatarsToShow: 16,
        amount: "139,900",
    },
    "50": {
        totalAvatarsToShow: 24,
        amount: "279,800",
    },
    "100": {
        totalAvatarsToShow: 60,
        amount: "13,990",
    },
};
export default percentages;