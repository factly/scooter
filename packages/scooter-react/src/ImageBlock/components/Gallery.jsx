import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function Items({ currentItems, onSubmit }) {
  return (
    <div className="images-container">
      {currentItems &&
        currentItems.map((image, index) => (
          <div
            key={index}
            className="scooter-editor-unsplash-gallery__item"
            data-cy={`scooter-editor-unsplash-image-picker-result-${index}`}
          >
            <div
              className="scooter-editor-unsplash-gallery__item-placeholder"
              style={{
                // paddingBottom: `${(image.height / image.width) * 100}%`,
                paddingBottom: "56.5%",
              }}
            >
              <div
                className="scooter-editor-unsplash-gallery__item-inner"
                id={`unsplashImage${index}`}
              >
                <img src={image.src} onClick={() => onSubmit(image.src)} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default function Gallery({
  itemsPerPage = 12,
  onSubmit,
  imagesFetcher,
}) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [imageData, setImagesData] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    imagesFetcher &&
      imagesFetcher(currentPage).then(data => setImagesData(data));
  }, [currentPage]);

  useEffect(() => {
    if (imageData) {
      setPageCount(Math.ceil(imageData.total / itemsPerPage));
      const temp =
        imageData &&
        imageData.nodes.map(image => {
          return { src: image.url.proxy };
        });
      setCurrentItems(temp);
    }
  }, [imageData]);

  // Invoke when user click to request another page.
  const handlePageClick = event => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <div className="scooter-editor-unsplash-wrapper">
      <div className="scooter-editor-unsplash-gallery">
        <Items currentItems={currentItems} onSubmit={onSubmit} />
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
    </div>
  );
}
