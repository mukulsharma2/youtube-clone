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

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  let [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const searchCache = useSelector((store) => store.search);

  useEffect(() => {
    setActiveSuggestion(-1)
    let timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestion(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    try{const res = await fetch(YOUTUBE_SUGGESTIONS_API + searchQuery);
    const str = await res.text();
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
    );}
    catch(error){
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white mb-3 h-14 px-4 flex flex-row justify-between items-center shadow-sm z-10 w-[98vw]">
        <div className="flex flex-row items-center">
          <div
            onClick={toggleMenuHandler}
            className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#0000001a] hover:cursor-pointer"
          >
            <img src={hamburgerIcon} alt="hamburger" className="w-5" />
          </div>

          <Link to="/">
            <img src={youtubeIcon} alt="youtube" className="w-24 h-6 ml-3" />
          </Link>
        </div>
        <div className="w-[40rem] flex flex-row">
          <form
            className="w-full"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
                navigate("/results?search_query=" + searchQuery);
              document.getElementById("searchInput").blur();
            }}
          >
            <input
              id="searchInput"
              className="font-sans border outline-none border-neutral-300 px-4 py-1 text-base font-normal w-full rounded-l-3xl focus:border-[#065fd4] focus:shadow-inner h-10"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestion(true)}
              onBlur={()=>{
                setTimeout(()=>{
                  setShowSuggestion(false)
                }, 500)
              }}
              onKeyDown={
                (e)=>{
                  if(e.code === "Enter" && suggestion[activeSuggestion]){
                    // if enter was pressed for suggestion then only setSearchQuery
                    setSearchQuery(suggestion[activeSuggestion])
                  }
                  else if(e.code === 'ArrowDown' && activeSuggestion < suggestion.length - 1){
                    setActiveSuggestion(++activeSuggestion)
                  }
                  else if(e.code === 'ArrowUp' && activeSuggestion > 0){
                    setActiveSuggestion(--activeSuggestion)
                  }
                }
              }
            />
          </form>
          <Link to={"/results?search_query=" + searchQuery}>
            <button className="border border-neutral-300 p-3 rounded-r-3xl w-16 h-10 pl-5 bg-[#0000000d] flex items-center hover:bg-[#0000001a]">
              <img src={searchIcon} alt="search" className="h-5" />
            </button>
          </Link>
        </div>

        {suggestion.length !== 0 && showSuggestion && (
          <div className="absolute top-14 left-[31vw] px-5 py-2 w-[36rem] rounded-lg shadow-lg bg-white">
            <ul>
              {suggestion.map((value, i) => {
                return (
                  <Link key={value} to={"/results?search_query=" + value}>
                    <li
                      className={
                        "hover:bg-[#0000001a]"
                         + (activeSuggestion === i? " bg-[#0000001a]" : "")
                      }
                      onClick={()=>{setSearchQuery(value)}}
                    >
                      {value}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        )}

        <div className="w-8">
          <img src={userIcon} alt="user" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
