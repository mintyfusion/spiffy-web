import React from "react";
import Image from "next/image";

import flexbox from "utils/flexbox";

import styles from "components/game/gameAvatarList/gameAvatarList.module.scss"

const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const rowHBetween = flexbox({ hAlign: "between" });
const percent: string[] = ["1", "5", "10", "25", "50", "100"];
const mainAvatars = [
    "/images/Game/donationCycle/avatarPurple.png",
    "/images/Game/donationCycle/avatarGreen.png",
    "/images/Game/donationCycle/avatarYellow.png",
    "/images/Game/donationCycle/avatarOrange.png",
]

const GameAvatarList = (props): JSX.Element => {
    const [percentage, setPercentage] = React.useState<string>("");
    const [avatars, setAvatars] = React.useState([]);

    const animationHandler = (percent) => {
        const avatar = [...mainAvatars];
        if (percent === "5") {
            const avatarDuplicate = Array(2).fill(avatar);
            setAvatars(avatarDuplicate.flat());
        } else if (percent === "10") {
            const avatarDuplicate = Array(3).fill(avatar);
            setAvatars(avatarDuplicate.flat());
        }
        else if (percent === "25") {
            const avatarDuplicate = Array(4).fill(avatar);
            setAvatars(avatarDuplicate.flat());
        }
        else if (percent === "50") {
            const avatarDuplicate = Array(6).fill(avatar);
            setAvatars(avatarDuplicate.flat());
        }
        else if (percent === "100") {
            const avatarDuplicate = Array(15).fill(avatar);
            setAvatars(avatarDuplicate.flat());
        }
        else if (percent === "1") {
            setAvatars([]);
        }
    }

    return (
        <div className={styles.gameStepFive}>
            <div className={`${colCenter}`}>
                <h2 className={`${styles.avatarHeading}`}>How much can you make?</h2>
                <h4>Click the percentage fill rate to unlock your potential. Higher the filled rate,
                    the more money you make.</h4>
                <div className={`${styles.donationDesktop}`}>
                    <div className={rowHBetween}>
                        {percent.map((percent, percentKey) => <div key={percentKey} className={`${styles.donations} ${percentage === percent ? styles.donationActive : ""}`}
                            onClick={() => {
                                setPercentage(percent);
                                animationHandler(percent);
                            }}>
                            <h4>{percent}%</h4>
                        </div>)}
                    </div>
                </div>
                <div className={`${styles.donationMobile}`}>
                    <div className={`${rowHBetween}`}>
                        <select onChange={(e) => {
                            setPercentage(e.target.value);
                        }}>
                            {percent.map((donation, donationKey) => <option key={donationKey}>{donation}</option>)}
                        </select>
                    </div>
                </div>

                <div className={`${styles.donationInner} ${colCenter} w-100 position-relative`}>
                    {avatars.map((i, k) => {
                        return (
                            <div className={styles.confetti} key={k}>
                                <Image src={i} width={20} height={20} />
                            </div>
                        )
                    })}
                    <div className={`${styles.avatarInner} ${colCenter}`}>
                        <h2 className={`${styles.avatarHeading} ${styles.yellow}`}>$69,905</h2>
                        <div className={`${props.friends.length ? styles.percentageSelected : ""}`}>
                            {props.selected ? <Image {...props.selected.image} width={119} height={119} /> : null}
                        </div>

                        <div className={styles.percentageFriends}>
                            {props.friends.map((i, k) => <Image {...i.image} key={k} width={87} height={87} />)}
                        </div>
                    </div>
                    <h6>{props.name}</h6>
                </div>
            </div>
        </div>
    )
}
export default GameAvatarList