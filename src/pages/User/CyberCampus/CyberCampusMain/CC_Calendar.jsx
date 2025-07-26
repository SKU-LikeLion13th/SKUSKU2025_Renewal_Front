import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";

const CC_Calendar = () => {
  const [value, setValue] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [events, setEvents] = useState({});

  const fetchEvents = async (year, month) => {
    try {
      const res = await axios.get("http://backend.sku-sku.com/schedules", {
        params: { year, month },
      });
      const data = res.data.calendarSchedule;

      const eventMap = {};

      // 이벤트의 시작일부터 종료일까지 모든 날짜에 이벤트 추가
      data.forEach((event) => {
        const start = new Date(event.startDate);
        start.setHours(0, 0, 0, 0);

        const end = new Date(event.endDate);
        end.setHours(0, 0, 0, 0);

        let current = new Date(start);

        while (current <= end) {
          const dateKey = current.toISOString().split("T")[0];

          if (!eventMap[dateKey]) {
            eventMap[dateKey] = [];
          }

          eventMap[dateKey].push({
            id: event.id,
            title: event.title,
            startDate: event.startDate,
            endDate: event.endDate,
            color: event.color || "#FFC2C2",
          });

          current.setDate(current.getDate() + 1);
        }
      });
      setEvents(eventMap);
    } catch (err) {
      console.error("일정 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    const currentYear = value.getFullYear();
    const currentMonth = value.getMonth() + 1;
    fetchEvents(currentYear, currentMonth);
  }, [value]);

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalIsOpen]);

  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const dayEvents = events[formattedDate];
    if (dayEvents && dayEvents.length > 0) {
      setSelectedDateEvents(dayEvents);
      setModalIsOpen(true);
    }
  };

  return (
    <div className="relative flex justify-center w-[100%] h-[100%]">
      <Calendar
        onChange={setValue}
        value={value}
        onActiveStartDateChange={({ activeStartDate }) => {
          const year = activeStartDate.getFullYear();
          const month = activeStartDate.getMonth() + 1;
          fetchEvents(year, month);
        }}
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
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
        onClickDay={handleDateClick}
        tileContent={({ date }) => {
          const formattedDate = date.toISOString().split("T")[0];
          const dayEvents = events[formattedDate];

          if (dayEvents) {
            const visibleEvents = dayEvents.slice(0, 2);
            const remainingCount = dayEvents.length - 2;

            return (
              <div className="events-container">
                {visibleEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className="event-badge"
                    style={{ backgroundColor: event.color }}
                  >
                    {event.title}
                  </div>
                ))}
                {remainingCount > 0 && (
                  <div className="more-events-indicator text-[12px]">
                    +{remainingCount}
                  </div>
                )}
              </div>
            );
          }
          return null;
        }}
        tileClassName={({ date }) => {
          const formattedDate = date.toISOString().split("T")[0];
          return events[formattedDate] ? "has-events" : null;
        }}
      />

      {modalIsOpen && (
        <div
          className="absolute w-[80%] h-[64%] top-[25%] left-[10%] rounded-3xl border-2 border-[#DADADA] bg-white shadow-lg p-6 sm:p-8 overflow-hidden"
          onClick={() => setModalIsOpen(false)}
        >
          <div
            className="flex justify-between items-center mb-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg mt-1 sm:mt-0 sm:text-2xl font-bold">
              Events
            </h3>
            <button
              onClick={() => setModalIsOpen(false)}
              className="text-3xl text-gray-400 hover:text-black"
            >
              &times;
            </button>
          </div>

          <div
            className="grid sm:grid-cols-2 gap-4 sm:m-4 sm:mr-9 overflow-y-auto max-h-[80%] sm:max-h-[75%]"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedDateEvents.map((event, idx) => (
              <div
                key={idx}
                className="rounded-xl p-4 sm:p-5 text-[14px] sm:text-lg fontBold text-start text-gray-800"
                style={{ backgroundColor: event.color }}
              >
                <div>{event.title}</div>
                <div className="text-[8px] sm:text-xs text-gray-700 mt-1 ml-[2px] fontLight">
                  Date: {event.startDate} / End date: {event.endDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CC_Calendar;
