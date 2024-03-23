import { redis } from "@/lib/redis/connect.redis";
import { checkInRedisCache } from "@/utils/cache/redis";
import dbConnect from "@/utils/database/mongodb.connect";
import { compare } from "bcrypt";
import otpModel from "@/models/auth/otp/otp.model";
import { verifyHMAC } from "@/utils/secure/crypto/HMAC";

dbConnect();

export default async function verifyOTPHandler(req, res) {
    try {
        const { method } = req;
        if (method !== "POST") {
            return res.send({
                msg: "Invalid request",
                type: "WARNING"
            });
        }
        const { email, otp, key } = req.body;

        if (!verifyHMAC(email, key)) {
            console.log("failed verify HMAC: opt: 22");
            return res.send({
                msg: "key is incorrect",
                type: "WARNING"
            });
        }

        if (!email || !otp) {
            console.log("Email or otp not present: opt: 22");
            return res.send({
                msg: "Email and OTP are required",
                type: "WARNING"
            });
        }

        const isEmailOtpCached = await checkInRedisCache(`${email}+OTP`);
        console.log({ isEmailOtpCached });
        if (!isEmailOtpCached.isInRedis) {
            return res.send({
                msg: "OTP not found. Please request a new OTP.",
                type: "WARNING"
            });
        }

        const cachedOTPHash = isEmailOtpCached.value;
        const isOTPValid = await compare(otp.toString(), cachedOTPHash);
        if (!isOTPValid) {
            return res.send({
                msg: "Invalid OTP",
                type: "ERROR"
            });
        }

        await redis.del(`${email}+OTP`);

        res.send({ msg: "OTP is valid", type: "SUCCESS", key });
    } catch (requestError) {
        return res.send({
            msg: requestError.message,
            type: "ERROR"
        });
    }
}
