import IFooterLinks from "components/common/footer/interfaces/IFooterLinks";

const footerLinks: IFooterLinks[] = [
    {
        linkHeaderText: "Company",
        links: [
            { children: "About Us", href: "/about" },
            { children: "Terms and Conditions", href: "/" },
            { children: "Privacy Policy", href: "/" },
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
            { children: "Spiffy Game", href: "/" },
            { children: "Education", href: "/education" },
        ]
    }
];

export default footerLinks;