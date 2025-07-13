import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const transporter = async () => {
  const accessToken = await oAuth2Client.getAccessToken();
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
};

async function sendEmail(email, otp) {
  const transporterObj = await transporter();
  const info = await transporterObj.sendMail({
    from: process.env.EMAIL_USER,
    to: `${email}`,
    subject: "Login Otp",
    text: "Hello world?",
    html: `<b>Your Otp to login: ${otp} </b>`,
  });

  console.log("Message sent:", info.messageId);
}

export default sendEmail;
