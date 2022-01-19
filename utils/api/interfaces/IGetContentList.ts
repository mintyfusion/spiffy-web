import FilterLogicTypes from "utils/api/enums/filterLogicTypes";
import FilterTypes from "utils/api/enums/filterTypes";

export default interface IGetContentList {
    referenceName: string;
    locale?: string;
    languageCode: string;
    contentLinkDepth?: number;
    depth?:number;
    expandAllContentLinks?: boolean;
    take?: number;
    skip?: number;
    sort?: string;
    direction?: {
        ASC: string;
        DESC: string;
    };
    filters?: {
        property: string;
        operator: FilterTypes;
        value: string;
    }[];
    filtersLogicOperator?: FilterLogicTypes;
}