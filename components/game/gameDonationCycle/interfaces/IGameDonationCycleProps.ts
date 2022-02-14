import AvatarType from "components/game/gameSection/enums/avatarTypes";

interface IGameDonationCycle {
    seletedAvatar: AvatarType;
    friends: AvatarType[];
    name: string;
}

export default IGameDonationCycle;