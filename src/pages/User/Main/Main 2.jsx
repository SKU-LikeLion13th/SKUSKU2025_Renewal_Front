import React, { useEffect } from "react";
import Main1 from "./Main1";
import Main2 from "./Main2";
import Main3 from "./Main3";
import Main4 from "./Main4";
import MobileMain4 from "./MobileMain4";
import Main5 from "./Main5";
import { useMediaQuery } from "./useMediaQuery";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Main() {
  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    gsap.utils.toArray(".section").forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 100 }, // 애니메이션 시작 상태
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%", // 섹션이 뷰포트 80% 지점에 도달할 때 시작
            toggleActions: "play none none reverse", // 애니메이션 제어
            markers: false, //
          },
        }
      );
    });
  });

  return (
    <div className="w-full bg-black sm:mt-0 mt-15">
      <div className="section">
        <Main1 />
      </div>
      <div className="section">
        <Main2 />
      </div>
      <div className="section">
        <Main3 />
      </div>
      <div className="section">{isMobile ? <MobileMain4 /> : <Main4 />}</div>
      {/* <div className="section">
        <Main4 />
      </div> */}
      <div className="section">
        <Main5 />
      </div>
    </div>
  );
}
