import React, { useState } from "react";
import Calendar from "react-calendar";

const CC_Calendar = () => {
  const [value, setValue] = useState(new Date());

  /*더미데이터*/
  const events = {
    "2025-07-20": [
      { title: "멋쟁이사자처럼 13기 OT", color: "#ffcfd2" },
      { title: "멋쟁이사자처럼 13기 회의", color: "#cce5ff" },
    ],
    "2025-07-10": [{ title: "프로젝트 마감", color: "#ffd6a5" }],
  };

  return (
    <div className="flex justify-center">
      <Calendar
        /*css 관련으로 작업*/
        onChange={setValue}
        value={value}
        /* 날짜 숫자 포맷 (기존) */
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
        /* 요일(header)만 영어 약어로 */
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()
        }
        calendarType="gregory"
        view="month"
        prev2Label={null}
        next2Label={null}
        navigationLabel={({ date, label }) => (
          <div className="my-custom-label">{label}</div>
        )}
        weekNumbers={true}
        /*이제 일정 관련*/
        tileContent={({ date }) => {
          const formattedDate = date.toISOString().split("T")[0];
          const dayEvents = events[formattedDate];

          return dayEvents ? (
            <div className="events-container">
              {dayEvents.map((event, idx) => (
                <div
                  key={idx}
                  className="event-badge"
                  style={{ backgroundColor: event.color }}
                >
                  {event.title}
                </div>
              ))}
            </div>
          ) : null;
        }}
        tileClassName={({ date }) => {
          const formattedDate = date.toISOString().split("T")[0];
          return events[formattedDate] ? "has-events" : null;
        }}
      />
    </div>
  );
};

export default CC_Calendar;
