import { ModuleProps } from "@agility/nextjs";

import ICommonContent from "components/agility-pageModules/common/commonContent/interfaces/ICommonContent";

export default interface ICommonContentProps extends Omit<ModuleProps<ICommonContent>, "page"> {
    page: { name: string };
}