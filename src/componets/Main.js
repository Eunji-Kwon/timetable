import React, { useEffect, useState } from 'react';
import '../main.css'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { fetchData } from '../api'; // Swagger API 호출 파일



function Main() {
  const [studentId, setStudentId] = useState(''); // 학생 번호 상태

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
   // 학생 번호 입력을 처리하는 함수
   const handleStudentIdChange = (event) => {
    setStudentId(event.target.value); // 학생 번호를 상태에 저장
  };
  
   // 데이터를 가져오는 함수
   const loadSchedule = async () => {

    if (!studentId) {
      setError('학생 번호를 입력해주세요.');
      return;
    }
    try {
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

  // 컴포넌트가 마운트될 때 데이터 로드
  useEffect(() => {
    loadSchedule();
  }, []); // 빈 배열을 넣어서 한 번만 실행되게 설정

  //Time - 6:00AM to 12:00AM
    const hours = Array.from({ length: 18 }, (_, i) => {
    const hour = 6 + i;
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour} ${suffix}`;
  });

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

  
  const renderWeekCalendar = () => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)

    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      daysOfWeek.push(day);
    }

    return (
        <div className="calendar-container">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="day-box">
              <div>{day.toLocaleDateString()}</div>
              <div style={{ height: '100px', border: '1px solid #ccc' }}></div>
            </div>
          ))}
        
  </div>

      
      );
    };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Course Schedule</h2>
      <input
        type="text"
        value={studentId}
        onChange={handleStudentIdChange}
        placeholder="Student Number"
      />
      <button onClick={loadSchedule}>Show Timetable</button>
      {/* Weekly Calnder */}
      {renderWeekCalendar()}

      {/* Form for Adding a Course */}
      <form onSubmit={handleAddCourse} className="add-course-form">
        <input
          type="text"
          name="courseCode"
          placeholder="Course Code"
          value={formData.courseCode}
          onChange={handleChange}

        />
        <input
          type="text"
          name="courseName"
          placeholder="Course Name"
          value={formData.courseName}
          onChange={handleChange}
          required
      
        />
        <input
          type="text"
          name="dayOfWeek"
          placeholder="Day of Week"
          value={formData.dayOfWeek}
          onChange={handleChange}
        
        />
            <label htmlFor="startTime">Start Time</label>

        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
        
        />    <label htmlFor="endTime">End Time</label>

        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}

        />
        <input
          type="text"
          name="classroom"
          placeholder="Classroom"
          value={formData.classroom}
          onChange={handleChange}

        />
        <input
          type="text"
          name="professor"
          placeholder="Professor"
          value={formData.professor}
          onChange={handleChange}
        
        />
        <button type="submit">
          Add Course
        </button>
      </form>

      {/* Table for Displaying Courses */}
      <table className="course-table">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Day of Week</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Classroom</th>
            <th>Professor</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{course.courseCode}</td>
              <td>{course.courseName}</td>
              <td>{course.dayOfWeek}</td>
              <td>{course.startTime}</td>
              <td>{course.endTime}</td>
              <td>{course.classroom}</td>
              <td>{course.professor}</td>
            </tr>
          ))}
        </tbody>
      </table>

       {/* Swagger 데이터 출력 */}
       <div style={{ marginTop: '50px', color: 'gray' }}>
      <h4>Swagger API Response</h4>
      <pre>{JSON.stringify(schedule, null, 2)}</pre>
    </div>
    
    </div>

    
  );
}

export default Main;
