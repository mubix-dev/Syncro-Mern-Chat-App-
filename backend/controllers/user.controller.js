import User from "../models/user.model.js"

import uploadOnCloudinary from "../config/cloudinary.js"

const getCurrentUser = async(req,res)=>{
    try {
        let userId = req.userId
        let user = await User.findById(userId).select("-password")

        if(!user){
            return res.status(400).json({message:"User not found!"})
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:"Current user error",error})
    }
}

const editProfile = async(req,res)=>{
    try {
        let {name} = req.body;
        let image;

        if(req.file){
            image = await uploadOnCloudinary(req.file.path)
        }

        let user = await User.findByIdAndUpdate(req.userId,{
            name,
            image
        },{returnDocument: 'after'})
        if(!user){
            return res.status(400).json({message:"User not found!"})
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:"Profile error!"})
    }
}

const getAllUsers = async(req,res)=>{
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        let users = await User.find({
            _id:{$ne :req.userId}
        }).select("-password")

        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({message:"getAllUsers error!"})
    }
}


const searchUser = async(req,res)=>{
    try {
        let query = req.query
        if(!query){
            return res.status(400).json({message:"Query is required!"})
        }
        let users = await User.find({
            $or:[
                {name:{$regex:query,$options:"i"}},
                {username:{$regex:query,$options:"i"}}
            ]
        })

        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({message:"getAllUsers error!"})
    }
}
export {getCurrentUser,editProfile,getAllUsers,searchUser};