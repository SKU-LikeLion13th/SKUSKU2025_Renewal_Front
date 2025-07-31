import React from "react";
import { Link } from "react-router-dom";

const CCFooter = () => {
  return (
    <footer className="bg-[#FAFAFA] text-[#343434] px-12 pt-16 mt-12">
      {/* 상단 네비게이션 */}
      <div className="flex space-x-28 border-b border-[#DCDCDC] pb-12">
        {/* PROJECT */}
        <div className="flex flex-col pl-28">
          <Link to="/project" className="text-[#72A6FF] fontBold mb-4">
            PROJECT
          </Link>
          {[13, 12, 11].map((gen) => (
            <Link key={gen} to={`/project?tab=${gen}`} className="my-2 ">
              {gen}기
            </Link>
          ))}
        </div>

        {/* TEAM */}
        <div className="flex flex-col">
          <Link to="/team" className="text-[#72A6FF] fontBold mb-4">
            TEAM
          </Link>
          {[13, 12, 11].map((gen) => (
            <Link key={gen} to={`/team?tab=${gen}`} className="my-2">
              {gen}기
            </Link>
          ))}
        </div>

        {/* CONTACT */}
        <div className="flex flex-col">
          <span className="text-[#72A6FF] fontBold mb-4">CONTACT</span>
          <span className="my-2">문의하기</span>
          <span className="my-2">모집공고</span>
        </div>
      </div>

      {/* 하단 주소 및 저작권 */}
      <div className="pl-28 py-8 flex justify-between items-end text-[12px]">
        <div className="space-y-1">
          <p>주소: 경기도 안양시 만안구 성결대학로 53</p>
          <p>문의처: sku@likelion.org</p>
        </div>
        <p className="fontSB text-[#A8A8A8]">SKU LIKELION @2025_V2</p>
      </div>
    </footer>
  );
};

export default CCFooter;
