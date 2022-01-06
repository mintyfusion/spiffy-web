import { getPageTemplate } from "components/agility-pageTemplates";
import Error from "next/error";
import React from "react";

import Footer from "components/common/footer/footer";
import Head from "components/common/head/head";
import ILayoutProps from "components/common/layout/interfaces/ILayoutProps";
import Navbar from "components/common/navbar/navbar";

const Layout = (props: React.PropsWithChildren<ILayoutProps>): JSX.Element => {
    const { notFound, pageTemplateName } = props;

    // if page not found, throw 404
    if (notFound === true) {
        return <Error statusCode={404} />;
    }

    const AgilityPageTemplate: React.ComponentClass = getPageTemplate(pageTemplateName);

    return (
        <div>
            <Head />
            <Navbar {...props.navbarProps} />
            {AgilityPageTemplate
                ? <AgilityPageTemplate {...props} />
                : props.children
            }
            <Footer />
        </div>
    );
};

export default Layout;