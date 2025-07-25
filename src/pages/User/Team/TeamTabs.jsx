import React from "react";

export default function TeamTabs({ activeTab, onTabClick }) {
  const tabs = [
    { label: "13기", value: "13" },
    { label: "12기", value: "12" },
    { label: "11기", value: "11" },
  ];

  return (
    <div className="flex gap-4 mb-20 text-lg justify-center sm:justify-start">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabClick(tab.value)}
          className={`px-2 py-1 border-b-2 ${
            activeTab === tab.value
              ? "text-white border-b-[#3B79FF] cursor-pointer"
              : "text-[#A8A8A8] border-b-transparent cursor-pointer"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
