import { Col, Container, Row, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

import footerLinks from "components/common/footer/footerLinks";
import footerSocialsData from "components/common/footer/footerSocials";
import IFooterLink from "components/common/footer/interfaces/IFooterLink";
import IFooterLinks from "components/common/footer/interfaces/IFooterLinks";
import IFooterSocials from "components/common/footer/interfaces/IFooterSocials";
import Link from "components/common/link/link";
import Logo from "components/common/logo/logo";
import LogoVariants from "components/common/logo/enums/logoVariants";

import styles from "components/common/footer/footer.module.scss";

const Footer = (): JSX.Element =>
    <Stack className={styles.footerContainer}>
        <Container className={`${styles.footerContentContainer}`}>
            <Col className={styles.column} >
                <Row className={`${styles.footerTop} p-md-1 p-lg-5 `}>
                    <Col className={styles.footerLeftSection}>
                        <Stack gap={4}>
                            <div>
                                <Link href="/">
                                    <Logo variant={LogoVariants.footer} />
                                </Link>
                            </div>
                            <div className={`${styles.footerText}`}>
                                Special incentives for funding
                                YouTubers.
                            </div>
                            <Stack direction="horizontal" gap={3} className={styles.footerSocials}>
                                {footerSocialsData.map((data: IFooterSocials, key) =>
                                    <div key={key}>
                                        <a className={`${styles.footerSocial}`} href={data.href}>
                                            <FontAwesomeIcon icon={data.icon} />
                                        </a>
                                    </div>
                                )}
                            </Stack>
                        </Stack>
                    </Col>
                    {footerLinks.map((data: IFooterLinks) =>
                        <Col key={data.linkHeaderText} className={`${styles.footerLinksContainer}`}>
                            <Stack className={`${styles.footerLinks}`} gap={2}>
                                <div className={`${styles.linkHeaderText} mb-3`}>{data.linkHeaderText}</div>
                                {data.links.map((link: React.PropsWithChildren<IFooterLink>, key) =>
                                    <div key={key}>
                                        <Link href={`${link.href}`} className="link-light">
                                            {link.children}
                                        </Link>
                                    </div>
                                )}
                            </Stack>
                        </Col>
                    )}
                </Row>
                <hr />
                <Row className={`${styles.footerBottom} p-3`}>
                    <Col className="pe-1">
                        <p className="text-white text-end">Powered by</p>
                    </Col>
                    <Col className="ps-0 pb-1">
                        <a href="https://mintyfusion.com/">
                            <Image
                                src="/images/homepage/footer/mintyfusionstudios.svg"
                                width="150"
                                height="25"
                                alt="mintyfusion Studios"
                            />
                        </a>
                    </Col>
                </Row>
            </Col>
        </Container>
    </Stack>;

export default Footer;
