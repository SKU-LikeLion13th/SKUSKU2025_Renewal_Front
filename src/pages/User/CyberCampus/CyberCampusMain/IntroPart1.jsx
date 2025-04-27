import React from "react";
import images from "../../../../utils/images.jsx";

const IntroPart1 = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col justify-between items-center pt-[80px] pb-10">
      <div className="flex items-center w-full flex-1">
        <div className="title w-[60%] flex justify-center">
          <div className="text-start mb-10 mr-10">
            <p className="text-[clamp(30px,5vw,50px)] fontBold leading-tight">스쿠스쿠와 함께</p>
            <p className="text-[clamp(30px,5vw,50px)] fontEB text-white text-stroke mb-6 leading-tight">
              GROWL TO WORLD!
            </p>
            <p className="fontLight mb-16 ml-1">
              <span className="fontBold">SKU-SKU 사이버캠퍼스는</span> 성결대
              멋쟁이사자처럼
              <span className="fontBold"> 아기사자 전용 학습 공간</span>입니다.
            </p>
          </div>
        </div>
        <div className="image w-[50%] flex justify-start">
          <img src={images.CCIntroImage} className="w-[95%]" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-center text-xs fontLight text-[#666666]">Scroll Down</p>
        <img src={images.mouse} className="w-6 mt-1"/>
      </div>
    </div>
  );
};

export default IntroPart1;
