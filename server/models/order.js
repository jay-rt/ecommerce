import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    fullname: { type: String, required: true },
    products: [
      {
        productId: String,
        productName: String,
        productImg: String,
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
        size: String,
        color: String,
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
