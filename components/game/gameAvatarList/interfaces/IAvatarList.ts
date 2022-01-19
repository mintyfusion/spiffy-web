import AvatarType from "components/game/gameSection/enums/avatarTypes";
import IAvatar from "components/game/gameSection/interfaces/IAvatar";
import StepTypes from "components/game/gameSection/enums/stepTypes";

interface IGameAvatarList {
    seletedAvatar: AvatarType;
    friends: IAvatar[];
    name: string;
    setStep: (step: StepTypes) => void;
    signupAnimation: () => void;
}

export default IGameAvatarList;