import { AgilityPageProps } from "@agility/nextjs";
import { getAgilityPageProps, getAgilityPaths } from "@agility/nextjs/node";
import React from "react";

import { getModule } from "components/agility-pageModules";

import type {
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from "next";

import Layout from "components/common/layout/layout";

// getStaticProps function fetches data for all Agility Pages 
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

    const agilityProps = await getAgilityPageProps({
        preview,
        params,
        locale,
        getModule,
        defaultLocale
    });

    return {
        // return all props
        props: agilityProps,
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