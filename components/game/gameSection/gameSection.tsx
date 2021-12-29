import Image from "next/image";
import React from "react";

import data from "components/game/gameSection/gameSectionContent";
import flexbox from "utils/flexbox";
import GameAvatarList from "components/game/gameAvatarList/gameAvatarList";
import IAvatar from "components/game/gameSection/interfaces/IAvatar";

import styles from "components/game/gameSection/gameSection.module.scss";

const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const rowCenter = flexbox({ vAlign: "center", hAlign: "center", });
const rowHBetween = flexbox({ hAlign: "between" });

const donation: string[] = ["5", "10", "15", "25", "50"];
const donationDivide = 2;
const friendsLength = 4;
const friendsTimeout = 2000;

const GameSection = (): JSX.Element => {
    const [friends, setFriends] = React.useState<IAvatar[]>([]);
    const [selected, setSelected] = React.useState<IAvatar>();
    const [step, setStep] = React.useState<string>("1");
    const [avatarName, setAvatarName] = React.useState<string>("");
    const [donationAmount, setDonationAmount] = React.useState<string>("");
    const [animation, setAnimation] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (friends.length === friendsLength) {
            setTimeout(() => {
                setStep("4");
            }, friendsTimeout);

        }
    }, [friends]);

    const friendsHandler = (i: IAvatar) => {
        const friendsAvatar = [...selected.friends];
        const selectedFilter = friendsAvatar.filter((friend) => friend.id === i.id);
        setFriends([...friends, selectedFilter[0]]);
    };

    const selectedHandler = (i: IAvatar) => {
        const selectedFilter = data.filter((filter: IAvatar) => filter.id === i.id);
        const filterSelected = selectedFilter.map((i: IAvatar) => ({ ...i, friends: i.friends.filter((filter: IAvatar) => filter.id !== i.id) }));
        setSelected(filterSelected[0]);
    };

    return (
        <div className={"position-relative"}>
            <div className={`${step === "1" || step === "2" || step === "3" ? selected?.id === "Purple"
                ? styles.avatarPurple : selected?.id === "Green"
                    ? styles.avatarGreen : selected?.id === "Red"
                        ? styles.avatarRed : selected?.id === "Yellow"
                            ? styles.avatarYellow : selected?.id === "Orange"
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
                        {data.map((i: IAvatar, k) =>
                            <div className={`${selected === undefined ? "visible" : styles.friendsAnimation}`} key={k}>
                                <Image {...i.image}
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
                        <input placeholder="Name" className="w-100 text-center" onChange={(e) => setAvatarName(e.target.value)} />
                        <button disabled={avatarName === ""} onClick={() => {
                            setStep("3");
                        }}>Continue</button>
                    </div>
                </div>
            </div>

            <div className={`${styles.paddingSides} ${step === "3" || step === "4" ? styles.container : "d-none"} ${step === "3" ? styles.containerFadIn : step === "4" ? styles.containerFadOut : "d-none"}`}>
                <div className={`${styles.gameStepThree} ${rowHBetween}`}>
                    <div className={`${styles.gameStepThreeUserColumn} ${colCenter}`}>
                        <h2 className={styles.avatarHeading}>Add four friends.</h2>
                        <div className={styles.avatarInner}>
                            <div className={step === "4" ? "visible" : "invisible"}>
                                {selected ? <Image {...selected.image} width={230} height={286} /> : null}
                            </div>

                            <div className={styles.friends}>
                                {friends.map((i, k) => <Image {...i.image} key={k} />)}
                            </div>
                        </div>
                        <h3>{avatarName}</h3>
                    </div>

                    <div className={`${styles.gameStepThreeFriendsColumn} ${colCenter}`}>
                        {/* <h2 className={styles.avatarHeading}>Add four friends.</h2>
                        <h4>Hint: Choose a red bee!</h4> */}
                        <div className={`${styles.avatarWrapper} ${rowCenter} flex-wrap`}>
                            {data.filter((avatar: IAvatar) => avatar.id !== selected?.id).map((i, k) =>
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
                            {donation.map((donation, donationKey) => <div key={donationKey} className={`${styles.donations} ${donationAmount === donation ? styles.donationActive : ""}`}
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
                                setAnimation(!animation);
                            }}>
                                {donation.map((donation, donationKey) => <option key={donationKey}>{donation}</option>)}
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
                        <p>${Number(donationAmount) / donationDivide}</p>
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

            <div className={`${donationAmount ? styles.container : "d-none"}`}>
                <GameAvatarList friends={friends} selected={selected} name={avatarName} />
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