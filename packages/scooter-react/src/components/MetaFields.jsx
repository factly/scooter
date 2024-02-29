import React from "react";

export const MetaFields = ({
  metaTitle,
  setMetaTitle,
  metaDescription,
  setMetaDescription,
  canonicalURL,
  setCanonicalURL,
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
      >
        Meta Information
      </label>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={metaTitle}
          onChange={e => setMetaTitle(e.target.value)}
          placeholder="Meta Title"
          style={{
            width: "100%",
            padding: "5px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <textarea
          value={metaDescription}
          onChange={e => setMetaDescription(e.target.value)}
          placeholder="Meta Description"
          style={{
            width: "100%",
            padding: "5px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={canonicalURL}
          onChange={e => setCanonicalURL(e.target.value)}
          placeholder="Canonical URL"
          style={{
            width: "100%",
            padding: "5px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
    </div>
  );
};
