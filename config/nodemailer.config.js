const axios = require("axios");
const nodemailer = require("nodemailer");

const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PWD;

// const transport = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: user,
//     pass: pass,
//   },
// });

const sendConfirmationEmail = (email123, name, confirmationCode) => {
  console.log("Check");

  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email123, // Change to your recipient
    from: user, // Change to your verified sender
    subject: "Please confirm your account",
    text: "Thank you for subscribing. Please confirm your email by clicking on the following link",
    html: "<a href=https://evently-backend.vercel.app/auth/confirm/${confirmationCode}> Click Here</a>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });

  // await new Promise((resolve, reject) => {
  // transport.sendMail(
  //   {
  //     from: user,
  //     to: email,
  //     subject: "Please confirm your account",
  //     html: `<h1>Email Confirmation</h1>
  //       <h2>Hello ${name}</h2>
  //       <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
  //       <a href=https://evently-backend.vercel.app/auth/confirm/${confirmationCode}> Click Here</a>
  //       </div>`,
  //   },
  //   (err, info) => {
  //     if (err) {
  //       console.error(err);
  //       reject(err);
  //     } else {
  //       console.log(info);
  //       resolve(info);
  //     }
  //   }
  // );
  // });
};

// const resetEmail = (email, name, resetCode) => {
//   console.log("Check");
//   transport
//     .sendMail({
//       from: user,
//       to: email,
//       subject: "Please reset your password",
//       html: `<h1>Reset Password</h1>
//             <h2>Hello ${name}</h2>
//             <p>Please reset your password by clicking the link</p>
//             <a href=http://localhost:3001/auth/confirm/${resetCode}> Click Here</a>
//             </div>`,
//     })
//     .catch((err) => console.log(err));
// };

const dailyMail = (email, name) => {
  console.log("Check");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "New Places",
      html: `<h1>More existing places to visit</h1>
            <h2>Hello ${name}</h2>
            <p>Please visit the site for more exciting places</p>
            </div>`,
    })
    .catch((err) => console.log(err));
};

module.exports = { sendConfirmationEmail, dailyMail };
