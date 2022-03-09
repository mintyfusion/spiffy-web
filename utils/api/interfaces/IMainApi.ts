import IApiData from "utils/api/interfaces/IApiData";
import IMainApiProps from "utils/api/interfaces/IMainApiProps";

export default interface IMainApi {
    getApi(props: IMainApiProps): IApiData;
}