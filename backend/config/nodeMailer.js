const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASS,
  },
});

const renderTemplate = function (data, relativePath) {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log(err, "Not able to render template");
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};

module.exports = {
  transporter,
  renderTemplate,
};
