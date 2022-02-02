import AvatarType from "components/game/gameSection/enums/avatarTypes";
import IAvatar from "components/game/gameSection/interfaces/IAvatar";

function getAvatars() {
    return Object.entries(AvatarType).map<IAvatar>(([key, value]) => ({
        id: key,
        done : false,
        image: {
            src: `/images/Game/avatars/avatar-${key}.png`,
            alt: `avatar-${value}`,
            width: "148",
            height: "148",
            objectFit : "contain"
        },
    }));
}

const data = getAvatars();

export default data;