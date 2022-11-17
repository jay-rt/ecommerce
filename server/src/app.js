//importing necessary modules
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "../routes/user.js";

//configuring dotenv
dotenv.config();

//Connection URL
const url = process.env.MONGO_URL;
const main = async () => {
  await mongoose.connect(url);
  console.log("Successfully connected to the database");
};

//creating a new instance of express
const app = express();

app.use(express.json());
app.use("/api/users", userRouter);

//listening for connection at specific port
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started running");
});

main().catch((err) => console.log(err));
