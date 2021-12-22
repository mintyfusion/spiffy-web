import React from "react";

import GameContentWrapper from "components/Game/gameContentWraper/gameConetentWrapper";
import GameHead from "components/Game/gameHead/gameHead";
import GameSection from "components/Game/gameSection/gameSection";
import Layout from "components/common/layout/layout";

const Game = (): JSX.Element =>
    <Layout>
        <GameContentWrapper>
            <GameHead />
            <GameSection />
        </GameContentWrapper>
    </Layout>;
export default Game;