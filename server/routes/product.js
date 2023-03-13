import { Router } from "express";
import Product from "../models/Product.js";
import { verifyTokenAndAdmin } from "./verifyToken.js";

const router = Router();

//CREATE NEW PRODUCT
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE PRODUCT DETAILS
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //to return the updated product
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product data successfully deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PARTICULAR PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const qNew = req.query.new;
    const qCategories = req.query.categories;
    let products;

    if (qNew) {
      products = await Product.find().sort({ _id: -1 }).limit(1);
    } else if (qCategories) {
      products = await Product.find({ categories: qCategories });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
