import ContentCategory from "components/educationPage/contentSection/enums/contentCategory";
import IContentData from "components/educationPage/contentSection/interfaces/IContentData";

const contentData: IContentData[] = [
    {
        key: ContentCategory.all,
        title: "All Topics",
        description: "Find the most commonly asked questions in the articles below. ",
        cardContent: []
    },
    {
        key: ContentCategory.gameRules,
        title: "Game Rules",
        description: "Like all games - there are rules - here they are",
        cardContent: [
            {
                imageUrl: { src: "/images/educationPage/contentSection/rules/card-image.png" },
                tag: ContentCategory.gameRules,
                title: "How can I make money as a supporter?",
                href: "/",
                description: "Discover the ins and outs of being successful at the Spiffy game.",
            }
        ]
    }, {
        key: ContentCategory.general,
        title: "General General Questions",
        description: "Find the most commonly asked questions in the articles below. ",
        cardContent: [
            {
                imageUrl: { src: "/images/educationPage/contentSection/general/card-image.png" },
                tag: ContentCategory.general,
                title: "Can I create a serious business using Spiffy?",
                href: "/",
                description: "If you play the game right you can make a business using Spiffy. Learn more in this article.",
            },
            {
                imageUrl: { src: "/images/educationPage/contentSection/general/card-image-2.png" },
                tag: ContentCategory.general,
                title: "What makes Spiffy different than other platforms?",
                href: "/",
                description: "Click here to learn how Spiffy is unlike any other donations platform.",
            }
        ]
    }, {
        key: ContentCategory.payment,
        title: "General Payment Questions",
        description: "Find the most commonly asked questions in the articles below. ",
        cardContent: [
            {
                imageUrl: { src: "/images/educationPage/contentSection/payments/card-image.png" },
                tag: ContentCategory.payment,
                title: "How can I receive donations from my supporters?",
                href: "/",
                description: "Receiving donations on Spiffy is quite simple. Learn more here.",
            }
        ]
    }, {
        key: ContentCategory.incentives,
        title: "General Incentive Questions",
        description: "Find the most commonly asked questions in the articles below. ",
        cardContent: [
            {
                imageUrl: { src: "/images/educationPage/contentSection/incentives/card-image.png" },
                tag: ContentCategory.incentives,
                title: "Why should supporters join Spiffy?",
                href: "/",
                description: "Learn how Spiffy allows donors to earn money while supporting their favorite Content Creators.",
            }
        ]
    }, {
        key: ContentCategory.others,
        title: "Other General Questions",
        description: "Find the most commonly asked questions in the articles below. ",
        cardContent: [
            {
                imageUrl: { src: "/images/educationPage/contentSection/others/card-image.png" },
                tag: ContentCategory.others,
                title: "Why should Content Creators join Spiffy?",
                href: "/",
                description: "Learn how Content Creators are benefiting from Spiffy.",
            },
        ]
    },
];

export default contentData;