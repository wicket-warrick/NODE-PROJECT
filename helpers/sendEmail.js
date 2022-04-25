const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, subject, content) => {
  const message = {
    to: email,
    from: process.env.SENDGRID_FROM,
    subject: subject,
    text: content,
    html: `<div>
    <h1>${subject}</h1>
    <p>${content}</p>
    </div>
    `,
  };

  await sendgrid.send(message);
};

module.exports = { sendEmail };
