import React from "react";

import flexbox from "utils/flexbox";
import GameSection from "components/game/gameSection/gameSection";
import PrimaryButton from "components/common/primaryButton/primaryButton";
import useBoolean from "hooks/useBoolean";

import styles from "components/game/gameMain/gameMain.module.scss";

const colCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });

const GameMain = (): JSX.Element => {
    const [isModalOpen, { setTrue: openModal, setFalse: closeModal }] = useBoolean(false);

    return (
        <div className={`${colCenter} ${styles.game}`}>
            <PrimaryButton onClick={openModal}>Play Game</PrimaryButton>
            {isModalOpen && <GameSection closeModal={closeModal} />}
        </div>
    );
};

export default GameMain;