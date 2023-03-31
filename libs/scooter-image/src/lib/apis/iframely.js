import { IFRAMELY_BASE_URL } from "../utils/constants";

import axios from "axios";

export const getIframelyData = (url, iframelyUrl) => {
  return axios.get(`${iframelyUrl || IFRAMELY_BASE_URL}`, {
    withCredentials: true,
    params: {
      url,
      type: "iframely",
    },
  });
};
