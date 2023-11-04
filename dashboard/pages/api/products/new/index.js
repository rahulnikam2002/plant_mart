import { adminVerification } from "@/utils/helper/authentication/admin/admin.verification";
import Joi from "joi";
import productModel from "@/models/product/product.model";

const productDataSchema = Joi.object({
  productName: Joi.string().required(),
  productDescription: Joi.string().required(),
  featuredImages: Joi.array().items(Joi.string()).min(3).max(3).required(),
  categories: Joi.array().items(Joi.string()).required(),
  productQuantity: Joi.string().required(),
  productSKU: Joi.string().required(),
  productWeight: Joi.string().required(),
  productHeight: Joi.string().required(),
  productSpread: Joi.string().required(),
  productMaxHeight: Joi.string().required(),
  salePrice: Joi.string().required(),
  originPrice: Joi.string().required()
});

const validator = (data) => {
  const { error } = productDataSchema.validate(data, { abortEarly: false });
  if (error) {
    return {
      isValid: false,
      errors: error.details.map((errorDetail) => errorDetail.message)
    };
  } else {
    return {
      isValid: true,
      data
    };
  }
};

// Define an async function to handle the HTTP request
export default async function handler(req, res) {
  try {
    // Check if the HTTP method is not POST
    if (req.method !== "POST") {
      return res.status(401).send({
        message: "HTTP method not allowed"
      });
    }

    // Extract the token from the cookie
    const cookie = req.cookies.token.split("-tzqM")[0];
    // console.log("cookie ===>", cookie);

    // Check if the token is missing or too short
    if (!cookie || cookie.length < 10) {
      return res.status(401).send({
        code: 0,
        message: "Unauthorized access to this route!"
      });
    }

    // Verify admin credentials using the extracted token
    const adminDetails = await adminVerification(cookie);

    // Check if adminDetails is valid
    if (!adminDetails) {
      return res.status(401).send({
        code: 0,
        message: "Unauthorized access to this route!"
      });
    }
    // Check if the admin has full access
    const adminAccess = adminDetails.data.admin.access;
    if (adminAccess !== "full") {
      // Handle cases where the admin does not have full access
      return res.send({
        code: 0,
        message: "You don't have this access"
      });
    } else {
      const isDataValid = validator({ ...req.body });
      if (!isDataValid.isValid) {
        return res.send(isDataValid.errors);
      } else {
        const addProduct = await productModel.create(isDataValid.data);
        res.send(addProduct);
      }
    }
  } catch (err) {
    // Handle errors, such as exceptions thrown during execution
    res.status(500).send({
      code: 0,
      message: "Something went wrong!",
      error: err
    });
  }
}
