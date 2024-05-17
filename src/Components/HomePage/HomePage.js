import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Popups from '../Popups/Popups';
import Dltpopup from '../Dltpopup/Dltpopup';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [BtnPopup, setBtnPopup] = useState(false);
  const [deleteUserPopup, setDeleteUserPopup] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch("/user/get")
      .then(response => {
        if (response.status === 204) {
          console.log("No users found");
          setUsers([]); // Reset the users list
          return;
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          console.log("Fetched users:", data);
          setUsers(data);
        }
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        alert("An error occurred while fetching users. Please try again later.");
      });
  };
  
  
  
  const addUser = (userData) => {
    fetch("/user/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(() => {
      fetchUsers(); // Fetch the latest user list
      setBtnPopup(false); // Close the popup
    })
    .catch(error => {
      console.error("Error adding user:", error);
      alert("An error occurred while adding the user. Please try again later.");
    });
  };
    
  

  const handleLogout = () => {
    fetch("/admin/logout", {
      method: "POST",
    })
    .then(response => {
      if (response.ok) {
        navigate('/login');
      } else {
        console.error("Logout failed:", response.statusText);
        alert("Logout failed. Please try again.");
      }
    })
    .catch(error => {
      console.error("Error during logout:", error);
      alert("An error occurred. Please try again later.");
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="gg">
      <div className='wrapp'>
        <h1>Welcome Admin</h1>
        <div className="btns">
          <div>
            <button type="button" onClick={() => setBtnPopup(true)} className="button">
              <span className="button__text">Add Users</span>
              <span className="button__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg">
                  <line y2="19" y1="5" x2="12" x1="12"></line>
                  <line y2="12" y1="12" x2="19" x1="5"></line>
                </svg>
              </span>
            </button>
            <Popups trigger={BtnPopup} setTrigger={setBtnPopup} addUser={addUser} fetchUsers={fetchUsers} />
          </div>
          <div>
            <button onClick={() => setDeleteUserPopup(true)} className="noselect btn3">
              <span className="text">Delete</span>
              <span className="icon icons">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                </svg>
              </span>
            </button>
            <Dltpopup trigger={deleteUserPopup} setTrigger={setDeleteUserPopup} fetchUsers={fetchUsers} />
          </div>
        </div>
        <div className="users">
          {users.length > 0 ? (
            users.map((user, index) => (
              <div key={index} className="user">
                <h3>Name: {user.name}</h3>
                <p>Email: {user.email}</p>
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
        <div>
          <button className='btn2' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
