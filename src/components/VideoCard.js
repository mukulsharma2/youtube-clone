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
    <div className="shadow rounded-lg w-64 m-2 p-2 box-border">
      <div className="relative">
        <LazyLoadImage src={thumbnails?.medium?.url} effect='opacity' style={{'borderRadius': '0.5rem'}} />
        <span className="rounded-sm text-sm absolute right-1 bottom-2 bg-black text-white">
          {convertDuration(contentDetails?.duration)}
        </span>
      </div>
      <ul>
        <li className="font-bold my-1">{title.substring(0, 50)}</li>
        <li className="flex items-center font-medium text-gray-800">
        <LazyLoadImage src={thumbnails?.medium?.url} effect='opacity' style={{'height':'2rem', 'width':'2rem', 'marginRight':'0.5rem', 'borderRadius': '9999px'}} />
          {channelTitle.substring(0, 20)}</li>
        <li className="text-sm rounded-full mt-2">{formatViews(statistics?.viewCount) || "200K"} views • {moment(snippet?.publishedAt).fromNow()}</li>
      </ul>
    </div>
  );
};

export default VideoCard;
