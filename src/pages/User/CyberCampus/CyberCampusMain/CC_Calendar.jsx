import React, { useState } from "react";
import Calendar from "react-calendar";

const CC_Calendar = () => {
  const [value, setValue] = useState(new Date());

  return (
    <div className="flex justify-center">
      <Calendar
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
      />
    </div>
  );
};

export default CC_Calendar;
