import * as dotenv from "dotenv";
import { Router } from "express";
import { Stripe } from "stripe";
import Product from "../models/Product.js";
import { verifyToken } from "./verifyToken.js";

dotenv.config();

const router = Router();
const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/payment", verifyToken, async (req, res) => {
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
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}`,
      line_items: lineItems,
      shipping_address_collection: { allowed_countries: ["CA"] },
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/session", verifyToken, async (req, res) => {
  const sessionId = req.body.sessionId;
  // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  res.status(200).json({
    id: session.id,
    lineItems: session.line_items.data,
    total: session.amount_total,
    address: session.shipping_details.address,
    paymentStatus: session.payment_status,
  });
});

export default router;
