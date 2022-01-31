import ContactFormFieldNames from "components/agility-pageModules/contactPage/enums/contactFormFieldNames";
import IField from "types/IField";

const contactFormFields: Record<ContactFormFieldNames, IField> = {
    [ContactFormFieldNames.fullName]: {
        type: "text",
        placeHolder: "Full Name",
        label: "Full Name",
        value: "",
        error: "Please enter name",
        validated: true,
        fullWidth: false,
    },
    [ContactFormFieldNames.email]: {
        type: "email",
        placeHolder: "Email",
        label: "Email",
        value: "",
        error: "Please enter valid email",
        validated: true,
        fullWidth: false,
    },
    [ContactFormFieldNames.phoneNumber]: {
        type: "text",
        placeHolder: "Phone Number",
        label: "Phone Number",
        value: "",
        error: "Please enter phone number",
        validated: true,
        fullWidth: false,
    },
    [ContactFormFieldNames.message]: {
        type: "textarea",
        placeHolder: "Message",
        label: "Message",
        value: "",
        error: "Please enter a brief message",
        validated: true,
        fullWidth: true,
    },
};

export default contactFormFields;