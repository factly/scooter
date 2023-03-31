export function getTableNodeTypes(schema) {
  if (schema.cached.tableNodeTypes) {
    return schema.cached.tableNodeTypes;
  }

  const roles = {};

  Object.keys(schema.nodes).forEach(type => {
    const nodeType = schema.nodes[type];

    if (nodeType.spec.tableRole) {
      roles[nodeType.spec.tableRole] = nodeType;
    }

    //! TODO: workaround for tableRole not being set

    // if (nodeType.name === "th" || nodeType.name === "td" || nodeType.name === "tr" || nodeType.name === "table") {
    //   roles[nodeType.spec.tableRole] = nodeType
    //   switch (nodeType.name) {
    //     case "th":
    //       roles["header_cell"] = nodeType
    //       break;
    //     case "td":
    //       roles["cell"] = nodeType
    //       break;
    //     case "tr":
    //       roles["row"] = nodeType
    //       break;
    //     case "table":
    //       roles["table"] = nodeType
    //       break;
    //   }
    // }
  });

  schema.cached.tableNodeTypes = roles;

  return roles;
}
