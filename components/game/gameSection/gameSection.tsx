import React from "react";
import Image from "next/image";

import flexbox from "utils/flexbox";
import gameSectionContent from 'components/game/gameSection/gameSectionContent'
import Coin from "public/images/Game/coin.png";
import User from "public/images/Game/user.png";
import Trophy from "public/images/Game/trophy.png";
import greenAvatar from "public/images/Game/donationCycle/avatarGreen.png";
import orangeAvatar from "public/images/Game/donationCycle/avatarOrange.png";
import yellowAvatar from "public/images/Game/donationCycle/avatarYellow.png";
import purpleAvatar from "public/images/Game/donationCycle/avatarPurple.png";
import spiffy from "public/images/Game/donationCycle/spiffy.png";

import styles from "components/Game/gameSection/gameSection.module.scss";
import IAvatar from "./interfaces/IAvatar";

const columnAlignCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const columnAlignEnd = flexbox({ vertical: true, hAlign: "center", vAlign: "end" });
const avatarWrapperAlign = flexbox({ vAlign: "center", hAlign: 'center' });
const stepthreeFlex = flexbox({ hAlign: 'between' });

const data: string[] = ["5", "10", "15", "25", "50"];
const percent: string[] = ["1", "5", "10", "25", "50", "100"];

const GameSection = (): JSX.Element => {
    const [friends, setFriends] = React.useState([]);
    const [avatars, setAvatars] = React.useState([]);
    const [selected, setSelected] = React.useState<IAvatar>(undefined);
    const [step, setStep] = React.useState<string>("1");
    const [name, setName] = React.useState<string>("");
    const [donationAmount, setDonationAmount] = React.useState<string>("");
    const [percentage, setPercentage] = React.useState<string>("");
    const [animation, setAnimation] = React.useState<boolean>(false);

    React.useEffect(() => {
        const data = [...gameSectionContent.content]
        setAvatars(data);
        return () => {
            setAvatars([]);
        }
    }, [])
    React.useEffect(() => {
        if (avatars.length === 1) {
            setStep("4");
        }
    }, [avatars])

    const friendsHandler = (i) => {
        const friendsAvatar = gameSectionContent.friends;
        const selectedFilter = friendsAvatar.filter((filter) => filter.id === i.id);
        const filterFriends = avatars.filter((filter) => filter.id !== i.id);
        setFriends([...friends, selectedFilter[0]]);
        setAvatars(filterFriends);
    }

    const selectedHandler = (i) => {
        const avatars = [...gameSectionContent.friends];
        const selectedFilter = avatars.filter((filter) => filter.id === i.id);
        setSelected(selectedFilter[0])
    }

    return <div className={`${styles.container}`}>
        <div className={`${columnAlignCenter} ${step === "1" ? styles.show : styles.hide}`}>
            <h2 className={`${styles.avatarHeading}`}>Select your avatar.</h2>
            <div className={`${styles.avatarWrapper} ${avatarWrapperAlign}`}>
                {avatars.map((i, k) => {
                    return <Image src={i.image.src} alt={i.image.alt} width={i.image.width} height={i.image.height} key={k} onClick={() => {
                        selectedHandler(i);
                        setStep("2");
                    }} />
                })}
            </div>
        </div>

        <div className={`${columnAlignCenter} ${step === "2" ? styles.show : styles.hide}`}>
            <h2 className={`${styles.avatarHeading}`}>Name your avatar.</h2>
            <div className={`${columnAlignCenter} ${styles.gameStepTwo}`}>
                {selected ? <Image src={selected.image.src} alt={selected.image.alt} width={selected.image.width} height={selected.image.height} /> : null}
                <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <button disabled={name === ""} onClick={() => {
                    setStep("3");
                }}>Continue</button>
            </div>
        </div>

        <div className={`${step === "3" ? styles.show : styles.hide} ${styles.gameStepThree} ${stepthreeFlex}`}>
            <div className={`${styles.gameStepThreeUserColumn} ${columnAlignCenter}`}>
                <div className={styles.avatarInner}>
                    <div className={`${friends.length ? styles.selected : styles.user}`}>
                        {selected ? <Image {...selected.image} /> : null}
                    </div>

                    <div className={styles.friends}>
                        {friends.map((i, k) => {
                            return <Image {...i.image} key={k} />
                        })}
                    </div>
                </div>
                <h3>{name}</h3>
            </div>

            <div className={`${styles.gameStepThreeFriendsColumn} ${columnAlignEnd}`}>
                {/* <h2 className={styles.avatarHeading}>Add four friends.</h2>
                <h4>Hint: Choose a red bee!</h4> */}
                <div className={`${styles.avatarWrapper} ${avatarWrapperAlign}`}>
                    {avatars.filter((filter) => filter.id !== selected?.id).map((i, k) => {
                        return <Image src={i.image.src} alt={i.image.alt} width={i.image.width} height={i.image.height} key={k} onClick={() => friendsHandler(i)} />
                    })}
                </div>
            </div>
        </div>

        <div className={`${columnAlignCenter} ${step === "4" ? styles.show : styles.hide} ${styles.stepFour}`}>
            <h2 className={`${styles.avatarHeading}`}>How much do you want to donate?</h2>
            <h4>Add donation in increments of $5 and discover where the donation is going.</h4>
            <div className={`${styles.donationDesktop}`}>
                <div className={`${stepthreeFlex} ${styles.donationDesktop}`}>
                    {data.map((donation, donationKey) => {
                        return <div key={donationKey} className={`${styles.donations} ${donationAmount === donation ? styles.donationActive : ""}`} onClick={() => {
                            setDonationAmount(donation);
                            setStep("5")
                        }
                        }>
                            <h4>{donation}</h4>
                        </div>
                    })}
                </div>
            </div>
            <div className={`${styles.donationMobile}`}>
                <div className={`${stepthreeFlex}`}>
                    <select onChange={(e) => {
                        setDonationAmount(e.target.value);
                        setStep("5")
                    }}>
                        {data.map((donation, donationKey) => {
                            return <option key={donationKey}>{donation}</option>
                        })}
                    </select>
                </div>
            </div>

            <div className={`${styles.donationInner} ${columnAlignCenter} ${animation ? styles.contentAnimation : ""}`}>
                <h2>Donation Cycle</h2>
                <div className={`${animation ? styles.coin : styles.coinDefault}`}>
                    <Image src={Coin} alt="Coin" onClick={() => setAnimation(!animation)} />
                </div>
                <div className={styles.userDonation}>
                    <Image src={User} alt="User" />
                </div>

                <p>${Number(donationAmount) / 2}</p>
                <h3>Content Creators</h3>
            </div>
            {animation ? <div className={`${animation ? styles.animationGrid : ""}`}>
                <div className={styles.donationCycleItems}>
                    <Image src={purpleAvatar} />
                    <span>0.50</span>
                </div>
                <div className={styles.donationCycleItems}>
                    <Image src={orangeAvatar} />
                    <span>0.20</span>
                </div>
                <div className={styles.donationCycleItems}>
                    <Image src={greenAvatar} />
                    <span>0.20</span>
                </div>
                <div className={styles.donationCycleItems}>
                    <Image src={yellowAvatar} />
                    <span>0.20</span>
                </div>
                <div className={styles.donationCycleItems}>
                    <Image src={purpleAvatar} />
                    <span>0.20</span>
                </div>
                <div className={styles.donationCycleItems}>
                    <Image src={orangeAvatar} />
                    <span>0.20</span>
                </div>
                <div className={styles.donationCycleItems}>
                    <Image src={greenAvatar} />
                    <span>0.20</span>
                </div>
                <div className={styles.donationCycleItems}>
                    <Image src={yellowAvatar} />
                    <span>0.20</span>
                </div>
                <div className={styles.donationCycleItems}>
                    <Image src={purpleAvatar} />
                    <span>0.20</span>
                </div>
                <div className={styles.donationCycleItems}>
                    <Image src={orangeAvatar} />
                    <span>0.20</span>
                </div>
                <div>
                    <div>
                        <h2>Spiffy Corp.</h2>
                        <p>We’re totally reliant on this cents to keep us going.</p>
                    </div>
                    <div className={styles.donationCycleItems}>
                        <Image src={spiffy} />
                        <span>0.50</span>
                    </div>
                </div>
            </div> : null}
        </div>

        <div className={`${columnAlignCenter} ${step === "5" ? styles.show : styles.hide}`}>
            <h2 className={`${styles.avatarHeading}`}>How much can you make?</h2>
            <h4>Click the percentage fill rate to unlock your potential. Higher the filled rate, the more money you make.</h4>
            <div className={`${styles.donationDesktop}`}>
                <div className={stepthreeFlex}>
                    {percent.map((percent, percentKey) => {
                        return <div key={percentKey} className={`${styles.donations} ${percentage === percent ? styles.donationActive : ""}`} onClick={() => {
                            setPercentage(percent);
                            setStep("6");
                        }}>
                            <h4>{percent}%</h4>
                        </div>
                    })}
                </div>
            </div>
            <div className={`${styles.donationMobile}`}>
                <div className={`${stepthreeFlex}`}>
                    <select onChange={(e) => {
                        setPercentage(e.target.value);
                        setStep("6");
                    }}>
                        {data.map((donation, donationKey) => {
                            return <option key={donationKey}>{donation}</option>
                        })}
                    </select>
                </div>
            </div>

            <div className={`${styles.donationInner} ${columnAlignCenter}`}>
                <h2 className={`${styles.avatarHeading} ${styles.yellow}`}>$69,905</h2>
                <div className={styles.avatarInner}>
                    <div className={`${friends.length ? styles.percentageSelected : ""}`}>
                        {selected ? <Image {...selected.image} /> : null}
                    </div>

                    <div className={styles.percentageFriends}>
                        {friends.map((i, k) => {
                            return <Image {...i.image} key={k} />
                        })}
                    </div>
                </div>
                <h6>{name}</h6>
            </div>
        </div>

        <div className={`${columnAlignCenter} ${step === "6" ? styles.show : styles.hide} ${styles.signUpsection}`}>
            <Image src={Trophy} alt="trophy" />
            <h2 className={`${styles.avatarHeading}`}>Congratulations!</h2>
            <button>SIGN UP</button>

        </div>
    </div>
}
export default GameSection;