import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import './Signup.css'

export default function Login() {
  const navigate = useNavigate()
  const [FormData, setFormData] = useState({ email: '', password: '' })
  const [userType, setUserType] = useState('')
const[Loging,setLoging]=useState(false)
  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoging(true);
    const { email, password } = FormData
    if (!userType) {
      toast.warning('Please select the type of the user')
       setLoging(false);
       return
    }
    if (!email || !password) {
      toast.warning('Email and password are required')
       setLoging(false);
      return
    }
    try {
      const response = await axios.post('http://localhost:4001/api/Login', { ...FormData, userType })
      toast.success('Logged In Successful!',{
        autoClose:2000,
        onClose: ()=>{
     if (userType === 'User'&&response.data.email){
        localStorage.setItem('email',response.data.email)
        navigate('/User')
      } else if (userType === 'Organizer' && response.data.organizerId&&response.data.email) {
        localStorage.setItem('organizerId', response.data.organizerId)
         localStorage.setItem('email',response.data.email);
        navigate('/Organizer')
      }
    }
      })
     
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error('User Not Found')
      } else if (err.response && err.response.status === 401) {
        toast.error('Invalid User Credentials')
      } else {
        toast.error('Server Error')
      }
    }
    finally{
       setLoging(false);
    }
  }

  return (
    <>
     <h1 className='page-brand-title'>EventHub</h1>
    <div className="signup-page">
      <div className="signup-form" style={{width:'600px'}}>
        <h1 className="signup-title text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Login as</label>
            <select className="form-select" value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="select">Select</option>
              <option value="User">User</option>
              <option value="Organizer">Organizer</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="name@example.com"
              value={FormData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Enter your password"
              value={FormData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="signup-btn w-100" disabled={Loging}>{Loging?'LogingIn..':'Login'}</button>
        </form>
        <div className="text-center mt-3 login-link-container">
          <p>Don't Have an account?</p>
          <Link to="/Signup">Sign UP</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
    </>
  )
}
