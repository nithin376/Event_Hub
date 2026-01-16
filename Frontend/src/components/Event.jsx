import React from 'react'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const heading_style={
  background: 'linear-gradient(120deg, #ff3cac 0%, #784ba0 50%, #ffb653 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
    display: 'inline-block',
    width: '100%'
}
 const button_style={
background: 'linear-gradient(120deg, #ff3cac 0%, #784ba0 50%, #ffb653 100%)',
  color: 'white',
  border: 'none',
  padding: '8px 15px',
  borderradius: '20px',
  fontweight: 'bold',
  cursor:'pointer'
  }
export default function Event() {
  const navigate=useNavigate()
    const [formData, setFormData] = useState({
    Title: "",
    Descrption: "",
    Location: "",
    Date: "",
    Category: "",
    Fees: "",
    PrizeMoney: "",
  });
  const organizerId=localStorage.getItem("organizerId");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value,
  });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const payload={...formData,organizerId}
    try{
    const response=await axios.post('http://localhost:4001/api/NewEvent',payload);
    console.log(response.data.message)
    toast.success('Event Uploaded Succesfully',{
    autoClose:1500,
    onClose:()=>navigate('/Organizer')
    })
    
    }
    catch(err){
      console.log(err.response.data)
      toast.error("Error in Uploading The Data")
    }
    setFormData({
      Title: "",
    Descrption: "",
    Location: "",
    Date: "",
    Category: "",
    Fees: "",
    PrizeMoney: ""
    })
  };
  return (
    <div>
  <div className="organizer-container">
      <div className="card shadow-lg p-4">
        <h1 className="card-title text-center mb-4"style={heading_style}>Create New Event</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Title" className="form-label">Title</label>
            <input
              name="Title"
              type="text"
              className="form-control"
              id="Title"
              value={formData.Title}
              onChange={handleChange}
              placeholder="Enter title for Event"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Descrption" className="form-label">Description</label>
            <textarea
              name="Descrption"
              className="form-control"
              id="Descrption"
              value={formData.Descrption}
              onChange={handleChange}
              placeholder="Enter description about Event"
              rows="3"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Location" className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              id="Location"
              name="Location"
              value={formData.Location}
              onChange={handleChange}
              placeholder="Enter the location for Event"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Date" className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              id="Date"
              name="Date"
              value={formData.Date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Category" className="form-label">Category</label>
            <select
              className="form-select"
              name="Category"
              id="Category"
              value={formData.Category}
              onChange={handleChange}
              required
            >
              <option value="">Select a Category</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Cricket">Cricket</option>
              <option value="Dance">Dance</option>
              <option value="Music">Music</option>
              <option value="Sports">Sports</option>
              <option value='Party'>Party</option>
              <option value="E-Sports">E-Sports</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="Fees" className="form-label">Entry Fee</label>
            <input
              type="text"
              className="form-control"
              id="Fees"
              name="Fees"
              value={formData.Fees}
              onChange={handleChange}
              placeholder="Enter the Fee for Event (e.g., 500)"
              min="0"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="PrizeMoney" className="form-label">Prize Money</label>
            <input
              type="text"
              className="form-control"
              id="PrizeMoney"
              name="PrizeMoney"
              value={formData.PrizeMoney}
              onChange={handleChange}
              placeholder="Enter the Prize Money (e.g., 10,000 INR)"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100"style={button_style}>Add Event</button>
        </form>
      </div>
    </div>
    </div>
  )
}
