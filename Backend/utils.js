//const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
const transporter = nodemailer.createTransport({
  service:'gmail', // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
} ;

export const currentOTPs={}
export const sendEmail= async (email,otp)=>
    {
    return new Promise(async(resolve, reject) => {
        try {
            console.log('email to be sent to:',email);
            const status = await transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: "OTP for Password Reset",
                html: `<h2>This is Your otp: ${otp} to RESET the Password</h2>`,
            })
            resolve('otp sent successfully')
        }catch (error) {
            console.log(error);
            reject('otp sending failed')
        }
    })
}


const accessTokenSecret="randomAccessSecret";
export function generateAccessToken(user){
    return jwt.sign(user,accessTokenSecret,{
        expiresIn:'20min'
    })
}

export const JWTMiddleware=(req,res,next)=>{
    let reqHeaders=req.headers['authorization']
    if(!reqHeaders){
        res.status(404).json({message:'Unauthorized,Invalid token!'})
    }
    let token=reqHeaders.split(" ")[1]
    jwt.verify(token,accessTokenSecret,(err,user)=>{
        if(err){
            res.status(404).json({message:'Forbidden,Invalid token!'})
        }
        req.user=user;
        next();
    })

        

}
