import React from "react";

const ListItems = ({ items, ordered }) => {
  const itemElements = items.map((item, index) => (
    <li key={item.key || index}>{item}</li>
  ));

  const className = "font-serif text-lg list-inside";

  return ordered ? (
    <ol className={`${className} list-decimal`}>{itemElements}</ol>
  ) : (
    <ul className={`${className} list-disc`}>{itemElements}</ul>
  );
};

export default ListItems;
