import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SearchVideoCard = ({ info }) => {
  return (
    <div className="border border-black flex flex-row m-2 p-2">
      <div className="relative">
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
        <div>{info?.snippet?.title}</div>
        <div>{info?.snippet?.channelTitle}</div>
      </div>
    </div>
  );
};

export default SearchVideoCard;
