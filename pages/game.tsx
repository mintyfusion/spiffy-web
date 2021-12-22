import React from "react";

import Layout from "components/common/layout/layout";
import GameHead from 'components/Game/gameHead/gameHead'
import GameSection from "components/Game/gameSection/gameSection";

const Game = (): JSX.Element =>
    <Layout>
        <div style={{backgroundColor : "#f2f2f2"}}>
            <GameHead />
            <GameSection />
        </div>
    </Layout>;
export default Game;