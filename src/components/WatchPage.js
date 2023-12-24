import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_COMMENTS_API } from "../utils/constants";
import Comment from "./Comment.js";
import LiveChat from "./LiveChat.js";
import WatchPageData from "./WatchPageData.js";
import RelatedVideos from "./RelatedVideos.js";

const WatchPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
    getCommentsData();

    // eslint-disable-next-line
  }, []);
  const [comments, setComments] = useState();

  const getCommentsData = async () => {
    try{const data = await fetch(
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

    setComments(json.items);}
    catch(error){
      console.log(error);
    }
  };

  const [searchParams] = useSearchParams();
  
  return (
    <>
      <div className="flex flex-col w-[61%]">
        <div className="mx-1">
          <iframe
            width="800"
            height="400"
            src={
              "https://www.youtube.com/embed/" +
              searchParams.get("v") +
              "?rel=0"
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <WatchPageData />

        <div className="py-2">
          <span className="font-bold">Comments:</span>
          {comments && comments.error && (
            <div>Comments are disabled for this video.</div>
          )}
          {comments && !comments.error && comments.map((comment) => {
            return <Comment key={comment.id} info={comment} />;
          })}
        </div>
      </div>

      <div className="w-1/4">
        <LiveChat />
        <RelatedVideos />
      </div>
    </>
  );
};

export default WatchPage;
