import React from "react";

import Footer from "components/common/footer/footer";
import Head from "components/common/head/head";
import Navbar from "components/common/navbar/navbar";

const Layout: React.FC = (props): JSX.Element =>
    <>
        <Head />
        <Navbar />
        {props.children}
        <Footer />
    </>;

export default Layout;