import IAvatar from "components/game/gameSection/interfaces/IAvatar";

interface IGameAvatarList {
    selected: IAvatar;
    friends: IAvatar[];
    name: string;
}

export default IGameAvatarList;