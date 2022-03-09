import { PropsWithChildren } from "react";

import IFooterLink from "components/agility-pageModules/common/footer/interfaces/IFooterLink";

export default interface IFooterLinks {
    linkHeaderText: string;
    links: PropsWithChildren<IFooterLink>[];
}