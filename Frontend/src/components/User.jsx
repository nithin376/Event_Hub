import React from 'react'
import { useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import './userStyling.css'
export default  function User() {
  const navigate=useNavigate()
  const[Loading,setLoading]=useState(true)
  const[Error,setError]=useState(false)
  const[Event,setEvent]=useState([])
  const[search,setSearch]=useState('');
  const email=localStorage.getItem('email');
  useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/List');
      const events = response.data.List;
      setEvent(events); 
    } catch (err) {
      if (err.response) {
        setError(true);
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };
  fetchEvents();
}, []); 
 if (Loading) {
    return <div className="loading-message">Loading events...</div>;
  }

  if (Error) {
    return <div className="error-message">Error: {Error.message}. Please try again later.</div>;
  }
  const handleEntry=(eventid)=>{
    navigate(`/Entry/${eventid}`)
  }
  const handleLogout=(e)=>{
   toast.info("You have been logged out.", {
      autoClose: 2000,
      onClose: () => navigate('/Login')
    });
  }
  const filtredEvents=Event.filter(event=>
    event.Title.toLowerCase().includes(search.toLowerCase())||
    event.Category.toLowerCase().includes(search.toLowerCase())||
    event.Location.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
  <nav className="navbar navbar-expand-lg navbar-dark fixed-top navbar-gradient">
    <h1 style={{color:'#30213dff'}}>EventHub</h1>
<div class="container mt-3">
    <div className="container-fluid">
      <ul className="navbar-nav ms-auto ">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:'black'}}>
                                {email}
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/Registration">My Registrations</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                            </ul>
                        </li>
                    </ul>
    </div>
</div>
 </nav>
    <h2>Upcoming Events</h2>
    <div className='mb-4'>
      <input type='text'
             className='form-control'
             placeholder='search by Title,category or Location'
             value={search}
             onChange={e=>setSearch(e.target.value)}/>
    </div>
    <div className='Event-container'>
      {filtredEvents.length>0?(
        filtredEvents.map(event=>(
          <>  <div key={event._id} className={`event-card ${event.Category}`}>
            <div className="card-content">
            <h3>Title:{event.Title}</h3>
            <p>{event.Descrption}</p>
            <p>Category:{event.Category}</p>
            <p>Date:<strong>{event.Date}</strong></p>
            <p>Location:<strong>{event.Location}</strong></p>
            <p>EntryFee:{event.Fees}</p>
            <p>PrizeMoney:{event.PrizeMoney}</p>
            <div className='btn btn-primary' type='submit' onClick={()=>handleEntry(event._id)}>Register</div>
          </div>
          </div>
          </>
        ))
      ):(
        <p className='no-events-message'>
          {Event.length > 0 ? "No events found matching your search." : "No Events To Display"}</p>
      )}
    </div>
    </>
  )
}
