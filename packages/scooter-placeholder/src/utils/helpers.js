import isPlainObject from "lodash.isplainobject";

export const placeholderGenerator = placeholder => {
  const type = typeof placeholder;

  if (type === "string" || type === "function") {
    return placeholder;
  }

  if (isPlainObject(placeholder)) {
    return ({ node }) => {
      const { name } = node.type;
      return placeholder[name];
    };
  }

  return "";
};
