import React from "react";

import Option from "./Option";
import { getTableColOptions } from "../../utils/helpers";

export const TableColOptions = ({ editor }) => {
  return getTableColOptions({
    editor,
  }).map(option => <Option {...option} key={option.optionName} />);
};
