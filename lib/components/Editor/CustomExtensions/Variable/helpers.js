/*  Helper function that accepts an array of variables and injects category to each item in the group
    And also performs grouping of indvidual variables under common category as 'Others'. */

export const parseVariables = (variableArr = []) => {
  const uncategorized = [];
  const groupedVariables = [];
  variableArr.forEach(variable => {
    const { category_key, category_label, variables } = variable;
    if (category_key && variables) {
      const parsedVariables = variables.map(categoryVariable => ({
        ...categoryVariable,
        category_key,
      }));
      groupedVariables.push({
        label: category_label,
        variables: parsedVariables,
      });
    } else uncategorized.push(variable);
  });

  /* If there are other categorised variables already present, group all uncategorized variables under title 'Others'.
   otherwise, if all available variables are uncategorised, do not render 'Others' title */

  if (uncategorized.length) {
    groupedVariables.push({
      label: groupedVariables.length ? "Others" : null,
      variables: uncategorized,
    });
  }

  return groupedVariables;
};
