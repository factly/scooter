import React from "react";

export const CharacterCount = ({ count, limit, strategy }) => {
  const characterLimitActive = strategy === "limit" && limit;

  return (
    <p
      className="scooter-editor-character-count"
      data-cy="scooter-editor-character-count"
    >
      {characterLimitActive
        ? `${limit - count} characters remaining`
        : `${count} characters`}
    </p>
  );
};
