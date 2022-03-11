import React from "react";

import GameContentWrapper from "components/agility-pageModules/game/gameContentWraper/gameConetentWrapper";
import GameHead from "components/agility-pageModules/game/gameHead/gameHead";
import GameMain from "components/agility-pageModules/game/gameMain/gameMain";
import Layout from "components/agility-pageModules/common/layout/layout";

const Game = (): JSX.Element =>
    <Layout navbarProps={{ sticky: true }}>
        <GameContentWrapper>
            <GameHead />
            <GameMain />
        </GameContentWrapper>
    </Layout>;
    
export default Game;