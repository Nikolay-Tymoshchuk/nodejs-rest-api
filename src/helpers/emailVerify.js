const nodemailer = require("nodemailer");

const SENDER = "nikolaytymoshchuk@meta.ua";

const { META_PASSWORD, BASE_URL } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: SENDER,
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const emailVerify = (email, verificationToken) => {
  const emailOptions = {
    from: SENDER,
    to: email,
    subject: "Confirm registration on the website Dancing People",
    html: `<a target="_blank" href="${BASE_URL}/auth/verify/${verificationToken}">Click to confirm your registration</a>`,
  };

  transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
};

module.exports = emailVerify;
