import React, { useState } from 'react';
import { create_user } from '../backend/database'

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    create_user(username, phoneNumber);
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

export default LoginForm;