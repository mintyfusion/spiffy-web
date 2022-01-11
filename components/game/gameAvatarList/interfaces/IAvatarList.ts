import IAvatar from "components/game/gameSection/interfaces/IAvatar";

interface IGameAvatarList {
    selected: IAvatar;
    friends: IAvatar[];
    name: string;
    setStep: (step: string) => void;
    signupAnimation: () => void;
}

export default IGameAvatarList;