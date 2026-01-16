import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link,useNavigate} from 'react-router-dom';
const email = localStorage.getItem('email')
const pageStyles = `
  body {
    background-color: #f8f9fa;
  }

  .navbar-gradient {
    background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
    background: linear-gradient(to right, #a855f7, #ec4899); 
  }

  .welcome-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh; /* Full screen height */
    padding-top: 56px; /* Offset for the fixed-top navbar */
  }

  .welcome-card {
    background-color: #ffffff;
    border-radius: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); 
    border: none;
    max-width: 600px;
    width: 100%;
    overflow: hidden;
  }

  .welcome-card-header {
    /* We can add a gradient header here too, or keep it simple */
    background: linear-gradient(to right, #a855f7, #ec4899);
    padding: 2rem;
    text-align: center;
  }
  
  .welcome-card-header h1 {
    color: white;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .welcome-card-header p {
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 0;
  }

  .welcome-card-body {
    padding: 2.5rem;
    text-align: center;
  }
  
  .welcome-card-body p {
    font-size: 1.1rem;
    color: #495057;
  }
`;
function nav(){
  const navigate=useNavigate()
}
const handleLogout=(e)=>{
   toast.info("You have been logged out.", {
      autoClose: 2000,
      onClose: () => navigate('/Login')
    });
  }
export default function Organizer() { 
  const navigate=useNavigate()
const handleLogout=(e)=>{
   toast.info("You have been logged out.", {
      autoClose: 2000,
      onClose: () => navigate('/Login')
    });
  }
  return (
    <>
      <style>{pageStyles}</style>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top navbar-gradient">
        <div className="container-fluid">
          <h1 style={{color:'white'}}>EventHub</h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{color:'white'}}
                >
                  {email}
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/organizer">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/ManageEntry">
                      Manage Entry
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Event">
                      Create Event
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/ChatBot">
                      Ai ChatBot
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="welcome-container">
        <div className="card welcome-card shadow-lg">
           <div className="welcome-card-header">
             <h1>Welcome, Organizer!</h1>
             <p>Your central hub for managing events.</p>
           </div>
           <div className="welcome-card-body">
            <p>
              Use the menu in the top-right corner (under your email) to 
              create a new event or manage your existing entries.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}


