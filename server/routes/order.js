import { Router } from "express";
import Order from "../models/Order.js";
import { verifyToken, verifyTokenAndAdmin } from "./verifyToken.js";

const router = Router();

//CREATE NEW ORDER
router.post("/", verifyToken, async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE ORDER DETAILS
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //to return the updated order
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE ORDER
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Successfully deleted an order");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/user/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT ORDERS
router.get("/product/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find({
      products: { $elemMatch: { productId: req.params.id } },
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ORDERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const query = req.query.new;
    let orders = query
      ? await Order.find().sort({ _id: -1 }).limit(5)
      : await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const userId = req.query.uid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && { products: { $elemMatch: { productId } } }),
          ...(userId && { userId }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
