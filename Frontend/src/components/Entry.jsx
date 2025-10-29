import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
const formContainerStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
};
export default function Entry() {
    const navigate=useNavigate();
    const{eventid}=useParams();
    const [formData, setFormData] = useState({
        TeamName: '',
        email: '',
        PhoneNumber: ''
    });
function Validate(e){
   if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
   {
    toast.error('valid Email is required')
    return -1;
   }
   if (!formData.PhoneNumber.match(/^\d{10}$/)){
    toast.error("10 digit phone number is required")
    return -1;
   }
}
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       const error= Validate()
       if(error===-1){
        return;
       }
       const payload={...formData,eventid}
       try{
       const response=await axios.post('http://localhost:4001/api/Entry',payload)
        toast.success('Registred SuccesFully')
        const eventid=localStorage.setItem('eventid',response.eventid);
       setTimeout( ()=>{navigate('/User')}
    ,2000)
       }
       catch(err){
        toast.error("Error in Registering")
       }
        setFormData({
            TeamName:'',
            email:'',
            PhoneNumber:''
        })
    };
    return (
        <div style={formContainerStyle}>
            <h2 className='text-center mb-4'>Event Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='TeamName' className='form-label'>Team Name</label>
                    <input
                        type='text'
                        name='TeamName'
                        className='form-control'
                        value={formData.TeamName}
                        onChange={handleChange}
                        id='TeamName'
                        placeholder='Enter Your Team Name' required
                    />
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
                        placeholder='name@example.com' required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='PhoneNumber' className='form-label'>Phone Number</label>
                    <input
                        type='text'
                        name='PhoneNumber'
                        className='form-control'
                        value={formData.PhoneNumber}
                        onChange={handleChange}
                        id='PhoneNumber'
                        placeholder='Enter your Phone Number' required
                    />
                </div>
                <button type='submit' className='btn btn-primary w-100'>Register</button>
            </form>
        </div>
    );
}