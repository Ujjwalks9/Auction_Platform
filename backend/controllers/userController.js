import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import cloudinary from "cloudinary";

//here usercontroller function requests for the data form the frontend 
export const register = async (req,res,next) =>{ //arrow function where we declare the variable first and then define the function after it
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Profile Image Required.", 400));
        // return res.status(400).json({
        //     success: false,
        //     message: "Profile Image Required.",
        // });
    }

    const {profileImage}= req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    
    if(!allowedFormats.includes(profileImage.mimetype)){
        return next = new ErrorHandler("File Format Not supported.", 400);
    }

    const {userName, email, password, phone, address, role, bankAccountNumber, bankAccountName, bankName} = req.body; //since we require the text data input from user we state req.bdy here
    if(!userName || !email || !password || !phone|| !address || !role ){
        return next (new ErrorHandler("Please fill full form." , 400));
    }
    if(role == "Auctioneer"){
        if(!bankAccountName ||!bankAccountNumber || !bankName){
            return next(new ErrorHandler("Please provide your full bank details.", 400));
        }
    }
    const isRegistered = await User.findOne({emai}); //searches foe the user woth the given email, if found it shows user is already registered
    if(isRegistered){
        return next(new ErrorHandler("User Already FRegisterd", 400));
    }
    //Posting user image in cloudinary
    const clodinaryResponse = await cloudinary.uploader.upload(profileImage.tempFilePath,{
        folder: "MERN_AUCTION_PLATFORM_USERS",
    });
    if(!clodinaryResponse || clodinaryResponse.error){
        console.error("Cloudinary error:", cloudinaryResponse.error || "Unknown Cloudinary error.");
        return next(new ErrorHandler("Failed to upload Profile Image to Cloudinary", 500));
    }
    //storing user details in database (User os for model in userSChema)
    const user = await User.create ({
        userName, email, password, phone, address, role,
        profileImage:{
            public_id: cloudinaryResponse.public_id,
            url: clodinaryResponse.secure_url,
        },
      paymentsMethods:{
            bankAccountName,
            bankAccountNumber,
            bankName,
      },     
    });
    //Genreating the token for the user login after registration
    //repsonse we get  after generating token 
    res.status(201).json({
        success: true,
        message: "UserRegisterd.",
    })
};