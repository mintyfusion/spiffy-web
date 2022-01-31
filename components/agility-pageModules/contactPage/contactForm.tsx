import { Col, Row, Stack } from "react-bootstrap";
import { ModuleProps } from "@agility/nextjs";
import React from "react";

import BaseField from "components/agility-pageModules/common/baseField/baseField";
import ContactFormFieldNames from "components/agility-pageModules/contactPage/enums/contactFormFieldNames";
import contactFormFields from "components/agility-pageModules/contactPage/contentFormFieldData";
import flexbox from "utils/flexbox";
import IContactFormProps from "components/agility-pageModules/contactPage/interfaces/IContactFormProps";
import IField from "types/IField";
import postData from "utils/postData";
import PrimaryButton from "components/common/primaryButton/primaryButton";
import UserTypes from "components/agility-pageModules/contactPage/enums/userTypes";

import styles from "components/agility-pageModules/contactPage/contactForm.module.scss";

const PHONE_NUMBER_LENGTH = 11;
const NUMBER_PATTERN = /^[0-9]*$/;
const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const centerAlign = flexbox({ hAlign: "center", vAlign: "center" });

const ContactForm = (props: ModuleProps<IContactFormProps>): JSX.Element => {
    const { fields } = props.module;
    const [submitted, setSubmitted] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [userType, setUserType] = React.useState<UserTypes>(UserTypes.Creator);
    const [formFields, setFields] = React.useState<Record<string, IField>>(contactFormFields);

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        e.persist();

        const newFormFields: Record<string, IField> = { ...formFields };
        if (name === "phoneNumber" &&
            !(NUMBER_PATTERN.test(value) && value.length <= PHONE_NUMBER_LENGTH)) {
            return;
        }

        newFormFields[name].value = value;
        setFields(newFormFields);
    }, [formFields]);

    const renderInput = React.useCallback(
        (fieldName: string, field: IField, isTextArea = false): React.ReactNode => {
            const fieldProps = {
                name: fieldName,
                className: `w-100 ${fieldName === ContactFormFieldNames.phoneNumber && styles.inputPhoneNumber}`,
                placeholder: field.placeHolder,
                onChange: handleChange,
                value: formFields[fieldName].value,
            };

            return isTextArea
                ? <textarea {...fieldProps} rows={8} />
                : fieldName === ContactFormFieldNames.phoneNumber
                    ? (
                        <div className="d-flex align-items-center justify-content-center">
                            <div className={styles.countryflagContainer}>+1</div>
                            <input {...fieldProps} />
                        </div>
                    )
                    : <input {...fieldProps} />;
        }, [formFields, handleChange]);

    const finalFields = React.useMemo(() => Object.entries(formFields).map(([fieldKey, field]) =>
        <BaseField
            label={field.label}
            shouldShowError={!field.validated}
            error={field.error}
            key={fieldKey}
        >
            {renderInput(fieldKey, field, field.type === "textarea")}
        </BaseField>
    )
        , [formFields, renderInput]);

    const handleSubmit = React.useCallback(async (e: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (loading) {
            return;
        }

        const newFormFields: Record<string, IField> = { ...contactFormFields };
        let hasError = false;

        for (const fieldKey in newFormFields) {
            if (Object.prototype.hasOwnProperty.call(newFormFields, fieldKey)) {
                const field = newFormFields[fieldKey];
                if (!field) continue;

                field.validated = true;

                if (!field.value.trim() && field.error) {
                    field.validated = false;
                    hasError = true;
                }

                if (fieldKey === "email") {
                    if (!EMAIL_PATTERN.test(field.value)) {
                        field.validated = false;
                        hasError = true;
                    }
                }
            }
        }

        if (hasError) {
            setFields(newFormFields);
            setSubmitted(false);
        } else {
            setLoading(true);
            const postObj: Record<string, string> = {};
            for (const key in formFields) {
                postObj[key] = formFields[key].value;
            }

            postObj["userType"] = userType;

            const response = await postData<Record<string, string>>(process.env.NEXT_PUBLIC_CONTACT_API_URL, postObj);

            setFields(formFields);

            if (response) {
                setSubmitted(true);
            } else {
                setSubmitted(false);
                // await router.push("/404");
            }

            setLoading(false);
        }
    }, [formFields, loading, userType]);

    return (
        <Row className={`${styles.container} w-100 m-0`}>
            <Col className={`${styles.contextContainer} d-flex flex-column justify-content-center`}>
                <Row className={styles.topContextContainer}>
                    <div>
                        <h2>{fields.title}</h2>
                        <p>
                            <h4>{fields.description}</h4>
                        </p>
                        <p>
                            <PrimaryButton
                                className={styles.buttonFaq}
                                linkProps={{ href: fields.redirectPageButton.href }}
                            >
                                {fields.redirectPageButton.text}
                            </PrimaryButton>
                        </p>
                    </div>
                </Row>
                <Row>
                    <div>
                        <h3>{fields.subTitle}</h3>
                        <p>
                            <h4>{fields.subDescription}</h4>
                        </p>
                    </div>
                </Row>
            </Col>
            <Col className={`${styles.formContainer} p-0`}>
                <div className={`${styles.formContent} position-relative`}>
                    {!submitted
                        ? <form onSubmit={handleSubmit}>
                            <h6>{fields.formTitle}</h6>
                            <p><h5>{fields.formDescription}</h5></p>
                            <div className="d-flex flex-row gap-3">
                                <PrimaryButton
                                    className={`
                                    w-100 ${styles.userTypeButton} 
                                    ${userType !== UserTypes.Creator && styles.inactive}
                                 `}
                                    onClick={() => setUserType(UserTypes.Creator)}
                                >
                                    Content Creator
                                </PrimaryButton>
                                <PrimaryButton
                                    className={`
                                    w-100 ${styles.userTypeButton} 
                                    ${userType !== UserTypes.Subscriber && styles.inactive}
                                 `}
                                    onClick={() => setUserType(UserTypes.Subscriber)}
                                >
                                    Subscriber
                                </PrimaryButton>
                            </div>
                            <Stack>
                                {finalFields}
                            </Stack>
                            <Stack className="py-3">
                                <PrimaryButton className="w-100" type="submit">
                                    {fields.formSubmitButtonText}
                                </PrimaryButton>
                            </Stack>
                            <div className="text-center p-2" style={{ maxWidth: "400px", margin: "auto" }}>
                                <label>{fields.formBottomText}</label>
                            </div>
                        </form>
                        : <Col className={`${styles.thankYou} text-center`}>
                            {/* <img {...props.afterSuccessContent.image} /> */}
                            <h1 className={styles.title}>{fields.confirmationTitle}</h1>
                            <p className={styles.note}>{fields.confirmationDescription}</p>
                        </Col>
                    }
                    {loading &&
                        <div className={`${styles.overlay} ${centerAlign} position-absolute top-0 w-100 h-100`}>
                            <div className="spinner-border text-warning" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    }
                </div>
            </Col>
        </Row >
    );
};

export default ContactForm;