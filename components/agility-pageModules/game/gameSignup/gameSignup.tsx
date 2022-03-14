import Image from "next/image";
import React from "react";

import flexbox from "utils/flexbox";
import PrimaryButton from "components/agility-pageModules/common/primaryButton/primaryButton";

import styles from "components/agility-pageModules/gameSignup/gameSignup.module.scss";
import ConstantUtils from "utils/constantUtils";

const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });
const linkProps = {
    href: ConstantUtils.dashboardPath
};

const GameSignup = (): JSX.Element => <div className={`${styles.gameStepSix} w-100`}>
    <div className={`${colCenter} ${styles.signUpsection}`}>
        <Image src="/images/game/trophy.png" alt="trophy" width={291} height={318} />
        <h2 className={`${styles.avatarHeading}`}>Congratulations!</h2>
        <PrimaryButton className="w-100" linkProps={linkProps}>
            Sign Up
        </PrimaryButton>
    </div>
</div>;

export default GameSignup;