import { useDispatch } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { createNewCourse } from "../../redux/slices/courseSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    thumbnail: null, //thumbnail file.
    previewImage: "",
  });

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        //should  not pass it as an arrow function otherwise the binding with "this"  will be disrupted.
        setUserInput({
          ...userInput,
          thumbnail: uploadedImage,
          previewImage: this.result,
        });
      });
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  }

  function onFormSubmit(e) {
    e.preventDefault();
    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.createdBy ||
      !userInput.category ||
      !userInput.thumbnail
    ) {
      toast.error("All fields are mandatory");
      return;
    }
    const response = dispatch(createNewCourse(userInput));
    if (response?.payload?.success) {
      setUserInput({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: null, //thumbnail file.
        previewImage: "",
      });
      navigate("/courses");
    }
  }

  return (
    <HomeLayout>
      <div className="h-[100vh] flex items-center justify-center">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px]  my-10 shadow-[0_0_10px_black] relative"
        >
          <Link
            onClick={() => navigate(-1)}
            className="absolute top-5 text-2xl link"
          >
            <AiOutlineArrowLeft />
          </Link>
          <h1 className="text-center text-2xl font-bold">Create new course</h1>

          <main className="grid grid-cols-2 gap-x-10">
            {/* left */}
            <div className="gap-y-6">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {userInput?.previewImage ? (
                    <img
                      src={userInput?.previewImage}
                      className="w-full m-auto h-44 border"
                      alt=""
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border">
                      <h1 className="font-bold text-lg">
                        Upload course thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="image_uploads"
                  accept=".jpg, .png, .jpeg, .svg"
                  name="image_uploads"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="title">
                  Course title
                </label>
                <input
                  type="text"
                  required
                  name="title"
                  id="title"
                  placeholder="Enter the title of the course"
                  onChange={handleUserInput}
                  value={userInput.title}
                  className="bg-transparent px-2 py-1 border"
                />
              </div>
            </div>
            {/* right */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="craetedBy">
                  Created By
                </label>
                <input
                  type="text"
                  required
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter the instructor name."
                  onChange={handleUserInput}
                  value={userInput.createdBy}
                  className="bg-transparent px-2 py-1 border"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="category">
                  Category
                </label>
                <input
                  type="text"
                  required
                  name="category"
                  id="category"
                  placeholder="Enter the category."
                  onChange={handleUserInput}
                  value={userInput.category}
                  className="bg-transparent px-2 py-1 border"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="description">
                  Description
                </label>
                <textarea
                  type="text"
                  required
                  name="description"
                  id="description"
                  placeholder="Enter the description."
                  onChange={handleUserInput}
                  value={userInput.description}
                  className="bg-transparent px-2 py-1 h-24 resize-none overflow-y-scroll border"
                />
              </div>
            </div>
          </main>

          <button
            type="submit"
            className="w-full rounded-sm py-2 font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300"
          >
            Create course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}
export default CreateCourse;
