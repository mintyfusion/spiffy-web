import { AgilityPageProps } from "@agility/nextjs";
import { getAgilityPageProps, getAgilityPaths } from "@agility/nextjs/node";
import React from "react";

import { getModule } from "components/agility-pageModules";

import type {
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from "next";

import Layout from "components/common/layout/layout";

// getStaticProps function fetches data for all of your Agility Pages 
// and Next.js will pre-render these pages at build time
export async function getStaticProps({
    preview,
    params,
    locale,
    defaultLocale
}: GetStaticPropsContext<{ slug: string[] }>): Promise<{
    props: AgilityPageProps;
    revalidate: number;
}> {
    // place all global here
    const globalComponents = {
        // header: SiteHeader,
    };

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

export async function getStaticPaths({ locales, defaultLocale }
    : GetStaticPropsContext<{ slug: string[] }>)
    : Promise<{
        paths: string[];
        fallback: boolean;
    }> {
    // Get the paths configured in agility
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