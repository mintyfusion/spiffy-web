import { AgilityPageProps } from "@agility/nextjs";

export default interface ICustomAgilityPageProps extends Omit<AgilityPageProps, "sitemapNode" | "page"> {
    sitemapNode?: { title: string };
    page?: {
        pageID: number;
        seo: {
            metaDescription: string;
            metaHTML: string;
            metaKeywords: string;
        };
    };
}