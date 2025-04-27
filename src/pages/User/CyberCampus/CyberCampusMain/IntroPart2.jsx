import React from "react";
import TaskCard from "./TaskCard";
import images from "../../../../utils/images.jsx";

const IntroPart2 = () => {
  const cards = [
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
      color:"#264c9f",
    },
    {
      id: "03",
      title: "배운 내용",
      subtitle: "복습하기",
      icon: images.introimg3,
      color:"#4b76d2",
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center">
      {/* 배경 이미지 */}
      <img
        src={images.part2bg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-20"
      />
      <img
        src={images.folder}
        alt="background"
        className="absolute inset-0 w-[17%] top-[20%] object-cover -z-20"
      />
      <div className="flex flex-col items-center space-y-8">
        <div className="text-center">
          <p className="text-3xl mb-1 fontBold">환영합니다!</p>
          <p className="text-3xl fontBold">
            <span className="text-[#1f65ff]">트랙</span> 을 선택해주세요.
          </p>
        </div>
        <div className="flex gap-3">
          {["백엔드", "프론트엔드", "디자인"].map((track) => (
            <button
              key={track}
              className="text-sm text-[#c4c4c4] px-6 py-[5px] bg-white rounded-3xl"
            >
              {track}
            </button>
          ))}
        </div>
        <p className="text-sm">
          <span className="text-[#1f65ff]">트랙 선택 후</span> 서비스 이용이
          가능합니다.
        </p>   
        <div className="flex gap-20">
          {cards.map((c) => (
            <TaskCard
              key={c.id}
              id={c.id}
              title={c.title}
              subtitle={c.subtitle}
              icon={c.icon}
              hovercolor={c.color}
              defaultcolor="#7f7f7f"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroPart2;
