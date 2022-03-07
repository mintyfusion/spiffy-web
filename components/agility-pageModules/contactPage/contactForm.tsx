import { Col, Row, Stack } from "react-bootstrap";
import { ModuleProps } from "@agility/nextjs";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

import BaseField from "components/agility-pageModules/common/baseField/baseField";
import ContactFormFieldNames from "components/agility-pageModules/contactPage/enums/contactFormFieldNames";
import contactFormFields from "components/agility-pageModules/contactPage/contentFormFieldData";
import flexbox from "utils/flexbox";
import IContactFormProps from "components/agility-pageModules/contactPage/interfaces/IContactFormProps";
import IField from "types/IField";
import postData from "utils/postData";
import PrimaryButton from "components/agility-pageModules/common/primaryButton/primaryButton";
import renderHtml from "utils/renderHtml";
import useBoolean from "hooks/useBoolean";
import UserTypes from "components/agility-pageModules/contactPage/enums/userTypes";

import styles from "components/agility-pageModules/contactPage/contactForm.module.scss";

const Spinner = dynamic(() => import("components/agility-pageModules/common/spinner/Spinner"));

const PHONE_NUMBER_LENGTH = 11;
const NUMBER_PATTERN = /^[0-9]*$/;
const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const rowAlignCenter = flexbox({ hAlign: "center", vAlign: "center" });
const rowAlignStretch = flexbox({ hAlign: "center", vAlign: "stretch" });
const rowALignEnd = flexbox({ hAlign: "end", vAlign: "center" });
const colAlignCenter = flexbox({ vertical: true, hAlign: "center", vAlign: "center" });

const ContactForm = (props: ModuleProps<IContactFormProps>): JSX.Element => {
    const { fields } = props.module;
    const [submitted, { setTrue: setSubmittedTrue, setFalse: setSubmittedFalse }] = useBoolean(false);
    const [loading, { setTrue: setLoadingTrue, setFalse: setLoadingFalse }] = useBoolean(false);
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
                        <div className={`${rowAlignCenter} ${styles.phoneNumberContainer}`}>
                            <label className={`${styles.countryflagContainer} ${rowALignEnd}`}>+1</label>
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
    ), [formFields, renderInput]);

    const handleSubmit = React.useCallback(async (e: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (loading) {
            return;
        }

        const newFormFields: Record<string, IField> = { ...formFields };
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
            setSubmittedFalse();
        } else {
            setLoadingTrue();
            const postObj: Record<string, string> = {};
            for (const key in formFields) {
                postObj[key] = formFields[key].value;
            }

            postObj["userType"] = userType;
            const response = await postData<Record<string, string>>(process.env.NEXT_PUBLIC_CONTACT_API_URL, postObj);
            setFields(formFields);

            if (response) {
                setSubmittedTrue();

            } else {
                setSubmittedFalse();

            }

            setLoadingFalse();
        }
    }, [formFields, loading, userType, setSubmittedTrue, setSubmittedFalse, setLoadingTrue, setLoadingFalse]);

    return (
        <Row className={`${styles.container} w-100 m-0 flex-column-reverse flex-md-row`}>
            <Col className={`${styles.contextContainer} ${colAlignCenter}`}>
                <Row className={styles.topContextContainer}>
                    <div>
                        <h2>{fields.title}</h2>
                        <h4 className="mb-3">{fields.description}</h4>
                        <PrimaryButton
                            className={styles.buttonFaq}
                            linkProps={{ href: fields.redirectPageButton.href }}
                        >
                            {fields.redirectPageButton.text}
                        </PrimaryButton>
                    </div>
                </Row>
                <Row>
                    <div>
                        <h3>{fields.subTitle}</h3>
                        <h4
                            className="mb-3"
                            dangerouslySetInnerHTML={
                                renderHtml(fields.subDescription)
                            }
                        />
                    </div>
                </Row>
            </Col>
            <Col className={`${styles.formContainer} p-0`}>
                <div className={`${styles.formContent} position-relative`}>
                    {!submitted
                        ? <form onSubmit={handleSubmit}>
                            <h6 className={styles.formTitle}>{fields.formTitle}</h6>
                            <h5 className={`${styles.formDesc} mb-3`}>{fields.formDescription}</h5>
                            <div className={`gap-3 ${rowAlignStretch} ${styles.formButtons}`}>
                                <PrimaryButton
                                    className={`
                                        w-100 
                                        border-0 
                                        ${styles.userTypeButton}
                                        ${userType !== UserTypes.Creator && styles.inactive}
                                     `}
                                    onClick={() => setUserType(UserTypes.Creator)}
                                >
                                    Content Creator
                                </PrimaryButton>
                                <PrimaryButton
                                    className={`
                                        w-100
                                        border-0 
                                        ${styles.userTypeButton} 
                                        ${userType !== UserTypes.Subscriber && styles.inactive}
                                      `}
                                    onClick={() => setUserType(UserTypes.Subscriber)}
                                >
                                    Subscriber
                                </PrimaryButton>
                            </div>
                            <Stack>{finalFields}</Stack>
                            <Stack className="py-3">
                                <PrimaryButton className="w-100" type="submit">
                                    {fields.formSubmitButtonText}
                                </PrimaryButton>
                            </Stack>
                            <div className={`text-center p-2 ${styles.formBottomContent} m-auto`} >
                                <label dangerouslySetInnerHTML={renderHtml(fields.formBottomText)} />
                            </div>
                        </form>
                        : <Col className={`${styles.thankYou} text-center`}>
                            <Image layout="fixed" width={100} height={100} src={fields.confirmationImage.url} />
                            <h1 className={styles.title}>{fields.confirmationTitle}</h1>
                            <p className={styles.note}>{fields.confirmationDescription}</p>
                        </Col>
                    }
                    {loading &&
                        <Spinner
                            className={`${styles.overlay} ${rowAlignCenter} position-absolute top-0 w-100 h-100`}
                        />}
                </div>
            </Col>
        </Row >
    );
};

export default ContactForm;