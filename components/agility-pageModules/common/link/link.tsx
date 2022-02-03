import * as React from "react";
import { default as NextLink } from "next/link";

import ILinkProps from "components/agility-pageModules/common/link/interfaces/ILinkProps";

const Link = (props: React.PropsWithChildren<ILinkProps>): JSX.Element => (
    <NextLink href={props.href} passHref={props.passHref}>
        {props.passHref
            ? props.children
            : <a className={props.className}>{props.children}</a>
        }
    </NextLink>
);

Link.defaultProps = {
    href: "/",
} as Partial<React.PropsWithChildren<ILinkProps>>;

export default Link;
