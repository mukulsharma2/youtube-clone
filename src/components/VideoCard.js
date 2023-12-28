import React from "react";
import moment from "moment/moment";
import { formatViews } from "../utils/helper";
import { LazyLoadImage } from "react-lazy-load-image-component";

const VideoCard = ({ info }) => {
  const { snippet, statistics, contentDetails } = info;
  const { channelTitle, title, thumbnails } = snippet;

  const convertDuration = (duration) => {
    const seconds = moment.duration(duration).asSeconds();
    return moment.utc(seconds * 1000).format("mm:ss");
  };

  return (
    <div className="flex flex-col items-center shadow border rounded-lg m-2 p-2 box-border">
      <div className="relative w-fit mt-1">
        <LazyLoadImage
          src={thumbnails?.medium?.url}
          effect="opacity"
          style={{ borderRadius: "0.5rem", width: "24rem" }}
        />
        <span className="rounded-sm text-sm absolute right-1 bottom-2 bg-black text-white">
          {convertDuration(contentDetails?.duration)}
        </span>
      </div>
      <ul className="ml-4 w-full">
        <li className="font-bold text-xl my-1">{title.substring(0, 50)}</li>
        <li className="text-lg flex items-center font-medium text-gray-800">
          <LazyLoadImage
            src={thumbnails?.medium?.url}
            effect="opacity"
            style={{
              height: "2.5rem",
              width: "2.5rem",
              marginRight: "0.5rem",
              borderRadius: "9999px",
            }}
          />
          {channelTitle.substring(0, 20)}
        </li>
        <li className="mt-2">
          {formatViews(statistics?.viewCount) || "200K"} views •{" "}
          {moment(snippet?.publishedAt).fromNow()}
        </li>
      </ul>
    </div>
  );
};

export default VideoCard;
