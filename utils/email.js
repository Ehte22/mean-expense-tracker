const mailer = require("nodemailer")

exports.sendEmail = ({ to, subject, message }) => new Promise((resolve, reject) => {
    const transport = mailer.createTransport({
        auth: {
            user: process.env.FROM_EMAIL,
            pass: process.env.FROM_PASS
        },
        service: "gmail"
    })

    transport.sendMail({
        to,
        subject,
        text: message,
        html: message
    }, (err) => {
        if (err) {
            console.log(err);
            reject("Unable To Send Email" + err.message)
        }
        console.log(`Email Send to ${to} Success`);
        resolve(true)
    })
})