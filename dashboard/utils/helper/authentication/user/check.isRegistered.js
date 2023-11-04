// lib/middleware/checkEmail.js

import userModel from "@/models/auth/user.model";
import dbConnect from "@/utils/database/mongodb.connect";

dbConnect();

export const doUserExist = async (email, res) => {
  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error in checkEmailMiddleware:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
