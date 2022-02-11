import agility from "@agility/content-fetch";

import IMainApi from "utils/api/interfaces/IMainApi";

const mainAPI = agility as IMainApi;
const api = mainAPI.getApi({
    guid: process.env.NEXT_PUBLIC_AGILITY_GUID,
    apiKey: process.env.NEXT_PUBLIC_AGILITY_API_PREVIEW_KEY,
    isPreview: true
});

export default api;