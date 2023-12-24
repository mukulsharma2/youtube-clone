import React from "react";
import { randomString } from "../utils/helper";

const ShimmerSearchPage = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {[...Array(20)].map( () => {
        return (
          <div key={randomString(10)} className="m-5 flex flex-row w-full">
            <div className="w-56 h-36 bg-gray-300 rounded-lg"></div>
            <div className="flex flex-col ml-3">
              <div className="m-1 w-[35rem] h-7 rounded-sm bg-gray-300"></div>
              <div className="m-1 w-[30rem] h-7 rounded-sm bg-gray-300"></div>
              <div className="m-1 w-[25rem] h-7 rounded-sm bg-gray-300"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShimmerSearchPage;
