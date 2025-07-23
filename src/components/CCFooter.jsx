import React from "react";

const CCFooter = () => {
  return (
    <div className="bg-[#FAFAFA] text-white px-12 pt-16 mt-12">
      <div>
        {/* 위 */}
        <div className="flex space-x-28 border-b border-[#DCDCDC] pb-12">
          {/* project */}
          <div className="pl-28">
            <p className="text-[#72A6FF] fontBold mb-8">PROJECT</p>
            <p className="text-[#343434] mb-3">12기</p>
            <p className="text-[#343434]">11기</p>
          </div>
          {/* team */}
          <div>
            <p className="text-[#72A6FF] fontBold mb-8">TEAM</p>
            <p className="text-[#343434] mb-3">12기</p>
            <p className="text-[#343434]">11기</p>
          </div>
          {/* contact */}
          <div>
            <p className="text-[#72A6FF] fontBold mb-8">CONTACT</p>
            <p className="text-[#343434] mb-3">문의하기</p>
            <p className="text-[#343434]">모집공고</p>
          </div>
        </div>
        {/* 아래 */}
        <div className="pl-28 py-8 flex justify-between items-end">
          <div className="text-[#343434] text-[12px]">
            <p>주소: 경기도 안양시 만안구 성결대학로 53</p>
            <p>문의처: sku@likelion.org</p>
          </div>
          <div className="fontSB text-[12px] text-[#A8A8A8]">
            SKU LIKELION @2025_V2
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCFooter;
