import Razorpay from "razorpay";

const razorpayInstance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET_ID
});

export default async function handler(req, res) {
  console.log(true)
  const { method } = req;
  if (method !== "POST") {
    return res.send({
      msg: "Invalid request",
      code: 4
    });
  }
  try {
    const { amount } = req.body;
    console.log({amount})
    const createOrder = await razorpayInstance.orders.create({
      amount,
      currency: "INR"
    });
    console.log(createOrder)
    res.send(createOrder);
  } catch (orderError) {
    return res.send({
      code: 7,
      msg: orderError.message
    });
  }
}
