import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

import IShareSectionProps from "components/educationDetailsPage/shareSection/interfaces/IShareSectionData";

const detailsSocialData: IShareSectionProps[] = [
    {
        href: "https://twitter.com/intent/tweet?url=",
        icon: faTwitter
    },
    {
        href: "http://www.facebook.com/sharer.php?u=",
        icon: faFacebookF
    },
    {
        href: "#",
        icon: faInstagram
    }
];

export default detailsSocialData;