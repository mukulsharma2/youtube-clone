import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SearchVideoCard = ({ info, showDescription }) => {
  return (
    <div className="border-b border-black flex flex-row m-2 p-2">
      <div className="relative mr-3">
        {/* <img src={info?.snippet?.thumbnails?.medium?.url} alt="thumbnail" className='h-52 rounded-xl' /> */}
        <div className="rounded-xl overflow-hidden h-fit">
          <LazyLoadImage
            src={info?.snippet?.thumbnails?.medium?.url}
            effect="opacity"
          />
        </div>
        <span className="rounded-sm text-sm absolute right-1 bottom-2 bg-black text-white">
          10:00
        </span>
      </div>

      <div>
        <div className="font-semibold mb-2">{info?.snippet?.title}</div>
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full mr-1"
            src={info?.snippet?.thumbnails?.medium?.url}
          />
          {info?.snippet?.channelTitle}
        </div>
        {showDescription && <div className="w-11/12">
          {info?.snippet?.description}
        </div>}
      </div>
    </div>
  );
};

export default SearchVideoCard;
