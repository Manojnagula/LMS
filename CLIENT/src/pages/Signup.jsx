import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import {toast} from 'react-hot-toast';

function Signup() {
  const navigate = useNavigate();

  const [signupDetails, setSignupDetails] = useState({
    email: "",
    fullname: "",
    password: "",
    avatar: "",
  });

  const [previewImage, setPreviewImage] = useState("");

  function onFormSubmit(e){
    e.preventDefault();
    if(!signupDetails.email || !signupDetails.password || !signupDetails.fullname || !signupDetails.avatar){
        toast.error("Please fill all the details");

        return
    }
    if(signupDetails.fullname.length<5){
        toast.error("Name should be atleast of 5 characters");
        return;
    }
    
  }
  return (
    <HomeLayout>
      <div className="flex overflow-auto items-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          noValidate
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-35"
        >
          <h1 className="text-2xl text-center font-bold"> Registration Page</h1>
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 rpounded-full m-auto "
                src={previewImage}
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto " />
            )}
          </label>

          <input
            type="file"
            className="hidden"
            name="image_uploads"
            id="image_uploads"
            accept=".jpg .jpeg .png .svg"
          />
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold">
              Name
            </label>
            <input
              className="bg-transparent px-2 py-1 border"
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Username"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              className="bg-transparent px-2 py-1 border"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              className="bg-transparent px-2 py-1 border"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              required
            />
          </div>
          <button className="mt-2 bg-yellow-600 hover:bg-yellow-800 transition-all ease-in-out duraration-300 cursor-pointer py-2 font-semibold text-lg">
            Create Account
          </button>
          <p className="text-center ">
            Already have an account?{" "}
            <Link
              className="cursor-pointer text-accent font-medium"
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}
export default Signup;
