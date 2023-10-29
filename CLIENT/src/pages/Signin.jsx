import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import { toast } from "react-hot-toast";
import { isEmail, isValidPassword } from "../helper/regexMatcher";
import { useDispatch } from "react-redux";
import { createAccount,login } from "../redux/slices/authSlice";

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signinDetails, setSigninDetails] = useState({
    email: "",
    password: "",
  });


  function handleUserInput(e) {
    const { name, value } = e.target;
    setSigninDetails({
      ...signinDetails,
      [name]: value,
    });
  }

  
  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !signinDetails.email ||
      !signinDetails.password
    ) {
      toast.error("Please fill all the details");

      return;
    }
    
    if (!isEmail(signinDetails.email)) {
      toast.error("Invalid Email");
      return;
    }
    if (!isValidPassword(signinDetails.password)) {
      toast.error(
        "Password must be atleast 8 characters, should contain atleast one uppercase and lowercase letters , one numeric and a special character "
      );
      return;
    }


    const response = await dispatch(login(signinDetails));

    if (response?.payload?.data?.success) {
      navigate("/");
    }
    setSigninDetails({
      email: "",
      password: "",
    });
  }

  return (
    <HomeLayout>
      <div className="flex overflow-auto items-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          noValidate
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-35"
        >
          <h1 className="text-2xl text-center font-bold"> Signin Page</h1>
         
          
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              onChange={handleUserInput}
              value={signinDetails.email}
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
              onChange={handleUserInput}
              value={signinDetails.password}
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
            Don't have an account?{" "}
            <Link
              className="cursor-pointer text-accent font-medium"
              to="/signup"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}
export default Signin;
