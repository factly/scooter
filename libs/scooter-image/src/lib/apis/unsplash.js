import { UNSPLASH_BASE_URL } from "@factly/scooter-shared-utils";

import axios from "axios";

export const searchUnsplashImages = ({ pageNo, query, apiKey }) =>
  axios.get(UNSPLASH_BASE_URL, {
    headers: {
      Authorization: `Client-ID ${apiKey}`,
    },
    params: {
      page: pageNo,
      per_page: 30,
      order_by: "popular",
      query: query,
    },
  });
