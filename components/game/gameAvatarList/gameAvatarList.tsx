import Image from "next/image";
import React from "react";

import flexbox from "utils/flexbox";
import IGameAvatarList from "components/game/gameAvatarList/interfaces/IAvatarList";

import IAvatar from "../gameSection/interfaces/IAvatar";
import styles from "components/game/gameAvatarList/gameAvatarList.module.scss";

const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const rowHBetween = flexbox({ hAlign: "between" });
const percent: string[] = ["1", "5", "10", "25", "50", "100"];
const mainAvatars = [
    "/images/Game/donationCycle/avatarPurple.png",
    "/images/Game/donationCycle/avatarGreen.png",
    "/images/Game/donationCycle/avatarYellow.png",
    "/images/Game/donationCycle/avatarOrange.png",
];
const animationSplice = 2;
const donationTimeout = 3000;

const GameAvatarList = (props: IGameAvatarList): JSX.Element => {
    const [percentage, setPercentage] = React.useState<string>("");
    const [avatars, setAvatars] = React.useState([]);

    const half = Math.ceil(avatars.length / animationSplice);

    const animationHandler = (percent) => {
        const avatar = [...mainAvatars];
        const fivePercent = 2;
        const tenPercent = 3;
        const twentyfivePercent = 4;
        const fiftyPercent = 6;
        const hundredPercent = 15;
        if (percent === "5") {
            const avatarDuplicate = Array(fivePercent).fill(avatar);
            setAvatars(avatarDuplicate.flat());
        } else if (percent === "10") {
            const avatarDuplicate = Array(tenPercent).fill(avatar);
            setAvatars(avatarDuplicate.flat());
        }
        else if (percent === "25") {
            const avatarDuplicate = Array(twentyfivePercent).fill(avatar);
            setAvatars(avatarDuplicate.flat());
        }
        else if (percent === "50") {
            const avatarDuplicate = Array(fiftyPercent).fill(avatar);
            setAvatars(avatarDuplicate.flat());
        }
        else if (percent === "100") {
            const avatarDuplicate = Array(hundredPercent).fill(avatar);
            setAvatars(avatarDuplicate.flat());
        }
        else if (percent === "1") {
            setAvatars([]);
        }
    };

    React.useEffect(() => {
        if (percentage) {
            setTimeout(() => {
                props.setStep("6");
            }, donationTimeout);
        }
    }, [percentage]);

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
                <div className={`${styles.donationMobile} w-100`}>
                    <div className={`${rowHBetween}`}>
                        <select onChange={(e) => {
                            setPercentage(e.target.value);
                            animationHandler(e.target.value);
                        }}>
                            {percent.map((donation, donationKey) => <option key={donationKey}>{donation}</option>)}
                        </select>
                    </div>
                </div>

                <div className={`${styles.donationInner} ${colCenter} w-100 position-relative`}>
                    {avatars.slice(0, half).map((i, k) => (
                        <div className={styles.confetti} key={k}>
                            <Image src={i} width={20} height={20} />
                        </div>
                    ))}
                    {avatars.slice(-half).map((i, k) => (
                        <div className={styles.confettiRight} key={k}>
                            <Image src={i} width={20} height={20} />
                        </div>
                    ))}
                    <div className={`${styles.avatarInner} ${colCenter}`}>
                        <h2 className={`${styles.avatarHeading} ${styles.yellow}`}>$69,905</h2>
                        <div className={`${props.friends.length ? styles.percentageSelected : ""}`}>
                            {props.selected ? <Image {...props.selected.image} width={119} height={119} /> : null}
                        </div>

                        <div className={styles.percentageFriends}>
                            {props.friends.filter((avatar: IAvatar) => avatar.id !== props.selected?.id)
                                .map((i, k) => <Image {...i.image} key={k} width={87} height={87} />)}
                        </div>
                    </div>
                    <h6>{props.name}</h6>
                </div>
            </div>
        </div>
    );
};
export default GameAvatarList;