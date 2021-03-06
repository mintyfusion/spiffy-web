import React from "react";

import GamePageAvatarType from "components/agility-pageModules/game/gameSection/enums/GamePageAvatarTypes";
import IAvatarProps from "components/agility-pageModules/game/avatar/interfaces/IAvatarProps";

import styles from "components/agility-pageModules/game/avatar/avatar.module.scss";

const Avatar = ({ color, size }: IAvatarProps) => {
    const avatarColor = React.useMemo(() => {
        switch (color) {
            case GamePageAvatarType.Green:
                return styles.green;
            case GamePageAvatarType.Purple:
                return styles.purple;
            case GamePageAvatarType.Yellow:
                return styles.yellow;
            case GamePageAvatarType.Red:
                return styles.red;
            case GamePageAvatarType.Orange:
                return styles.orange;
            default:
                return null;
        }
    }, [color]);

    return <svg width={size} height={size} viewBox="0 0 145 171" fill="none" >
        <line x1="53.7184" y1="20.8525" x2="53.7184" y2="36.6808" stroke={styles.brown} strokeWidth="2.37423" />
        <circle cx="54.0502" cy="11.5541" r="11.2787" fill={avatarColor} />
        <line x1="91.1793" y1="20.8516" x2="91.1793" y2="36.6798" stroke={styles.brown} strokeWidth="2.37423" />
        <circle cx="91.6439" cy="11.5541" r="11.2787" fill={avatarColor} />
        <path d="M143.438 95.9418C144.32 97.4697 144.32 99.3522 143.438 100.88L110.28 158.312C109.398 159.839 107.767 160.781 106.003 160.781L39.6868 160.781C37.9225 160.781 36.2923 159.839 35.4101 158.312L2.25206 100.88C1.36992 99.3522 1.36992 97.4697 2.25206 95.9418L35.4101 38.5104C36.2923 36.9825 37.9225 36.0412 39.6868 36.0412L106.003 36.0412C107.767 36.0412 109.398 36.9825 110.28 38.5104L143.438 95.9418Z" fill={avatarColor} />
        <path d="M64.6046 78.0557C64.8082 78.4083 64.8082 78.8427 64.6046 79.1953L56.9528 92.4487C56.7492 92.8013 56.373 93.0185 55.9658 93.0185L40.6621 93.0185C40.255 93.0185 39.8787 92.8013 39.6752 92.4487L32.0233 79.1953C31.8197 78.8427 31.8197 78.4083 32.0233 78.0557L39.6752 64.8023C39.8787 64.4497 40.255 64.2325 40.6621 64.2325L55.9658 64.2325C56.373 64.2325 56.7492 64.4497 56.9528 64.8023L64.6046 78.0557Z" fill={styles.white} />
        <path d="M56.3672 78.183C56.5255 78.4573 56.5255 78.7952 56.3672 79.0694L52.724 85.3796C52.5657 85.6538 52.2731 85.8227 51.9564 85.8227L44.6701 85.8227C44.3534 85.8227 44.0608 85.6538 43.9024 85.3796L40.2593 79.0694C40.1009 78.7952 40.1009 78.4573 40.2593 78.183L43.9024 71.8729C44.0608 71.5987 44.3534 71.4297 44.6701 71.4297L51.9564 71.4297C52.2731 71.4297 52.5657 71.5987 52.724 71.8729L56.3672 78.183Z" fill={styles.black} />
        <path d="M113.671 78.0557C113.875 78.4083 113.875 78.8427 113.671 79.1953L106.019 92.4487C105.816 92.8013 105.439 93.0185 105.032 93.0185L89.7285 93.0185C89.3214 93.0185 88.9451 92.8013 88.7416 92.4487L81.0897 79.1953C80.8861 78.8427 80.8861 78.4083 81.0897 78.0557L88.7416 64.8023C88.9451 64.4497 89.3214 64.2325 89.7285 64.2325L105.032 64.2325C105.439 64.2325 105.816 64.4497 106.019 64.8023L113.671 78.0557Z" fill={styles.white} />
        <path d="M105.434 78.183C105.592 78.4573 105.592 78.7952 105.434 79.0694L101.79 85.3795C101.632 85.6538 101.339 85.8227 101.023 85.8227L93.7365 85.8227C93.4198 85.8227 93.1272 85.6538 92.9689 85.3795L89.3257 79.0694C89.1674 78.7952 89.1674 78.4573 89.3257 78.183L92.9689 71.8729C93.1272 71.5987 93.4198 71.4297 93.7365 71.4297L101.023 71.4297C101.339 71.4297 101.632 71.5987 101.79 71.8729L105.434 78.183Z" fill={styles.black} />
        <path d="M53.8516 118.311C61.644 133.833 83.5602 133.833 91.8397 118.311" stroke={styles.brown} strokeWidth="4.50381" strokeLinecap="round" />
    </svg>;

};

export default React.memo(Avatar);

Avatar.defaultProps = {
    size: 148
};