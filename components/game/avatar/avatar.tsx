import Image from "next/image";
import React from "react";

import AvatarType from "../gameSection/enums/avatarTypes";
import IAvatarProps from "components/game/avatar/interfaces/IAvatarProps";

const baseUrl = "/images/Game/avatars/";

const Avatar = ({ color, ...props }: IAvatarProps) => {
    const avatarSrc = React.useMemo(() => {
        switch (color) {
            case AvatarType.Green:
                return "avatar-green.png";
            case AvatarType.Purple:
                return "avatar-purple.png";
            case AvatarType.Yellow:
                return "avatar-yellow.png";
            case AvatarType.Red:
                return "avatar-red.png";
            case AvatarType.Orange:
                return "avatar-orange.png";
            default:
                return null;
        }
    }, [color]);

    return <Image src={`${baseUrl}${avatarSrc}`} {...props} objectFit="contain" />;
};

export default React.memo(Avatar);

const size = 148;
Avatar.defaultProps = {
    width: size,
    height: size,
};