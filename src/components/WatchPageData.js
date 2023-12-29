import React, { useState } from "react";
import moment from "moment";
import { formatViews } from "../utils/helper";
import { MdThumbUp, MdThumbDown } from "react-icons/md";

const WatchPageData = ({ data }) => {
  const [showMore, setShowMore] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <div className="py-2 w-full">
      <h5 className="font-bold text-xl sm:text-2xl">{data?.snippet?.title}</h5>
      <div className="py-3 my-2 flex items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex w-3/4 items-center">
            <img
              src={data?.snippet?.thumbnails?.medium?.url}
              alt="thumbnail"
              className="rounded-full w-8 sm:w-12 h-8 sm:h-12"
            />
            <div className="flex flex-col mr-1 sm:mr-6 ml-1 sm:ml-3">
              <span className="font-semibold text-sm sm:text-lg">
                {data?.snippet?.channelTitle}
              </span>
              <span className="text-xs sm:text-sm text-slate-600">
                {" "}
                {formatViews(data?.statistics?.likeCount)} subscribers
              </span>
            </div>
            <button
              className={
                "mx-1 text-sm sm:text-base flex items-center justify-center text-white rounded-3xl py-2 px-2 sm:px-3 font-semibold sm:font-bold border border-white h-8 sm:h-11" +
                (isSubscribed ? " bg-black" : " bg-red-600")
              }
              onClick={() => setIsSubscribed(!isSubscribed)}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
          <div className="flex">
            <span className="text-center text-xs sm:text-sm mr-3 sm:mr-5">
              <MdThumbUp size={26} /> {formatViews(data?.statistics?.likeCount)}
            </span>
            <span className="mr-2 sm:mr-5">
              <MdThumbDown size={26} />
            </span>
          </div>
        </div>
      </div>
      <div className="bg-[#0000000d] rounded-xl p-3">
        <div className="py-1 flex justify-between items-center">
          <span className="font-semibold text-slate-600">
            {formatViews(data?.statistics?.viewCount)} Views {" • "}
            {moment(data?.snippet?.publishedAt).fromNow()}
          </span>
        </div>
        <div className="w-full overflow-hidden">
          {showMore
            ? data?.snippet?.description
            : data?.snippet?.description.substring(0, 250)}
        </div>
        {data?.snippet?.description?.length > 250 && (
          <div
            className="my-2 cursor-pointer font-semibold text-slate-600"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show less" : "...more"}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPageData;
