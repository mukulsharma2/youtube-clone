import React, { useEffect, useState } from "react";
import { YOUTUBE_API, YOUTUBE_SEARCH_API } from "../utils/constants.js";
import VideoCard from "./VideoCard.js";
import ButtonList from "./ButtonList.js";
import { Link } from "react-router-dom";
import { MyContext } from "../utils/MyContext.js";
import InfiniteScroll from "react-infinite-scroll-component";
import { ColorRing } from "react-loader-spinner";
import Shimmer from "./Shimmer.js";
import { randomString } from "../utils/helper.js";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [activeElement, setActiveElement] = useState("All");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await fetch(YOUTUBE_API + process.env.REACT_APP_API_KEY);
      const json = await data.json();
      setNextPage(json.nextPageToken);
      setVideos(json.items);
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreVideos = async () => {
    try {
      // Only run getMoreVideos if nextPage is available
      if (nextPage) {
        // if selected category is 'All'
        if (activeElement === "All") {
          const data = await fetch(
            YOUTUBE_API +
              process.env.REACT_APP_API_KEY +
              "&pageToken=" +
              nextPage
          );
          const json = await data.json();
          setNextPage(json.nextPageToken);
          // setVideos to previous + new videos
          setVideos([...videos, ...json.items]);
        } else {
          // if selected category is not 'All'
          const data = await fetch(
            YOUTUBE_SEARCH_API +
              activeElement +
              "&pageToken=" +
              nextPage +
              "&key=" +
              process.env.REACT_APP_API_KEY
          );
          const json = await data.json();
          setNextPage(json.nextPageToken);
          // setVideos to previous + new videos
          setVideos([...videos, ...json.items]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full md:w-[90vw] lg:w-[93vw] 2xl:w-[95vw] flex flex-col flex-wrap items-center absolute top-[6.5rem] sm:top-16 right-0">
      {/* context API to prevent props drilling */}
      <MyContext.Provider value={setVideos}>
        <ButtonList
          activeElement={activeElement}
          setActiveElement={setActiveElement}
        />
      </MyContext.Provider>

      <div className="flex flex-row flex-wrap justify-center">
        <InfiniteScroll
          dataLength={videos?.length}
          next={getMoreVideos}
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
          <div className="flex flex-row flex-wrap justify-center">
            {videos?.length === 0 && <Shimmer />}
            {videos &&
              videos?.map((video) => {
                return (
                  <Link
                    key={randomString(20)}
                    to={
                      "/home/watch?v=" +
                      (video.id.videoId ? video.id.videoId : video.id)
                    }
                    className="w-11/12 sm:w-[30%] m-2"
                  >
                    <VideoCard info={video} />
                  </Link>
                );
              })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default VideoContainer;
