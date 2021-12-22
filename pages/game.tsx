import React from "react";

import Layout from "components/common/layout/layout";
import GameHead from 'components/game/gameHead/gameHead'
import GameSection from "components/game/gameSection/gameSection";

const Game = (): JSX.Element =>
    <Layout>
        <div style={{backgroundColor : "#f2f2f2"}}>
            <GameHead />
            <GameSection />
        </div>
    </Layout>;
export default Game;