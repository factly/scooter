import { IFRAMELY_BASE_URL } from "constants/common";

import axios from "axios";

export const getIframelyData = ( url ) => {
  // console.log(url);
  return axios.get(`${IFRAMELY_BASE_URL}`, {
    withCredentials: true,
    params: {
      url,
      type: "iframely",
    },
  });
};
