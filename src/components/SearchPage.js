import React, { useEffect, useState } from "react";
import SearchVideoCard from "./SearchVideoCard.js";
import { Link, useSearchParams } from "react-router-dom";
import { YOUTUBE_SEARCH_API } from "../utils/constants.js";
import ShimmerSearchPage from "./ShimmerSearchPage.js";
import InfiniteScroll from "react-infinite-scroll-component";
import { ColorRing } from "react-loader-spinner";
import { randomString } from "../utils/helper.js";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchData, setSearchData] = useState([]);
  const [nextPage, setNextPage] = useState("");

  useEffect(() => {
    getSearchData();

    return () => {
      // On component unmounting setSearchData to empty array to show shimmer
      setSearchData([]);
    };
    // eslint-disable-next-line
  }, [searchParams.get("search_query")]);

  const getSearchData = async () => {
    try {
      const data = await fetch(
        YOUTUBE_SEARCH_API +
          searchParams.get("search_query") +
          "&key=" +
          process.env.REACT_APP_API_KEY
      );
      const json = await data.json();
      setSearchData(json.items);
      setNextPage(json.nextPageToken);
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreSearchData = async () => {
    // Only run if nextPage is present
    if (nextPage) {
      try {
        const data = await fetch(
          YOUTUBE_SEARCH_API +
            searchParams.get("search_query") +
            "&pageToken=" +
            nextPage +
            "&key=" +
            process.env.REACT_APP_API_KEY
        );
        const json = await data.json();
        setNextPage(json?.nextPageToken);
        setSearchData([...searchData, ...json.items]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="absolute top-24 sm:top-16 right-0 mx-1 my-2 sm:m-3 sm:p-3 md:w-[88vw] lg:w-[91vw]">
      {searchData?.length === 0 && <ShimmerSearchPage />}
      <InfiniteScroll
        dataLength={searchData?.length}
        next={getMoreSearchData}
        hasMore={true}
        loader={
          <ColorRing
            visible={true}
            height="60"
            width="60"
            ariaLabel="blocks-loading"
            wrapperStyle={{
              margin: "auto",
            }}
            wrapperClass="blocks-wrapper "
            colors={["#808080", "#808080", "#808080", "#808080", "#808080"]}
          />
        }
      >
        {searchData &&
          searchData.map((element) => {
            return (
              <Link
                to={"/home/watch?v=" + element?.id?.videoId}
                key={element?.id?.videoId + randomString(20)}
              >
                <SearchVideoCard info={element} showDescription={true} />
              </Link>
            );
          })}
      </InfiniteScroll>
    </div>
  );
};

export default SearchPage;
