import React, { useState, useEffect } from "react";

import { getFormattedDate, maker } from "../Claim/utils";
import { Modal } from "./shared/Modal";
import { SourceList } from "./SourceList";
import { MetaFields } from "./MetaFields";

const AddNewClaimForm = ({ editor, setIsVisible, claimConfig }) => {
  const [claim, setClaim] = useState("");
  const [slug, setSlug] = useState("");
  const [fact, setFact] = useState("");
  const [claimant, setClaimant] = useState("");
  const [rating, setRating] = useState("");
  const [claimants, setClaimants] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [claimDate, setClaimDate] = useState("");
  const [checkedDate, setCheckedDate] = useState("");
  const [reviewSources, setReviewSources] = useState([
    { url: "", description: "" },
  ]);
  const [claimSources, setClaimSources] = useState([
    { url: "", description: "" },
  ]);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [canonicalURL, setCanonicalURL] = useState("");
  const { claimantsFetcher, addClaim, ratingsFetcher } = claimConfig;

  const handleSubmit = event => {
    event.stopPropagation();
    event.preventDefault();

    // Perform form submission logic
    const formData = {
      claim,
      slug,
      fact,
      claimant_id: claimant,
      rating_id: rating,
      claim_date: getFormattedDate(claimDate),
      checked_date: getFormattedDate(checkedDate),
      claim_sources: claimSources,
      review_sources: reviewSources,
      meta: {
        title: metaTitle,
        description: metaDescription,
        canonical_URL: canonicalURL,
      },
    };

    addClaim(formData).then(claim => {
      editor
        .chain()
        .setClaim({
          id: claim.id,
          order: claim?.order ?? 1,
          claim: claim.claim,
          fact: claim.fact,
        })
        .run();
      editor
        .chain()
        .insertContentAt(editor.state.selection.head + 1, "<p></p>")
        .focus(editor.state.selection.head + 1)
        .run();
      setIsVisible(false);
    });
  };

  const onClaimChange = event => {
    const claim = event.target.value;
    const truncatedClaim = claim.length > 150 ? claim.substring(0, 150) : claim;
    const newSlug = maker(truncatedClaim);
    setClaim(truncatedClaim);
    setSlug(newSlug);
  };
  const handleAddReviewSource = () => {
    setReviewSources([...reviewSources, { url: "", description: "" }]);
  };

  const handleRemoveReviewSource = index => {
    const updatedReviewSources = reviewSources.filter((_, i) => i !== index);
    setReviewSources(updatedReviewSources);
  };

  const handleChangeReviewSource = (index, field, value) => {
    const updatedReviewSources = [...reviewSources];
    updatedReviewSources[index][field] = value;
    setReviewSources(updatedReviewSources);
  };

  const handleAddClaimSource = () => {
    setClaimSources([...claimSources, { url: "", description: "" }]);
  };

  const handleRemoveClaimSource = index => {
    const updatedClaimSources = claimSources.filter((_, i) => i !== index);
    setClaimSources(updatedClaimSources);
  };

  const handleChangeClaimSource = (index, field, value) => {
    const updatedClaimSources = [...claimSources];
    updatedClaimSources[index][field] = value;
    setClaimSources(updatedClaimSources);
  };

  useEffect(() => {
    claimantsFetcher(1).then(newClaimants => {
      const { nodes: claimantData } = newClaimants;
      setClaimants(claimantData);
    });
    ratingsFetcher(1).then(newRatings => {
      const { nodes: ratingData } = newRatings;
      setRatings(ratingData);
    });
  }, [claimantsFetcher, ratingsFetcher]);

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <label>Claim</label>
        <textarea
          value={claim}
          onChange={onClaimChange}
          rows={4}
          placeholder="Enter claim...."
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Slug</label>
        <input
          type="text"
          value={slug}
          onChange={e => setSlug(e.target.value)}
          placeholder="Enter slug..."
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Fact</label>
        <textarea
          value={fact}
          onChange={e => setFact(e.target.value)}
          rows={4}
          placeholder="Enter fact...."
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Claimant</label>
        <select
          value={claimant}
          onChange={e => setClaimant(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option style={{ display: "none" }} value="">
            Select Claimant
          </option>
          {claimants.map(claimant => (
            <option key={claimant.id} value={claimant.id}>
              {claimant.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Rating</label>
        <select
          value={rating}
          onChange={e => setRating(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option style={{ display: "none" }} value="">
            Select Rating
          </option>
          {ratings.map(rating => (
            <option key={rating.id} value={rating.id}>
              {rating.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <label>Claim Date</label>
          <input
            type="date"
            value={claimDate}
            onChange={e => setClaimDate(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label>Checked Date</label>
          <input
            type="date"
            value={checkedDate}
            onChange={e => setCheckedDate(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
      </div>
      <SourceList
        sources={reviewSources}
        typeLabel="Review"
        onAddSource={handleAddReviewSource}
        onRemoveSource={handleRemoveReviewSource}
        onChangeSource={handleChangeReviewSource}
      />
      <SourceList
        sources={claimSources}
        typeLabel="Claim"
        onAddSource={handleAddClaimSource}
        onRemoveSource={handleRemoveClaimSource}
        onChangeSource={handleChangeClaimSource}
      />
      <MetaFields
        metaTitle={metaTitle}
        setMetaTitle={setMetaTitle}
        metaDescription={metaDescription}
        setMetaDescription={setMetaDescription}
        canonicalURL={canonicalURL}
        setCanonicalURL={setCanonicalURL}
      />
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#007BFF",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
  );
};

export const AddNewClaim = ({
  editor,
  setIsVisible,
  isVisible,
  setMeta,
  claimConfig,
}) => {
  return (
    <Modal
      size="md620"
      isOpen={isVisible}
      onClose={() => {
        setIsVisible(() => {
          return false;
        });
      }}
      closeButton={false}
    >
      <div className="scooter-editor-add-existing-claim">
        <div className="scooter-editor-add-existing-claim__content ">
          <AddNewClaimForm
            editor={editor}
            setIsVisible={setIsVisible}
            claimConfig={claimConfig}
          />
        </div>
      </div>
    </Modal>
  );
};
