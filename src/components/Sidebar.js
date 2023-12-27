import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const [selectedItem, setSelectedItem] = useState("");

  const arr = ["Trending", "Music", "Sports", "News", "Movies"];

  return (
    <>
      <div
        className={
          "bg-white border border-black h-[92vh] transition-all duration-500 z-10 fixed left-0 top-14" +
          (isMenuOpen ? " w-48" : " w-14")
        }
      >
        <ul>
          <Link to="/" onClick={() => setSelectedItem("1")}>
            <li
              id="1"
              className={
                "m-2 font-bold transition-all duration-500" +
                (selectedItem === "1" ? " bg-red-500" : " bg-blue-500")
              }
            >
              <MdHome />
              Home
            </li>
          </Link>

          {arr.map((element, i) => {
            return (
              <Link
                key={element}
                onClick={() => setSelectedItem(i)}
                to={"/results?search_query=" + element}
              >
                <li
                  id="2"
                  className={
                    "m-2 font-bold transition-all duration-500" +
                    (selectedItem === i ? " bg-red-500" : " bg-blue-500")
                  }
                >
                  {element}
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
