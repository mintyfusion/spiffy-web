import IContentList from "utils/api/interfaces/IContentList";
import IGetContentList from "utils/api/interfaces/IGetContentList";

export default interface IApi {
    getContentList<T>(props: IGetContentList): Promise<IContentList<T>>;
}