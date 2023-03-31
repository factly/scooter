import React from "react";

import { getTableColOptions } from "./helpers";
import Option from "./Option";

const TableColOptions = ({ editor, options }) => {
  return (
    getTableColOptions({
      editor,
    })
      //.filter(({ optionName }) => options.includes(optionName))
      .map(option => <Option {...option} key={option.optionName} />)
  );
};

export default TableColOptions;
