
import { config } from "dotenv";
import express from "express"; //module export
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/userRoutes.js";

//const express = require("express") we can also import in this format
const app = express();
//adding the configuration.js file that includes data to the configure variable
config({
    path: "./config/config.env",
});

app.use(cors({  //package used to connect frontend and backend
    origin: [process.env.FRONTEND_URL], //it represents the website URL 
    methods: ["POST", "GET", "PUT", "DELETE"],  //post create data, get fetch , put update data, delete remove the data
    //if we remove the delete from  the "DELETE" we won't be able to use the delete function from the frontend
    credentials: true,
}));

app.use(cookieParser()); //use to access the cookies in the website in the baclend
app.use(express.json()); //returns middleware that only parses json, simply return the website data in json format
app.use(express.urlencoded({extended: true})); //matches the format of data sent and received from the frontend to backend
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
    })
); //alternative middleware to mutter(used to store files in the backend), easy syntax 

app.use("/api/v1/user", userRouter);

connection();
app.use(errorMiddleware);

export default app;

