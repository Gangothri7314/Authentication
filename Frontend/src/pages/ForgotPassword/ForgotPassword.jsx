import Button from "react-bootstrap/esm/Button";
import  Form  from "react-bootstrap/Form";
import { useState } from 'react';
import axiosClient from '../../utils/axiosClient';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ForgotPassword(){
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        
        email: null,
        otp:null,
        new_password:null
    
    })
    const [otpSentStatus, setOtpSentStatus] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    function updateFieldData(fieldName, newValue) {
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [fieldName]: newValue
        })
        )
    }
    async function sendOTP(){
        try{
            let response = await axiosClient.post('/forgot-password/',{email:userDetails.email})
            console.log('OTP SENT');
            if(response.status===200){
                setOtpSentStatus(true);
             }
                
        }catch{
            alert('Failed to send OTP: ' + e.message)
        }
       
       
    }
    async function verifyOTP(){
        try{
            let response = await axiosClient.post('/verify-otp',{email:userDetails.email,otp:userDetails.otp})
            console.log('OTP VERIFIED');
            setOtpVerified(true);

        }catch(e){
            console.log("invalid OTP, Please enter valid otp ");
            alert('Failed to verify OTP: ' + e.message)
        }
        
    }
    async function resetPassword(){
        try{
            let response = await axiosClient.post('/reset-password',{email:userDetails.email,new_password:userDetails.new_password})
            console.log('PASSWORD RESET');
            alert('PASSWORD RESET SUCCESSFULLY');
            navigate('/login');

        }catch(e){
            console.log(e);
            alert('Failed to reset password: ' + e.message)
        }
        
    }

   

  return (
    <div className='d-flex' style={{ height: '100vh' }}>
        <div className="signup-left-half w-50" style={{ maxHeight: '100%', overflow: 'hidden' }}>
            <img src="/SIGN -UP.png" alt="authentication cover" style={{ width: '100%' }} />
        </div>
        <div className="signup-right-half w-50 border border-1 border-danger d-flex align-items-center justify-content-center">
            <div className='w-75'>
                <h1>ForgotPassword</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control disabled={otpSentStatus} type="email" placeholder="Enter email" className='form-field' value={userDetails.email} onChange={(e)=>{updateFieldData('email',e.target.value)}}/>     
                    </Form.Group>
                    {
                        otpSentStatus == false?
                            <Button onClick={sendOTP}>Send OTP</Button> :
                            <>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control disabled={otpVerified} type="text" placeholder="Enter OTP" className='form-field' value={userDetails.otp} onChange={(e)=>{updateFieldData('otp',e.target.value)}}/>
                                </Form.Group>
                                {
                                    otpVerified == false?
                                        <Button onClick={verifyOTP}>Verify OTP</Button>:
                                        <>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control type="password" placeholder="Enter New Password" className='form-field' value={userDetails.new_password} onChange={(e)=>{updateFieldData('new_password',e.target.value)}}/>
                                            </Form.Group>
                                            <Button onClick={()=>resetPassword()}>Reset Password</Button>

                                        </>
                                        

                                }
                                
                            </>
                            

                    }

                    
                    
                </Form>
                
            </div>
        </div>
    </div>
  )  
}

export default ForgotPassword