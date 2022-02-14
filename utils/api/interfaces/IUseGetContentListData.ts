import IContentList from "utils/api/interfaces/IContentList";

export default interface IUseGetContentListData<T> {
    isLoading: boolean;
    data: IContentList<T>;
    error: string;
}