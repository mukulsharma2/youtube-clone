import React from "react";
import userIcon from "../assets/user.png";

const LiveChatMessage = ({ name, message }) => {
  return (
    <div className="flex items-center bg-slate-100 p-2 m-2">
      <img className="w-6 h-6" src={userIcon} alt="user" />
      <span className="font-bold mx-2">{name.substring(0, 8)}</span>
      <span className="overflow-hidden h-6">{message.substring(0, 35)}</span>
    </div>
  );
};

export default LiveChatMessage;
