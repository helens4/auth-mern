const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const Token = require("../models/tokenModel")

module.exports = async (user, mailType) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: true,
        auth: {
            user: '80rass@gmail.com',
            pass: 'wxlbmxqyflpncaga',
        },
    })

    const encryptedToken = bcrypt.hashSync(user._id.toString(), 10).replaceAll('/', '')
    const token = new Token({ userId: user._id, token: encryptedToken })
    await token.save()

    const emailContent = `<div><h1>Please click on the below link to verify email/change password</h1><a href="http://localhost:3000/${mailType}/${encryptedToken}">${encryptedToken}</a></div>`

    const mailOptions = {
        from: '80rass@gmail.com',
        to: user.email,
        subject: 'Verify Email/reset password',
        html: emailContent
    }

    await transporter.sendMail(mailOptions)
}