import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaGamepad,
  FaCode,
  FaTshirt,
  FaHeart,
  FaMusic,
  FaFootballBall,
  FaRegNewspaper,
  FaFilm,
} from "react-icons/fa";
import { closeMenu } from "../utils/appSlice";

const Sidebar = () => {
  // Subscribing to redux store with useSelector hook
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  const [selectedItem, setSelectedItem] = useState("");

  const dispatch = useDispatch();

  // CSS styling object
  const obj = {
    width: "100%",
    height: "100%",
  };

  const arr = [
    { 0: "Trending", 1: <FaHeart style={obj} /> },
    { 0: "Coding", 1: <FaCode style={obj} /> },
    { 0: "Gaming", 1: <FaGamepad style={obj} /> },
    { 0: "Music", 1: <FaMusic style={obj} /> },
    { 0: "Sports", 1: <FaFootballBall style={obj} /> },
    { 0: "News", 1: <FaRegNewspaper style={obj} /> },
    { 0: "Fashion", 1: <FaTshirt style={obj} /> },
    { 0: "Shopping", 1: <FaShoppingCart style={obj} /> },
    { 0: "Movies", 1: <FaFilm style={obj} /> },
  ];

  return (
    <>
      <div
        className={
          "bg-white border-r-2 border-black h-[92vh] transition-all duration-500 z-10 fixed left-0 sm:top-14 top-24 w-fit" +
          (isMenuOpen ? " md:w-48" : " md:w-20 hidden md:block")
        }
      >
        <ul>
          <Link
            to="/home"
            onClick={() => {
              setSelectedItem("Home");
              // Dispatching an action onClick of "Home"
              dispatch(closeMenu());
            }}
          >
            <li
              className={
                "w-fit box-border h-8 md:h-12 rounded-2xl flex items-center m-2 font-bold transition-all duration-500 hover:bg-[#0000001a] hover:border hover:border-black hover:text-black" +
                (!isMenuOpen
                  ? " w-6 md:w-16 justify-center"
                  : " p-2 w-10 md:w-44") +
                (selectedItem === "Home"
                  ? " bg-gray-300"
                  : " bg-black text-white")
              }
            >
              <span className="md:mx-2 w-6 md:w-10">
                {<FaHome style={obj} />}
              </span>
              {isMenuOpen && (
                <span className="hidden md:block font-bold text-xl">Home</span>
              )}
            </li>
          </Link>

          {arr.map((element) => {
            return (
              <Link
                key={element[0]}
                onClick={() => {
                  setSelectedItem(element[0]);
                  dispatch(closeMenu());
                }}
                to={"/home/results?search_query=" + element[0]}
              >
                <li
                  className={
                    "w-fit box-border h-8 md:h-12 rounded-2xl flex items-center m-2 font-bold transition-all duration-500 hover:bg-[#0000001a] hover:border hover:border-black hover:text-black md:my-4" +
                    (!isMenuOpen
                      ? " w-6 md:w-16 justify-center"
                      : " p-2 w-10 md:w-44") +
                    (selectedItem === element[0]
                      ? " bg-gray-300"
                      : " bg-black text-white")
                  }
                >
                  <span className="md:mx-4 w-6 md:w-10">{element[1]}</span>
                  {isMenuOpen && (
                    <span className="hidden md:block font-bold text-xl">
                      {element[0]}
                    </span>
                  )}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
