import ResetPasswordEmail from "@/app/_components/Email/ResetPasswordEmail";
import { pretty, render } from "@react-email/render";

const nodemailer = require("nodemailer");

export default async function sendMail(email, resetUrl) {
  const html = await pretty(
    await render(<ResetPasswordEmail resetUrl={resetUrl} />)
  );

  console.log(html);

  const transporter = nodemailer.createTransport({
    service: "gmail", // Shortcut for Gmail's SMTP settings - see Well-Known Services
    auth: {
      user: "kaiqueferraz.dev@gmail.com",
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  let mailOptions = {
    from: '"Shark Store team" <kaiqueferraz.dev@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "This is your reset password link", // Subject line
    html: html, // html body
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
}
