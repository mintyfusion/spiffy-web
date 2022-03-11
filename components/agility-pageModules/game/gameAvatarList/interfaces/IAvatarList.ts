import AvatarType from "components/agility-pageModules/game/gameSection/enums/GamePageAvatarTypes";

interface IGameAvatarList {
    seletedAvatar: AvatarType;
    friends: AvatarType[];
    name: string;
}

export default IGameAvatarList;