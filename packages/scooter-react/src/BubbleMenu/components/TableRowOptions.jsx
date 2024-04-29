import React from "react";

import Option from "./Option";
import { getTableRowOptions } from "../../utils/helpers";

export const TableRowOptions = ({ editor }) => {
  return getTableRowOptions({
    editor,
  }).map(option => <Option {...option} key={option.optionName} />);
};
