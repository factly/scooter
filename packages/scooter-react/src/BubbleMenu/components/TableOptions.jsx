import React from "react";

import Option from "./Option";
import { getTableMenuOptions } from "../../utils/helpers";

export const TableOptions = ({ editor }) => {
  return getTableMenuOptions({
    editor,
  }).map(option => <Option {...option} key={option.optionName} />);
};
