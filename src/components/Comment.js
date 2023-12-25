import React from "react";

const Comment = ({ info }) => {
  const { snippet } = info;
  const { topLevelComment } = snippet;

  return (
    <div className="w-full my-2 p-3 flex flex-row bg-gray-100 rounded-xl">
      <img
        className="w-10 h-10 rounded-full mt-1"
        src={topLevelComment?.snippet?.authorProfileImageUrl}
        alt="user"
      />
      <div className="flex flex-col items-start ml-3">
        <div className="font-semibold">
          {topLevelComment?.snippet?.authorDisplayName}
        </div>

        <div className="w-11/12 flex flex-wrap">{topLevelComment?.snippet?.textDisplay}</div>
      </div>
    </div>
  );
};

export default Comment;
