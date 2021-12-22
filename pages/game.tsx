import React from "react";

import GameContentWrapper from "components/game/gameContentWraper/gameConetentWrapper";
import GameHead from "components/game/gameHead/gameHead";
import GameSection from "components/game/gameSection/gameSection";
import Layout from "components/common/layout/layout";

const Game = (): JSX.Element =>
    <Layout>
        <GameContentWrapper>
            <GameHead />
            <GameSection />
        </GameContentWrapper>
    </Layout>;
export default Game;