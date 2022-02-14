import IContentList from "utils/api/interfaces/IContentList";

export default interface IUseGetContentListData<T> {
    loading: boolean;
    data: IContentList<T>;
    error: string;
}