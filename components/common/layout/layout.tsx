/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { getPageTemplate } from "components/agility-pageTemplates";
import Error from "next/error";
import React from "react";

import Footer from "components/common/footer/footer";
import Head from "components/common/head/head";
import ILayoutProps from "components/common/layout/interfaces/ILayoutProps";
import Navbar from "components/common/navbar/navbar";
import PageIds from "common/pageIds";

const Layout = (props: React.PropsWithChildren<ILayoutProps>): JSX.Element => {
    const { notFound, pageTemplateName } = props;

    const showStickyHeader: boolean = React.useMemo(() => {
        if (props.page?.pageID === PageIds.EDUCATION_DETAILS) {
            return true;
        }

        return false;
    }, [props.page?.pageID]);

    // if page not found, throw 404
    if (notFound === true) {
        return <Error statusCode={404} />;
    }

    const AgilityPageTemplate: React.ComponentClass = getPageTemplate(pageTemplateName);

    return (
        <div>
            <Head />
            <Navbar sticky={showStickyHeader} />
            {AgilityPageTemplate
                ? <AgilityPageTemplate {...props} />
                : props.children
            }
            <Footer />
        </div>
    );
};

export default Layout;