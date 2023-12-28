import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import {
  YOUTUBE_COMMENTS_API,
  YOUTUBE_VIDEO_DETAILS_API,
} from "../utils/constants";
import Comment from "./Comment.js";
import LiveChat from "./LiveChat.js";
import WatchPageData from "./WatchPageData.js";
import RelatedVideos from "./RelatedVideos.js";

const WatchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [comments, setComments] = useState();
  const [video, setVideo] = useState();

  useEffect(() => {
    dispatch(closeMenu());
    getCommentsData();

    (async function getVideoDetails() {
      try {
        const data = await fetch(
          YOUTUBE_VIDEO_DETAILS_API +
            searchParams.get("v") +
            "&key=" +
            process.env.REACT_APP_API_KEY
        );
        const json = await data.json();
        setVideo(json.items[0]);
      } catch (error) {
        console.log(error);
      }
    })();

    return ()=>{
      setVideo()
      setComments()
    }
    // eslint-disable-next-line
  }, [searchParams.get("v")]);

  const getCommentsData = async () => {
    try {
      const data = await fetch(
        YOUTUBE_COMMENTS_API +
          searchParams.get("v") +
          "&key=" +
          process.env.REACT_APP_API_KEY
      );
      const json = await data.json();

      if (json.error) {
        setComments(json);
        return;
      }

      setComments(json.items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row w-[94vw] absolute top-16 right-0 justify-between">
      <div className="flex flex-col w-[61%] ml-3 mr-4">
        <iframe
          className="rounded-2xl"
          width="800"
          height="400"
          src={
            "https://www.youtube.com/embed/" + searchParams.get("v") + "?rel=0"
          }
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <WatchPageData data={video} />

        <div className="py-2">
          <h3 className="font-bold text-xl">Comments:</h3>
          {comments && comments.error && (
            <div>Comments are disabled for this video.</div>
          )}
          {comments &&
            !comments.error &&
            comments.map((comment) => {
              return <Comment key={comment.id} info={comment} />;
            })}
        </div>
      </div>

      <div className="w-2/5">
        <LiveChat />
        {video?.snippet?.title && (
          <RelatedVideos query={video?.snippet?.title} />
        )}
      </div>
    </div>
  );
};

export default WatchPage;
