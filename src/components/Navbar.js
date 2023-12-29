import React, { useEffect, useState } from "react";
import hamburgerIcon from "../assets/hamburger icon.png";
import searchIcon from "../assets/search.png";
import userIcon from "../assets/user.png";
import youtubeIcon from "../assets/youtube.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { Link, useNavigate } from "react-router-dom";
import { YOUTUBE_SUGGESTIONS_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import { signout } from "../utils/loginSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenuHandler = () => {
    // dispatching an action to update state in redux
    dispatch(toggleMenu());
  };

  const logoutHandler = () => {
    // dispatching an action of signout to update state in redux
    dispatch(signout());
    navigate("/");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  let [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [showSuggestion, setShowSuggestion] = useState(false);

  // Subscribing to redux store
  const searchCache = useSelector((store) => store.search);
  const userInfo = useSelector((store) => store.login);

  useEffect(() => {
    setActiveSuggestion(-1);
    let timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        // If suggestions of searchQuery are present in searchCache(redux) then setSuggestion with them
        setSuggestion(searchCache[searchQuery]);
      } else {
        // If suggestions of searchQuery are not present in searchCache(redux) then make API call
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      // Debouncing applied
      // cancelling API call if difference between two key presses is less than 200 ms
      clearTimeout(timer);
    };

    // eslint-disable-next-line
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    try {
      const res = await fetch(YOUTUBE_SUGGESTIONS_API + searchQuery);
      const str = await res.text();
      // Converting API response to json format
      const arr = JSON.parse(
        str.substring(str.indexOf("["), str.indexOf("])") + 1)
      );
      let suggestionsTuple = [];
      if (Array.isArray(arr) && Array.isArray(arr.at(1))) {
        suggestionsTuple = arr.at(1);
      }
      const suggestions = suggestionsTuple
        .flatMap((suggestion) => suggestion)
        .filter((suggestion) => typeof suggestion === "string");
      setSuggestion(suggestions);

      // Adding suggestions in redux store search cache
      dispatch(
        cacheResults({
          [searchQuery]: suggestions,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white mb-3 h-24 sm:h-14 sm:px-4 flex flex-col sm:flex-row justify-center sm:justify-between items-center shadow-sm z-10 w-full fixed top-0 left-0">
        <div className="flex flex-row items-center">
          <div
            onClick={toggleMenuHandler}
            className="flex items-center justify-center h-6 w-6 sm:h-10 sm:w-10 rounded-full hover:bg-[#0000001a] hover:cursor-pointer"
          >
            <img src={hamburgerIcon} alt="hamburger" className="w-3 sm:w-5" />
          </div>

          <Link to="/home">
            <img
              src={youtubeIcon}
              alt="youtube"
              className="w-20 h-5 sm:w-24 sm:h-6 ml-1 sm:ml-3"
            />
          </Link>
        </div>
        <div className="relative md:w-[25rem] lg:w-[40rem] flex flex-row items-center justify-center my-1">
          <form
            className="w-full"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/home/results?search_query=" + searchQuery);
              document.getElementById("searchInput").blur();
            }}
          >
            <input
              id="searchInput"
              className="font-sans border outline-none border-neutral-300 px-4 py-1 sm:text-base text-sm font-normal w-full rounded-l-3xl focus:border-[#065fd4] focus:shadow-inner h-6 md:h-8 xl:h-10"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestion(true)}
              onBlur={() => {
                setTimeout(() => {
                  // setShowSuggestion to false after 500 ms to prevent component unmounting before clicking on suggestion
                  setShowSuggestion(false);
                }, 500);
              }}
              onKeyDown={(e) => {
                if (e.code === "Enter" && suggestion[activeSuggestion]) {
                  // if enter was pressed for suggestion then only setSearchQuery
                  setSearchQuery(suggestion[activeSuggestion]);
                } else if (
                  e.code === "ArrowDown" &&
                  activeSuggestion < suggestion?.length - 1
                ) {
                  setActiveSuggestion(++activeSuggestion);
                } else if (e.code === "ArrowUp" && activeSuggestion > 0) {
                  setActiveSuggestion(--activeSuggestion);
                }
              }}
            />
          </form>
          <Link to={"/home/results?search_query=" + searchQuery}>
            <button className="border border-neutral-300 p-1 md:p-2 lg:p-3 rounded-r-3xl w-8 md:w-12 lg:w-16 h-6 md:h-8 xl:h-10 pl-2 md:pl-3 lg:pl-5 bg-[#0000000d] flex items-center hover:bg-[#0000001a]">
              <img
                src={searchIcon}
                alt="search"
                className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5"
              />
            </button>
          </Link>

          {suggestion?.length !== 0 && showSuggestion && (
            <div className="z-20 absolute top-6 md:top-9 lg:top-11 px-5 py-2 w-full rounded-lg shadow-lg bg-white">
              <ul>
                {suggestion?.map((value, i) => {
                  return (
                    <Link
                      key={value}
                      to={"/home/results?search_query=" + value}
                    >
                      <li
                        className={
                          "sm:text-base text-sm hover:bg-[#0000001a] rounded-2xl py-1 px-2 sm:px-4" +
                          (activeSuggestion === i ? " bg-[#0000001a]" : "")
                        }
                        onClick={() => {
                          setSearchQuery(value);
                        }}
                      >
                        {value}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={logoutHandler}
            className="text-sm md:text-base font-medium border mx-2 px-2 rounded-2xl bg-black text-white hover:bg-gray-400 hover:text-black hover:border-black"
          >
            Logout
          </button>
          <div
            onMouseEnter={() =>
              document.getElementById("name").classList.remove("hidden")
            }
            onMouseLeave={() =>
              document.getElementById("name").classList.add("hidden")
            }
            className="flex relative"
          >
            <img
              className="w-6 sm:w-7 md:w-8 mr-1 rounded-full"
              src={userInfo.url || userIcon}
              alt="user"
            />
            <span
              id="name"
              className="h-fit text-center hidden border border-black rounded-2xl py-1 px-1 sm:px-2 bg-white z-10 absolute bottom-[-3rem] sm:right-0 sm:top-11 text-xs sm:text-base"
            >
              {userInfo.name}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
