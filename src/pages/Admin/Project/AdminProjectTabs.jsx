import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminProjectTabs({
  activeTab,
  onTabClick,
  selectedProjects,
  deleteSelectedProjects,
  editSelectedProject, // 수정 함수 추가
  filteredProjects,
  tabs = [], // 기본값 빈 배열
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-5 mb-12 sm:mb-15 md:flex md:flex-row md:justify-between md:mb-20">
      <div className="flex text-sm gap-2 sm:text-lg md:gap-4">
        <button
          onClick={() => onTabClick("all")}
          className={`px-2 py-1 border-b-2 ${
            activeTab === "all"
              ? "text-white border-b-[#3B79FF] cursor-pointer"
              : "text-[#A8A8A8] border-b-transparent cursor-pointer"
          }`}>
          전체
        </button>
        {tabs.map((tabValue) => (
          <button
            key={tabValue}
            onClick={() => onTabClick(tabValue)}
            className={`px-2 py-1 border-b-2 ${
              activeTab === tabValue
                ? "text-white border-b-[#3B79FF] cursor-pointer"
                : "text-[#A8A8A8] border-b-transparent cursor-pointer"
            }`}>
            {tabValue}기
          </button>
        ))}
      </div>

      <div className="text-white flex gap-4 text-sm sm:text-md">
        <button
          className="bg-[#3B79FF] rounded-sm cursor-pointer px-3 py-1.5 sm:px-4"
          onClick={() => {
            navigate("/admin/project/add");
          }}>
          등록하기
        </button>
        <button
          className={`px-3 py-1.5 sm:px-4 rounded-sm ${
            selectedProjects.length === 1
              ? "text-[#838383] bg-[#E9E9E9] cursor-pointer hover:bg-gray-300"
              : "bg-[#6C6868] text-white cursor-not-allowed"
          }`}
          disabled={selectedProjects.length !== 1}
          onClick={editSelectedProject}>
          수정하기
        </button>
        <button
          className={`px-3 py-1.5 sm:px-4 rounded-sm ${
            selectedProjects.length > 0
              ? "bg-[#E65252] text-white cursor-pointer"
              : "bg-[#6C6868] text-white cursor-not-allowed"
          }`}
          disabled={selectedProjects.length === 0}
          onClick={deleteSelectedProjects}>
          선택 삭제
        </button>
      </div>
    </div>
  );
}
