
import React, { useState } from 'react';
import './HomePage.css';
import Popups from '../Popups/Popups';


const HomePage = () => {

  const [BtnPopup, setBtnPopup] = useState(false);
  const [users, setUsers] = useState([]);


  const addUser = (userData) => {
    setUsers([...users, userData]);
  };


  return (
    <div className="gg">
      <div className='wrapp'>
        <h1>ok</h1>
        <div className="btns">
          <div>
            <button onClick={() => setBtnPopup(true)} className="btn">Add User</button>
            <Popups trigger={BtnPopup} setTrigger={setBtnPopup} addUser={addUser}>
            </Popups>
          </div>
          <div>
            <button className="btn">Delete User</button>
          </div>
        </div>
        <div className="users">
          {/* Render the list of users */}
          {users.map((user, index) => (
            <div key={index} className="user">
              <h3>Name: {user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Password: {user.password}</p>
              <p>Confirm Password: {user.confirm_password}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
