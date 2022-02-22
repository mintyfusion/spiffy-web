import { faFacebookF, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

import IFooterSocials from "components/common/footer/interfaces/IFooterSocials";

const footerSocialsData: IFooterSocials[] = [
    {
        href: "https://twitter.com/Spiffy_Biz",
        icon: faTwitter
    },
    {
        href: "https://www.facebook.com/Spiffy.Biz",
        icon: faFacebookF
    },
    {
        href: "https://www.instagram.com/spiffy.biz",
        icon: faInstagram
    },
    {
        href: "https://www.youtube.com/channel/UCY8myL9tZ-YND4RHm7ccQVw/about",
        icon: faYoutube
    },
];

export default footerSocialsData;