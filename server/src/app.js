//importing necessary modules
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRouter from "../routes/auth.js";
import userRouter from "../routes/user.js";
import productRouter from "../routes/product.js";
import cartRouter from "../routes/cart.js";
import orderRouter from "../routes/order.js";
import stripeRouter from "../routes/stripe.js";

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

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/checkout", stripeRouter);

//listening for connection at specific port
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started running");
});

main().catch((err) => console.log(err));
