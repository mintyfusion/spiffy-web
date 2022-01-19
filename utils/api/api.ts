/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import agility from "@agility/content-fetch";

import IApi from "utils/api/interfaces/IApi";

const api: IApi = agility.getApi({
    guid: process.env.NEXT_PUBLIC_AGILITY_GUID,
    apiKey: process.env.NEXT_PUBLIC_AGILITY_API_PREVIEW_KEY,
    isPreview: true
});

export default api;