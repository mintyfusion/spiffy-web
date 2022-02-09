import { ComponentWithInit } from "@agility/nextjs";

import AboutUsHeroModule from "components/agility-pageModules/aboutPage/heroSection/heroSection";
import AboutUsValuesModule from "components/agility-pageModules/aboutPage/valuesSection/valuesSection";
import CommonContentModule from "components/agility-pageModules/common/commonContent/commonContentModule";
import ContactForm from "components/agility-pageModules/contactPage/contactForm";
import CreatorPageContentModule from "components/agility-pageModules/creatorPage/contentModule/creatorPageContentModule";
import DateHeroModule from "components/agility-pageModules/common/dateHeroModule/dateHeroModule";
import EducationDetailsModule from "components/agility-pageModules/educationDetailsModule/educationDetailsModule";
import EducationListingModule from "components/agility-pageModules/educationPage/contentListModule/educationPageContentListModule";
import FAQContentModule from "components/agility-pageModules/faqPage/contentModule/faqContentModule";
import HeroModuleVariant1 from "components/agility-pageModules/common/heroModuleVariant1/heroModuleVariant1";
import HeroModuleVariant2 from "components/agility-pageModules/common/heroModuleVariant2/heroModuleVariant2";
import HeroModuleVariant3 from "components/agility-pageModules/common/heroModuleVariant3/heroModuleVariant3";
import HtmlContentModule from "components/agility-pageModules/common/htmlContentModule/htmlContentModule";
import IModules from "typings/interfaces/IModules";
import LandingFeaturesModule from "components/agility-pageModules/landingPage/featuresModule/LandingFeaturesModule";
import LandingPageEducation from "components/agility-pageModules/landingPage/educationModule/landingPageEducation";
import LandingPageGetStarted from "components/agility-pageModules/landingPage/getStartedModule/landingPageGetStarted";
import LandingPageVerticalModule from "components/agility-pageModules/landingPage/verticalModule/landingPageVerticalModule";
import VideoSection from "components/agility-pageModules/creatorPage/videoSection/videoSection";

// All of the Agility Page Module Components that are in use in this site need to be imported into this index file.
// Place Page Modules in allModules array below, passing in a name and the component.
const allModules: IModules[] = [
  { name: "EducationListingModule", module: EducationListingModule },
  { name: "HeroModule", module: HeroModuleVariant3 },
  { name: "LandingPageEducation", module: LandingPageEducation },
  { name: "CommonContentModule", module: CommonContentModule },
  { name: "EducationDetailsModule", module: EducationDetailsModule },
  { name: "LandingPageGetStarted", module: LandingPageGetStarted },
  { name: "LandingFeaturesModule", module: LandingFeaturesModule },
  { name: "LandingPageVerticalModule", module: LandingPageVerticalModule },
  { name: "PageContentModule", module: CreatorPageContentModule },
  { name: "CreatorPageVideoModule", module: VideoSection },
  { name: "FAQContentModule", module: FAQContentModule },
  { name: "AboutUsHeroModule", module: AboutUsHeroModule },
  { name: "AboutUsValuesModule", module: AboutUsValuesModule },
  { name: "ContactFormModule", module: ContactForm },
  { name: "HeroModulewithDate", module: DateHeroModule },
  { name: "HTMLTemplate", module: HtmlContentModule },
  { name: "HeroModuleVariant1", module: HeroModuleVariant1 },
  { name: "HeroModuleVariant2", module: HeroModuleVariant2 }
];

export const getModule = (moduleName: string): ComponentWithInit => {
  if (!moduleName) { return null; }

  const obj = allModules.find((m) =>
    m.name.toLowerCase() === moduleName.toLowerCase()
  );

  if (!obj) return null;

  return obj.module;
};
