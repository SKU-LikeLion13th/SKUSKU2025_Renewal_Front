import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "./TaskCard";
import images from "../../../../utils/images.jsx";

const baseCards = [
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
    name: "BACK-END",
    buttonColor: "#0AA678",
    backgroundImage: images.BackEndBg,
    cardColors: ["#0AA678", "#4F9B84", "#1CC694"],
    urlName: "Back-end",
  },
  프론트엔드: {
    name: "FRONT-END",
    buttonColor: "#F6701D",
    backgroundImage: images.FrontEndBg,
    cardColors: ["#EB6918", "#E77731", "#F88A46"],
    urlName: "Front-end",
  },
  디자인: {
    name: "DESIGN",
    buttonColor: "#FC6163",
    backgroundImage: images.DesignBg,
    cardColors: ["#FA5558", "#E67678", "#FF8282"],
    urlName: "Design",
  },
};


const IntroPart2 = () => {
  const navigate = useNavigate();

  const [selectedTrack, setSelectedTrack] = useState(null);
  const currentTrack = trackInfo[selectedTrack];

  const backgroundImage = currentTrack?.backgroundImage || images.part2bg;

  const handleCardClick = (cardId) => {
    if (!selectedTrack) return;

    const urlTrack = trackInfo[selectedTrack].urlName;
    let path = "";

    if (cardId === "01") {
      path = `/cybercampus/assignment/${urlTrack}`;
    } else if (cardId === "02") {
      path = `/cybercampus/lecture/${urlTrack}`;
    } else if (cardId === "03") {
      path = `/cybercampus/review/${urlTrack}`;
    }

    navigate(path);
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
              <p className="text-3xl mb-1 fontBold">환영합니다!</p>
              <p className="text-3xl fontBold">
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
              className={`cursor-pointer text-sm px-6 py-[5px] rounded-3xl transition
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
          <p className="text-sm">
            <span className="text-[#1f65ff]">트랙 선택 후</span> 서비스 이용이
            가능합니다.
          </p>
        )}

        {/*위 선택한 트랙의 어디로 갈래?*/}
        <div className="flex gap-20">
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroPart2;
