import mongoose from "mongoose";
import bycrypt from "bcrypt";  // Optional: For password hashing
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        minLength : [3, "Username must contain at least 3 characters."],
        maxlength : [40, "Username cannot excceed 40 charaters."],
    },
    password:{
        type: String,
        selected: false, //whenver we will get the user we  will get all the fields of the user but not the one marked as selected false
        minLength : [8, "Password must contain at least 8 characters."],
        maxlength : [32, "Password cannot excceed 32 charaters."],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(value){
                //simple regex for validating the  email format
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid Email Format',
        },
    },
    address: String,
    phone: {
        type: String,// we will manege the datatype that we receive from the frontend in the frontend interface 
        minLength : [11, "Phone Number must contain at least 11 digits."],
        maxlength : [11, "Phone Number  cannot excceed 11 digits."],
    },
    profileImage:{
        public_id:{
            type: String,
            required: true, //will receive the data from the cloudinary
        },
        yrl:{
            type: String,
            required: true,
        },
    },
    paymentMethods:{
        bank_transefer:{
            bankAccountNumber: String,
            IFSCcode: Number,
            bankName: String,
        },
        easypay:{

        },//razorpay any of the payment we can use
    },
    role:{
        type: String,
        enum:["Auctioneer","Bidder", "Super Admin"],
    },
    unpaidComission:{  //automattically store the amount of money stored for the unpaid commission
        type:Number,
        default: 0,
    },
    auctionsWon:{
        type: Number,
        default:0,
    },
    moneySpent:{
        type:Number,
        default:0,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true,  
    },
});

export const User = mongoose.model("User",userSchema);