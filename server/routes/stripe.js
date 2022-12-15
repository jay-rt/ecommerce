import { Router } from "express";
import { Stripe } from "stripe";

const router = Router();
const stripe = Stripe(process.env.STRIPE_KEY);

router.post("payment", async (req, res) => {
  //   const session = await stripe.checkout.sessions.create({
  //     line_items: [
  //       {
  //         price_data: {
  //           currency: "cad",
  //           product_data: {
  //             name: "T-shirt",
  //           },
  //           unit_amount: 2000,
  //         },
  //         quantity: 1,
  //       },
  //     ],
  //     mode: "payment",
  // success_url: "http://localhost:3000/success.html",
  // cancel_url: "http://localhost:3000/cancel.html"
  //   });
});

export default router;
