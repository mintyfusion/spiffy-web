import AvatarType from "components/game/gameSection/enums/avatarTypes";
import IAvatar from "components/game/gameSection/interfaces/IAvatar";

function getAvatars() {
    return Object.entries(AvatarType).map<IAvatar>(([, value]) => ({
        id: value,
    }));
}

const gameSectionAvatars = getAvatars();

export default gameSectionAvatars;