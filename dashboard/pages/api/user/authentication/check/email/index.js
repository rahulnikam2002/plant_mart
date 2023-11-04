import { doUserExist } from "@/utils/helper/authentication/user/check.isRegistered";
import dbConnect from "@/utils/database/mongodb.connect";
import { createHash } from "crypto";
import { checkInRedisCache } from "@/utils/cache/redis";

export default async function handler(req, res) {
  const { method } = req;
  if (method !== "POST") {
    return res.send({
      msg: "Invalid request"
    });
  }
  try {
    await dbConnect();
    const { email } = req.body;
    console.log(email);
    const isInCache = await checkInRedisCache(email);
    if (!isInCache) {
      console.log(1);
      const isUserRegistered = await doUserExist(email);
      console.log(isUserRegistered);
      return res.send({
        type: "SUCCESS",
        isUserRegistered,
        source: "DATABASE"
      });
    }
    return res.send({
      type: "SUCCESS",
      isInCache,
      source: "Cache"
    });
  } catch (requestError) {
    return res.send({
      msg: requestError.message,
      type: "ERROR"
    });
  }
}
