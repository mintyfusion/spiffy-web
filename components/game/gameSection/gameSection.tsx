import Image from "next/image";
import React from "react";

import flexbox from "utils/flexbox";
import gameSectionContent from "components/game/gameSection/gameSectionContent";
import IAvatar from "components/game/gameSection/interfaces/IAvatar";
import GameAvatarList from "components/game/gameAvatarList/gameAvatarList";

import styles from "components/game/gameSection/gameSection.module.scss";

const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const rowCenter = flexbox({ vAlign: "center", hAlign: "center", });
const rowHBetween = flexbox({ hAlign: "between" });

const data: string[] = ["5", "10", "15", "25", "50"];

const donation = 2;

const GameSection = (): JSX.Element => {
    const [friends, setFriends] = React.useState<IAvatar[]>([]);
    const [avatars, setAvatars] = React.useState<IAvatar[]>([]);
    const [selected, setSelected] = React.useState<IAvatar>(undefined);
    const [step, setStep] = React.useState<string>("1");
    const [name, setName] = React.useState<string>("");
    const [donationAmount, setDonationAmount] = React.useState<string>("");
    const [animation, setAnimation] = React.useState<boolean>(false);

    React.useEffect(() => {
        const data = [...gameSectionContent.content];
        setAvatars(data);

        return () => {
            setAvatars([]);
        };
    }, []);
    React.useEffect(() => {
        if (friends.length === 4) {
            setTimeout(() => {
                setStep("4");
            }, 2000)

        }
    }, [friends]);

    const friendsHandler = (i: IAvatar) => {
        const friendsAvatar = gameSectionContent.friends;
        const selectedFilter = friendsAvatar.filter((friend) => friend.id === i.id);
        setFriends([...friends, selectedFilter[0]]);
    };

    const selectedHandler = (i: IAvatar) => {
        const avatars = [...gameSectionContent.friends];
        const selectedFilter = avatars.filter((filter) => filter.id === i.id);
        setSelected(selectedFilter[0]);
    };

    return (
        <div className={"position-relative"}>
            <div className={`${step === "1" || step === "2" || step === "3" ? selected?.id === "avatarPurple"
                ? styles.avatarPurple : selected?.id === "avatarGreen"
                    ? styles.avatarGreen : selected?.id === "avatarRed"
                        ? styles.avatarRed : selected?.id === "avatarYellow"
                            ? styles.avatarYellow : selected?.id === "avatarOrange"
                                ? styles.avatarOrange : "" : "d-none"} 
            ${step === "2" ? styles.avatarstepTwo : step === "3" ? styles.avatarstepThree : ""}`}>
                {selected ?
                    <Image {...selected.image} />
                    : null
                }
            </div>

            <div className={`${step === "1" || step === "2" ? styles.container : "d-none"} ${step === "2" ? styles.containerFadOut : ""}`}>
                <div className={`${colCenter} ${styles.gameStepOne}`}>
                    <h2 className={`${styles.avatarHeading}`}>Select your avatar.</h2>
                    <div className={`${styles.avatarWrapper} ${rowCenter} flex-wrap`}>
                        {avatars.map((i, k) =>
                            <div className={`${selected === undefined ? "visible" : "invisible"}`} key={k}>
                                <Image src={i.image.src} alt={i.image.alt} width={i.image.width} height={i.image.height}
                                    onClick={() => {
                                        selectedHandler(i);
                                        setStep("2");
                                    }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={`${step === "2" || step === "3" ? styles.container : "d-none"} ${step === "2" ? styles.containerFadIn : step === "3" ? styles.containerFadOut : "d-none"}`}>
                <div className={`${colCenter} ${styles.gameStepTwoWrapper}`}>
                    <h2 className={`${styles.avatarHeading}`}>Name your avatar.</h2>
                    <div className={`${colCenter} ${styles.gameStepTwo}`}>
                        {selected ?
                            <Image {...selected.image} />
                            : null}
                        <input placeholder="Name" className="w-100 text-center" onChange={(e) => setName(e.target.value)} />
                        <button disabled={name === ""} onClick={() => {
                            setStep("3");
                        }}>Continue</button>
                    </div>
                </div>
            </div>

            <div className={`${step === "3" || step === "4" ? styles.container : "d-none"} ${step === "3" ? styles.containerFadIn : step === "4" ? styles.containerFadOut : "d-none"}`}>
                <div className={`${styles.gameStepThree} ${rowHBetween}`}>
                    <div className={`${styles.gameStepThreeUserColumn} ${colCenter}`}>
                        <div className={styles.avatarInner}>
                            <div className={step === "4" ? "visible" : "invisible"}>
                                {selected ? <Image {...selected.image} /> : null}
                            </div>

                            <div className={styles.friends}>
                                {friends.map((i, k) => <Image {...i.image} key={k} />)}
                            </div>
                        </div>
                        <h3>{name}</h3>
                    </div>

                    <div className={`${styles.gameStepThreeFriendsColumn} ${colCenter}`}>
                        <h2 className={styles.avatarHeading}>Add four friends.</h2>
                        <h4>Hint: Choose a red bee!</h4>
                        <div className={`${styles.avatarWrapper} ${rowCenter} flex-wrap`}>
                            {avatars.filter((avatar: IAvatar) => avatar.id !== selected?.id).map((i, k) =>
                                <div className={friends.find((f) => f.id === i.id) ? styles.friendsAnimation : ""} key={k}>
                                    <Image
                                        src={i.image.src} alt={i.image.alt} width={i.image.width}
                                        height={i.image.height}
                                        onClick={() => friendsHandler(i)} />
                                </div>)}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${step === "4" || step === "5" ? styles.container : "d-none"} 
            ${step === "4" ? styles.containerFadIn : step === "5" ? styles.containerFadOut : "d-none"}`}>
                <div className={`${colCenter} ${styles.stepFour}`}>
                    <h2 className={`${styles.avatarHeading}`}>How much do you want to donate?</h2>
                    <h4>Add donation in increments of $5 and discover where the donation is going.</h4>
                    <div className={`${styles.donationDesktop}`}>
                        <div className={`${rowHBetween}`}>
                            {data.map((donation, donationKey) => <div key={donationKey} className={`${styles.donations} ${donationAmount === donation ? styles.donationActive : ""}`}
                                onClick={() => {
                                    setDonationAmount(donation);
                                    setAnimation(!animation);
                                }}>
                                <h4>{donation}</h4>
                            </div>)}
                        </div>
                    </div>
                    <div className={"d-sm-none"}>
                        <div className={`${rowHBetween}`}>
                            <select onChange={(e) => {
                                setDonationAmount(e.target.value);
                                setStep("5");
                                setAnimation(true);
                            }}>
                                {data.map((donation, donationKey) => <option key={donationKey}>{donation}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className={`${styles.donationInner} ${colCenter} ${animation ? styles.contentAnimation : ""}`}>
                        <h2>Donation Cycle</h2>
                        <div className={`${animation ? styles.coin : styles.coinDefault}`}>
                            <Image src={"/images/Game/coin.png"} alt="Coin" width={76} height={76} />
                        </div>
                        <div className={styles.userDonation}>
                            <Image src={"/images/Game/user.png"} alt="User" width={149} height={129} />
                        </div>
                        <p>${Number(donationAmount) / donation}</p>
                        <h3>Content Creators</h3>
                    </div>
                    {animation ? <div className={`${animation ? styles.animationGrid : ""} position-relative w-100`}>
                        <div className={styles.donationCycleItems}>
                            <Image src={"/images/Game/donationCycle/avatarPurple.png"} width={56} height={63} />
                            <span>0.50</span>
                        </div>
                        <div className={styles.donationCycleItems}>
                            <Image src={"/images/Game/donationCycle/avatarOrange.png"} width={56} height={63} />
                            <span>0.20</span>
                        </div>
                        <div className={styles.donationCycleItems}>
                            <Image src={"/images/Game/donationCycle/avatarGreen.png"} width={56} height={63} />
                            <span>0.20</span>
                        </div>
                        <div className={styles.donationCycleItems}>
                            <Image src={"/images/Game/donationCycle/avatarYellow.png"} width={56} height={63} />
                            <span>0.20</span>
                        </div>
                        <div className={styles.donationCycleItems}>
                            <Image src={"/images/Game/donationCycle/avatarPurple.png"} width={56} height={63} />
                            <span>0.20</span>
                        </div>
                        <div className={styles.donationCycleItems}>
                            <Image src={"/images/Game/donationCycle/avatarOrange.png"} width={56} height={63} />
                            <span>0.20</span>
                        </div>
                        <div className={styles.donationCycleItems}>
                            <Image src={"/images/Game/donationCycle/avatarGreen.png"} width={56} height={63} />
                            <span>0.20</span>
                        </div>
                        <div className={styles.donationCycleItems}>
                            <Image src={"/images/Game/donationCycle/avatarYellow.png"} width={56} height={63} />
                            <span>0.20</span>
                        </div>
                        <div className={styles.donationCycleItems}>
                            <Image src={"/images/Game/donationCycle/avatarPurple.png"} width={56} height={63} />
                            <span>0.20</span>
                        </div>
                        <div className={styles.donationCycleItems}>
                            <Image src={"/images/Game/donationCycle/avatarOrange.png"} width={56} height={63} />
                            <span>0.20</span>
                        </div>
                        <div>
                            <div>
                                <h2>Spiffy Corp.</h2>
                                <p>We’re totally reliant on this cents to keep us going.</p>
                            </div>
                            <div className={styles.donationCycleItems}>
                                <Image src={"/images/Game/donationCycle/spiffy.png"} width={156} height={45} />
                                <span>0.50</span>
                            </div>
                        </div>
                    </div> : null}
                </div>
            </div>

            <div className={`${step === "4" ? styles.container : "d-none"}`}>
                <GameAvatarList friends={friends} selected={selected} name={name} />
            </div>

            <div className={`${step === "6" ? styles.container : "d-none"} ${step === "6" ? styles.containerFadIn : "d-none"}`}>
                <div className={styles.gameStepSix}>
                    <div className={`${colCenter} ${step === "6" ? styles.show : "d-none"} ${styles.signUpsection}`}>
                        <Image src={"/images/Game/trophy.png"} alt="trophy" width={291} height={318} />
                        <h2 className={`${styles.avatarHeading}`}>Congratulations!</h2>
                        <button>SIGN UP</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default GameSection;