import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar.js";
import { Outlet } from "react-router-dom";
// AIzaSyDK5jUsSveyUOS4mTw1A3JFqR8OW5NYvZA
// AIzaSyDK5jUsSveyUOS4mTw1A3JFqR8OW5NYvZA
// AIzaSyDK5jUsSveyUOS4mTw1A3JFqR8OW5NYvZA
// AIzaSyDK5jUsSveyUOS4mTw1A3JFqR8OW5NYvZA
// AIzaSyDK5jUsSveyUOS4mTw1A3JFqR8OW5NYvZA
const Body = () => {
  return (
    <>
      <div className="flex flex-col h-auto w-screen mx-3 mr-1">
        <Navbar />
        <div className="flex flex-row">
        <Sidebar />
        <Outlet />
        </div>
      </div>
    </>
  );
};

export default Body;
