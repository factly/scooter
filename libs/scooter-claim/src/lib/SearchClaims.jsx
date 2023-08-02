import React, { useState, useRef, useEffect } from "react";
import ReactPaginate from "react-paginate";

const InputComponent = ({ searchTerm, setSearchTerm }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' , flex:"1" }}>
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
          flexGrow: "1"
        }}
      />
    </div>
  );
};

const ButtonComponent = ({ isLoading, handleSearch }) => {
  return (
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
  );
};

const LoadingComponent = () => {
  return <div style={{ marginTop: '10px' }}>Loading...</div>;
};

const TableComponent = ({ claims, handleSelectClaim }) => {
    console.log("claimss", claims)
  return (
    <table
      style={{
        marginBottom: '10px',
        marginTop: '10px',
        borderCollapse: 'collapse',
        width: '100%', // Set table width to 100%
      }}
    >
      {claims.length ? (
        <thead>
          <tr>
            <th
              style={{
                padding: '5px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                width: '10%', // Set width of S.No column
              }}
            >
              S.No
            </th>
            <th
              style={{
                padding: '5px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            >
              Claim
            </th>
          </tr>
        </thead>
      ) : null}
      <tbody>
        {claims?.map((claim, index) => (
          <tr
            key={claim.id}
            onClick={() => handleSelectClaim(claim)}
            style={{
              marginBottom: '5px',
              cursor: 'pointer',
            }}
          >
            <td
              style={{
                padding: '5px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                width: '10%', // Set width of S.No column
              }}
            >
              {index + 1}
            </td>
            <td
              style={{
                padding: '5px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            >
              {claim.claim}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const PaginationComponent = ({ claims, pageCount, handlePageClick }) => {
    console.log("claimsss", claims)
  return (
    <>
      {claims.length ?
        <div style={{ marginLeft: 'auto' }}>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
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
        </div>
        : null}
    </>
  );
};

const SearchClaimsComponent = ({ editor, setIsVisible, setMeta, claimsFetcher, itemsPerPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [claims, setClaims] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!searchTerm) {
      setClaims([]);
      return;
    }
    claimsFetcher &&
      claimsFetcher(searchTerm, currentPage).then((claims) => {
        const { nodes: claimData, total } = claims;
        setClaims(claimData);
      });
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  const handleSelectClaim = (claim) => {
    editor
      .chain()
      .setClaim({ id: claim.id, order: claim?.order ?? 1, claim: claim.claim, fact: claim.fact })
      .insertContentAt(editor.state.selection.head + 1, "<p></p>")
      .focus(editor.state.selection.head + 1)
      .run();
    setIsVisible(false);
  };

  const handleSearch = () => {
    setIsLoading(true);
    claimsFetcher(searchTerm)
      .then((claims) => {
        const { nodes: claimData, total } = claims;
        setPageCount(Math.ceil(total / itemsPerPage));
        setClaims(claimData);
      })
      .catch((error) => {
        console.error('Error fetching claims:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  console.log("claims", claims)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: "1" }}>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent:"space-between" }}>
       <InputComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
       <ButtonComponent isLoading={isLoading} handleSearch={handleSearch} />
         </div>
      {isLoading ? (<LoadingComponent />) : (
        <>
          <TableComponent claims={claims} handleSelectClaim={handleSelectClaim} />
          {claims.length ?
            <PaginationComponent claims={claims} pageCount={pageCount} handlePageClick={handlePageClick} />
            : null}
        </>
      )}
    </div>
  );
};

export default SearchClaimsComponent;