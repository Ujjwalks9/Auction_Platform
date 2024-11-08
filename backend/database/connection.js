import mongoose from "mongoose";

export const connection = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            dbname: "MERN_AUCTION_PLATFORM",
        }).then(() => {
            console.log("Connected to database ");
        }).catch((err) => {
            console.log(`Some Error occurred while connecting to database: ${err}`);
        })
}