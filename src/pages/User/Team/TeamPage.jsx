import { useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import TeamTabs from "./TeamTabs";

import Team13 from "./Team13"; // 13기 페이지
import Team12 from "./Team12"; // 12기 페이지
import Team11 from "./Team11"; // 11기 페이지

export default function TeamPage() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "13";
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["13", "12", "11"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="p-8 min-h-screen mx-auto bg-black pb-40">
      <div className="w-4/5 mx-auto pt-45">
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
