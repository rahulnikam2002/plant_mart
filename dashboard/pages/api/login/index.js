// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "@/utils/database/mongodb.connect";
import adminModel from "@/models/auth/admin";
import cookie from "cookie";
import validator from "validator";

export default async function handler(req, res) {
  dbConnect()
  if (req.method === 'POST') {
    const { userName, password } = req.body;
    let getAdminDetails = "";
    if (validator.isEmail(userName)) {
      getAdminDetails = await adminModel.findOne({ emailId: userName });
      if (getAdminDetails) {
        if (userName === getAdminDetails.emailId && password === getAdminDetails.password) {
          res.send(getAdminDetails)
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", process.env.NEXT_PUBLIC_TOKEN, {
              maxAge: 60 * 60 * 60 * 60,
              sameSite: "strict",
              path: "/",
            })
          );
          res.status(200).json({
            valid: true,
          });
        } else {
          res.status(401).json({
            valid: false,
            msg: "Email or password incorrect",
          });
        }
      }
      else {
        res.send({
          valid: false,
          msg: "Something went wrong",
        })
      }
    }
    else if (validator.isMobilePhone(userName)) {
      getAdminDetails = await adminModel.findOne({ phone: Number(userName) });
      if (getAdminDetails) {
        if (Number(userName) === getAdminDetails.phone && password === getAdminDetails.password) {
          console.log(true)
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", process.env.NEXT_PUBLIC_TOKEN, {
              maxAge: 60 * 60 * 60 * 60,
              sameSite: "strict",
              path: "/",
            })
          );
          res.status(200).send({
            code: 1,
            msg: "Success"
          });
        } else {
          res.status(401).send({
            valid: false,
            msg: "Phone or password incorrect",
          });
        }
      }
      else {
        res.status(404).send({
          valid: false,
          msg: "No admin found",
        })
      }
    }
    else {
      res.status(400).send({
        code: 0,
        msg: "Something went wrong"
      })
    }
  }
  else {
    res.status(401).send({
      message: "Method invalid"
    })
  }
}