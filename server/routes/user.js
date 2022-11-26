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

//GET
router.get("/:id", verifyTokenAndAuthorize, async (req, res) => {
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
    const users = await User.find();
    const destructuredUsers = users.map((user) => destructureUser(user));
    res.status(200).json(destructuredUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
