const sgMail = require('@sendgrid/mail')
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, "../../.env") });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.verificationEmailSend = async (email, verificationToken) => {
    try {
        const msg = {
            to: email,
            from: process.env.MAIL_FROM,
            subject: "Email verification",
            text: "Verification",
            html: `<p>You only need to verify your account by clicking this <a href="http://localhost:${process.env.PORT}/auth/verify/${verificationToken}">verification link</a></p>`,
        };
        await sgMail.send(msg);
    } catch (error) {
        console.log(error);
    }
}