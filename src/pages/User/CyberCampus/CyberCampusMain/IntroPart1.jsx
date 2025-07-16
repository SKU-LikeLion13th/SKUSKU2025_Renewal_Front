import React, { useState, useEffect } from "react";
import images from "../../../../utils/images.jsx";

const IntroPart1 = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsLargeScreen(window.innerWidth >= 640);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col justify-between items-center pt-[140px] md:pt-[80px] pb-10">
      <div className="flex items-center w-full flex-1 relative">
        <div className="title w-full sm:w-[60%] flex justify-center">
          <div className="text-start mb-10 xl:mr-10 xl:ml-0 sm:ml-10 ml-0 z-10">
            <p className="text-[clamp(34px,5vw,50px)] fontBold leading-tight">
              스쿠스쿠와 함께
            </p>
            <p className="text-[clamp(34px,5vw,50px)] fontEB text-white text-stroke mb-6 leading-tight">
              GROWL TO WORLD!
            </p>
            <p className="text-[10px] sm:text-base fontLight mb-16 ml-1">
              <span className="fontBold">SKU-SKU 사이버캠퍼스는</span> 성결대
              멋쟁이사자처럼
              <span className="fontBold"> 아기사자 전용 학습 공간</span>입니다.
            </p>
          </div>
        </div>
        {isLargeScreen && (
          <div className="image w-[50%] flex justify-start">
            <img src={images.CCIntroImage} className="w-[95%]" />
          </div>
        )}
        {!isLargeScreen && (
          <div className="absolute right-0 top-0">
            <img src={images.Ellipse} className=""/>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center">
        <p className="text-center text-xs fontLight text-[#666666]">
          Scroll Down
        </p>
        <img src={images.mouse} className="w-6 mt-1" />
      </div>
    </div>
  );
};

export default IntroPart1;
