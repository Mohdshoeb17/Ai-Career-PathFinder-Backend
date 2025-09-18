const { Verification_Email_Template }= require("../libs/EmailTemplate");
const{ transporter } =require( "./emailConfig");

// import trasporter from './Email.config.js'
 const SendVerificationCode=async(email,verificationCode)=>{
try {
         const response = await transporter.sendMail({
      from: '"codebyapp" <sohefjjdmod@gmail.com>',
      to: email,
      subject: "VeryFy tyour email",
      text: "veryfy your email", // plain-text body
      html: Verification_Email_Template.replace("{verificationCode}",verificationCode), // HTML body 
    });
    console.log('email send successfully',response);

} catch (error) {
    console.log(error);
    
}
}
module.exports={SendVerificationCode}