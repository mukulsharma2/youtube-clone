import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SearchVideoCard = ({ info, showDescription }) => {
  return (
    <div className="border-b border-black flex flex-row m-2 p-2">
      <div className="relative mr-3 items-center h-fit w-fit">
        <div className="w-fit rounded-xl overflow-hidden">
          <LazyLoadImage
            src={info?.snippet?.thumbnails?.medium?.url}
            effect="opacity"
          />
        </div>
        <span className="w- rounded-sm text-sm absolute right-1 bottom-2 bg-black text-white">
          10:00
        </span>
      </div>

      <div>
        <div className="font-semibold mb-2">{showDescription? (info?.snippet?.title) : (info?.snippet?.title?.substring(0, 50))}</div>
        <div className="flex items-center">
          <LazyLoadImage
            src={info?.snippet?.thumbnails?.medium?.url}
            effect="opacity"
            style={{width:'2rem', height:'2rem', marginRight:'0.5rem', borderRadius:'9999px'}}
          />
          {showDescription? (info?.snippet?.channelTitle) : (info?.snippet?.channelTitle?.substring(0, 20))}
        </div>
        {showDescription && <div className="w-11/12">
          {info?.snippet?.description}
        </div>}
      </div>
    </div>
  );
};

export default SearchVideoCard;
