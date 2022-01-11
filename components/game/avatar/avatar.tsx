import Image from "next/image";
import React from "react";

import AvatarType from "../gameSection/enums/avatarTypes";
import IAvatarProps from "components/game/avatar/interfaces/IAvatarProps";

const Avatar = (props: IAvatarProps) => {
    const Avatars = React.useMemo(() => {
        switch (props.color) {
            case AvatarType.Green:
                return "/images/Game/avatars/avatarGreen.png";
            case AvatarType.Purple:
                return "/images/Game/avatars/avatarPurple.png";
            case AvatarType.Yellow:
                return "/images/Game/avatars/avatarYellow.png";
            case AvatarType.Red:
                return "/images/Game/avatars/avatarRed.png";
            case AvatarType.Orange:
                return "/images/Game/avatars/avatarOrange.png";
            default:
                return null;
        }
    }, [props.color]);

    return <Image src={Avatars} width={148} height={148} objectFit="contain" />;
};
export default Avatar;