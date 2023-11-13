import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { getUserData, updateProfile } from "../../redux/slices/authSlice";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    fullName: "",
    previewImage: "",
    avatar: undefined,
    userId: useSelector((state) => state?.auth?.data?.user?._id),
  });

  function handleImageUplaod(e) {
    e.preventDeadfault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new fileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result, //base64 url
          avatar: uploadedImage, //actual file
        });
      });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDeadfault();
    if (!data.fullName || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }
    if (data.fullName.length < 5) {
      toast.error("FullName shouldn't be lessthan 5 characters.");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);
    await dispatch(updateProfile([data.userId, formData])); //All the async thunk we implement expects only one argument, Thatswhy passing an array instead of two arguments seperately.
    await dispatch(getUserData());

    navigate("/user/profile");
}

  return <HomeLayout></HomeLayout>;
}

export default EditProfile;