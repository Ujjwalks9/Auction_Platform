import app from "./app.js" //since we are using module then whenever we use that file we need to mention the extension of file at last

import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
}); //mostly used in function that matches like register functions, etc..
//creating the server our own running on port number 5000
app.listen(process.env.PORT, () =>{ //hiding the port number from the user 
    console.log(`Server listening on the ports ${process.env.PORT}`);
});

