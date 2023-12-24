import React from "react";
import Button from "./Button.js";

const ButtonList = ({activeElement, setActiveElement}) => {
  const arr = [
    "All",
    "Cricket",
    "Gaming",
    "Football",
    "News",
    "Cars",
    "Comedy",
    "Entertainment",
    "Movies",
    "Bollywood",
    "Hollywood",
    "React",
    "CSS",
    "Coding",
    "Programming",
    "Animals",
    "Agriculture",
    "Farming",
    "HTML",
    "Javascript",
  ];

  const prevHandler = () => {
    const slider = document.getElementById("slider");
    const width = slider.offsetWidth;
    slider.scrollLeft -= width / 4;
  };

  const nextHandler = () => {
    const slider = document.getElementById("slider");
    const width = slider.offsetWidth;
    slider.scrollLeft += width / 4;
  };

  const handleClick = (value) => {
    setActiveElement(value)
  }

  return (
    <>
      <div className="flex justify-center w-[95%] box-border">
        <button
          className="mr-1 rounded-full hover:bg-[#0000001a] w-8"
          onClick={prevHandler}
        >
          &lt;
        </button>

        <div
          id="slider"
          className="scroll-smooth w-[90%] flex flex-row overflow-hidden"
        >
          {arr.map((param, i) => {
            return (
              <div key={i} onClick={()=> handleClick(param)}>
              <Button
                key={i}
                name={param}
                activeElement={activeElement}
                />
                </div>
            );
          })}
        </div>

        <button
          className="ml-1 rounded-full hover:bg-[#0000001a] w-8"
          onClick={nextHandler}
        >
          &gt;
        </button>
      </div>
    </>
  );
};
export default ButtonList;
