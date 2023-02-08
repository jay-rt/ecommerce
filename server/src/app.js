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
// import { Stripe } from "stripe";

//configuring dotenv
dotenv.config();

// const stripe = Stripe(process.env.STRIPE_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret = process.env.STRIPE_END_POINT_SECRET;

//Connection URL
const url = process.env.MONGO_URL;
const main = async () => {
  await mongoose.connect(url);
  console.log("Successfully connected to the database");
};

//creating a new instance of express
const app = express();

//stripe needs raw data to verify the webhook signature
// app.use("/webhook", express.raw({ type: "application/json" }));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/checkout", stripeRouter);

// const fulfillOrder = (lineItems) => {
//   // TODO: fill me in
//   console.log("Fulfilling order", lineItems);
// };

// app.post("/webhook", async (request, response) => {
//   const payload = request.body;
//   const sig = request.headers["stripe-signature"];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
//   } catch (err) {
//     return response.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle the checkout.session.completed event
//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;
//     // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
//     const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
//       session.id,
//       {
//         expand: ["line_items"],
//       }
//     );
//     const lineItems = sessionWithLineItems.line_items.data;

//     // Fulfill the purchase...
//     fulfillOrder(lineItems);
//   }

//   response.status(200).end();
// });

//listening for connection at specific port
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started running");
});

main().catch((err) => console.log(err));
