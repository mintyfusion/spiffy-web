import React from "react";

import api from "utils/api/api";
import IGetContentList from "utils/api/interfaces/IGetContentList";
import IUseGetContentListData from "utils/api/interfaces/IUseGetContentListData";

export default function useGetContentList<T>(params: IGetContentList): IUseGetContentListData<T>[] {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string>();
    const [data, setData] = React.useState(null);

    const fetchContentListApi = React.useCallback(async () => {
        const result = await api.getContentList<T>(params);

        return result;
    }, [params]);

    React.useEffect(() => {
        setIsLoading(true);
        fetchContentListApi()
            .then(result => setData(result))
            .catch((err: Error) => setError(err.message))
            .finally(() => setIsLoading(false));

    }, [fetchContentListApi]);

    return [{ isLoading, data, error }];
}
