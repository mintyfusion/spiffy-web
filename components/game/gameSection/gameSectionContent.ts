import AvatarType from "components/game/gameSection/enums/avatarTypes";
import IAvatar from "components/game/gameSection/interfaces/IAvatar";

function getAvatars(haveFriends = true) {
    return Object.entries(AvatarType).map<IAvatar>(([key, value]) => ({
        id: key,
        image: {
            src: `/images/Game/avatars/avatar${key}.png`,
            alt: `avatar-${value}`,
            width: "188",
            height: "234",
        },
        friends: haveFriends && getAvatars(false),
    }));
}

const data = getAvatars();

export default data;