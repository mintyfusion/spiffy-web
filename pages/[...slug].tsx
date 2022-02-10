import { AgilityPageProps } from "@agility/nextjs";
import { getAgilityPageProps, getAgilityPaths } from "@agility/nextjs/node";
import React from "react";
import type {
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from "next";

import { getModule } from "components/agility-pageModules";
import ISearchContextProps from "types/ISearchContextProps";
import Layout from "components/agility-pageModules/common/layout/layout";

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

// Context API value for passing search string across children components where required
export const SearchContext = React.createContext({} as ISearchContextProps);

const Index = (props: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
    const [searchValue, setSearchedValue] = React.useState<string>("");

    // Reset search value on page change
    React.useEffect(() => {
        setSearchedValue("");
    }, [props.page]);

    const searchItems = React.useMemo(() => ({
        searchValue,
        setSearch: setSearchedValue as (value?: string) => void
    }), [searchValue]);

    return (
        <SearchContext.Provider value={searchItems}>
            <Layout {...props}></Layout>
        </SearchContext.Provider>
    );
};

export default Index;