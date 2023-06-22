const nodemailer = require("nodemailer");

const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PWD;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

const sendConfirmationEmail = (email, name, confirmationCode) => {
  console.log("Check");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:3001/auth/confirm/${confirmationCode}> Click Here</a>
          </div>`,
    })
    .catch((err) => console.log(err));
};

const resetEmail = (email, name, resetCode) => {
  console.log("Check");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please reset your password",
      html: `<h1>Reset Password</h1>
            <h2>Hello ${name}</h2>
            <p>Please reset your password by clicking the link</p>
            <a href=http://localhost:3001/auth/confirm/${resetCode}> Click Here</a>
            </div>`,
    })
    .catch((err) => console.log(err));
};

module.exports = { sendConfirmationEmail, resetEmail };
