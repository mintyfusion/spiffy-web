import IFooterLinks from "components/agility-pageModules/common/footer/interfaces/IFooterLinks";

const footerLinks: IFooterLinks[] = [
    {
        linkHeaderText: "Company",
        links: [
            { children: "About Us", href: "/about" },
            { children: "Terms and Conditions", href: "/terms" },
            { children: "Privacy Policy", href: "/privacy" },
        ]
    },
    {
        linkHeaderText: "Resources",
        links: [
            { children: "FAQ's", href: "/faq" },
            { children: "Contact Us", href: "/contact" }
        ]
    },
    {
        linkHeaderText: "For Subscribers",
        links: [
            { children: "Spiffy Game", href: "/game" },
            { children: "Education", href: "/education" },
        ]
    }
];

export default footerLinks;