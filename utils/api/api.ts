import agility from "@agility/content-fetch";

import IMainApi from "utils/api/interfaces/IMainApi";

const mainAPI = agility as IMainApi;
const env = process.env.NODE_ENV as string;

const apiParams = env === "development"
    ? {
        apiKey: process.env.NEXT_PUBLIC_AGILITY_API_PREVIEW_KEY,
        isPreview: true
    }
    : {
        apiKey: process.env.NEXT_PUBLIC_AGILITY_API_FETCH_KEY,
        isPreview: false
    };

const api = mainAPI.getApi({
    guid: process.env.NEXT_PUBLIC_AGILITY_GUID,
    ...apiParams
});

export default api;