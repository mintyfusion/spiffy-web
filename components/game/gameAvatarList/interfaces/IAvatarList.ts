import AvatarType from "components/game/gameSection/enums/avatarTypes";
import IAvatar from "components/game/gameSection/interfaces/IAvatar";
interface IGameAvatarList {
    seletedAvatar: AvatarType;
    friends: IAvatar[];
    name: string;
    signupAnimation: () => void;
}

export default IGameAvatarList;