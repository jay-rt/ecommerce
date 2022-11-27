import { Router } from "express";
import {
  destructureUser,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorize,
} from "./verifyToken.js";
import CryptoJs from "crypto-js";
import User from "../models/User.js";

const router = Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorize, async (req, res) => {
  //checking if user updated the password
  if (req.body.password) {
    req.body.password = CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } //to return the updated user
    );
    const destructuredUser = destructureUser(updatedUser);
    res.status(200).json(destructuredUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorize, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User data successfully deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PARTICULAR USER
router.get("/find/:id", verifyTokenAndAuthorize, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const destructuredUser = destructureUser(user);
    res.status(200).json(destructuredUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const query = req.query.new;
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    const destructuredUsers = users.map((user) => destructureUser(user));
    res.status(200).json(destructuredUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
