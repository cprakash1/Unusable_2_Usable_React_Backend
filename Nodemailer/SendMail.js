const nodeMailer = require("nodemailer");
const { error } = require("console");
const ExpressError = require("../utils/expressError");

module.exports.SendMail = async (obj) => {
  // console.log(req.body);
  try {
    const output = `<h1>Mail Regarding Forgot Password<h1><ul>
    <li>Name: ${obj.username}</li>
    <li>Email: ${obj.email}</li>
    <li>Phone :***********12</li>
    <li>Company: Unusable2Usable </li>
    </ul>
    <h3>Message</h3>
    <p>pin = ${obj.message}
    </p>`;
    //creating reusable transporter using default smtp transport
    let transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      hostname: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.user,
        pass: process.env.pass,
        method: "PLAIN",
      },
      tls: {
        rejectUnauthorized: false,
      },
      debug: true,
    });
    let mailerOption = {
      from: "cp8913063@gmail.com",
      to: obj.email,
      subject: "Unusable2Usable",
      text: obj.message,
      html: output, // HTML TEXT
    };
    transporter.sendMail(mailerOption, (error, info) => {
      if (error) {
        console.log(error);
        throw new ExpressError("Error in Nodemailer", 500);
      }
      console.log(`MESSAGE SENT ${info.messageId}`);
      // console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(info)); // ONLY IF WE SEND MAIL THROUGH ETHERAL
    });
  } catch (err) {
    throw new ExpressError("Error in Nodemailer", 500);
  }
};
