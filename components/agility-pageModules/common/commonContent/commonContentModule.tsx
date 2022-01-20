import React from "react";

import EducationSections from "components/agility-pageModules/educationModule/enums/educationSections";
import FaqSection from "components/educationPage/faqSection/faqSection";
import GameSection from "components/educationPage/gameSection/gameSection";
import GetStartedSection from "components/agility-pageModules/creatorPage/getStartedSection/getStartedSection";
import ICommonContentProps from "components/agility-pageModules/common/commonContent/interfaces/ICommonContentProps";
import Pages from "enums/pages";

const CommonContentModule = (props: ICommonContentProps): JSX.Element => {
    const { page, module } = props;

    const preparedData = React.useMemo(() => ({
        content: { title: module.fields.title, description: module.fields.description },
        href: module.fields.href,
    }), [module.fields]);

    const renderComponent = React.useMemo(() => {
        switch (page.name) {
            case Pages.education: {
                switch (module.fields.section.fields.name) {
                    case EducationSections.faq:
                        return <FaqSection {...preparedData} />;

                    case EducationSections.game:
                        return <GameSection {...preparedData} />;

                    default:
                        return <GetStartedSection {...preparedData} />;
                }
            }
            case Pages.creator:
                return <GetStartedSection {...preparedData} />;

            default:
                return <></>;
        }

    }, [page.name, module.fields, preparedData]);

    return <div>{renderComponent}</div>;
};

export default CommonContentModule;