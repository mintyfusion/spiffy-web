import DetailsType from "components/educationDetailsPage/detailsSection/enums/detailsType";
import IDetailsSectionProps from "components/educationDetailsPage/detailsSection/interfaces/IDetailsSectionProps";

const detailsContent: IDetailsSectionProps[] = [
    {
        detailsType: DetailsType.guide,
        title: "General",
        description: "What makes Spiffy different than other platforms?",
        mediaSrc: "/images/educationDetailsPage/details-image-1.png",
        key: "1"
    },
    {
        detailsType: DetailsType.video,
        title: "Rules",
        description: "What makes Spiffy different than other platforms?",
        mediaSrc: "https://www.youtube.com/watch?v=nfiRd4Y5z_g&ab_channel=ShortClips",
        key: "2"
    }
];

export default detailsContent;