import React from "react";

const Login = () => {

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="bg-gray-300 rounded-2xl w-1/3 h-1/2 flex items-center justify-center flex-col relative">
        <h1 className="mt-2 font-bold text-3xl absolute top-0">
          Youtube Clone
        </h1>
        <img
          src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
          alt="youtube logo"
          className="w-40 my-4"
        />
        <button onClick={()=>{}} className="rounded-2xl bg-gray-300 border border-black py-1 px-2 m-1 font-medium hover:text-white hover:bg-black transition-all">
          Login with google
        </button>
        <p className="w-11/12 text-xl font-medium">
          This is a youtube clone project using youtube data API.
        </p>
      </div>
    </div>
  );
};

export default Login;