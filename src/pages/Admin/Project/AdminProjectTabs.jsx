import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminProjectTabs({
  activeTab,
  onTabClick,
  selectedProjects,
  deleteSelectedProjects,
  toggleSelectAll,
  filteredProjects,
  tabs = [], // 기본값 빈 배열
}) {
  const navigate = useNavigate();
  const allIds = filteredProjects.map((p) => p.id);
  const isAllSelected = allIds.every((id) => selectedProjects.includes(id));

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-4 mb-10 text-lg">
        <button
          onClick={() => onTabClick("all")}
          className={`px-2 py-1 border-b-2 ${
            activeTab === "all"
              ? "text-white border-b-[#3B79FF]"
              : "text-[#A8A8A8] border-b-transparent"
          }`}>
          전체
        </button>
        {tabs.map((tabValue) => (
          <button
            key={tabValue}
            onClick={() => onTabClick(tabValue)}
            className={`px-2 py-1 border-b-2 ${
              activeTab === tabValue
                ? "text-white border-b-[#3B79FF]"
                : "text-[#A8A8A8] border-b-transparent"
            }`}>
            {tabValue}기
          </button>
        ))}
      </div>

      <div className="text-white flex gap-4 mb-20 text-md">
        <button
          className="bg-[#3B79FF] px-4 py-1.5 rounded-sm cursor-pointer"
          onClick={() => {
            navigate("/admin/project/add");
          }}>
          등록하기
        </button>
        {/* <button
          className="text-[#838383] bg-[#E9E9E9] px-4 py-1.5 rounded-sm cursor-pointer"
          onClick={toggleSelectAll}>
          {isAllSelected ? "전체 해제" : "전체 선택"}
        </button> */}
        <button
          className={`px-4 py-1.5 rounded-sm ${
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
