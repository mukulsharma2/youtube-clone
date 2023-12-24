import React from "react";

const Comment = ({ info }) => {
//   console.log(info);
  const { snippet } = info;
  const { topLevelComment } = snippet;

  return (
    <div className="w-[60%] m-2 p-2 flex flex-row items-center bg-gray-100">
      <img
        className="w-8 h-8 rounded-full"
        src={topLevelComment?.snippet?.authorProfileImageUrl}
        alt="user"
      />
      <div className="flex flex-col items-start ml-2">
        <div className="font-semibold">
          {topLevelComment?.snippet?.authorDisplayName}
        </div>

        <div className="w-11/12 flex flex-wrap">{topLevelComment?.snippet?.textDisplay}</div>
      </div>
    </div>
  );
};

export default Comment;
