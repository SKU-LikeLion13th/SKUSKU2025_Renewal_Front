import React from "react";
import images from "../../../../utils/images.jsx";
import Calendar from "./CC_Calendar.jsx";

const IntroPart3 = () => {
  return (
    <div className="relative w-full min-h-screen flex justify-center items-center">
      {/* 배경 이미지 */}
      <img
        src={images.part3bg1}
        alt="background"
        className="absolute right-0 w-[17%] top-[20%] -z-20"
      />
      <img
        src={images.part3bg2}
        alt="background"
        className="absolute inset-0 w-[12%] top-[50%] -z-20"
      />
      <div className="w-full sm:w-[90%] flex-col justify-center">
        <div className="flex justify-between items-center mx-4 sm:mx-10">
          <div className="title flex flex-col items-start mx-1">
            <p className="text-[clamp(15px,5vw,25px)] fontBold mb-1">멋쟁이사자처럼 13기</p>
            <p className="text-[clamp(15px,5vw,25px)] fontBold">
              <span className="text-[#1f65ff]">일정</span>을 알려드릴게요
            </p>
          </div>
          <div className="flex">
            <img
              src={images.chart}
              className="w-15 md:w-28 h-auto object-contain md:mr-10"
            />
            <img
              src={images.bell}
              className="w-15 md:w-32 h-auto object-contain pt-20"
            />
          </div>
        </div>
        <div className="mb-15">
          <Calendar /> 
        </div>
      </div>
    </div>
  );
};

export default IntroPart3;
