import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';
import { FaUser, FaLock } from 'react-icons/fa';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        
        navigate('/home');
  
        
      } else {
        const errorData = await response.json();
        console.error('Admin login failed:', errorData.error);
        alert(errorData.error || 'Incorrect username or password');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Error connecting to the server. Please try again later.');
    }
  };
  

  return (
    <div className="og">
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Admin Login</h1>
          <div className='input-box'>
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className='icon' />
          </div>

          <button type='submit'>Login</button>

          <div className='register-link'>
            <p>
              <Link to='/'>Back to Home</Link>
            </p>
          </div>
        </form> 
      </div>
    </div>
  );
};

export default AdminLoginPage;
