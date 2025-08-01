import React, { useState, useEffect, useCallback } from "react";
import images from "../../../utils/images";
import Calendar from "react-calendar";
import axios from "../../../utils/axios";
import EventModal from "./EventModal";
import { useMediaQuery } from "../../User/Main/useMediaQuery";

const AdminCalendar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [value, setValue] = useState(new Date());
  //이벤트 추가 모달 관련 state
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  //이벤트 수정 및 삭제 모달 관련 state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  //수정 관련 state
  const [eventToEdit, setEventToEdit] = useState(null);
  //삭제 관련 state
  const [checkedEvents, setCheckedEvents] = useState([]);

  const fetchEvents = useCallback(async (year, month) => {
    try {
      const res = await axios.get("/schedules", {
        params: { year, month },
      });
      const data = res.data.calendarSchedule;

      const eventMap = {};

      data.forEach((event) => {
        const start = new Date(event.startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(event.endDate);
        end.setHours(0, 0, 0, 0);
        let current = new Date(start);

        while (current <= end) {
          const dateKey = current.toISOString().split("T")[0];
          if (!eventMap[dateKey]) eventMap[dateKey] = [];
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
  }, []);

  const refetchEvents = () => {
    fetchEvents(value.getFullYear(), value.getMonth() + 1);
  };

  useEffect(() => {
    const currentYear = value.getFullYear();
    const currentMonth = value.getMonth() + 1;
    fetchEvents(currentYear, currentMonth);
  }, [value]);

  //이벤트 추가 모달
  const handleAddEvent = (date) => {
    setSelectedDate(date);
    setAddModalIsOpen(true);
  };

  //모달 나왔을때 뒤 스크롤 막는 코드
  /*
  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalIsOpen]);*/

  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const dayEvents = events[formattedDate] || [];
    if (isMobile || (dayEvents && dayEvents.length > 0)) {
      setSelectedDateEvents(dayEvents);
      setSelectedDate(date);
      setModalIsOpen(true);
      setCheckedEvents([]);
    }
  };

  //선택
  const handleCheck = (eventId) => {
    setCheckedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };
  //전체 선택
  const handleSelectAll = () => {
    const allIds = selectedDateEvents.map((event) => event.id);
    setCheckedEvents(allIds);
  };
  //선택한 거 삭제
  const handleDelete = async (e) => {
    e.stopPropagation();
    if (checkedEvents.length === 0) return;
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await Promise.all(
        checkedEvents.map((id) => axios.delete(`/admin/schedule/${id}`))
      );
      alert("성공적으로 삭제되었습니다!");
      setModalIsOpen(false);
      refetchEvents();
    } catch (err) {
      console.error("삭제 실패:", err);
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
          const visibleEvents = dayEvents?.slice(0, 2) || [];
          const remainingCount = (dayEvents?.length || 0) - 2;

          return (
            <div className="group relative w-full h-full events-container">
              <div className="flex flex-col gap-1">
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

                <button
                  className="absolute bottom-0 right-0 text-[13px] text-white w-5 h-5 pr-[1px] rounded-md bg-[#676767] !border-none hidden group-hover:inline-block"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddEvent(date);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          );
        }}
        tileClassName={({ date }) => {
          const formattedDate = date.toISOString().split("T")[0];
          return events[formattedDate] ? "has-events" : null;
        }}
      />

      {modalIsOpen && (
        <div
          className="absolute w-[80%] h-[75%] sm:h-[64%] top-[7%] sm:top-[25%] left-[10%] rounded-3xl border-2 border-[#DADADA] bg-white shadow-lg p-6 sm:p-8 overflow-hidden"
          // 모달 외부 클릭 이벤트는 그대로 유지하되, 내부에서 이벤트 차단
        >
          <div
            className="flex justify-between items-center mb-6 mx-2 sm:mx-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-lg mt-1 sm:mt-0 sm:text-2xl font-bold">
              Events
            </div>
            <div className="flex items-center justify-end">
              <div className="sm:hidden ml-5 mr-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddEvent(selectedDate);
                  }}
                  className="px-3 py-[3px] rounded-md bg-[#FF8A8A] text-white text-sm"
                >
                  +
                </button>
              </div>
              <div className="flex justify-center items-center">
                <div className="mt-1 sm:mr-5 fontEL sm:text-sm text-xs">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const allIds = selectedDateEvents.map(
                        (event) => event.id
                      );
                      setCheckedEvents(allIds);
                    }}
                    className="sm:mr-3 mb-1 sm:mb-0 px-3 py-[6px] rounded-md bg-[#E9E9E9] text-[#838383] cursor-pointer"
                  >
                    전체 선택
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(e);
                    }}
                    className="ml-0 sm:mr-2 px-3 py-[6px] rounded-md bg-[#6C6868] text-white cursor-pointer"
                  >
                    선택 삭제
                  </button>
                </div>
                <button
                  onClick={() => setModalIsOpen(false)}
                  className="text-3xl text-gray-400 hover:text-black"
                >
                  &times;
                </button>
              </div>
            </div>
          </div>

          <div
            className="grid sm:grid-cols-2 gap-4 sm:m-4 sm:mr-9 overflow-y-auto max-h-[80%] sm:max-h-[75%]"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedDateEvents.map((event, idx) => (
              <div
                key={event.id} // idx 대신 event.id 사용
                className="flex justify-between rounded-xl p-4 sm:p-5 text-[14px] sm:text-lg fontBold text-start text-gray-800"
                style={{ backgroundColor: event.color }}
              >
                <div>
                  <div>{event.title}</div>
                  <div className="text-[8px] sm:text-xs text-gray-700 mt-1 ml-[2px] fontLight">
                    Date: {event.startDate} / End date: {event.endDate}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="text-gray-800 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEventToEdit(event);
                      setSelectedDate(new Date(event.startDate));
                      setAddModalIsOpen(true);
                    }}
                  >
                    <img src={images.Pen} alt="Edit" className="w-4 h-4" />
                  </button>

                  {/* 체크박스 부분만 수정 */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setCheckedEvents((prev) => {
                        const newState = prev.includes(event.id)
                          ? prev.filter((id) => id !== event.id)
                          : [...prev, event.id];
                        return newState;
                      });
                    }}
                    className="cursor-pointer p-1" // 터치 영역 약간 확대
                  >
                    <input
                      type="checkbox"
                      checked={checkedEvents.includes(event.id)}
                      onChange={() => {}}
                      onClick={(e) => e.preventDefault()}
                      className="w-4 h-4 accent-white border-gray-400 cursor-pointer pointer-events-none"
                      style={{
                        // 모바일에서 체크표시가 잘 보이도록 추가 스타일
                        accentColor: "#3b82f6", // 파란색
                        transform: "scale(1.2)", // 약간 크게
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {addModalIsOpen && selectedDate && (
        <EventModal
          date={selectedDate}
          onClose={() => {
            setAddModalIsOpen(false);
            setModalIsOpen(false);
            setEventToEdit(null);
          }}
          onSaved={refetchEvents}
          initialData={eventToEdit} // 수정용 데이터 넘김
        />
      )}
    </div>
  );
};

export default AdminCalendar;
