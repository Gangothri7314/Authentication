//const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer';

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

