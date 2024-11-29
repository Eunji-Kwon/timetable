import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../api'; // API 요청을 위한 fetchData 함수 (필요한 경우 수정)
import './styles/Login.css'; // Import the CSS file

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null); // 에러 상태를 관리
  const [loading, setLoading] = useState(false); // 로딩 상태를 관리

  const handleLogin = async (e) => {
    e.preventDefault();
    const studentId = e.target.studentId.value;
    const password = e.target.password.value;

    setLoading(true);  // 로딩 시작
    setError(null); // 이전의 에러 상태 초기화


    try {
     // API 요청 시 body에 studentId와 password 전달
     const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentId, password }),  // studentId와 password를 JSON 형식으로 전송
    });

    const data = await response.json();

      // 입력한 studentId와 password로 사용자 찾기
      if (response.ok) { 
      //  const user = await response.json();
      localStorage.setItem('studentId', studentId);

        alert('Login successful!');
        navigate('/main');  // 로그인 성공 시 studentId를 state로 전달하여 /main으로 이동
      } else {
        alert('Invalid Student ID or Password.');
      }
    } catch (error) {
      setError('Error during login. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);  // 로딩 종료
    }
  };

  return (
    <div className="container">
    <h2 className="header">Student Login</h2>
    {error && <p className="error">{error}</p>}
    <form onSubmit={handleLogin} className="form">
      <div className="input-group">
        <label htmlFor="studentId" className="label">Student ID:</label>
        <input type="text" name="studentId" required className="input" />
      </div>
      <div className="input-group">
        <label htmlFor="password" className="label">Password:</label>
        <input type="password" name="password" required className="input" />
      </div>
      <button type="submit" className="button" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
    <p className="contact-info">
      If you don't know your ID and password, <br/> contact the IT department.
    </p>
  </div>
  );
}

export default Login;
