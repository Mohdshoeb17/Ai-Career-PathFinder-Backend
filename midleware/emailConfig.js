const nodemailer =require("nodemailer");
  const transporter = nodemailer.createTransport({
  service: "gmail.com", // <-- easiest way for Gmail
  auth: {
    user: "sohefjjdmod@gmail.com",
    pass: "xnql qgku ehfq njzd", // App password (not your real Gmail password)
  },
});

// Send email
//  export const SendEmail = async (req, res) => {
//     if (!req.body.email) {
//       return res.status(400).json({ error: "Email is required" });
//     }
//   try {
//     const info = await transporter.sendMail({
//       from: '"codebyapp" <sohefjjdmod@gmail.com>',
//       to: req.body.email,
//       subject: "Hello ✔",
//       text: "Hello world?", // plain-text body
//       html: "<b>Hello world?</b>", // HTML body
//     });

//     console.log("Message sent: %s", info.messageId);
//   } catch (error) {
//     console.error("Error sending mail:", error);
//   }
// };
 const WelcomeEmail = async (email,name) => {
  try {
    const info = await transporter.sendMail({
      from: '"codebyapp" <sohefjjdmod@gmail.com>',
      to: req.body.email,
      subject: "Hello ✔",
      text: "Hello world?", // plain-text body
      html:Welcome_Email_Template.replace("name",name), // HTML body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending mail:", error);
  }
};
module.exports={transporter,WelcomeEmail}

