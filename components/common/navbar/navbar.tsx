import { Navbar as BTNavbar, Button, Nav, Stack } from "react-bootstrap";
import React from "react";

import Breakpoints from "common/style/breakpoints";
import flexbox from "utils/flexbox";
import INavbarProps from "components/common/navbar/interfaces/INavbarProps";
import Link from "components/common/link/link";
import Logo from "components/common/logo/logo";
import LogoVariants from "components/common/logo/enums/logoVariants";
import PrimaryButton from "components/common/primaryButton/primaryButton";
import useBreakpoint from "hooks/useBreakpoint";

import styles from "components/common/navbar/navbar.module.scss";

const rowCenter = flexbox({ hAlign: "center", vAlign: "center" });
const colBetween = flexbox({ vertical: true, vAlign: "center", hAlign: "between" });
const colCenter = flexbox({ vertical: true, vAlign: "center", hAlign: "center" });

const Navbar = (props: INavbarProps): JSX.Element => {
    const [backgroundClass, setBackgroundClass] = React.useState<string>("");
    const [toggle, setToggle] = React.useState<boolean>(false);
    const breakpoint = useBreakpoint(Breakpoints.LG);
    const navbarRef = React.useRef<HTMLDivElement>();

    // Adding dark background when page is scrolled
    const handleScroll = React.useCallback(() => {
        setBackgroundClass(window.pageYOffset > 1 || props.sticky ? styles.backgroundDark : "");

    }, [props.sticky]);

    const handleResize = React.useCallback(() => {
        if (navbarRef.current) {
            const root = document.querySelector<HTMLDivElement>(":root");
            root?.style.setProperty("--top", `${navbarRef.current.offsetHeight}px`);
        }
    }, []);

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    React.useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    React.useEffect(() => {
        setBackgroundClass(props.sticky ? styles.backgroundDark : "");
    }, [props.sticky]);

    return <>
        <BTNavbar
            collapseOnSelect
            expand="lg"
            className={`
                ${styles.navbar} 
                ${backgroundClass} 
                ${props.sticky
                    ? "position-sticky"
                    : "position-fixed"} 
                py-4 
                px-md-5
                px-4 
                w-100 
                top-0
            `}
            ref={navbarRef}
            variant="dark"
        >
            <Link href="/" className={`${styles.headerLogo} me-lg-3 me-xl-5`}>
                <Logo variant={LogoVariants.header} />
            </Link>

            <div
                className={`
                    border-0
                    shadow-none
                    d-inline-flex 
                    d-lg-none 
                    ${styles.menuButton} 
                    ${toggle && styles.open} 
                    position-relative 
                    ${rowCenter}
                    `}
                onClick={() => setToggle(!toggle)}
            >
                <div className={`${styles.menuButtonBurger} ${rowCenter}`}></div>
            </div>
            <BTNavbar.Collapse
                className={`
                ps-lg-2
                ps-xl-5 
                ${styles.navbarItems} 
                ${breakpoint && `${styles.collapsible} 
                                 ${colBetween}
                                 position-fixed
                                 h-100 
                                 w-100 
                                 start-0 
                                 ps-lg-5 
                                 ms-lg-5
                                 pb-3
                                `}
                ${breakpoint
                        ? toggle
                            ? styles.expandNavbar
                            : styles.collapseNavbar
                        : "d-lg-block"
                    } 
                `}
                id="responsive-navbar-nav"
            >
                <Nav className={`me-auto align-items-start ${styles.links} ${breakpoint && "w-100"}`}>
                    <Link
                        href="/subscribers"
                        className={`${styles.link} me-lg-3 me-xl-5 py-3 px-4 px-lg-0`}
                    >
                        FOR SUBSCRIBERS
                    </Link>
                    <Link
                        href="/creator"
                        className={`${styles.link} me-lg-3 me-xl-5 py-3 px-4 px-lg-0`}
                    >
                        FOR YOUTUBE CHANNELS
                    </Link>
                </Nav>
                <Nav className="m-2">
                    <Stack
                        gap={2}
                        className={`${styles.buttons} ${breakpoint ? colCenter : rowCenter}`}
                    >
                        <a href="/login">
                            <Button variant="dark" className={`${styles.buttonLogin}`}>Log In</Button>
                        </a>
                        <PrimaryButton linkProps={{ href: "/getStarted" }}>
                            Get Started
                        </PrimaryButton>
                    </Stack>
                </Nav>
            </BTNavbar.Collapse>
        </BTNavbar >
    </>;
};

export default Navbar;