import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageEntries.css'
export default function ManageEntry() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const OrganizerId=localStorage.getItem('organizerId')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/api/ManageEntry?organizerId=${OrganizerId}`);
        setData(response.data.data);
      } catch (err) {
        console.log(err);
      } finally{
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="table-container">
      <h2 className="table-heading">Manage Entries</h2>
      <table className="manage-table">
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Title</th>
            <th>Category</th>
            <th>Team Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Registration Code</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.title}</td>
                <td>{entry.category}</td>
                <td>{entry.TeamName}</td>
                <td>{entry.email}</td>
                <td>{entry.PhoneNumber}</td>
                <td>{entry.id}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Entries Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}