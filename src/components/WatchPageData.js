import React, { useState } from "react";
import moment from "moment";
import { formatViews } from "../utils/helper";
import { MdThumbUp, MdThumbDown } from "react-icons/md";

const WatchPageData = ({data}) => {
  const [showMore, setShowMore] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <div className="py-2">
      <div className="">
        <h5 className="font-bold text-2xl">{data?.snippet?.title}</h5>
      </div>
      <div className="py-3 my-2 flex items-center">
        <div className="flex justify-between w-full">
          <div className="flex w-3/4 items-center">
            <img
              src={data?.snippet?.thumbnails?.medium?.url}
              alt="thumbnail"
              className="rounded-full w-12 h-12"
            />
            <div className="flex flex-col mr-6 ml-3">
              <span className="font-semibold text-lg">
                {data?.snippet?.channelTitle}
              </span>
              <span className="text-sm text-slate-600">
                {" "}
                {formatViews(data?.statistics?.likeCount)} subscribers
              </span>
            </div>
            <button className={"text-white rounded-3xl py-2 px-3 font-bold border border-white h-11" + (isSubscribed? " bg-black" : " bg-red-600")}
            onClick={()=>setIsSubscribed(!isSubscribed)}
            >
              {isSubscribed? "Subscribed" : "Subscribe"}
            </button>
          </div>
          <div className="flex">
            <span className="mr-3">
              <MdThumbUp size={26} />{" "}
              {formatViews(data?.statistics?.likeCount)}
            </span>
            <span className="mr-5">
              <MdThumbDown size={26} />
            </span>
          </div>
        </div>
      </div>
      <div className="bg-[#0000000d] rounded-xl p-3">
        <div className="py-1 flex justify-between items-center">
          <span className="font-semibold text-slate-600">
            {formatViews(data?.statistics?.viewCount)} Views •{" "}
            {moment(data?.snippet?.publishedAt).fromNow()}
          </span>
        </div>
        {showMore
          ? data?.snippet?.description
          : data?.snippet?.description.substring(0, 250)}
        {data?.snippet?.description?.length > 250 && 
        <div
          className="my-2 cursor-pointer font-semibold text-slate-600"
          onClick={() => setShowMore(!showMore)}
          >
          {showMore ? "Show less" : "...more"}
        </div>}
      </div>
    </div>
  );
};

export default WatchPageData;
