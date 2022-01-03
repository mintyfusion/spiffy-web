import React from "react";

import Styles from "components/game/gameContentWraper/gameContentWrapper.module.scss";

const GameContentWrapper = (props: React.PropsWithChildren<Record<string, unknown>>) => (
    <div className={Styles.gameWrapper}>
        {props.children}
    </div>
);

export default GameContentWrapper;