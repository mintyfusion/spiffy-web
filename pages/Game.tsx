import React from "react";

import Layout from "components/common/layout/layout";
import GameHead from 'components/Game/gameHead/gameHead'
import GameSection from "components/Game/gameSection/gameSection";

const Game = (): JSX.Element =>
    <Layout>
        <GameHead />
        <GameSection />
    </Layout>;
export default Game;