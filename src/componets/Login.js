import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../api';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const studentId = e.target.studentId.value;
    const password = e.target.password.value;

    if (studentId === '12345' && password === 'password') {
      alert('Login successful!');
      navigate('/main');
    } else {
      alert('Invalid Student ID or Password.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Student Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Student ID:</label>
          <input type="text" name="studentId" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
