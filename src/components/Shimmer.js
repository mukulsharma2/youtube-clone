import React from "react";
import { randomString } from "../utils/helper";

const Shimmer = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {[...Array(20)].map( () => {
        return (
          <div key={randomString(8)} className="m-3">
            <div className="w-56 h-36 bg-gray-300 rounded-lg"></div>
            <div className="flex flex-row items-center ml-1">
              <div className="m-1 w-9 h-9 rounded-full bg-gray-300"></div>
              <div className="m-1 w-40 h-7 rounded-sm bg-gray-300"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Shimmer;
