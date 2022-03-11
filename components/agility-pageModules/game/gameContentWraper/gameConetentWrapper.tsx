import React from "react";

import styles from "components/agility-pageModules/gameContentWraper/gameContentWrapper.module.scss";

const GameContentWrapper = (props: React.PropsWithChildren<Record<string, unknown>>): JSX.Element =>
    <div className={styles.gameWrapper}>
        {props.children}
    </div>;

export default GameContentWrapper;