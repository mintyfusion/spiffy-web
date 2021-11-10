import { PropsWithChildren } from "react";

import IFooterLink from "components/common/footer/interfaces/IFooterLink";

export default interface IFooterLinks {
    linkHeaderText: string;
    links: PropsWithChildren<IFooterLink>[];
}