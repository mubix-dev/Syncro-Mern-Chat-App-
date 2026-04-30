import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String
    },
    username:{
        type: String,
        required: true,
        unique:true,
        lowercase:true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim: true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:""
    },
    otp:{
        type:String,
    },
    otpExpiry:{
        type:Date
    },
    isVerified:{
        type:Boolean,
        default:false
    }
    
},{timestamps:true})

const User = mongoose.model("User",userSchema);

export default User;