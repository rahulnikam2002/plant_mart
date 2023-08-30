import admin from "@/models/auth/admin";
import { verify } from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(401).json({ message: "Method invalid" });
  }

  const JWT_TOKEN = req.body.token;
  console.log(JWT_TOKEN)

  try {
    if (!JWT_TOKEN) {
      return res.status(401).json({ code: 0, msg: "Token not found" });
    }

    const decoded = verify(JWT_TOKEN, process.env.NEXT_PUBLIC_TOKEN);
    const { userId } = decoded;

    if (!userId) {
      return res.status(401).json({ code: 0, msg: "Invalid token data" });
    }

    const userData = await admin.findOne({ _id: userId }, "_id");

    if (!userData) {
      return res.status(401).json({ code: 0, msg: "User not found" });
    }

    return res.status(200).json({ code: 1, msg: "Access granted" });
  } catch (err) {
    return res.status(401).json({ code: 0, msg: "Invalid access token" });
  }
}
