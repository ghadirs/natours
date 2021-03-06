const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Activate in gmail "less secure app" option
  });

  // 2) Define email options
  const mailOptions = {
    from: "Ghadri shoamdaot <asf@asikfas.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    //   html:
  };

  // 3) Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
