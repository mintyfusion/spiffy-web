/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ModuleProps } from "@agility/nextjs";
import React from "react";

import EducationSections from "components/agility-pageModules/educationModule/enums/educationSections";
import FaqSection from "components/educationPage/faqSection/faqSection";
import GameSection from "components/educationPage/gameSection/gameSection";
import ICommonContentProps from "components/agility-pageModules/common/commonContent/interfaces/ICommonContentProps";
import Pages from "enums/pages";

const CommonContentModule = (props: ModuleProps<ICommonContentProps>): JSX.Element => {
    const { page, module } = props;

    const preparedData = React.useMemo(() => ({
        content: { title: module.fields.title, description: module.fields.description },
        href: module.fields.href,
        test_TextField: module.fields.test_TextField
    }), [module.fields]);

    const renderComponent = React.useMemo(() => {
        switch (page.name) {
            case Pages.education: {
                switch (module.fields.test_TextField) {
                    case EducationSections.faq:
                        return <FaqSection {...preparedData} />;

                    case EducationSections.game:
                        return <GameSection {...preparedData} />;

                    default:
                        return <></>;
                }
            }

            default:
                return <></>;
        }


    }, [page.name, module.fields, preparedData]);

    return <div>{renderComponent}</div>;
};

export default CommonContentModule;