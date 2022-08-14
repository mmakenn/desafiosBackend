import { createTransport } from "nodemailer";
import { serverEmail, serverEmailPassword, adminEmail } from "../../config.js";
import logger from "./logger.js";

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: serverEmail,
        pass: serverEmailPassword
    }
});

async function sendEmail(options) {
    try {
        await transporter.sendMail(options)
    } catch (error) {
        logger.error(`Error while sending email to Admin about new singUp.\n
                    ${error}`)
    }
}

export function sendEmailToAdmin(subject, contentHTML) {
    const options = {
        from: "Server",
        to: adminEmail,
        subject: subject,
        html: contentHTML
    } 
    sendEmail(options)
}
