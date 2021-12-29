import React from "react";

import Footer from "components/common/footer/footer";
import Head from "components/common/head/head";
import ILayoutProps from "components/common/layout/interface/ILayoutProps";
import Navbar from "components/common/navbar/navbar";

const Layout = (props: React.PropsWithChildren<ILayoutProps>): JSX.Element =>
    <>
        <Head />
        <Navbar sticky={props.stickyNavbar}/>
        {props.children}
        <Footer />
    </>;

Layout.defaultProps = {
    stickyNavbar: false
};

export default Layout;