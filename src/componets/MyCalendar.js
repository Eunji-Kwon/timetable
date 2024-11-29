import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";  // dateFnsLocalizer로 변경
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, startOfWeek, getDay } from "date-fns"; // date-fns 임포트

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
  const [events, setEvents] = useState([
 
    {
      title: "Java Programming Class",
      start: new Date("2024-11-29T17:20:00-05:00"), // ISO 형식에서 Date 객체로 변환
      end: new Date("2024-11-29T13:30:00-05:00"), // ISO 형식에서 Date 객체로 변환
      notes: "Java",
      password: "password1",
      professorName: "Jigisha",
      courseCode: "COMP228",
      classroom: "A1-22",
    },
  ]);

  return (
    <div style={{ height: "100vh" }}>

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
  );
};

export default MyCalendar;
