import React, { useState, useEffect } from "react";
import axios from "../../../utils/axios";

const colors = [
  "#FFC2C2",
  "#FFE2B8",
  "#DAFFD3",
  "#B6E2FF",
  "#C8D4FF",
  "#EBD4FF",
  "#FFCEF8",
  "#E6E6E6",
];

const EventModal = ({ date, onClose, onSaved, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    color: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        startDate: initialData.startDate || "",
        endDate: initialData.endDate || "",
        color: initialData.color || "",
      });
    } else {
      const offsetDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      const formattedDate = offsetDate.toISOString().split("T")[0];
      setFormData({
        title: "",
        startDate: formattedDate,
        endDate: formattedDate,
        color: "",
      });
    }
  }, [initialData, date]);

  const handleSave = async () => {
    try {
      if (initialData) {
        await axios.put(`/admin/schedule/update`, {
          id: initialData.id,
          ...formData,
        });
        alert("일정을 성공적으로 수정하였습니다!");
      } else {
        await axios.post(
          "/admin/schedule/add",
          formData
        );
        alert("일정을 성공적으로 등록하였습니다!");
      }

      if (onSaved) onSaved();
      onClose();
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  return (
    <div className="absolute w-[80%] h-[80%] sm:h-[70%] top-[7%] sm:top-[20%] left-[10%] rounded-3xl border-2 border-[#DADADA] bg-[#3E3E3E] text-white shadow-lg p-6 sm:p-16 sm:px-27 overflow-hidden z-50">
      <button
        className="absolute top-5 right-6 text-white text-2xl hover:text-gray-300"
        onClick={onClose}
      >
        &times;
      </button>
      <div className="flex flex-col w-full h-full text-start">
        <div>
          <div className="text-xl sm:text-2xl fontSB mb-7">
            {initialData ? "Edit Event" : "Add New Event"}
          </div>
          <input
            type="text"
            maxLength={20}
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Event Name 최대 20자까지 가능"
            className="w-full md:w-[40%] bg-white text-[#555555] px-4 py-2 rounded-md mb-10"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="md:w-1/2">
            <div className="text-xl sm:text-2xl fontSB mb-1">Event Details</div>
            <div className="mb-4">
              <div className="text-sm fontLight mb-2 text-[#BDBDBD]">Date</div>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                className="w-full px-4 py-[6px] text-[#555555] rounded-md bg-white"
              />
            </div>
            <div>
              <div className="text-sm fontLight mb-2 text-[#BDBDBD]">
                END date
              </div>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, endDate: e.target.value }))
                }
                className="w-full px-4 py-[6px] text-[#555555] rounded-md bg-white"
              />
            </div>
          </div>
          <div className="ml-1 md:ml-10">
            <div className="text-xl sm:text-2xl fontSB mb-7">Color</div>
            <div className="ml-2 md:ml-0 w-1/2 md:w-full grid grid-cols-5 gap-3 mt-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded-full border-3 ${
                    formData.color === color
                      ? "border-white"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, color: color }))
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center sm:justify-start gap-4 mt-12 w-full sm:w-1/2">
          <button
            onClick={onClose}
            className="px-[10%] sm:px-[19%] py-[6px] text-sm border border-white text-white rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-[10%] sm:px-[21%] py-[6px] bg-[#3B79FF] text-sm text-white rounded-md hover:bg-blue-600 transition"
          >
            {initialData ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
