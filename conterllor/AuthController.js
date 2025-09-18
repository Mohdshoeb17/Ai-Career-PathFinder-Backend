// import { SendVerificationCode } from "../middleware/Email.js";
const  jwt =require('jsonwebtoken');
const { SendVerificationCode } =require("../midleware/email");
const { WelcomeEmail } =require("../midleware/emailConfig");
const Usermodel =require('../models/UserModel');
const dotenv=require('dotenv')
dotenv.config()
const bcrypt =require( "bcrypt");
 const SECRETEKEY=process.env.SCRETKEY
 const resister = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Validate input
    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const ExistUser = await Usermodel.findOne({ email });
    if (ExistUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);
     console.log(hashPassword);

    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Create user
    const user = new Usermodel({
      name,
      email,
      password:hashPassword,
      verificationCode,
    });

    // Save user
    await user.save();
       await WelcomeEmail(user.email,user.name)
    // Send verification email
      await SendVerificationCode(user.email, verificationCode);

    return res.status(201).json({
      success: true,
      message: "User registered successfully. Verification code sent.",
      user,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
  const veryfiedEmail=async(req,res)=>{
    try {
       const {code}=req.body;
       const user=await Usermodel.findOne({
        verificationCode:code
       })
       if(!user)
       {
          return res.status(500).json({
           success: false,
          message: "invalid or Expired Code",
    });}
     user.isVeryfied=true;
   user.verificationCode=undefined;
   await user.save()
   return res.status(200).json({
           success: true,
          message: "Email veryfied",}

    )} catch (error) {
        console.log(error);    
    }
  }
  const login=async(req,res)=>{
   try {
     const {email,password}=req.body;
   const user=await Usermodel.findOne({email});
   const IsMatchPassword=await bcrypt.compare(password,user.password);
   if(!IsMatchPassword || !user){
     return res.status(400).json({messege:'Please fill valid password or email'})
   }
    const token=jwt.sign(
      {id:user._id,
        name:user.name,
        email:user.email
      },
      SECRETEKEY,
      {expiresIn:"1d"}
    
    )
    res.status(200).json({
      messege:'Login Successfully',
      token,
      user:{id:user._id,name:user.name,email:user.email}

    })
   
   } catch (error) {
    res.status(400).json({messege:'error'+error})
    
   }
  }
 module.exports={resister,veryfiedEmail,login}
