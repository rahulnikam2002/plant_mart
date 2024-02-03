import { generateHMAC } from "@/utils/secure/crypto/HMAC";

export default async function handler(req, res) {
  const { method } = req;
  if (method !== "POST") {
    return res.send({
      msg: "Invalid request",
      code: 4
    });
  }
  const { orderId, paymentId, razorpaySignature } = req.body;
  const plainText = orderId + "|" + paymentId;
  const generateSignature = generateHMAC(
    plainText,
    process.env.NEXT_PUBLIC_RAZORPAY_SECRET_ID
  );
  console.log({
    ourGeeratedSign: generateSignature,
    origin: razorpaySignature
  });
  if (generateSignature === razorpaySignature) {
    return res.send({
      msg: "Payment Successful",
      code: 200
    });
  } else {
    return res.send({
      msg: "Payment Failed",
      code: 7
    });
  }
}
