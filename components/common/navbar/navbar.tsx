import { Navbar as BTNavbar, Button, Nav, Stack } from "react-bootstrap";
import React from "react";

import flexbox from "utils/flexbox";
import Link from "components/common/link/link";
import Logo from "components/common/logo/logo";
import LogoVariants from "components/common/logo/enums/logoVariants";
import PrimaryButton from "components/common/primaryButton/primaryButton";

import styles from "components/common/navbar/navbar.module.scss";

const alignCenter = flexbox({ hAlign: "center", vAlign: "center" });

const Navbar = (): JSX.Element =>
    <BTNavbar collapseOnSelect expand="lg" className={`${styles.navbar} py-4 px-md-5 px-4 `} variant="dark">
        <Link href="/">
            <Logo variant={LogoVariants.header} />
        </Link>
        <BTNavbar.Toggle aria-controls="responsive-navbar-nav" />
        <BTNavbar.Collapse id="responsive-navbar-nav" className={`${styles.links} ps-lg-5 ms-lg-5`}>
            <Nav className="me-auto">
                <Link href="/subscribers" className={`${styles.link} ${alignCenter} text-center me-lg-5`}>
                    FOR SUBSCRIBERS
                </Link>
                <Link href="/youtube" className={`${styles.link} ${alignCenter} text-center me-lg-5 mb-xs-3`}>
                    FOR YOUTUBE CHANNELS
                </Link>
            </Nav>
            <Nav className="m-2">
                <Stack direction="horizontal" gap={2} className={`${styles.buttons} ${alignCenter}`}>
                    <a href="/login">
                        <Button variant="dark" className={`${styles.buttonLogin}`}>Log In</Button>
                    </a>
                    <Link href="/getStarted">
                        <PrimaryButton>Get Started</PrimaryButton>
                    </Link>
                </Stack>
            </Nav>
        </BTNavbar.Collapse>
    </BTNavbar>;

export default Navbar;