// Import necessary modules and dependencies
import productModel from "@/models/product/product.model";
import dbConnect from "@/utils/database/mongodb.connect";

// Define the default asynchronous handler function
export default async function handler(req, res) {
    dbConnect();
    // Extract the HTTP method from the request
    const { method } = req;

    // Check if the HTTP method is not POST, return an error response
    if (method !== "GET") {
        return res.status(401).send({
            message: "Method invalid"
        });
    }

    try {
        console.log("first");
        const allCategories = await productModel.find({}).select("categories");

        return res.send(allCategories);
    } catch (error) {
        // Handle errors and send appropriate status code and error message
        const status = error.status || 500;
        return res.status(status).send({
            msg: error.msg
        });
    }
}

/**
 * console.log(allCategories);
        const flatArray = allCategories.flatMap((item) => item.categories);

        const uniqueCategories = Array.from(new Set(flatArray));
 */
