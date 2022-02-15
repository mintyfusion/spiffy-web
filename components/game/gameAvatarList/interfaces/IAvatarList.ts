import AvatarType from "components/game/gameSection/enums/avatarTypes";

interface IGameAvatarList {
    seletedAvatar: AvatarType;
    friends: AvatarType[];
    name: string;
}

export default IGameAvatarList;