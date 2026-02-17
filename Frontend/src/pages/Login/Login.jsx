import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css'
import { useState } from 'react';
import axiosClient from '../../utils/axiosClient';
import { Link } from 'react-router-dom';


export default function Login() {
    const [userDetails, setUserDetails] = useState({
        
        email: null,
        password: null
    })

    function updateFieldData(fieldName, newValue) {
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [fieldName]: newValue
        })
        )
    }


    async function submitUserDetails() 
    {
        try{
            let response= await axiosClient.post('/user-login',userDetails); 
            console.log(response);
            if(response.status===200){
                alert('user Login Successful')
            }
        }catch(e){
            alert('Login failed: ' + e.message)
        }
       
    }
    return <div className='d-flex' style={{ height: '100vh' }}>
        <div className="signup-left-half w-50" style={{ maxHeight: '100%', overflow: 'hidden' }}>
            <img src="/SIGN -UP.png" alt="authentication cover" style={{ width: '100%' }} />
        </div>
        <div className="signup-right-half w-50 border border-1 border-danger d-flex align-items-center justify-content-center">
            <div className='w-75'>
                <h1>Login</h1>
                <Form>
                    

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" className='form-field' value={userDetails.email} onChange={(e)=>{updateFieldData('email',e.target.value)}}/>
                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" className='form-field' value={userDetails.password} onChange={(e)=>{updateFieldData('password',e.target.value)}}/>
                    </Form.Group>
                    <Button variant="primary" type="button" className='w-100' onClick={() => { submitUserDetails() }} >
                        Login
                    </Button>
                </Form>
                <p>
                     
                    <Link to={'/forgot-password'}>
                    Forgot Password?
                    </Link>
                </p>
                <p>
                    Don't have an account? 
                    <Link to={'/'}>
                    Signup
                    </Link>
                </p>
            </div>
        </div>
    </div>
}