import nodemailer, { SendMailOptions } from "nodemailer";
import config from "config";
import log from "../utils/logger";



// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'alp.tuna.453@gmail.com',
    pass: config.get<string>('emailPassword'),
  },
});

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      log.error(err, "Error sending email");
      return;
    }

    log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail;