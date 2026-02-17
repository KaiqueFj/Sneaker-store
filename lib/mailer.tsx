import nodemailer from "nodemailer";

type SendMailProps = {
  to: string;
  subject: string;
  html: string;
};

export default async function sendMail({
  to,
  subject,
  html,
}: SendMailProps): Promise<{ message: string }> {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Shark Store Team" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    return { message: "Email sent successfully" };
  } catch (error) {
    return { message: "Email could not be sent. Try again later." };
  }
}
