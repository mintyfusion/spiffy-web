import Image from "next/image";
import React from "react";

import AvatarType from "../gameSection/enums/avatarTypes";
import IAvatarProps from "components/game/avatar/interfaces/IAvatarProps";

const baseUrl = "/images/Game/avatars/";

const Avatar = ({ color, ...props }: IAvatarProps) => {
    const avatarSrc = React.useMemo(() => {
        switch (color) {
            case AvatarType.Green:
                return "avatarGreen.png";
            case AvatarType.Purple:
                return "avatarPurple.png";
            case AvatarType.Yellow:
                return "avatarYellow.png";
            case AvatarType.Red:
                return "avatarRed.png";
            case AvatarType.Orange:
                return "avatarOrange.png";
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