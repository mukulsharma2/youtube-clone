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
        if(json.error){return;}
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
      {
      videos?.length > 0 &&
      videos?.map(video=>{
        return <SearchVideoCard key={randomString(11)} info={video} showDescription={false} />
      })
      }
    </>
  );
};

export default RelatedVideos;
