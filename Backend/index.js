import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import pool from  './db.js'
const app=express()
import {generateOTP,currentOTPs,sendEmail} from './utils.js'

app.use(cors({origin:'*'}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.status(200).json({message:'Hii,i am the default Route'})
})

app.post('/forgot-password', async (req, res) => {
  const {email} = req.body;
  console.log(email);
  const user = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
  console.log(user[0]);
  if (user[0].length==0){
    res.status(404).json({message:'User not found'})
  }
  else{
    let generatedOtp = generateOTP();
    currentOTPs[email] = generatedOtp;
    sendEmail(email,generatedOtp)
    .then((data)=>{;
      console.log(data);
      res.status(200).json({message:'OTP sent successfully'})
    })
    .catch((e)=>{
      console.log(e);
      res.status(500).json({message:'Failed to send OTP'})
    })
    .finally(()=>{
      console.log(currentOTPs);
    })
  }
})

app.post('/verify-otp', async (req, res) => {
  const{email,otp}=req.body;
  if(Object.keys(currentOTPs).includes(email)){
    if (currentOTPs[email]===otp){
    res.status(200).json({message:'OTP verified successfully'})
    }
    else{
    res.status(400).json({message:'Invalid OTP'})
    }
  }
  else{
    res.status(404).json({message:'otp does not exist for this email'}) 
  }
  

})


app.post('/reset-password', async (req, res) => {
  try{
    const{email,new_password}=req.body;
    const passwordHash=await bcrypt.hash(new_password,10)
    const updatedUser=await pool.query(`update users set passwordHash='${passwordHash}' where email='${email}'`)
    console.log(updatedUser);
    //delete currentOTPs[email];
    res.status(200).json({message:'Password reset successfully'})

  }catch(e){
    console.log(e);
    res.status(500).json({message:'Failed to reset password'})
  }
  
})
app.post('/user-login',async (req, res) => {
  console.log('Line 15: ',req,body)
  const email=req.body.email
  const password=req.body.password
  const user= await pool.query(`select *from users where email='${email}'`);
  const passwordHash=user[0].passwordHash
  const isPasswordCorrect = await bcrypt.compare(password, passwordHash);
  if(isPasswordCorrect){
    res.status(200).json({userAuthenticated:true});
  }else{
    console.log('Is password Correct?', isPasswordCorrect);
  }
})

app.post('/register-user',async (req,res)=>{
    console.log('Line 16:',req.body)
    const name=req.body.name
    const email=req.body.email
    const password=req.body.password
    const passwordHash=await bcrypt.hash(password,10)
    const newUser=await pool.query(`insert into users(name,email,passwordHash) values('${name}','${email}','${passwordHash}')`)
    console.log(newUser)
    console.log('Line 19:', passwordHash)
    res.status(200).json({message:'User registered successfully'})

})


const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

const testDB = async () => {
  await pool.query("SELECT 1");
  console.log("✅ MySQL Connected Successfully");
};

testDB();
