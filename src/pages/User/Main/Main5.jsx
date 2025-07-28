import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ProjectSlider from "./Slider/ProjectSlider";

export default function Main5() {
  const [isVisible, setIsVisible] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 스크롤로 진입할 때마다 true로 전환
        if (entry.isIntersecting) {
          setIsVisible(false); // 리셋 (재생 가능하게)
          setTimeout(() => {
            setIsVisible(true);
          }, 50); // 약간의 지연 후 다시 true로 (애니메이션 재실행 트리거)
        }
      },
      { threshold: 0.2 }
    );

    if (rootRef.current) observer.observe(rootRef.current);
    return () => {
      if (rootRef.current) observer.unobserve(rootRef.current);
    };
  }, []);

  return (
    <div ref={rootRef} className="bg-[#121212] pt-14 sm:pb-30 pb-12">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 타이틀 영역 */}
          <div className="flex flex-col text-center justify-center">
            <p className="text-[#3B79FF] fontBold sm:text-[30px] text-[20px]">
              PROJECTS
            </p>
            <p className="fontThin text-[#ffffff] sm:mt-8 mt-2 sm:text-[18px] text-[9px] mb-12">
              성결대학교 멋쟁이사자처럼과 함께한 프로젝트들을 소개합니다.
            </p>
          </div>

          {/* 슬라이더 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="sm:mx-9 mx-4"
          >
            <ProjectSlider />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
