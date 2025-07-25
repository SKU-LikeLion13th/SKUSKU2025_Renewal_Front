import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TaskCard from "./TaskCard";
import images from "../../../../utils/images.jsx";

const isAdmin = location.pathname.includes("/admin");

//관리자인지 링크로 확인해서 isAdmin일때 설정들 추가
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

const IntroPart2 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedTrack, setSelectedTrack] = useState(null);
  const currentTrack = trackInfo[selectedTrack];

  const backgroundImage = currentTrack?.backgroundImage || images.part2bg;

  const handleCardClick = (cardId) => {
    if (!selectedTrack) return;
    const urlTrack = trackInfo[selectedTrack].urlName;
    let path = "";
    if (isAdmin) {
      if (cardId === "01") path = `/admin/assignment/${urlTrack}`;
      else if (cardId === "02") path = `/admin/assignment_check/${urlTrack}`;
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

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center">
      {/* 배경 이미지 */}
      <img
        src={backgroundImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-20"
      />
      <img
        src={images.folder}
        alt="background"
        className="absolute inset-0 w-[17%] top-[20%] object-cover -z-20"
      />

      {/*트랙 선택 관련*/}
      <div className="flex flex-col items-center space-y-8">
        <div className="text-center">
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
        </div>
        <div className="flex gap-3">
          {Object.keys(trackInfo).map((track) => (
            <button
              key={track}
              onClick={() => setSelectedTrack(track)}
              className={`cursor-pointer text-[10px] md:text-sm px-4 md:px-6 py-[5px] rounded-3xl transition
                ${selectedTrack === track ? `text-white` : "text-[#c4c4c4]"}`}
              style={{
                backgroundColor:
                  selectedTrack === track
                    ? trackInfo[track].buttonColor
                    : "#ffffff",
              }}
            >
              {track}
            </button>
          ))}
        </div>
        {currentTrack ? (
          <div className="m-[26px]"></div>
        ) : (
          <p className="text-xs md:text-sm">
            <span className="text-[#1f65ff]">트랙 선택 후</span> 서비스 이용이
            가능합니다.
          </p>
        )}

        {/*위 선택한 트랙의 어디로 갈래?*/}
        <div
          className={`${
            isAdmin ? "grid grid-cols-2 gap-3 sm:flex sm:gap-8 md:gap-20" : "flex gap-4 sm:gap-8 md:gap-20"
          }`}
        >
          {baseCards.map((c, idx) => (
            <TaskCard
              key={c.id}
              id={c.id}
              title={c.title}
              subtitle={c.subtitle}
              icon={c.icon}
              hovercolor={
                selectedTrack
                  ? trackInfo[selectedTrack].cardColors[idx] // 트랙 선택 후
                  : c.color // 트랙 선택 전
              }
              defaultcolor={
                selectedTrack
                  ? trackInfo[selectedTrack].cardColors[idx] // 트랙 선택 후
                  : "#7f7f7f" // 트랙 선택 전
              }
              onClick={() => handleCardClick(c.id)}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroPart2;
