import React from "react";

import Footer from "components/common/footer/footer";
import Head from "components/common/head/head";
import ILayoutProps from "components/common/layout/interfaces/ILayoutProps";
import Navbar from "components/common/navbar/navbar";

const Layout = (props: React.PropsWithChildren<ILayoutProps>): JSX.Element =>
    <div>
        <Head />
        <Navbar {...props.navbarProps} />
        {props.children}
        <Footer />
    </div>;

export default Layout;