import mongoose from "mongoose";

const AdminLogin = new mongoose.Schema(
    {
        userName: {
            type: String,
        },
        emailId: {
            type: String,
        },
        phone: {
            type: Number,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Admins || mongoose.model("Admins", AdminLogin);