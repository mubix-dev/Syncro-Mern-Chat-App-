import React, { useRef, useState } from "react";
import dp from "../assets/empty-profile.jpg";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {serverURL} from "../main"
import axios from 'axios'
import { setUserData } from "../redux/userSlice";

function Profile() {
  let { userData } = useSelector((state) => state.user);
  let navigate = useNavigate();

  let [name, setName] = useState(userData.name || "");
  let [frontendImage, setFrontendImage] = useState(userData.image || dp);
  let [backendImage, setBackendImage] = useState(null);

  let dispatch = useDispatch()
  let [saving,setSaving] = useState(false)

  const handleImage = (e)=>{
    let file = e.target.files[0]

    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const handleProfile = async(e)=>{
    e.preventDefault()
    setSaving(true)
    try {
      let formData = new FormData()
      formData.append("name",name)
      if(backendImage){
        formData.append("image",backendImage)
      }

      let result = await axios.put(`${serverURL}/api/user/profile`,formData,{withCredentials:true})
      dispatch(setUserData(result.data))
      navigate("/")
      setSaving(false)
    } catch (error) {
      console.log(error)
      setSaving(false)
    }
  }
  let image = useRef()
  return (
    <div className="w-full min-h-screen bg-slate-200 flex  flex-col justify-center items-center gap-5">
      <div className="fixed top-5 left-5" >
        <FaArrowLeft
          className="w-5 h-5 text-blue-500 hover:text-blue-800 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="w-50 h-50 rounded-full bg-white shadow-md shadow-blue-500 relative cursor-pointer  "onClick={()=>image.current.click()}>
        <div className="w-50 h-50 rounded-full overflow-hidden flex justify-center items-center ">
          <img className="w-full h-full" src={frontendImage} alt="Empty Profile Picture" />
        </div>
        <MdOutlinePhotoCamera className="absolute bottom-21 right-20 w-10 h-10 text-gray-300" />
      </div>
      <form className="w-[95%] max-w-125 flex flex-col gap-5 items-center justify-center" onSubmit={handleProfile}>
        <input type="file" accept="image/*" hidden ref={image} onChange={handleImage} />
        <input
          className="w-[90%] outline-none border-b-2 border-blue-500 px-2.5 py-2.5 rounded-lg shadow-md shadow-gray-400 "
          onChange={(e) =>setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Enter your name"
        />
        <input
          className="w-[90%] outline-none border-b-2 border-blue-500 px-2.5 py-2.5 rounded-lg shadow-md shadow-gray-400 text-gray-400"
          type="text"
          readOnly
          value={userData.username}
        />
        <input
          className="w-[90%] outline-none border-b-2 border-blue-500 px-2.5 py-2.5 rounded-lg shadow-md shadow-gray-400 text-gray-400"
          type="email"
          readOnly
          value={userData.email}
        />

        <button className="bg-blue-500 w-50 h-10 font-bold text-white shadow-lg shadow-gray-200 cursor-pointer rounded-lg hover:bg-blue-700" disabled={saving}>
          {saving?"Saving...":"Save Profile"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
