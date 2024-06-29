// components/module/mailer.ts
import nodemailer from "nodemailer";
// import { render } from "@react-email/components";
// import VerificationEmail from "../templates/EmailTemplate";
import { ApiResponse } from "@/lib/types";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.NODEMAILER_HOST,
  port: parseInt(process.env.NODEMAILER_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PWD,
  },
});

interface SendEmailProps {
  email: string;
  otp: string;
}

export const sendEmail = async ({
  email,
  otp,
}: SendEmailProps): Promise<ApiResponse> => {
  //const emailHtml = render(<VerificationEmail email={email} otp={otp} />);

  const fromEmail = process.env.SEND_FROM_EMAIL;
  const mailOptions = {
    from: <any>{
      name: "Land Transfer Fee 👻",
      address: fromEmail,
    },
    to: email,
    subject: "Verification Code From Land Transfer Fee",
    html: `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
          .header { text-align: center; }
          .content { margin-top: 20px; }
          .otp { font-size: 24px; font-weight: bold; color: #333; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Hello, ${email}</h1>
          </div>
          <div class="content">
            <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
            <p class="otp">${otp}</p>
            <p>If you did not request this code, please ignore this email.</p>
          </div>
        </div>
      </body>
    </html>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error: any) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Error while sending email for verification",
    };
  }
};
