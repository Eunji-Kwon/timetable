import React, { useEffect, useState } from 'react';
import '../main.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { fetchData } from '../api'; // Swagger API 호출 파일
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 사용
import './styles/Main.css'; // Import the CSS file
import MyCalendar from "./MyCalendar"; // MyCalendar 컴포넌트 불러오기


function Main() {
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState(''); // 로그인한 ID 상태
  const [schedule, setSchedule] = useState([]); // 시간표 데이터 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseCode: '',
    courseName: '',
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    classroom: '',
    professor: '',
  });

  

  useEffect(() => {
    // 로그인 후 localStorage에 저장된 studentId를 가져오기
    const loggedInUserId = localStorage.getItem('studentId');
    
    if (loggedInUserId) {
      setStudentId(loggedInUserId); // 값이 있으면 상태에 저장
    } else {
      // 로그인 정보가 없으면 기본 ID 설정 (원하는 경우)
      setStudentId('/login');
    }
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

  // 데이터를 가져오는 함수
  const loadSchedule = async () => {
    if (!studentId) {
      setError('Invaild sutend Id');
      return;
    }
    setLoading(true);
    try {
      //URL .env파일로 변경 해야함
      const response = await fetch(`http://localhost:5096/api/schedule/${studentId}`);

      // 응답이 잘 왔는지 확인
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setSchedule(data); // 가져온 데이터를 상태에 저장
    } catch (error) {
      setError(error.message); // 에러 메시지 저장
    }
  };

   // studentId가 변경될 때마다 자동으로 loadSchedule 호출
   useEffect(() => {
    if (studentId) {
      loadSchedule();  // studentId가 설정되면 schedule을 자동으로 로딩
    }
  }, [studentId]);  // studentId가 변경될 때마다 이 useEffect가 실행됨



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    setCourses([...courses, formData]);
    setFormData({
      courseCode: '',
      courseName: '',
      dayOfWeek: '',
      startTime: '',
      endTime: '',
      classroom: '',
      professor: '',
    });
  };

  const handleLogout = () => {
    // 로그아웃 처리: localStorage 초기화 및 상태 초기화
    localStorage.removeItem('studentId');
    setStudentId('');
    setSchedule([]);
    setCourses([]);
    alert('Logged out successfully!');
    navigate('/'); // 메인 페이지로 리다이렉트

  };




  return (
    <div className="main-container">
  <h2 className="page-title">Course Schedule</h2>

  <div className="logged-in-info">
    <h3>Logged in as: {studentId}</h3>

    <button onClick={handleLogout} className="logout-button">
    Logout
  </button>
  </div>
      {/* Weekly Calendar */}

  <MyCalendar /> {/* Main 컴포넌트를 화면에 표시 */}


    {/* Form for Adding a Course */}
    <form onSubmit={handleAddCourse} className="add-course-form">
  <h3 className="form-title">Add Personal Schedule</h3>

  <div className="form-row">
    {/* <div className="form-group">
      <label htmlFor="courseCode">Course Code</label>
      <input
        type="text"
        name="courseCode"
        placeholder="Course Code"
        value={formData.courseCode}
        onChange={handleChange}
      />
    </div> */}
    <div className="form-group">
      <label htmlFor="courseName">
        Course Name <span className="required">*</span>
      </label>
      <input
        type="text"
        name="courseName"
        placeholder="Course Name"
        value={formData.courseName}
        onChange={handleChange}
        required
      />
    </div>
  </div>

  <div className="form-row">
    {/* <div className="form-group">
      <label htmlFor="dayOfWeek">Day of Week</label>
      <input
        type="text"
        name="dayOfWeek"
        placeholder="Day of Week"
        value={formData.dayOfWeek}
        onChange={handleChange}
      />
    </div> */}
    <div className="form-group">
      <label htmlFor="startTime">
        Start Time <span className="required">*</span>
      </label>
      <input
        type="time"
        name="startTime"
        value={formData.startTime}
        onChange={handleChange}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="endTime">
        End Time <span className="required">*</span>
      </label>
      <input
        type="time"
        name="endTime"
        value={formData.endTime}
        onChange={handleChange}
        required
      />
    </div>
  </div>

  <div className="form-row">
    <div className="form-group">
      <label htmlFor="classroom">Classroom</label>
      <input
        type="text"
        name="classroom"
        placeholder="Classroom"
        value={formData.classroom}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="professor">Professor</label>
      <input
        type="text"
        name="professor"
        placeholder="Professor"
        value={formData.professor}
        onChange={handleChange}
      />
    </div>
  </div>

  <button type="submit">Add Course</button>
</form>






      {/* Swagger 데이터 출력 */}
      {/* <div style={{ marginTop: '50px', color: 'gray' }}>
        <h4>Swagger API Response</h4>
        <pre>{JSON.stringify(schedule, null, 2)}</pre>
      </div> */}
    </div>
  );
}

export default Main;
