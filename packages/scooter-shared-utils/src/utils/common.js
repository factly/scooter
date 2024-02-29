import { isNil, isEmpty } from "ramda";

export const capitalize = string => {
  const fallbackString = "nui";

  if (string && string.replace) {
    return string
      .toLowerCase()
      .replace("-", " ")
      .replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
  }

  return fallbackString;
};

export const hyphenize = string => {
  const fallbackString = "nui";

  if (string && string.replace) {
    return string
      .replace(/[\s_]/g, "-")
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/-+/g, "-")
      .toLowerCase();
  }

  return fallbackString;
};

export const stringifyObject = (object, separator = ";") =>
  Object.entries(object).reduce(
    (acc, [key, value]) => (acc += `${key}:${value}${separator}`),
    ""
  );

export const isNilOrEmpty = object => isNil(object) || isEmpty(object);
