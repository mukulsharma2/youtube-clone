import React, { useEffect, useState } from "react";
import { YOUTUBE_RELATED_VIDEOS_API } from "../utils/constants";
import SearchVideoCard from "./SearchVideoCard";
import { randomString } from "../utils/helper";
import { Link } from "react-router-dom";

const RelatedVideos = ({ query }) => {
  const [videos, setVideos] = useState({});

  useEffect(() => {
    (async function () {
      try {
        const data = await fetch(
          YOUTUBE_RELATED_VIDEOS_API +
            query +
            "&key=" +
            process.env.REACT_APP_API_KEY
        );
        const json = await data.json();
        if (json.error) {
          return;
        }
        setVideos(json.items);
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h3 className="m-2 mt-8 pl-2 font-semibold text-2xl">Related Videos:</h3>
      {videos?.length > 0 &&
        videos?.map((video) => {
          return (
            <Link
              to={"/home/watch?v=" + video?.id?.videoId}
              key={video?.id?.videoId + randomString(11)}
            >
              <SearchVideoCard info={video} showDescription={false} />
            </Link>
          );
        })}
    </>
  );
};

export default RelatedVideos;
