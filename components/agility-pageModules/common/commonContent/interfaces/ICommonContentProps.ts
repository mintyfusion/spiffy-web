import ICommonContent from "components/agility-pageModules/common/commonContent/interfaces/ICommonContent";

export default interface ICommonContentProps extends ICommonContent {
    page: { name: string };
}