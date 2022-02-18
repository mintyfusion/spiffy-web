import { Col, Container, Row, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

import footerLinks from "components/agility-pageModules/common/footer/footerLinks";
import footerSocialsData from "components/agility-pageModules/common/footer/footerSocials";
import IFooterLink from "components/agility-pageModules/common/footer/interfaces/IFooterLink";
import IFooterLinks from "components/agility-pageModules/common/footer/interfaces/IFooterLinks";
import IFooterSocials from "components/agility-pageModules/common/footer/interfaces/IFooterSocials";
import Link from "components/agility-pageModules/common/link/link";
import Logo from "components/agility-pageModules/common/logo/logo";
import LogoVariants from "components/agility-pageModules/common/logo/enums/logoVariants";

import styles from "components/agility-pageModules/common/footer/footer.module.scss";

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
                                        <a
                                            className={`${styles.footerSocial}`}
                                            href={data.href}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
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
                <hr className="d-none d-md-block" />
                <Row className={`${styles.footerBottom} p-3`}>
                    <div>
                        <Stack className="pe-1 justify-content-start justify-content-md-center gap-1" direction="horizontal">
                            <p className="text-white m-0">Powered by</p>
                            <a href="https://mintyfusion.com/" className="d-flex" target="_blank" rel="noreferrer">
                                <Image
                                    src="/images/homepage/footer/mintyfusionstudios.svg"
                                    width="150"
                                    height="25"
                                    alt="mintyfusion Studios"
                                    layout="intrinsic"
                                    priority={true}
                                />
                            </a>
                        </Stack>
                    </div>
                </Row>
            </Col>
        </Container>
    </Stack>;

export default Footer;
