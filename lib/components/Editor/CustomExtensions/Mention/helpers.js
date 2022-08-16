import { hyphenize } from "utils/common";

export const createMentionSuggestions = (
  items = [],
  { showImage = false } = {}
) => {
  const mentions = items
    .map((item, index) => ({
      showImage,
      key: `${hyphenize(item.name)}-${index}`,
      ...item,
    }))
    .sort((mention1, mention2) => mention1.name.localeCompare(mention2.name));

  return ({ query }) =>
    mentions.filter(({ name }) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
};
