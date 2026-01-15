const nodemailer = require("nodemailer");

export default function sendMail(email) {
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
    subject: "This is your reset  password lin", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
}
