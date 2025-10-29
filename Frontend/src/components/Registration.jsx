import React from 'react'
import axios from 'axios'
import { useState,useEffect} from 'react'
function Registration() {
    const[data,setData]=useState('')
    const email=localStorage.getItem('email')
    console.log(email)
 useEffect(()=>{
const fetchdata=async()=>{
  try{
    const response=await axios.get(`http://localhost:4001/api/registrations/${email}`)
    setData(response.data.data);
    console.log(response.data.data)
}
catch(err){
  console.log("erorr",err)
}
};fetchdata()
    },[])
    const style=`
    .manage-table thead th{
     background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
    background: linear-gradient(to right, #a855f7, #ec4899); 
    }
    `
  return (
   <>
 <div className="table-container">
      <h2 className="table-heading">MY REGISTRATIONS</h2>
      <table className="manage-table">
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Team Name</th>
            <th>Email</th>
            <th>Event Title</th>
            <th>Event Category</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((event, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{event.TeamName}</td>
                <td>{event.email}</td>
                <td>{event.Title}</td>
                <td>{event.Category}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Registartions  Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
   
   </>
  )
}

export default Registration