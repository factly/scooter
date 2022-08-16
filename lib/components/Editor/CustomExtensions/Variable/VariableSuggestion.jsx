import React from "react";

import VariableList from "./VariableList";

const VariableSuggestion = ({ items, command }) => (
  <div className="scooter-editor-variables-suggestion">
    <VariableList
      variables={items}
      onClickVariable={variable => {
        const { category_key, key } = variable;
        const variableName = category_key ? `${category_key}.${key}` : key;
        command({ label: variableName, id: variableName });
      }}
    />
  </div>
);

export default VariableSuggestion;
