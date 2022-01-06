// All of the Agility Page Module Components that are in use in this site need to be imported into this index file.
// Place Page Modules in allModules array below, passing in a name and the component.
import CommonContentModule from "components/agility-pageModules/common/commonContent/commonContentModule";
import EducationListingModule from "components/agility-pageModules/educationModule/contentSection/contentSection";
import HeroModule from "components/agility-pageModules/HeroModule";
import LandingPageEducation from "components/agility-pageModules/LandingPageEducation";

const allModules = [
  { name: "EducationListingModule", module: EducationListingModule },
  { name: "HeroModule", module: HeroModule },
  { name: "LandingPageEducation", module: LandingPageEducation },
  { name: "CommonContentModule", module: CommonContentModule }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getModule = (moduleName: string): any => {
  if (!moduleName) { return null; }

  const obj = allModules.find((m) =>
    m.name.toLowerCase() === moduleName.toLowerCase()
  );

  if (!obj) return null;

  return obj.module;
};
