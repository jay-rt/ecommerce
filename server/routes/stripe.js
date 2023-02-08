import * as dotenv from "dotenv";
import { Router } from "express";
import { Stripe } from "stripe";
import Product from "../models/Product.js";

dotenv.config();

const router = Router();
const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {
  const products = req.body.products;
  const lineItems = await Promise.all(
    products.map(async (product) => {
      const item = await Product.findOne({ _id: product._id });
      return {
        price_data: {
          currency: "cad",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: product.quantity,
      };
    })
  );

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}`,
      line_items: lineItems,
      shipping_address_collection: { allowed_countries: ["CA"] },
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
