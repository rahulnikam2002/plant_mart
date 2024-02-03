import { redis } from "@/lib/redis/connect.redis";
import { checkInRedisCache } from "@/utils/cache/redis";
import dbConnect from "@/utils/database/mongodb.connect";
import { hash } from "bcrypt";
import { sendMail } from "../../check/email/sendMail";
import otpModel from "@/models/auth/otp/otp.model";
import { generateHMAC, verifyHMAC } from "@/utils/secure/crypto/HMAC";

dbConnect();
export default async function handler(req, res) {
  try {
    const { method } = req;
    if (method !== "POST") {
      return res.send({
        msg: "Invalid request",
        type: "WARNING",
        code: 4
      });
    }
    const { email } = req.body;
    if (!email) {
      return res.send({
        msg: "Email is required",
        type: "WARNING",
        code: 6
      });
    }

    const isEmailOtpCached = await checkInRedisCache(`${email}+OTP`);

    if (isEmailOtpCached.isInRedis) {
      return res.send({
        msg: "OTP has been sent already",
        type: "WARNING",
        code: 2
      });
    }

    const OTP = Math.floor(Math.random() * 9000) + 1000;
    const secureOTPHash = await hash(OTP.toString(), 10);
    const sendOTPtoEmail = await sendMail(email, OTP);

    if (!sendOTPtoEmail) {
      return res.send({
        msg: "Something went wrong while sending the OTP, please try again",
        type: "ERROR",
        code: 3
      });
    }

    const cacheEmailOtp = await redis
      .pipeline()
      .set(`${email}+OTP`, secureOTPHash)
      .expire(`${email}+OTP`, 120) // This should be placed after setting the key
      .exec();
    if (!cacheEmailOtp) {
      return res.send({
        msg: "Something went wrong while sending the OTP, please try again",
        type: "ERROR",
        code: 3
      });
    }
    await otpModel
      .create({ email, OTP: secureOTPHash })
      .catch((err) => console.log(err.message));

    const cipherEmail = generateHMAC(email);

    res.send({
      msg: "Email has been sent",
      type: "SUCCESS",
      key: cipherEmail,
      code: 200
    });
  } catch (requestError) {
    return res.send({
      msg: requestError.message,
      type: "ERROR",
      code: 3
    });
  }
}
