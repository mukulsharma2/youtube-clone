import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  return (
    <>
      <div
        className={
          "bg-white border border-black h-[92vh] transition-all duration-500 z-10 fixed left-0 top-14" +
          (isMenuOpen ? " w-48" : " w-14")
        }
      >
        <ul>
          <Link to="/">
            <li
              id="1"
              className="active:bg-red-400 font-bold transition-all duration-500"
            >
              <MdHome />
              Home
            </li>
          </Link>
          <Link to="/results?"></Link>
          <li id="2">Trending</li>
          <li id="3">Music</li>
          <li id="4">Sports</li>
          <li id="5">Movies</li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
