/*import React, { useState } from 'react';
import { create_user } from '../backend/database'
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    create_user(username, phoneNumber);
    navigate("/my-pill-tracker/medications");
    console.log('Username:', username);
    console.log('Phone Number:', phoneNumber);
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <button type="submit">Confirm Number</button>
      </form>
    </div>
  );
};

export default LoginForm;*/

import React, { useState } from 'react';
import { create_user } from '../backend/database';
import { useNavigate } from "react-router-dom";
import './LoginForm.css'; // Import a CSS file for additional styling

let isUsername = false;
let isPhone = false;

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    isUsername = true;
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    isPhone = true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isUsername && isPhone) {
      create_user(username, phoneNumber);
      navigate("/my-pill-tracker/calendar");
    }
    console.log('Username:', username);
    console.log('Phone Number:', phoneNumber);
  };

  return (
    <div className="login-form-container">
      <h2 className="form-title">Login Form</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Username:</label>
          <input className="form-input" type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number:</label>
          <input className="form-input" type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <button className="form-button" type="submit">Confirm Number</button>
      </form>
    </div>
  );
};

export default LoginForm;
