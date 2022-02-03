import { AgilityPageProps } from "@agility/nextjs/types";

import INavbarProps from "components/agility-pageModules/common/navbar/interfaces/INavbarProps";

export default interface ILayoutProps extends AgilityPageProps {
    navbarProps?: INavbarProps;
}