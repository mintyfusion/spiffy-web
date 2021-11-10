import React from "react";

import Footer from "components/common/footer/footer";
import Head from "components/common/head/head";
import Navbar from "components/common/navbar/navbar";

const Layout = (): JSX.Element =>
    <>
        <Head />
        <Navbar />
        <Footer />
    </>;

export default Layout;