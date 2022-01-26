import React from "react";

import FaqSection from "components/educationPage/faqSection/faqSection";
import GameSection from "components/educationPage/gameSection/gameSection";
import ICommonContentProps from "components/agility-pageModules/common/commonContent/interfaces/ICommonContentProps";

const CommonContentModule = (props: ICommonContentProps): JSX.Element => {
    const { module } = props;

    const preparedData = React.useMemo(() => ({
        content: { title: module.fields.title, description: module.fields.description },
        href: module.fields.href,
    }), [module.fields]);

    const renderComponent = React.useMemo(() => {
        switch (props.module.fields.invertedColors) {
            case "false":
                return <FaqSection {...preparedData} />;

            case "true":
                return <GameSection {...preparedData} />;

            default:
                return <FaqSection {...preparedData} />;
        }

    }, [preparedData, props.module.fields.invertedColors]);

    return <div>{renderComponent}</div>;
};

export default CommonContentModule;