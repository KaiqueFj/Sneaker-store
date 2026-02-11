import { pretty, render } from "@react-email/render";
import nodemailer from "nodemailer";
import ResetUserPasswordEmail from "../app/_components/ui/Email/ResetUserPasswordEmail";

export default async function sendMail(
  email: string,
  resetUrl: string,
): Promise<{ message: string }> {
  try {
    const rendered = await render(
      <ResetUserPasswordEmail resetUrl={resetUrl} />,
    );

    const html = await pretty(rendered);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kaiqueferraz.dev@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"Shark Store team" <kaiqueferraz.dev@gmail.com>',
      to: email,
      subject: "This is your reset password link",
      html,
    });

    return { message: "Email sent successfully" };
  } catch (error) {
    return { message: "Email could not be sent. Try again later." };
  }
}
