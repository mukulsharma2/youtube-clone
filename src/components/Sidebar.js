import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart, FaGamepad, FaCode, FaTshirt, FaHeart, FaMusic, FaFootballBall, FaRegNewspaper, FaFilm } from "react-icons/fa";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const [selectedItem, setSelectedItem] = useState("");

const obj = {
  width: '2rem',
  height: '2rem',
}

const arr = [
  { 0: "Trending", 1: <FaHeart style={obj}  /> },
  { 0: "Coding", 1: <FaCode style={obj}  /> },
  { 0: "Gaming", 1: <FaGamepad style={obj}  /> },
  { 0: "Music", 1: <FaMusic style={obj}  /> },
  { 0: "Sports", 1: <FaFootballBall style={obj}  /> },
  { 0: "News", 1: <FaRegNewspaper style={obj}  /> },
  { 0: "Fashion", 1: <FaTshirt style={obj}  /> },
  { 0: "Shopping", 1: <FaShoppingCart style={obj}  /> },
  { 0: "Movies", 1: <FaFilm style={obj}  /> },
];

  return (
    <>
      <div
        className={
          "bg-white border-r-2 border-black h-[92vh] transition-all duration-500 z-10 fixed left-0 top-14" +
          (isMenuOpen ? " w-48" : " w-[4.5rem]")
        }
      >
        <ul>
          <Link to="/" onClick={() => setSelectedItem("Home")}>
            <li
              className={
                "box-border h-12 rounded-2xl flex items-center m-2 p-2 font-bold transition-all duration-500 hover:bg-[#0000001a] hover:border hover:border-black hover:text-black" +
                (!isMenuOpen? " justify-center" : "") +
                (selectedItem === "Home" ? " bg-gray-300" : " bg-black text-white")
              }
            >
              <span className="mx-4">{<FaHome style={obj} />}</span>
              {isMenuOpen && <span className="font-bold text-xl">Home</span>}
            </li>
          </Link>

          {arr.map((element) => {
            return (
              <Link
                key={element[0]}
                onClick={() => setSelectedItem(element[0])}
                to={"/results?search_query=" + element[0]}
              >
                <li
                  className={
                    "box-border h-12 rounded-2xl flex items-center m-2 p-2 font-bold transition-all duration-500 hover:bg-[#0000001a] hover:border hover:border-black hover:text-black" +
                    (!isMenuOpen? " justify-center" : "") +
                    (selectedItem === element[0] ? " bg-gray-300" : " bg-black text-white")
                  }
                >
                  <span className="mx-4">{element[1]}</span>
                  {isMenuOpen && <span className="font-bold text-xl">{element[0]}</span>}
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
