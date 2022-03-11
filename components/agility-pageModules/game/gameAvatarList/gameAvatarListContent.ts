import IGameAvatarDonation from "components/agility-pageModules/game/gameAvatarList/interfaces/gameAvatarDonations";

const percentages: Record<string, IGameAvatarDonation> = {
    "1": {
        totalAvatarsToShow: 4,
        amount: "2,798",
    },
    "5": {
        totalAvatarsToShow: 8,
        amount: "13,990",
    },
    "10": {
        totalAvatarsToShow: 12,
        amount: "27,980",
    },
    "25": {
        totalAvatarsToShow: 16,
        amount: "69,950",
    },
    "50": {
        totalAvatarsToShow: 24,
        amount: "139,900",
    },
    "100": {
        totalAvatarsToShow: 60,
        amount: "279,800",
    },
};

export default percentages;