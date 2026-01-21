import ResetPasswordEmail from "@/app/_components/Email/ResetPasswordEmail";
import { pretty, render } from "@react-email/render";
import nodemailer from "nodemailer";

function log(label, data) {
  console.log(`[RESET_EMAIL] ${label}`, data ?? "");
}

export default async function sendMail(email, resetUrl) {
  try {
    log("START sendMail");
    log("TO", email);
    log("RESET_URL", resetUrl);
    log("APP_PASSWORD_EXISTS", !!process.env.GOOGLE_APP_PASSWORD);

    const html = pretty(
      await render(<ResetPasswordEmail resetUrl={resetUrl} />),
    );

    log("EMAIL_HTML_RENDERED", html.length);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kaiqueferraz.dev@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    log("TRANSPORTER_CREATED");

    const result = await transporter.sendMail({
      from: '"Shark Store team" <kaiqueferraz.dev@gmail.com>',
      to: email,
      subject: "This is your reset password link",
      html,
    });

    log("EMAIL_SENT", {
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
    });

    return { ok: true };
  } catch (error) {
    log("SEND_FAILED", {
      message: error?.message,
      code: error?.code,
      response: error?.response,
      stack: error?.stack,
    });

    throw error;
  }
}
