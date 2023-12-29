import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar.js";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Body = () => {
  // Subscribing to redux store
  const userName = useSelector((store) => store.login.name);
  const navigate = useNavigate();

  // if user is not logged in then redirect to login page
  if (!userName) {
    return (
      <div className="w-full flex flex-col justify-center">
        <div className="text-3xl font-extrabold w-fit m-auto my-2">
          Please login first.
        </div>
        <button
          onClick={() => navigate("/")}
          className="w-fit font-medium border m-auto my-2 p-3 rounded-3xl bg-black text-white hover:bg-gray-400 hover:text-black hover:border-black"
        >
          Go to login page
        </button>
      </div>
    );
  }

  return (
    <div className="box-border flex flex-col h-auto w-full mx-3 mr-1">
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
