import React, { useEffect, useState, useRef, useCallback } from "react";

import { searchUnsplashImages } from "../apis/unsplash";
import { useDebounce, isNilOrEmpty } from "@factly/scooter-shared-utils";
import MasonryInfiniteScroller from "react-masonry-infinite";
import { Input } from "postcss";
import { Loader } from "../../components/shared/Loader";

export const UnsplashImagePicker = ({ onSubmit, unsplashApiKey }) => {
  const masonryRef = useRef(null);

  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query || "latest");

  const fetchUnsplashPhotos = useCallback(
    async page => {
      try {
        setLoading(true);
        setError(false);

        const response = await searchUnsplashImages({
          page,
          query: debouncedQuery,
          apiKey: unsplashApiKey,
        });
        const {
          data: { results, total_pages },
        } = response;

        if (page === 1) {
          setImages(results);
        } else {
          setImages([...images, ...results]);
        }

        setPageNo(page + 1);
        setHasMore(page < total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [debouncedQuery, images, unsplashApiKey]
  );

  useEffect(() => {
    fetchUnsplashPhotos(1);
  }, [debouncedQuery, fetchUnsplashPhotos]);

  const loadMore = () => {
    if (loading || !hasMore) return;

    pageNo > 1 && fetchUnsplashPhotos(pageNo);
  };

  return (
    <div className="scooter-editor-unsplash-wrapper">
      <Input
        name="text"
        value={query}
        placeholder="Search Unsplash"
        onChange={({ target: { value } }) => {
          setQuery(value);
        }}
        data-cy="scooter-editor-unsplash-image-picker-search-input"
      />
      {error && (
        <p
          className="scooter-editor-unsplash-gallery__text"
          data-cy="scooter-editor-unsplash-image-picker-error"
        >
          Something went wrong! Please try again later.
        </p>
      )}
      {!error && !loading && isNilOrEmpty(images) && (
        <p
          className="scooter-editor-unsplash-gallery__text"
          data-cy="scooter-editor-unsplash-image-picker-no-results-error"
        >
          No results
        </p>
      )}
      {!error && (
        <div className="scooter-editor-unsplash-container">
          <MasonryInfiniteScroller
            ref={masonryRef}
            pack={true}
            style={{ width: "100%" }}
            sizes={[
              { columns: 3, gutter: 0 },
              { mq: "768px", columns: 3, gutter: 0 },
              { mq: "1024px", columns: 3, gutter: 0 },
            ]}
            hasMore={hasMore}
            loadMore={loadMore}
            position={true}
            useWindow={false}
            className="scooter-editor-unsplash-gallery"
            loader={<Loader key={0} />}
          >
            {images &&
              images.map((image, index) => (
                <div
                  key={index}
                  className="scooter-editor-unsplash-gallery__item"
                  data-cy={`scooter-editor-unsplash-image-picker-result-${index}`}
                >
                  <div
                    className="scooter-editor-unsplash-gallery__item-placeholder"
                    style={{
                      paddingBottom: `${(image.height / image.width) * 100}%`,
                    }}
                  >
                    <div
                      className="scooter-editor-unsplash-gallery__item-inner"
                      id={`unsplashImage${index}`}
                    >
                      <img
                        src={image.urls.regular}
                        onClick={() => onSubmit(image.urls.small)}
                        alt="unsplash"
                      />
                      <a
                        href={`https://unsplash.com/@${image.user.username}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {image.user.name}{" "}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </MasonryInfiniteScroller>
          {!hasMore && (
            <p className="scooter-editor-unsplash-gallery__text">
              End of results
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default UnsplashImagePicker;
