import { ContentItem } from "@agility/nextjs";

import IContentInfo from "types/IContentnfo";
import IFeatureContentData from "components/agility-pageModules/landingPage/featuresModule/interfaces/IFeatureContentData";

export default interface ILandingFeaturesModuleProps extends Pick<IContentInfo, "title"> {
    featuresCardList: ContentItem<IFeatureContentData>[];
}