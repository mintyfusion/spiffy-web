/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAgilityPageProps, getAgilityPaths } from "@agility/nextjs/node";
import React from "react";

import { getModule } from "components/agility-pageModules";

import type {
    GetStaticPathsContext,
    GetStaticPropsContext,
    InferGetStaticPropsType,

} from "next";

import Layout from "components/common/layout/layout";

// import SiteHeader from "components/common/SiteHeader";

// getStaticProps function fetches data for all of your Agility Pages 
//and Next.js will pre-render these pages at build time
export async function getStaticProps({
    preview,
    params,
    locale,
    defaultLocale,
    locales,
}: GetStaticPropsContext<{ slug: string[] }>) {
    // place all global here
    const globalComponents = {
        // header: SiteHeader,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const agilityProps = await getAgilityPageProps({
        preview,
        params,
        locale,
        getModule,
        defaultLocale,
        globalComponents,
    });

    return {
        // return all props
        props: agilityProps,

        // Next.js will attempt to re-generate the page when a request comes in, at most once every 10 seconds
        // Read more on Incremental Static Regenertion here: https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
        revalidate: 10,
    };
}

// Next.js will statically pre-render all the paths from Agility CMS
export async function getStaticPaths({ locales, defaultLocale }) {
    //get the paths configured in agility
    const agilityPaths = await getAgilityPaths({
        preview: false,
        locales,
        defaultLocale,
    });

    return {
        paths: agilityPaths,
        fallback: true,
    };
}

const Index = (props: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element =>
    <Layout {...props}></Layout>;

export default Index;