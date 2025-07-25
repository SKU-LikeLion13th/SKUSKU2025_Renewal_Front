import React, { useState } from "react";
import TeamTabs from "./TeamTabs";

import Team13 from "./Team13"; // 13기 페이지
import Team12 from "./Team12"; // 12기 페이지
import Team11 from "./Team11"; // 11기 페이지

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState("13");

  return (
    <div className="p-8 min-h-screen mx-auto bg-black">
      <div className="w-full mx-auto pb-20 pt-25 sm:pt-40 sm:w-4/5">
        <div className="mb-4 text-white">
          <div className="text-[40px] text-[#3B79FF] text-center sm:text-start">
            LIKELION
          </div>
          <div className="text-[55px] text-white font-bold text-center sm:text-start">
            TEAM
          </div>
        </div>

        <TeamTabs activeTab={activeTab} onTabClick={setActiveTab} />

        {activeTab === "13" && <Team13 />}
        {activeTab === "12" && <Team12 />}
        {activeTab === "11" && <Team11 />}
        {/* 11기는 Team11 컴포넌트 만들어서 추가 */}
      </div>
    </div>
  );
}
