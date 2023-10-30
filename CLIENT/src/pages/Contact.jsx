import { useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import toast from "react-hot-toast";
import { isEmail } from "../helper/regexMatcher";
import axiosInstance from "../config/axiosinstance";

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e){
    e.preventDefault();
    if(!userInput.email || !userInput.name || !userInput.message){
        toast.error("All fields are required.")
        return
    }
    if(!isEmail(userInput.email)){
        toast.error("Invalid email")
    }

    try {
        const response = axiosInstance.post("/users/contact",userInput);
        toast.promise(response,{
            loading: 'Submitting your Query',
            success: "Form submitted successfully",
            error:"Failed to submit the form"
        })
        const responseData = await response;
        console.log(responseData);
        if(responseData?.data){
            setUserInput({
                email:"",
                name:"",
                message:""
            })
        }
    } catch (error) {
        toast.error("Operation Failed....")
    }
}


  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          noValidate
          className="flex flex-col items-center justify-center gap-2 w-[22rem]rounded-md text-white"
        >
          <h1 className="text-3xl px-9 mb-4 font-semibold"> Contact us Form </h1>
          <div className="flex flex-col w-full gap-1 font-semibold">
            <label htmlFor="name" className="text-xl font-semibold">
              NAME
            </label>
            <input
              id="name"
              className="bg-white border px-2 py-1 rounded-sm text-black"
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleInputChange}
              value={userInput.name}
            />
          </div>
          <div className="flex flex-col w-full gap-1 font-semibold">
            <label htmlFor="name" className="text-xl font-semibold">
              EMAIL
            </label>
            <input
              id="email"
              className="bg-white border px-2 py-1 rounded-sm text-black"
              type="email"
              placeholder="Email"
              name="email"
              value={userInput.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="message" className="text-xl font-semibold ">
              MESSAGE
            </label>
            <textarea
              id="message"
              className="bg-white border px-2 py-1 rounded-sm resize-none text-black h-40"
              type="text"
              placeholder="Message..."
              value={userInput.message}
              name="message"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="mt-2 w-full bg-yellow-600 hover:bg-yellow-800 rounded-sm transition-all ease-in-out duraration-300 cursor-pointer py-2 font-semibold text-lg">Submit</button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Contact;
