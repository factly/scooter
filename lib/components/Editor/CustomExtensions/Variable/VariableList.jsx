import React from "react";

import { parseVariables } from "./helpers";

const VariableList = ({ onClickVariable, variables }) => {
  const parsedVariables = parseVariables(variables);

  if (!(variables && variables.length)) {
    return null;
  }

  return (
    <div className="scooter-editor-variables-list">
      {parsedVariables.map(({ label, variables }, index) => (
        <VariableCategory
          key={index}
          index={index}
          title={label}
          variables={variables}
          onClickItem={onClickVariable}
        />
      ))}
    </div>
  );
};

const VariableCategory = ({ index, title, variables, onClickItem }) => (
  <div
    className="scooter-editor-variables-block"
    data-cy={`scooter-editor-variable-option-category-${index}`}
  >
    {title && <h6>{title}</h6>}
    <div className="scooter-editor-variables-row">
      {variables.map(item => (
        <button
          type="button"
          onClick={() => onClickItem(item)}
          key={`${item.label}--${item.value}`}
          className="scooter-editor-variable"
          data-cy={`scooter-editor-variable-option-item-${item.label}--${item.value}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  </div>
);

export default VariableList;
