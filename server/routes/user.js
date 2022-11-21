import { Router } from "express";
import { verifyTokenAndAuthorize } from "./verifyToken.js";
import CryptoJs from "crypto-js";
import User from "../models/User.js";

const router = Router();

//Update
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
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
