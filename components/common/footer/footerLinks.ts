import IFooterLinks from "components/common/footer/interfaces/IFooterLinks";

const footerLinks: IFooterLinks[] = [
    {
        linkHeaderText: "Company",
        links: [
            { children: "About Us", href: "/" },
            { children: "Terms and Conditions", href: "/" },
            { children: "Privacy Policy", href: "/" },
        ]
    },
    {
        linkHeaderText: "Resources",
        links: [
            { children: "FAQ's", href: "/" },
            { children: "Contact Us", href: "/" }
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