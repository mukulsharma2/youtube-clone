import React from "react";
import { YOUTUBE_API, YOUTUBE_SEARCH_API } from "../utils/constants.js";
import { useContext } from "react";
import { MyContext } from "../utils/MyContext.js";

const Button = ({ name, activeElement }) => {
  // context API
  const setVideos = useContext(MyContext);

  const clickHandler = async () => {
    // setVideos of video container component
    setVideos([]);
    if (name === "All") {
      try {
        const data = await fetch(YOUTUBE_API + process.env.REACT_APP_API_KEY);
        const json = await data.json();
        // setVideos of video container component with data
        setVideos(json.items);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const data = await fetch(
          YOUTUBE_SEARCH_API + name + "&key=" + process.env.REACT_APP_API_KEY
        );
        const json = await data.json();
        // setVideos of video container component with data
        setVideos(json.items);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      onClick={clickHandler}
      className={
        "inline-flex justify-center items-center text-sm sm:text-base h-6 sm:h-8 font-semibold rounded-lg w-auto py-1 px-2 sm:px-3 mx-1 sm:mx-2 mb-1 hover:cursor-pointer" +
        (activeElement === name
          ? " bg-black text-white"
          : " bg-[#0000000d] hover:bg-[#0000001a]")
      }
    >
      {name}
    </div>
  );
};

export default Button;
