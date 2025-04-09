import React from "react";
import { images } from "../../../../utils/images";

const IntroPart1 = () => {
  return (
    <div className="w-full min-h-screen flex-col justify-center items-center">
      <div className="flex items-center w-full">
        <div className="title w-[60%] flex justify-center">
          <div className="text-start">
            <p className="text-6xl fontEB">스쿠스쿠와 함께</p>
            <p className="text-6xl fontBlack text-white text-stroke my-5">
              GROWL TO WORLD!
            </p>
            <p className="fontLight mb-16">
              <span className="fontBold">SKU-SKU 사이버캠퍼스는</span> 성결대
              멋쟁이사자처럼
              <span className="fontBold"> 아기사자 전용 학습 공간</span>입니다.
            </p>
          </div>
        </div>
        <div className="image w-[50%] flex justify-end">
          <img src={images.CCIntroImage} className="" />
        </div>
      </div>
      <div>Scroll Down</div>
    </div>
  );
};

export default IntroPart1;
