import IAvatar from "components/game/gameSection/interfaces/IAvatar";

interface IGameAvatarList {
    selected: IAvatar;
    friends: IAvatar[];
    name: string;
    setStep: (step: string) => void;
    setLastAnimation: (animation: boolean) => void;
}

export default IGameAvatarList;