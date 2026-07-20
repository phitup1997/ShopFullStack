const nodemailer = require("nodemailer")
const asyncHandler = require("express-async-handler")

const sendMail = asyncHandler(async (email, html) => {
  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  })

  try {
    const info = await transporter.sendMail({
      from: '"ShopFullStack" <no-reply@ShopFullStack.com>',
      to: email,
      subject: "Forgot Password",
      html,
    })

    return info
  } catch (err) {
    console.error("Error while sending mail:", err)
  }
})

module.exports = sendMail
