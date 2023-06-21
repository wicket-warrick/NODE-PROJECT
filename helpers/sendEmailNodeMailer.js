const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_API_KEY,
  },
});

const sendEmail = async ({ email, subject, content, link }) => {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: content, // plain text body
      html: `<div>
        <h1>${subject}</h1>
        <p>${content}</p>
        <a href='http://${link}'>Clic aqui</a>
        </div>
        `, // html body
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports={sendEmail}
