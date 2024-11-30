import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";  // dateFnsLocalizer로 변경
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, startOfWeek, getDay } from "date-fns"; // date-fns 임포트
import './styles/Main.css'; // Import the CSS file

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse: (dateString) => new Date(dateString),
  startOfWeek,
  getDay,
  locales,
});


const MyCalendar = () => {
  
  const [events, setEvents] = useState([]);
  const [studentId, setStudentId] = useState(''); // studentId 상태

  // localStorage에서 studentId 가져오기
  useEffect(() => {
    const loggedInUserId = localStorage.getItem('studentId');
    if (loggedInUserId) {
      setStudentId(loggedInUserId);
    }
  }, []);

  // 서버에서 데이터를 가져오는 함수
  const fetchEvents = async () => {
    try {
      // studentId가 없으면 데이터 가져오지 않음
      if (!studentId) {
        console.error("Student ID is not available.");
        return;
      }

      const response = await fetch(`http://localhost:5096/api/schedule/${studentId}`);
      const data = await response.json();

      // 데이터를 캘린더 형식으로 변환
      const formattedEvents = data.map((event) => ({
        title: `${event.courseName} (${event.courseCode})`, // 예: "Java Programming (COMP228)"
        start: new Date(event.startTime), // ISO 형식을 Date로 변환
        end: new Date(event.endTime), // ISO 형식을 Date로 변환
        notes: event.notes,
        password: event.password,
        professorName: event.professorName,
        classroom: event.classroom,
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }; 
  
  // studentId가 바뀔 때마다 이벤트를 새로 가져옴
  useEffect(() => {
    if (studentId) {
      fetchEvents();
    }
  }, [studentId]);

  return (
    <div className="page-container">

    <div style={{ height: "100vh" }} className="calendar-container">
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      defaultView="week" // 기본 보기를 Week으로 설정
      min={new Date(2024, 11, 1, 7, 0)} // 오전 7시부터 시작
      max={new Date(2024, 11, 1, 22, 0)} // 오후 10시까지 표시
      style={{ height: "100%" }}

    />
  </div>
  </div>
  );
};

export default MyCalendar;
