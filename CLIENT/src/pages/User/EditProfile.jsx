import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

function EditProfile(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [data, setData] = useState({
        fullName:'',
        previewImage:'',
        avatar:undefined,
        userId : useSelector((state)=> state?.auth?.data?.user?._id)
    });

    function handleImageUplaod(e){
        e.preventDeadfault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage){
            const fileReader = new fileReader();
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener('load', function(){
                setData({
                    ...data,
                    previewImage: this.result, //base64 url
                    avatar:uploadedImage //actual file
                })
            })
        }
    }

    function handleInputChange(e){
        const {name, value} = e.target;
        setData({
            ...data,
            [name] : value
            
        });
    }

    onFormSubmit(e){
        e.preventDeadfault();
        if(!data.fullName || !data.avatar){
            toast.error("All fields are mandatory");
        }
        if(data.fullName.length < 5 ){
            toast.error("FullName shouldn't be lessthan 5 characters.");
            return
        }

    }

    return(
        <HomeLayout>

        </HomeLayout>
    )
}

export default EditProfile;