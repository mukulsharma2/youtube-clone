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
    try{const data = await fetch(YOUTUBE_API + process.env.REACT_APP_API_KEY);
    const json = await data.json();
    setNextPage(json.nextPageToken);
    setVideos(json.items);}
    catch(error){
      console.log(error);
    }
  };

  const getMoreVideos = async () => {
    try{if (nextPage) {
      // if selected category is 'All'
      if (activeElement === "All") {
        const data = await fetch(
          YOUTUBE_API + process.env.REACT_APP_API_KEY + "&pageToken=" + nextPage
        );
        const json = await data.json();
        setNextPage(json.nextPageToken);
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
        setVideos([...videos, ...json.items]);
      }
    }}
    catch(error){
      console.log(error);
    }
  };

  return (
    <>
      {console.log(videos)}

      <div className="flex flex-col flex-wrap items-center border border-black w-[85%]">
        <MyContext.Provider value={setVideos}>
          <ButtonList
            activeElement={activeElement}
            setActiveElement={setActiveElement}
          />
        </MyContext.Provider>

        <div className="flex flex-row flex-wrap justify-center">
          <InfiniteScroll
            dataLength={videos.length}
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
              {videos.length === 0 && <Shimmer />}
              {videos &&
                videos?.map((video) => {
                  return (
                    <Link
                      key={randomString(20)}
                      to={
                        "/watch?v=" +
                        (video.id.videoId ? video.id.videoId : video.id)
                      }
                    >
                      <VideoCard info={video} />
                    </Link>
                  );
                })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default VideoContainer;
