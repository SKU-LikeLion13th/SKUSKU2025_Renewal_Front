import React, { useRef, useState, useEffect } from "react";
import images from "../../../../utils/images.jsx";
import Calendar from "./CC_Calendar.jsx";
import AdminCalendar from "../../../Admin/Intro/AdminCalendar.jsx";
import { motion, useInView } from "framer-motion";
import { useLocation } from "react-router-dom";

const IntroPart3 = () => {
  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin");

  const [animKey, setAnimKey] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.3 });

  useEffect(() => {
    if (isInView) {
      setAnimKey((prev) => prev + 1);
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.2,
        ease: [0.3, 0.2, 0.3, 2],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div
      ref={ref}
      className="relative w-full min-h-screen flex justify-center items-center"
    >
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

      {/* 애니메이션 감싸기 */}
      <motion.div
        key={animKey}
        className="w-full sm:w-[90%] flex-col justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center mx-4 sm:mx-10"
        >
          <div className="title flex flex-col items-start mx-1">
            <p className="text-[clamp(15px,5vw,25px)] fontBold mb-1">멋쟁이사자처럼 13기</p>
            <p className="text-[clamp(15px,5vw,25px)] fontBold">
              <span className="text-[#1f65ff]">일정</span>을 알려드릴게요
            </p>
          </div>
          <div className="flex items-center justify-center"> {/* 화면 가운데 정렬, 높이 꽉 채움 */}
            <motion.div
              animate={{ y: [0, -15, 0, 15, 0] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="sm:mr-15 mr-3"
            >
              <motion.img
                src={images.chart}
                className="w-15 md:w-28 h-auto object-contain"
                variants={itemVariants}
              />
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0, -15, 0] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
              className="pt-20"
            >
              <motion.img
                src={images.bell}
                className="w-15 md:w-32 h-auto object-contain"
                variants={itemVariants}
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="md:mb-15">
          {isAdmin ? <AdminCalendar /> : <Calendar />}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IntroPart3;
