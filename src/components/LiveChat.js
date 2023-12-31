import React, { useEffect, useState } from "react";
import LiveChatMessage from "./LiveChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice.js";
import { YOUTUBE_COMMENTS_API } from "../utils/constants.js";
import { useSearchParams } from "react-router-dom";
import { randomString } from "../utils/helper.js";

const LiveChat = () => {
  const dispatch = useDispatch();
  // Subscribing to redux store
  const chatMessages = useSelector((store) => store.chat.messages);
  const [liveMessage, setLiveMessage] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const interval = setInterval(() => {
      // API polling after every 5 seconds
      getData();
    }, 5000);

    // Stop API polling on component unmount
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    try {
      const data = await fetch(
        YOUTUBE_COMMENTS_API +
          searchParams.get("v") +
          "&maxResults=5&key=" +
          process.env.REACT_APP_API_KEY
      );
      const json = await data.json();

      if (json.error) {
        return;
      }

      const arr = json?.items;
      // eslint-disable-next-line
      arr.map((element) => {
        // Add every live chat comment to redux
        dispatch(
          addMessage({
            name: element?.snippet?.topLevelComment?.snippet?.authorDisplayName,
            message: element?.snippet?.topLevelComment?.snippet?.textDisplay,
          })
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="hidden lg:block w-full">
      <div className="mr-3 border border-gray-500 rounded-lg h-96 bg-gray-100 overflow-y-scroll flex flex-col-reverse">
        {chatMessages?.map((e) => {
          return (
            <LiveChatMessage
              key={randomString(20)}
              name={e.name}
              message={e.message}
            />
          );
        })}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            addMessage({
              name: "You",
              message: liveMessage,
            })
          );
          setLiveMessage("");
        }}
        className="border border-t-0 border-gray-500 mr-2 w-[97%] flex items-center p-2 rounded-lg"
      >
        <input
          type="text"
          className="w-3/4 border px-2"
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
        />
        <button className="bg-green-100 px-3 py-1 mx-2 rounded-xl font-semibold">
          Send
        </button>
      </form>
    </div>
  );
};

export default LiveChat;
