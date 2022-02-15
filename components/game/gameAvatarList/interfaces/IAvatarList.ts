import AvatarType from "components/game/gameSection/enums/GamePageAvatarTypes";

interface IGameAvatarList {
    seletedAvatar: AvatarType;
    friends: AvatarType[];
    name: string;
}

export default IGameAvatarList;