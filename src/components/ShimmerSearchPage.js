import React from "react";
import { randomString } from "../utils/helper";

const ShimmerSearchPage = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {[...Array(20)].map(() => {
        return (
          <div key={randomString(10)} className="m-5 flex flex-row w-full">
            <div className="w-32 sm:w-56 h-28 sm:h-36 bg-gray-300 rounded-lg"></div>
            <div className="flex flex-col ml-3">
              <div className="m-1 w-48 sm:w-80 md:w-96 lg:w-[35rem] h-4 sm:h-7 rounded-sm bg-gray-300"></div>
              <div className="m-1 w-44 sm:w-72 md:w-80 lg:w-[30rem] h-4 sm:h-7 rounded-sm bg-gray-300"></div>
              <div className="m-1 w-40 sm:w-64 md:w-72 lg:w-96 h-4 sm:h-7 rounded-sm bg-gray-300"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShimmerSearchPage;
