import { AgilityPageProps } from "@agility/nextjs";

import IPage from "components/agility-pageModules/common/layout/interfaces/IPage";

export default interface ICustomAgilityPageProps extends Omit<AgilityPageProps, "sitemapNode" | "page" | "dynamicPageItem"> {
    sitemapNode?: { title: string };
    page?: IPage;
    dynamicPageItem?: {
        seo: {
            metaDescription: string;
            metaHTML: string;
            metaKeywords: string;
        };
    };
}