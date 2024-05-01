// Import necessary modules and dependencies

import { Orders } from "@/models/orders/orders.models";
import { verifyJWT } from "@/utils/jwt/verifyJWT"; // Import JWT verification utility
import axios from "axios";
import mongoose from "mongoose";
import { resend } from "@/pages/api/user/authentication/check/email/sendMail";

// Define the default asynchronous handler function
export default async function handler(req, res) {
    // Extract the HTTP method from the request
    const { method } = req;

    // Check if the HTTP method is not PUT, return an error response
    if (method !== "PUT") {
        return res.status(405).send({
            message: "Method Not Allowed"
        });
    }

    // Extract orderId and authToken from request body and headers respectively
    const { orderId, productId, updateStatusTo } = req.body;
    const authToken = req.cookies.token;

    try {
        // Validate the auth token
        if (!authToken) {
            throw {
                status: 401,
                msg: "Authentication token is missing"
            };
        }

        // Validate the order ID
        if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
            throw {
                status: 400,
                msg: "Invalid order ID"
            };
        }

        // Find the order and update its status to "Cancelled"
        const updatedOrder = await Orders.findOneAndUpdate(
            {
                _id: orderId,
                "products._id": productId // Find the order by its ID and the product ID
            },
            {
                $set: { "products.$.deliveryStatus": updateStatusTo } // Update the deliveryStatus of the matched product
            },
            {
                new: true
            }
        ).populate("userId");

        // Check if the order exists
        if (!updatedOrder) {
            throw {
                status: 404,
                msg: "Order not found"
            };
        }

        // await resend.emails.send({
        //     from: "Plant Mart <plantmart@bookingbreeze.in>",
        //     to: [checkAuthToken.email],
        //     subject: "Plant Mart Order cancelled successful",
        //     react: CancelTemplate({ userName: updatedOrder.userId.name, productId: productId })
        // });

        return res.status(200).send(updatedOrder);
    } catch (error) {
        // Handle errors and send appropriate status code and error message
        console.log({ error });
        const status = error.status || 500;
        return res.status(status).send({
            msg: error.msg || "Internal Server Error"
        });
    }
}

export const CancelTemplate = ({ userName, productId }) => (
    <div
        style={{
            fontFamily: "Arial, sans-serif",
            color: "#333",
            maxWidth: "600px",
            margin: "0 auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9"
        }}>
        <h1
            style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
                textAlign: "center"
            }}>
            Dear {userName},
        </h1>
        <p
            style={{
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "10px"
            }}>
            We are writing to inform you that your recent cancellation request has been successfully processed.
        </p>
        <p
            style={{
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "10px"
            }}>
            The cancellation request for product ID{" "}
            <span
                style={{
                    fontWeight: "bold",
                    color: "#007bff"
                }}>
                {productId}
            </span>{" "}
            has been confirmed and processed accordingly.
        </p>
        <p
            style={{
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "10px"
            }}>
            Please feel free to review the details of your cancelled order in the "My Orders" section of your profile for further reference.
        </p>
        <p
            style={{
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "10px"
            }}>
            If you have any questions or concerns, do not hesitate to contact our customer support team. We are here to assist you.
        </p>
        <p
            style={{
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "10px"
            }}>
            Thank you for choosing our services.
        </p>
        <p
            style={{
                marginTop: "30px",
                textAlign: "right",
                fontStyle: "italic"
            }}>
            Best regards,
        </p>
        <p
            style={{
                textAlign: "right",
                fontStyle: "italic"
            }}>
            Plant Mart
        </p>
    </div>
);
