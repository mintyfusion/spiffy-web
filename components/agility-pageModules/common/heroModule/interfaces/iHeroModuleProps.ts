import { ModuleProps } from "@agility/nextjs";

import IHeroModuleData from "components/agility-pageModules/common/heroModule/interfaces/IHeroModuleData";

export default interface IHeroModuleProps extends Omit<ModuleProps<IHeroModuleData>, "page"> {
    page: { pageID: number };
}