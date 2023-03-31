import React from "react";

import { getTableRowOptions } from "./helpers";
import Option from "./Option";

const TableRowOptions = ({ editor, options }) => {
  return (
    getTableRowOptions({
      editor,
    })
      //.filter(({ optionName }) => options.includes(optionName))
      .map(option => <Option {...option} key={option.optionName} />)
  );
};

export default TableRowOptions;
