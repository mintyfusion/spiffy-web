import Image from "next/image";
import React from "react";

import flexbox from "utils/flexbox";
import PrimaryButton from "components/common/primaryButton/primaryButton";

import styles from "components/game/gameSignup/gameSignup.module.scss";

const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });

const GameSignup = (): JSX.Element => <div className={`${styles.gameStepSix} w-100`}>
    <div className={`${colCenter} ${styles.signUpsection}`}>
        <Image src="/images/game/trophy.png" alt="trophy" width={291} height={318} />
        <h2 className={`${styles.avatarHeading}`}>Congratulations!</h2>
        <PrimaryButton className="w-100" linkProps={{ href: "https://creator.dashboard.spiffy.biz/" }}>
            Sign Up
        </PrimaryButton>
    </div>
</div>;

export default GameSignup;