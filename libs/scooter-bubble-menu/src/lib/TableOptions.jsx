import React from "react";

import { getTableMenuOptions } from "./helpers";
import Option from "./Option";

const TableOptions = ({ editor, options }) => {
  return (
    getTableMenuOptions({
      editor,
    })
      //.filter(({ optionName }) => options.includes(optionName))
      .map(option => <Option {...option} key={option.optionName} />)
  );
};

export default TableOptions;
