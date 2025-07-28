import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Main4() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animateKey, setAnimateKey] = useState(0); // 재진입 시 트리거용
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const rootRef = useRef(null);

  // 외부 클릭 시 상세 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        selectedTrack &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setSelectedTrack(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedTrack]);

  // Intersection Observer 설정
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setAnimateKey((prev) => prev + 1);
        }
      },
      { threshold: 0.2 }
    );

    if (rootRef.current) {
      observerRef.current.observe(rootRef.current);
    }

    return () => {
      if (rootRef.current) observerRef.current.unobserve(rootRef.current);
    };
  }, []);

  const trackDetails = {
    frontend: {
      title: "프론트엔드",
      subtitle: "FRONT-END",
      color: "#F75222",
      image: "/assets/images/Main/Main4_React.png",
      curri: "/assets/images/Main/front.png",
      description: (
        <>
          <p>React 기반 UI 개발</p>
          <p>상태관리, Tailwind CSS 등</p>
        </>
      ),
    },
    backend: {
      title: "백엔드",
      subtitle: "BACK-END",
      color: "#0ACF83",
      image: "/assets/images/Main/Main4_spring.png",
      curri: "/assets/images/Main/back_.png",
      description: (
        <>
          <p>Java를 활용한 객체지향 개념</p>
          <p>Spring setting & Thymeleaf</p>
          <p>Spring API 통신</p>
          <p>DB Connection & JPA (MYSQL 사용)</p>
        </>
      ),
    },
    design: {
      title: "기획/디자인",
      subtitle: "PM/DESIGN",
      color: "#FF6F71",
      image: "/assets/images/Main/Main4_figma.png",
      curri: "/assets/images/Main/design_.png",
      description: (
        <>
          <p>UX/UI 기획</p>
          <p>Figma 툴 실습</p>
        </>
      ),
    },
  };

  return (
    <div
      ref={rootRef}
      className="bg-[#121212] py-[8%] flex flex-col items-center"
    >
      {/* 타이틀 */}
      <motion.div
        key={`title-${animateKey}`}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col text-center justify-center"
      >
        <p className="text-[#3B79FF] fontBold sm:text-[30px] text-[20px]">TRACKS</p>
        <p className="fontThin text-[#ffffff] sm:mt-8 mt-2 sm:text-[18px] text-[9px]">
          멋쟁이사자처럼에서 각 트랙별로 세분화된 교육과 경험을 제공합니다.
        </p>
        <motion.p
          className="fontMedium mt-4 text-white"
          initial={{ opacity: 0 }}
          animate={selectedTrack ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          상상을 현실로 만드는 시작,{" "}
          <span
            className="font-semibold"
            style={{
              color: selectedTrack
                ? trackDetails[selectedTrack].color
                : "transparent",
            }}
          >
            {trackDetails[selectedTrack]?.title ?? ""}
          </span>
          팀 커리큘럼을 소개합니다.
        </motion.p>
      </motion.div>

      {/* 트랙 선택 영역 */}
      <motion.div
        key={`track-box-${animateKey}`}
        className="bg-[#262626] mt-10 w-full h-[160px] flex items-center justify-center text-white overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {!selectedTrack ? (
            <motion.div
              key="track-list"
              className="flex justify-evenly w-full px-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {Object.entries(trackDetails).map(([key, value], idx) => (
                <motion.div
                  key={key}
                  onClick={() => setSelectedTrack(key)}
                  className={`flex items-center cursor-pointer transition-transform hover:scale-105 ${
                    key === "frontend"
                      ? "hover:text-[#F75222]"
                      : key === "backend"
                      ? "hover:text-[#0ACF83]"
                      : "hover:text-[#FF6F71]"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <img src={value.image} className="w-12 mr-4" alt={value.title} />
                  <div>
                    <span className="text-[18px]">{value.title}</span>
                    <span className="ml-3 fontEL text-[12px]">{value.subtitle}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="track-detail"
              ref={containerRef}
              className={`flex items-center justify-evenly h-[160px] w-full ${
                selectedTrack === "frontend"
                  ? "bg-[#B74321]"
                  : selectedTrack === "backend"
                  ? "bg-[#1C7674]"
                  : "bg-[#CF637E]"
              }`}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex">
                <img
                  src={trackDetails[selectedTrack].image}
                  className="w-12 mr-4"
                  alt=""
                />
                <div className="text-center flex items-center">
                  <p className="text-[20px] font-semibold">
                    {trackDetails[selectedTrack].title}
                  </p>
                  <p className="text-[14px] ml-2">
                    {trackDetails[selectedTrack].subtitle}
                  </p>
                </div>
              </div>
              <img
                className={`text-[16px] md:w-[50%] ${
                  selectedTrack === "backend" ? "w-[900px]" : "w-[700px]"
                }`}
                src={trackDetails[selectedTrack].curri}
                alt=""
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
