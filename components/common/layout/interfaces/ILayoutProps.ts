import { AgilityPageProps } from "@agility/nextjs/types";

import INavbarProps from "components/common/navbar/interfaces/INavbarProps";

export default interface ILayoutProps extends Omit<AgilityPageProps, "page"> {
    navbarProps?: INavbarProps;
    page: {
        pageID: number;
    };
}