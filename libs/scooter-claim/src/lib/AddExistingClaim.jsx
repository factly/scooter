import { Modal } from "@factly/scooter-ui";
import { useState, useRef , useEffect } from "react";
import ReactPaginate from "react-paginate";

function convertArrayToObject(array) {
    const result = {};
    
    for (const item of array) {
      result[item.id] = { ...item };
    }
    
    return result;
  }

  const fetchClaimsFromAPI = (searchTerm, page) => {
    return new Promise((resolve, reject) => {
      // Check if page is a valid number, default to 1 if not provided or invalid
      const pageNumber = Number.isInteger(page) && page > 0 ? page : 1;
  
      // Simulating API delay with setTimeout
      setTimeout(() => {
        // Simulated API response
        const claims = [
          { id: pageNumber, order:pageNumber ,claim: "Claim" + pageNumber + (searchTerm ? searchTerm : ""), fact: "Fact" + pageNumber },
          { id: pageNumber + 1, order:pageNumber+1 , claim: "Claim" + (pageNumber + 1) + (searchTerm ? searchTerm : ""), fact: "Fact" + (pageNumber + 1) },
          { id: pageNumber + 2, order:pageNumber+2, claim: "Claim" + (pageNumber + 2) + (searchTerm ? searchTerm : ""), fact: "Fact" + (pageNumber + 2) },
        ];
        resolve(claims);
      }, 1000);
    });
  };
const  claimsFetecher = (searchTerm , page) => {
    return fetchClaimsFromAPI(searchTerm , page) }

const SearchClaimsComponent = ({ editor , setIsVisible , setMeta }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [claims, setClaims] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
   
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
   
    useEffect(() => {
      if(!searchTerm){
        setClaims([]);
        return;
      }
      claimsFetecher &&
        claimsFetecher(searchTerm , currentPage).then(data => setClaims(data));
    }, [currentPage]);

    const handlePageClick = event => {
      setCurrentPage(event.selected + 1);
    };

    const inputRef = useRef(null); // Create a ref for the input element
  // ... rest of the code ...

  useEffect(() => {
    // Set focus on the input element when the component is rendered
    inputRef.current.focus();
  }, []);
  
    const handleSelectClaim = (claim) => {
      editor
      .chain()  
      .setClaim({ id: claim.id, order: claim.order , claim: claim.claim , fact: claim.fact })
      .insertContentAt(editor.state.selection.head+1,"<p></p>")
      .focus(editor.state.selection.head+1)
      .run();
     setIsVisible(false);
    };
  
    const handleSearch = () => {
      setIsLoading(true);
      claimsFetecher(searchTerm)
        .then((claims) => {
          setClaims(claims);
        }
        )
        .catch((error) => {
          console.error('Error fetching claims:', error);
          // Handle error if needed
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
  
    return (
        <div style={{ display: 'flex', flexDirection: 'column' , flexGrow : "1" }}>
            <div style={{ display: 'flex', flexDirection: 'row'  }}>
            <input
            ref={inputRef}
          type="text"
          value={searchTerm}
          placeholder="Search claims"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '5px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            flexGrow : "1"
          }}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginLeft: '10px',
          }}
        >
        {isLoading ? 'Searching...' : 'Search'}
             </button>
            </div>
        {isLoading ? ( <div style={{ marginTop: '10px' }}>Loading...</div>) : ( <table style={{ marginTop: '10px', borderCollapse: 'collapse' }}>
            {claims.length?<thead>
              <tr>
                <th style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }}>Claims</th>
              </tr>
            </thead>:null}
            <tbody>
              {claims.map((claim) => (
                <tr
                  key={claim.id}
                  onClick={() => handleSelectClaim(claim)}
                  style={{
                    marginBottom: '5px',
                    cursor: 'pointer',
                  }}
                >
                  <td style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }}>{claim.claim}</td>
                </tr>
              
              ))}
            </tbody>
            {claims.length?<>
             <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={5}
                renderOnZeroPageCount={null}
                pageLinkClassName="page-link"
                pageClassName="page-item"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
              />
              </>
              :null}
          </table>
        )}
      </div>
    );
  };



export const AddExistingClaim  = ({ editor, setIsVisible , isVisible , setMeta }) => { 
    return(<Modal
        isOpen={isVisible}
        onClose={() => {
          setIsVisible(()=>{ console.log("this is called"); return false });
        }}
       closeButton={false}
      >
          <div className="scooter-editor-add-existing-claim">
              <div className="scooter-editor-add-existing-claim__content ">
                 <SearchClaimsComponent editor={editor} setIsVisible={setIsVisible} setMeta={setMeta}  />
              </div>
          </div>
          </Modal>)
}
