export default async function handler(req, res) {
  const { method } = req;
  if (method !== "POST") {
    return res.send({
      msg: "Invalid request"
    });
  }
  res.send("Hello")
}
