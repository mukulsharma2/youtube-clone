import React, { useEffect, useState } from "react";
import { YOUTUBE_RELATED_VIDEOS_API } from "../utils/constants";
import SearchVideoCard from "./SearchVideoCard";
import { randomString } from "../utils/helper";

  const RelatedVideos = ({query}) => {
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
        setVideos(json.items);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
    <h3 className="m-2 font-semibold text-2xl">Related Videos:</h3>
      {
      videos.length>3 &&
      videos.map(video=>{
        return <SearchVideoCard key={randomString(11)} info={video} showDescription={false} />
      })
      }
    </>
  );
};

export default RelatedVideos;
