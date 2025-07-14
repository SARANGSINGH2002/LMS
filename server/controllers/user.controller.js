import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"  // needed to secure the password
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async(req,res) =>{
    try {
        
        const {name, email, password}= req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }
        const user = await User.findOne({email})
        // if user exists
        if(user){
            return res.status(400).json({
                success: false,
                message: "User already exists with this email."
            })
        }
        // if user does not exist create one...first secure the paswword
        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            name,
            email,
            password: hashedPassword
        })
        return res.status(201).json({
            success: true,
            message: "Account created successfully."
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to register."
        })
    }
}

// This whole above 40 lines of code is called Business Logic.

// now same for login
export const login = async(req,res)=>{
    try {
        const {email, password}= req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }
        // Now check.... If user does not exist with that email-id then login is not possible.
        const user = await User.findOne({email})
        if(!user){   // this is for matching of email-id
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password."
            }) 
        }
        // let us now match passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        // here "password" is the currently entered password and "user.password" is the password present on our database.
        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password."
            })
        }
        // let us create tokens so that if user stays logged-in during entire sessions. 
        // To re-use this token let us create this token in a folder utile and inside a generateToken.js file
        generateToken(res,user, `Welcome back ${user.name}`)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to login."
        })
    }
}

export const logout = async(_,res)=>{
    try { 
        // we are deleting all saved cookies instantly
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to logout."
        })
    }
}

    export const getUserProfile = async (req,res)=>{
        try {
            // profile user ko tabhi dhikegi jab woh logged in hai...
            // So we will create a file inside middlewares named "isAuthenticated.js" and it should be verified meaning token should be existing inside that middleware
            //const userId = req.user;
            const userId = req.id;

            const user = await User.findById(userId).select("-password").populate("enrolledCourses")
            if(!user){
                return res.status(404).json({
                success: false,
                message: "Profile not found."
               })
            }
            return res.status(200).json({
               success: true,
               user
            })
        }catch (error) {
            console.log(error)
            res.status(500).json({
              success: false,
              message: "Failed to load User"
            })
        }
    }

    export const UpdateProfile = async(req, res)=>{
        try {
            //const userId = req.id;  
            const userId = req.id;

            const {name} = req.body;
            const profilePhoto = req.file;

            const user = await User.findById(userId)

            if(!user){
                return res.status(404).json({
                success: false,
                message: "User not found."
               })
            } 

            // extract the public-id of the old image from existing url
            if(user.photoUrl){  // meaning if the photoURL exist...
                const publicId =  user.photoUrl.split("/").pop().split(".")[0]; // extract publicId
                deleteMediaFromCloudinary(publicId);
            }

            // upload new photo
            const cloudResponse = await uploadMedia(profilePhoto.path)
            const photoUrl = cloudResponse.secure_url    
            const updatedData = {name, photoUrl}

            const updateUser = await User.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password");
            return res.status(200).json({
                success: true,
                user: updateUser,
                message:"Profile Updated Successfully"
            })
                

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message:"Failed to update profile"
            })
        }
    }