import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TaskCard from "./TaskCard";
import images from "../../../../utils/images.jsx";
import { motion } from "framer-motion";

const IntroPart2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin");

  const baseCards = isAdmin
    ? [
        {
          id: "01",
          title: "신규 과제",
          subtitle: "등록하기",
          icon: images.introimg1,
          color: "#407cfe",
        },
        {
          id: "02",
          title: "아기사자 과제",
          subtitle: "채점하기",
          icon: images.introimg1,
          color: "#407cfe",
        },
        {
          id: "03",
          title: "수업자료",
          subtitle: "관리하기",
          icon: images.introimg2,
          color: "#264c9f",
        },
        {
          id: "04",
          title: "복습 문제",
          subtitle: "관리하기",
          icon: images.introimg3,
          color: "#4b76d2",
        },
      ]
    : [
        {
          id: "01",
          title: "과제",
          subtitle: "확인하기",
          icon: images.introimg1,
          color: "#407cfe",
        },
        {
          id: "02",
          title: "자료실",
          subtitle: "바로가기",
          icon: images.introimg2,
          color: "#264c9f",
        },
        {
          id: "03",
          title: "배운 내용",
          subtitle: "복습하기",
          icon: images.introimg3,
          color: "#4b76d2",
        },
      ];

  const trackInfo = {
    백엔드: {
      name: "Back-end",
      buttonColor: "#0AA678",
      backgroundImage: images.BackEndBg,
      cardColors: isAdmin
        ? ["#1CC694", "#0AA678", "#4F9B84", "#1CC694"]
        : ["#0AA678", "#4F9B84", "#1CC694"],
      urlName: "BACKEND",
    },
    프론트엔드: {
      name: "Front-end",
      buttonColor: "#F6701D",
      backgroundImage: images.FrontEndBg,
      cardColors: isAdmin
        ? ["#EB6918", "#E77731", "#F88A46", "#FF8336"]
        : ["#EB6918", "#E77731", "#F88A46"],
      urlName: "FRONTEND",
    },
    디자인: {
      name: "Design",
      buttonColor: "#FC6163",
      backgroundImage: images.DesignBg,
      cardColors: isAdmin
        ? ["#FA5558", "#FF8282", "#E67678", "#F96F71"]
        : ["#FA5558", "#E67678", "#FF8282"],
      urlName: "DESIGN",
    },
  };

  const [selectedTrack, setSelectedTrack] = useState(null);
  const [hoveredTrack, setHoveredTrack] = useState(null);
  const currentTrack = trackInfo[selectedTrack];

  const backgroundImage = currentTrack?.backgroundImage || images.part2bg;

  // 애니메이션 재실행용 키 상태
  const [animKey, setAnimKey] = useState(0);

  // 컴포넌트 마운트 시마다 animKey 증가시키기 (애니메이션 트리거)
  useEffect(() => {
    setAnimKey((prev) => prev + 1);
  }, []);

  const handleCardClick = (cardId) => {
    if (!selectedTrack) {
      alert("트랙을 선택해주세요!");
      return;
    }
    const urlTrack = trackInfo[selectedTrack].urlName;
    let path = "";
    if (isAdmin) {
      if (cardId === "01") path = `/admin/assignment/${urlTrack}`;
      else if (cardId === "02") path = `/admin/assignmentCheck/${urlTrack}`;
      else if (cardId === "03") path = `/admin/LectureManagement/${urlTrack}`;
      else if (cardId === "04") path = `/admin/reviewQuiz/${urlTrack}`;
      navigate(path);
    } else {
      if (cardId === "01") {
        path = `/cybercampus/assignment/${urlTrack}`;
      } else if (cardId === "02") {
        path = `/cybercampus/lecture/${urlTrack}`;
      } else if (cardId === "03") {
        path = `/cybercampus/review/${urlTrack}`;
      }
      navigate(path);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,  // 조금 더 부드러운 간격
        when: "beforeChildren",
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.4,
      },
    },
  };


  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center">
      {/* 배경 이미지 */}
      <img
        src={backgroundImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-20"
      />
      {/* 둥둥 떠다니는 폴더 이미지 */}
      <motion.img
        src={images.folder}
        alt="floating folder"
        className="absolute inset-0 w-[17%] top-[20%] object-cover -z-20"
        animate={{ y: [0, -15, 0, 15, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* animKey를 key로 줘서 매 마운트마다 애니메이션 실행 */}
      <motion.div
        key={animKey}
        className="flex flex-col items-center space-y-8 z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* 트랙 이름 */}
        <motion.div variants={itemVariants} key="track-name" className="text-center">
          {currentTrack ? (
            <>
              <p className="fontBold text-3xl">SKU LIKELION</p>
              <p
                style={{ color: currentTrack?.buttonColor }}
                className="fontBold text-3xl mt-1"
              >
                {currentTrack.name}
              </p>
            </>
          ) : (
            <>
              <p className="text-xl md:text-3xl mb-1 fontBold">환영합니다!</p>
              <p className="text-xl md:text-3xl fontBold">
                <span className="text-[#1f65ff]">트랙</span> 을 선택해주세요.
              </p>
            </>
          )}
        </motion.div>

        {/* 트랙 선택 버튼 */}
        <motion.div variants={containerVariants} className="flex gap-3">
          {Object.keys(trackInfo).map((track) => (
            <motion.button
              key={track}
              onClick={() => setSelectedTrack(track)}
              onMouseEnter={() => setHoveredTrack(track)}
              onMouseLeave={() => setHoveredTrack(null)}
              className={`cursor-pointer text-[10px] md:text-sm px-4 md:px-6 py-[5px] rounded-3xl transition-colors duration-300 ease-in-out
                ${
                  selectedTrack === track || hoveredTrack === track
                    ? `text-white`
                    : "text-[#c4c4c4]"
                }`}
              style={{
                backgroundColor:
                  selectedTrack === track
                    ? trackInfo[track].buttonColor
                    : hoveredTrack === track
                    ? trackInfo[track].buttonColor
                    : "#ffffff",
              }}
              variants={itemVariants}
            >
              {track}
            </motion.button>
          ))}
        </motion.div>

        {/* 트랙 미선택 안내 문구 */}
        {!currentTrack && (
          <motion.p variants={itemVariants} className="text-xs md:text-sm">
            <span className="text-[#1f65ff]">트랙 선택 후</span> 서비스 이용이 가능합니다.
          </motion.p>
        )}

        {/* 카드 목록 */}
        <motion.div
          variants={containerVariants}
          className={`${
            isAdmin
              ? "grid grid-cols-2 gap-3 sm:flex sm:gap-8 md:gap-20"
              : "flex gap-4 sm:gap-8 md:gap-20"
          }`}
        >
          {baseCards.map((c, idx) => (
            <motion.div key={c.id} variants={itemVariants}>
              <TaskCard
                id={c.id}
                title={c.title}
                subtitle={c.subtitle}
                icon={c.icon}
                hovercolor={
                  selectedTrack
                    ? trackInfo[selectedTrack].cardColors[idx]
                    : c.color
                }
                defaultcolor={
                  selectedTrack
                    ? trackInfo[selectedTrack].cardColors[idx]
                    : "#7f7f7f"
                }
                onClick={() => handleCardClick(c.id)}
                isAdmin={isAdmin}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IntroPart2;
