import { Modal } from "@factly/scooter-ui";
import React, { useState, useEffect, useRef } from 'react';

function maker(string) {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
   // Simulate posting data and receiving form data with ID
   const simulatePostData = (values) => {
    // Replace this with your actual API call to post data and receive the form data with ID
    return new Promise((resolve) => {
      setTimeout(() => {
        const generatedId = '12345'; // Replace '12345' with the generated ID from the backend
        const formDataWithId = {
          ...values,
          id: generatedId,
        };
        resolve(formDataWithId);
      }, 1000); // Simulating a delay of 1 second
    });
  };


//({ editor , setIsVisible , setMeta }) => {
const AddNewClaimForm = ({editor , setIsVisible}) => {
  const [claim, setClaim] = useState('');
  const [slug, setSlug] = useState('');
  const [fact, setFact] = useState('');
  const [claimant, setClaimant] = useState('');
  const [rating, setRating] = useState('');
  const [claimants, setClaimants] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [claimDate, setClaimDate] = useState('');
  const [checkedDate, setCheckedDate] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic
    const formData = {
      claim,
      slug,
      fact,
      claimant,
      rating,
      claimDate,
      checkedDate,
    };
    console.log(formData);
    simulatePostData(formData).then((claim) => {
      console.log('Received Form Data with ID:', claim);
      editor
      .chain()  
      .setClaim({ id: claim.id, order: claim?.order??1 , claim: claim.claim , fact: claim.fact })
      .insertContentAt(editor.state.selection.head+1,"<p></p>")
      .focus(editor.state.selection.head+1)
      .run();
     setIsVisible(false);
    });
   };

  // Function to fetch claimants
  const fetchClaimants = (page) => {
    // Replace this with your actual API call to fetch claimants
    const newClaimants = Array.from({ length: 20 }, (_, index) => `Claimant ${index + 1 + (page - 1) * 20}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newClaimants);
      }, 1000);
    });
  };

  // Function to fetch ratings
  const fetchRatings = (page) => {
    // Replace this with your actual API call to fetch ratings
    const newRatings = Array.from({ length: 20 }, (_, index) => `Rating ${index + 1 + (page - 1) * 20}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newRatings);
      }, 1000);
    });
  };



  const onClaimChange = (event) => {
    const claim = event.target.value;
    const truncatedClaim = claim.length > 150 ? claim.substring(0, 150) : claim;
    const newSlug = maker(truncatedClaim);
    setClaim(truncatedClaim);
    setSlug(newSlug);
  };

  useEffect(() => {
    fetchClaimants(1).then((newClaimants) => {
      setClaimants(newClaimants);
    });
    fetchRatings(1).then((newRatings) => {
      setRatings(newRatings);
    });
  }, []);

  return (
    <form onSubmit={handleSubmit} style={{ width: '75%', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
    <div style={{ marginBottom: '10px' }}>
      <label>Claim</label>
      <textarea
        value={claim}
        onChange={onClaimChange}
        rows={4}
        placeholder="Enter claim...."
        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
    </div>
    <div style={{ marginBottom: '10px' }}>
      <label>Slug</label>
      <input
        type="text"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="Enter slug..."
        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
    </div>
    <div style={{ marginBottom: '10px' }}>
      <label>Fact</label>
      <textarea
        value={fact}
        onChange={(e) => setFact(e.target.value)}
        rows={4}
        placeholder="Enter fact...."
        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
    </div>
    <div style={{ marginBottom: '10px' }}>
      <label>Claimant</label>
      <select
        value={claimant}
        onChange={(e) => setClaimant(e.target.value)}
        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        {claimants.map((claimant) => (
          <option key={claimant} value={claimant}>
            {claimant}
          </option>
        ))}
      </select>
    </div>
    <div style={{ marginBottom: '10px' }}>
      <label>Rating</label>
      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        {ratings.map((rating) => (
          <option key={rating} value={rating}>
            {rating}
          </option>
        ))}
      </select>
    </div>
    <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
        <div style={{ flex: 1 }}>
          <label>Claim Date</label>
          <input
            type="date"
            value={claimDate}
            onChange={(e) => setClaimDate(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label>Checked Date</label>
          <input
            type="date"
            value={checkedDate}
            onChange={(e) => setCheckedDate(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
      </div>
    <button type="submit" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer' }}>
      Submit
    </button>
  </form>
  );
};



export const AddNewClaim  = ({ editor, setIsVisible , isVisible , setMeta }) => { 
  return(<Modal
      isOpen={isVisible}
      onClose={() => {
        setIsVisible(()=>{ console.log("this is called"); return false });
      }}
     closeButton={false}
    >
        <div className="scooter-editor-add-existing-claim">
            <div className="scooter-editor-add-existing-claim__content ">
               <AddNewClaimForm editor={editor} setIsVisible={setIsVisible} />
            </div>
        </div>
        </Modal>)
}








