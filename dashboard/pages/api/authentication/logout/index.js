import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(401).send({
      msg: "Method not allowed"
    });
  }
  console.log(req.cookies.token);
  res.setHeader(
    "Set-Cookie",
    serialize("token", "", {
      expires: new Date(0),
      path: "/"
    })
  );
  res.send({
    code: 1
  });
}
