const express=require('express')
const { resister, veryfiedEmail, login } =require('../conterllor/AuthController');
 
const router=express.Router()
router.post('/register',resister)
router.post('/login',login)
router.post('/veryfyemail',veryfiedEmail)
module.exports= router