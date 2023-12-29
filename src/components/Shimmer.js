import React from "react";
import { randomString } from "../utils/helper";

const Shimmer = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {[...Array(20)].map(() => {
        return (
          <div
            key={randomString(8)}
            className="m-3 w-2/3 sm:w-[30%] 2xl:w-1/5 h-44 sm:h-52"
          >
            <div className="w-full h-3/4 bg-gray-300 rounded-lg"></div>
            <div className="flex flex-row items-center ml-1">
              <div className="m-1 w-9 h-9 rounded-full bg-gray-300"></div>
              <div className="m-1 w-48 lg:w-56 h-7 rounded-sm bg-gray-300"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Shimmer;
