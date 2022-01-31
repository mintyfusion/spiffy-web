import React from "react";

import GameContentWrapper from "components/game/gameContentWraper/gameConetentWrapper";
import GameHead from "components/game/gameHead/gameHead";
import GameMain from "components/game/gameMain/gameMain";
import Layout from "components/common/layout/layout";

const Game = (): JSX.Element =>
    <Layout navbarProps={{ sticky: true }}>
        <GameContentWrapper>
            <GameHead />
            <GameMain />
        </GameContentWrapper>
    </Layout>;
export default Game;