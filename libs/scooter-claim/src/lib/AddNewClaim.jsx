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

  const getFormattedDate = (date) => {
    // Convert the input date to a Date object
    const inputDate = new Date(date);

    // Calculate the IST time (Hyderabad timezone)
    const hyderabadTimezoneOffset = 330; // IST offset in minutes (UTC+05:30)
    const istTime = new Date(inputDate.getTime() + (hyderabadTimezoneOffset * 60 * 1000));

    // Format the date in the desired format
    const formattedDate = istTime.toISOString().slice(0, 19) + "+05:30";
    return formattedDate;
  };



const AddNewClaimForm = ({editor , setIsVisible , claimConfig}) => {
  const [claim, setClaim] = useState('');
  const [slug, setSlug] = useState('');
  const [fact, setFact] = useState('');
  const [claimant, setClaimant] = useState('');
  const [rating, setRating] = useState('');
  const [claimants, setClaimants] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [claimDate, setClaimDate] = useState('');
  const [checkedDate, setCheckedDate] = useState('');
  const { claimantsFetcher, addClaim ,  ratingsFetcher  } = claimConfig 
  


  const handleSubmit = (event) => {
    event.stopPropagation()
    event.preventDefault();
    
    // Perform form submission logic
    const formData = {
      claim,
      slug,
      fact,
      claimant_id:claimant,
      rating_id:rating,
      claim_date:getFormattedDate(claimDate),
      checked_date:getFormattedDate(checkedDate)
    };
  
    addClaim(formData).then((claim) => {
   
      editor
      .chain()  
      .setClaim({ id: claim.id, order: claim?.order??1 , claim: claim.claim , fact: claim.fact })
      .insertContentAt(editor.state.selection.head+1,"<p></p>")
      .focus(editor.state.selection.head+1)
      .run();
     setIsVisible(false);
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
    claimantsFetcher(1).then((newClaimants) => {
      const {nodes : claimantData , total } = newClaimants ;
      setClaimants(claimantData);
    });
    ratingsFetcher(1).then((newRatings) => {
      const {nodes : ratingData , total } = newRatings ;
      setRatings(ratingData);
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
        <option style={{display:"none"}}value="">Select Claimant</option>
        {claimants.map((claimant) => (
          <option key={claimant.id} value={claimant.id}>
            {claimant.name}
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
         <option style={{display:"none"}} value="">Select Rating</option>
        {ratings.map((rating) => (
          <option key={rating.id} value={rating.id}>
            {rating.name}
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



export const AddNewClaim  = ({ editor, setIsVisible , isVisible , setMeta , claimConfig }) => { 
  return(<Modal
      isOpen={isVisible}
      onClose={() => {
        setIsVisible(()=>{ return false });
      }}
     closeButton={false}
    >
        <div className="scooter-editor-add-existing-claim">
            <div className="scooter-editor-add-existing-claim__content ">
               <AddNewClaimForm editor={editor} setIsVisible={setIsVisible} claimConfig={claimConfig} />
            </div>
        </div>
        </Modal>)
}








