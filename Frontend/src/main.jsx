import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './index.css'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import Organizer from './components/Organizer.jsx'
import User from './components/User.jsx'
import Event from './components/Event.jsx'
import Entry from './components/Entry.jsx'
import ManageEntry from './components/ManageEntry.jsx'
import Registration from './components/Registration.jsx'
import ChatBot from './components/ChatBot.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup />}/>
       <Route path='/Signup' element={<Signup />}/>
      <Route path='/Login' element={<Login />}/>
      <Route path='/Organizer' element={<Organizer/>}/>
      <Route path='/User' element={<User />}/>
      <Route path='/Event' element={<Event />}/>
      <Route path='/Entry/:eventid' element={<Entry />}/>
      <Route path='/ManageEntry' element={<ManageEntry />}/>
      <Route path='/Registration' element={<Registration />}/>
      <Route path='/ChatBot' element={<ChatBot/>}/>
    </Routes>
    <ToastContainer />
    </BrowserRouter> 
  </StrictMode>,
)
