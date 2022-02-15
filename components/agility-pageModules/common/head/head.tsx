import NextHead from "next/head";
import React from "react";

import IFavicon from "components/agility-pageModules/common/head/interfaces/IFavicon";
import IHeadProps from "components/agility-pageModules/common/head/interfaces/IHeadProps";
import renderHtml from "utils/renderHtml";

const favicons: IFavicon[] = [
    {
        rel: "shortcut icon",
        type: "image/icon",
        sizes: "16x16",
        href: "/images/favicons/favicon.ico"
    },
    {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/images/favicons/favicon-32x32.png"
    },
    {
        rel: "shortcut icon",
        type: "image/icon",
        sizes: "60x60",
        href: "/images/favicons/favicon-64x64.ico"
    },
    {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/images/favicons/favicon-96x96.png"
    },
    {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "57x57",
        href: "/images/favicons/apple-icon-57x57.png"
    },
    {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "60x60",
        href: "/images/favicons/apple-icon-60x60.png"
    },
    {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "72x72",
        href: "/images/favicons/apple-icon-72x72.png"
    },
    {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "76x76",
        href: "/images/favicons/apple-icon-76x76.png"
    },
    {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "114x114",
        href: "/images/favicons/apple-icon-114x114.png"
    },
    {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "120x120",
        href: "/images/favicons/apple-icon-120x120.png"
    },
    {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "144x144",
        href: "/images/favicons/apple-icon-144x144.png"
    },
    {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "152x152",
        href: "/images/favicons/apple-icon-152x152.png"
    },
    {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "180x180",
        href: "/images/favicons/apple-icon-180x180.png"
    },
    {
        rel: "shortcut icon",
        type: "image/png",
        sizes: "192x192",
        href: "/images/favicons/android-icon-192x192.png"
    },
];

const faviconsList = favicons.map((favicon: IFavicon, index: number) => <link key={index} {...favicon} />);

const Head = (props: IHeadProps): JSX.Element =>
    <NextHead>
        <title>{props.title && props.title.replace(/-/g, " ")}</title>
        {/* Favicons Start */}
        {faviconsList}
        {/* Windows 8 IE 10 */}
        <meta name="msapplication-TileImage" content="/images/favicons/ms-icon-144x144.png" />
        {/* Windows 8.1 + IE11 and above */}
        <meta name="msapplication-config" content="/images/favicons/browserconfig.xml" />
        {/* Favicons End */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
        {props.metaHTML &&
            <span dangerouslySetInnerHTML={renderHtml(props.metaHTML)} />
        }
    </NextHead>;

export default Head;