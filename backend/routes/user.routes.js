import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { editProfile, getAllUsers, getCurrentUser, searchUser } from "../controllers/user.controller.js"
import { upload } from "../config/multer.js"
const userRouter = express.Router()


userRouter.get("/current",isAuth,getCurrentUser)
userRouter.get("/others",isAuth,getAllUsers)
userRouter.put("/profile",isAuth,upload.single("image"),editProfile)
userRouter.get("/search",isAuth,searchUser)


export default userRouter;