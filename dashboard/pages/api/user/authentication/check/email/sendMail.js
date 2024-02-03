import * as React from "react";
import { Resend } from "resend";


const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export const EmailTemplate = ({ OTP }) => (
  <div>
    <h1>OTP is, {OTP}!</h1>
    <p>check from where the email has came!</p>
  </div>
);

export const sendMail = async (EMAIL, OTP) => {
  try {
    const data = await resend.emails.send({
      from: "Plant Mart <rahulaman@bookingbreeze.in>",
      to: [EMAIL],
      subject: "OTP! 🚨📱 for your new accout.",
      react: EmailTemplate({ OTP })
    });
    return data;
  } catch (error) {
    return error;
  }
};
