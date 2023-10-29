import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { isEmail, isValidPassword } from "../helper/regexMatcher";
import { useDispatch } from "react-redux";
import { createAccount } from "../redux/slices/authSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signupDetails, setSignupDetails] = useState({
    email: "",
    fullName: "",
    password: "",
    avatar: "",
  });

  const [previewImage, setPreviewImage] = useState("");

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupDetails({
      ...signupDetails,
      [name]: value,
    });
  }

  function handleImage(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0]; //since it is a single file, it is available at 0th index.
    if (!uploadedImage) return;
    setSignupDetails({ ...signupDetails, avatar: uploadedImage });

    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      setPreviewImage(this.result);
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !signupDetails.email ||
      !signupDetails.password ||
      !signupDetails.fullName
    ) {
      toast.error("Please fill all the details");

      return;
    }
    if (signupDetails.fullName.length < 5) {
      toast.error("Name should be atleast of 5 characters");
      return;
    }
    if (!isEmail(signupDetails.email)) {
      toast.error("Invalid Email");
      return;
    }
    if (!isValidPassword(signupDetails.password)) {
      toast.error(
        "Password must be atleast 8 characters, should contain atleast one uppercase and lowercase letters , one numeric and a special character "
      );
      return;
    }

    const formData = new FormData();
    formData.append('fullName', signupDetails.fullName);
    formData.append('avatar', signupDetails.avatar);
    formData.append('email', signupDetails.email);
    formData.append('password', signupDetails.password);


    const response = await dispatch(createAccount(formData));

    if (response?.payload?.data?.success) {
      navigate("/");
    }
    setSignupDetails({
      email: "",
      fullName: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
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
            onChange={handleImage}
            id="image_uploads"
            accept=".jpg, .jpeg, .png, .svg"
          />
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold">
              Name
            </label>
            <input
              onChange={handleUserInput}
              className="bg-transparent px-2 py-1 border"
              type="text"
              name="fullName"
              value={signupDetails.fullName}
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
              onChange={handleUserInput}
              value={signupDetails.email}
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
              value={signupDetails.password}
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
            Already have an account?
            <Link
              className="cursor-pointer text-accent font-medium"
              to="/signin"
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
