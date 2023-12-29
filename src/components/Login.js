import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin } from "../utils/loginSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    // Firebase authentication
    signInWithPopup(auth, provider)
      .then((data) => {
        const obj = {
          name: data.user.displayName,
          url: data.user.photoURL,
        };
        // Adding user information to redux store
        dispatch(signin(obj));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Subscribing to redux store
  const userName = useSelector((store) => store.login.name);

  useEffect(() => {
    if (userName) {
      // navigating to home page on login successful
      navigate("/home");
    }
    // eslint-disable-next-line
  }, [userName]);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="bg-gray-300 rounded-2xl w-11/12 h-3/5 md:w-1/2 flex items-center justify-center flex-col relative">
        <h1 className="mt-14 font-bold text-2xl sm:text-3xl sm:mt-10 absolute top-0">
          Youtube Clone
        </h1>
        <img
          src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
          alt="youtube logo"
          className="w-20 sm:w-40 mb-4 sm:my-4"
        />
        <button
          onClick={handleClick}
          className="rounded-2xl bg-gray-300 border border-black py-1 px-2 m-1 font-medium hover:text-white hover:bg-black transition-all"
        >
          Login with google
        </button>
        <p className="mt-5 w-11/12 sm:text-xl font-medium text-center">
          This is a youtube clone project using youtube data API.
        </p>
      </div>
    </div>
  );
};

export default Login;
