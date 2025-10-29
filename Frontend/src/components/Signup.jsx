import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'; 

export default function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword:''
    });
    const [userType, setuserType] = useState('');
    const[error,seterror]=useState('');
    function Validate(e){
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
        {
        toast.error('valid Email is required')
        return -1;
        }
        const hasUppercase = /[A-Z]/;
        const hasNumber = /[0-9]/;
        const hasSpecial = /[^A-Za-z0-9]/;
        if(formData.password.length < 8) 
        { 
        toast.warning("Password must be at least 8 characters long")
        return -1;
        }
        if(!hasNumber.test(formData.password))
        {
        toast.warning("Password must contain a number")
        return -1;
        }
        if(!hasUppercase.test(formData.password))
        {
        toast.warning("Password must contain an uppercase letter")
        return -1;
        }
        if(!hasSpecial.test(formData.password))
        {
        toast.warning("Password must contain a special character")
        return -1;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error=Validate();
        if(error===-1)
            return;
          const { email, password,confirmPassword } = formData;
        if (!userType) {
            toast.warning("Please select the type of the user");
            return; 
        }
        if(!email || !password)
        {
            toast.warning('Email and password is required')
            return;
        }
        if(password!=confirmPassword){
           seterror('Password Does not Match');
            return;
        }
        seterror('')
        try {
            const response = await axios.post('http://localhost:4001/api/insert', {...formData,userType}); 
            console.log("Success:", response.data);
            toast.success("Registration sucessful", {
                  autoClose: 2000,
                  onClose: () => navigate('/Login')
                });
        } catch (err) {
            console.error("Error:", err);

            if (err.response && err.response.status === 409) {
                toast.error('Email Already Registered');
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
         <h1 className='page-brand-title'>EventHub</h1>
        <div className='signup-page'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className='signup-form'>
                <h1 className='text-center signup-title'>Join the Community</h1>
 <p className='text-center signup-tagline'>Sign up and unlock a world of events.</p>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>Sign up as</label>
                        <select className='form-select' value={userType} onChange={(e) => { setuserType(e.target.value) }}>
                            <option value=''>Select User Type...</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                            <option value="Organizer">Organizer</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='emailInput' className='form-label'>Email address</label>
                        <input
                            type='email'
                            name='email'
                            className='form-control'
                            value={formData.email}
                            onChange={handleChange}
                            id='emailInput'
                            placeholder='name@example.com'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='passwordInput' className='form-label'>Password</label>
                        <input
                            type='password'
                            name='password'
                            className='form-control'
                            value={formData.password}
                            id='passwordInput'
                            onChange={handleChange}
                            placeholder='Enter your password'
                        />
                    </div>
                     <div className='mb-3'>
                        <label htmlFor='confirmpasswordInput' className='form-label'>ConfirmPassword</label>
                        <input
                            type='password'
                            name='confirmPassword'
                            className='form-control'
                            value={formData.confirmPassword}
                            id='confirmpasswordInput'
                            onChange={handleChange}
                            placeholder='Confirm your password'
                        />
                        <p style={{color:'red'}}>{error}</p>
                         </div>
                    <button type='submit' className='btn btn-primary w-100 signup-btn'>Create Account</button>
                </form>
                <div className='text-center mt-4 login-link-container'>
                    <p>Already have an account? <Link to={'/Login'}>Login</Link></p>
                </div>
            </div>
        </div>
        </>
    );
}