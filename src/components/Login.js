import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin } from "../utils/loginSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
const navigate = useNavigate();
const dispatch = useDispatch();

const handleClick = ()=> {
  signInWithPopup(auth, provider).then((data)=>{
console.log(data);
const obj = {
  name: data.user.displayName,
  url: data.user.photoURL,
}
dispatch(signin(obj))
  }).catch((error)=>{
    console.log(error);
  })
}

const userName = useSelector((store)=> store.login.name)

useEffect(()=>{
if(userName){
  navigate("/");
}
// eslint-disable-next-line
},[userName])

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
        <button onClick={handleClick} className="rounded-2xl bg-gray-300 border border-black py-1 px-2 m-1 font-medium hover:text-white hover:bg-black transition-all">
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
