/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { getPageTemplate } from "components/agility-pageTemplates";
import Error from "next/error";
import React from "react";

import Footer from "components/agility-pageModules/common/footer/footer";
import Head from "components/agility-pageModules/common/head/head";
import ILayoutProps from "components/agility-pageModules/common/layout/interfaces/ILayoutProps";
import Navbar from "components/agility-pageModules/common/navbar/navbar";
import PageIds from "common/pageIds";

const Layout = (props: React.PropsWithChildren<ILayoutProps>): JSX.Element => {
    const { notFound, pageTemplateName } = props;

    const showStickyHeader: boolean = React.useMemo(() => {
        if (props.page?.pageID === PageIds.EDUCATION_DETAILS || props.page?.pageID === PageIds.ABOUT) {
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
            <Head
                title={props.sitemapNode?.title}
                description={props.page?.seo.metaDescription}
                keywords={props.page?.seo.metaKeywords}
                metaHTML={props.page?.seo.metaHTML}
            />
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