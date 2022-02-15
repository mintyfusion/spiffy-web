import AvatarType from "components/game/gameSection/enums/GamePageAvatarTypes";

interface IGameDonationCycle {
    seletedAvatar: AvatarType;
    friends: AvatarType[];
    name: string;
}

export default IGameDonationCycle;