import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import IShareSectionProps from "components/agility-pageModules/educationDetailsModule/shareSection/interfaces/IShareSectionData";

const detailsSocialData: IShareSectionProps[] = [
    {
        href: "https://twitter.com/intent/tweet?url=",
        icon: faTwitter,
        title: "Twitter"
    },
    {
        href: "http://www.facebook.com/sharer.php?u=",
        icon: faFacebookF,
        title: "Facebook"
    },
    {
        href: "",
        icon: faLink,
        title: "link"
    }
];

export default detailsSocialData;