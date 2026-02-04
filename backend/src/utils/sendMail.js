import nodemailer from "nodemailer";
import { apiError } from "./ApiError.js";
import { apiResponse } from "./ApiResponse.js";

const sendMail = async ({ user, pass, from, to, subject, message }) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user,
        pass: pass,
      },
    });

    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: message,
    };
    const info = await transport.sendMail(mailOptions);
    return info.messageId;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new apiError(500, "Email could not be sent");
  }
};

export default sendMail;
