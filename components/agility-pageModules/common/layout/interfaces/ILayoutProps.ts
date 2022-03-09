import ICustomAgilityPageProps from "components/agility-pageModules/common/layout/interfaces/ICustomAgilityPageProps";
import INavbarProps from "components/agility-pageModules/common/navbar/interfaces/INavbarProps";

export default interface ILayoutProps extends ICustomAgilityPageProps {
    navbarProps?: INavbarProps;
}