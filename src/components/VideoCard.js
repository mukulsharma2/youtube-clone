import React from "react";
import moment from "moment/moment";
import { formatViews } from "../utils/helper";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const VideoCard = ({ info }) => {
  const { snippet, statistics, contentDetails } = info;
  const { channelTitle, title, thumbnails } = snippet;

  const convertDuration = (duration) => {
    const seconds = moment.duration(duration).asSeconds();
    return moment.utc(seconds * 1000).format("mm:ss");
  };

  return (
    <div className="shadow rounded-lg w-56 m-2 p-2 box-border">
      <div className="relative">
        {/* <img
          className="w-52 my-1"
          src={thumbnails?.medium?.url}
          alt="thumbnail"
        /> */}
        <LazyLoadImage src={thumbnails?.medium?.url} effect='opacity' />
        <span className="rounded-sm text-sm absolute right-1 bottom-1 bg-black text-white">
          {convertDuration(contentDetails?.duration)}
        </span>
      </div>
      <ul>
        <li className="font-bold my-1">{title}</li>
        <li>{channelTitle}</li>
        <li>{formatViews(statistics?.viewCount) || "200K"} views • {moment(snippet?.publishedAt).fromNow()}</li>
      </ul>
    </div>
  );
};

export default VideoCard;
