import React from "react";

export default function ProjectTabs({ activeTab, onTabClick, tabs }) {
  return (
    <div className="flex justify-center text-sm gap-2 sm:text-lg md:gap-4 sm:justify-normal">
      <button
        onClick={() => onTabClick("all")}
        className={`px-2 py-1 border-b-2 ${
          activeTab === "all"
            ? "text-white border-b-[#3B79FF] cursor-pointer"
            : "text-[#A8A8A8] border-b-transparent cursor-pointer"
        }`}>
        전체
      </button>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabClick(tab)}
          className={`px-2 py-1 border-b-2 ${
            activeTab === tab
              ? "text-white border-b-[#3B79FF] cursor-pointer"
              : "text-[#A8A8A8] border-b-transparent cursor-pointer"
          }`}>
          {tab}기
        </button>
      ))}
    </div>
  );
}
