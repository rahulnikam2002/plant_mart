import mongoose from "mongoose";

const OtpModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    OTP: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 10 // Documents will expire in 30 days (Business approach)
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Otp || mongoose.model("Otp", OtpModel);
