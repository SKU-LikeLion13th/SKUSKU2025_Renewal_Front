import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import images from "../../../../utils/images.jsx";
import API from "../../../../utils/axios.js";

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

  // Intersection Observer 훅: ref를 관찰하고, 뷰포트에 들어오면 inView가 true가 됨
  const { ref, inView } = useInView({
    triggerOnce: false, // 여러 번 애니메이션 실행하려면 false
    threshold: 0.3,     // 뷰포트에 30% 보이면 트리거
  });

  const handleClick = async () => {
    try {
      const res = await API.get("/log/status");
      const user = res.data;

      if (user.role === "ADMIN_LION") {
        window.location.href = "/admin";
      } else {
        alert("관리자 권한이 없습니다.");
      }
    } catch (err) {
      alert("로그인이 필요합니다.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        when: "beforeChildren", // 자식보다 먼저
      },
    },
  };

  return (
    <div
      ref={ref} // 관찰 대상 div에 ref 연결
      className="w-full h-[calc(100vh-80px)] flex flex-col justify-between items-center pt-[140px] md:pt-[80px] pb-10"
    >
      <div className="flex items-center w-full flex-1 relative">
        <motion.div
          className="w-full sm:w-[60%] flex justify-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="text-start mb-10 xl:mr-10 xl:ml-0 sm:ml-10 ml-0 z-10">
            <p className="text-[clamp(34px,5vw,50px)] fontBold leading-tight">
              스쿠스쿠와 함께
            </p>
            <p className="text-[clamp(34px,5vw,50px)] fontEB text-white text-stroke mb-6 leading-tight">
              GROWL TO WORLD!
            </p>
            <p className="text-[10px] sm:text-base fontLight mb-16 ml-1">
              <span className="fontBold">SKU-SKU 사이버캠퍼스는</span> 성결대 멋쟁이사자처럼
              <span className="fontBold"> 아기사자 전용 학습 공간</span>입니다.
            </p>
          </div>
        </motion.div>

        {isLargeScreen && (
          <motion.div
            className="image w-[50%] flex justify-start"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <img src={images.CCIntroImage} className="w-[95%]" />
          </motion.div>
        )}
      </div>

      <div className="flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0.5 }}
          animate={inView ? { opacity: [0.5, 1, 0.5] } : { opacity: 0 }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-center text-xs fontLight text-[#666666]"
        >
          Sc<span onClick={handleClick}>ro</span>ll Down
        </motion.p>
        <motion.img
          src={images.mouse}
          className="w-6 mt-1"
          animate={inView ? { y: [0, 10, 0] } : { y: 0 }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default IntroPart1;
