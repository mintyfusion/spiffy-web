import { Col, Row, Stack } from "react-bootstrap";
import { ModuleProps } from "@agility/nextjs";
import React from "react";

import PrimaryButton from "components/common/primaryButton/primaryButton";

import styles from "components/agility-pageModules/contactPage/contactForm.module.scss";

const ContactForm = (props: ModuleProps<any>): JSX.Element => {
    const { fields } = props.module;
    // eslint-disable-next-line no-console
    console.log(fields);

    return (
        <Row className={`${styles.container} w-100`}>
            <Col className={`${styles.contextContainer} d-flex flex-column justify-content-center`}>
                <Row className={styles.topContextContainer}>
                    <div>
                        <h2>Lorem ipsum dolor sit amet, consectetur.</h2>
                        <p>
                            <h4>
                                Spiffy is where millions of Content creators come together to accept donations
                                from your audience and connect with your biggest fans
                            </h4>
                        </p>
                        <p>
                            <h4>or find an answer on FAQ’s</h4>
                        </p>
                        <p>
                            <PrimaryButton className={styles.buttonFaq}>{`${"FAQ's"}`}</PrimaryButton>
                        </p>
                    </div>
                </Row>
                <Row>
                    <div>
                        <h3>Media & Press</h3>
                        <p>
                            <h4>
                                For general media and press queries, including partnership opportunities,
                                please email info@spiffy.biz
                            </h4>
                        </p>
                    </div>
                </Row>
            </Col>
            <Col className={`${styles.formContainer} p-0`}>
                <div className={styles.formContent}>
                    <h6>Contact Us</h6>
                    <p>
                        <h5>Lorem ipsum dosul</h5>
                    </p>
                    <div className="d-flex flex-row gap-3">
                        <PrimaryButton className={`w-100 ${styles.userTypeButton}`}>Content Creator</PrimaryButton>
                        <PrimaryButton className={`w-100 ${styles.userTypeButton}`}>Subscriber</PrimaryButton>
                    </div>
                    <Stack>
                        <div className="d-flex flex-column py-2 w-100">
                            <h6>Full Name</h6>
                            <input type="text" className="w-100" />
                        </div>
                        <div className="d-flex flex-column py-2 w-100">
                            <h6>Email</h6>
                            <input type="email" className="w-100" />
                        </div>
                        <div className="d-flex flex-column py-2 w-100">
                            <h6>Mobile Number</h6>
                            <div className="d-flex align-items-center justify-content-center">
                                <div className={styles.countryflagContainer}>+1</div>
                                <input type="text" className={`w-100 ${styles.inputPhoneNumber}`} />
                            </div>
                        </div>
                        <div className="d-flex flex-column py-2 w-100">
                            <h6>Message</h6>
                            <textarea rows={10}></textarea>
                        </div>
                    </Stack>
                    <Stack className="py-3">
                        <PrimaryButton className="w-100">GET IN TOUCH</PrimaryButton>
                    </Stack>
                    <div className="text-center p-2" style={{ maxWidth: "400px", margin: "auto" }}>
                        <label>
                            By clicking the above button you agree to our Terms and
                            have read and understood our Privacy Policy.
                        </label>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default ContactForm;