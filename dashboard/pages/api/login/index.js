import dbConnect from "@/utils/database/mongodb.connect";
import adminModel from "@/models/auth/admin";
import cookie from "cookie";
import validator from "validator";
import { sign } from "jsonwebtoken";

export default async function handler(req, res) {
  dbConnect();

  if (req.method !== "POST") {
    return res.status(401).send({
      message: "Method invalid"
    });
  }

  const { userName, password } = req.body;
  let query = {};
  let userId = "";

  if (validator.isEmail(userName)) {
    query = { emailId: userName };
  } else if (validator.isMobilePhone(userName, "any", { strictMode: false })) {
    query = { phone: Number(userName) };
  } else {
    return res.status(400).send({
      code: 0,
      msg: "Something went wrong"
    });
  }

  try {
    const getAdminDetails = await adminModel
      .findOne(query)
      .select(query.emailId ? "emailId password" : "phone password");
    userId = getAdminDetails._id;
    if (!getAdminDetails) {
      return res.status(404).send({
        valid: false,
        msg: "No admin found"
      });
    }

    if (password === getAdminDetails.password) {
      const JWT_TOKEN = await sign({ userId }, process.env.NEXT_PUBLIC_TOKEN, {
        expiresIn: "1d"
      });
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", JWT_TOKEN, {
          maxAge: 60 * 60 * 60 * 60,
          sameSite: "strict",
          path: "/"
        })
      );
      return res.status(200).json({
        code: 1,
        msg: "Success"
      });
    } else {
      return res.status(401).json({
        valid: false,
        msg: validator.isEmail(userName)
          ? "Email or password incorrect"
          : "Phone or password incorrect"
      });
    }
  } catch (error) {
    return res.status(500).send({
      valid: false,
      msg: "Something went wrong"
    });
  }
}
