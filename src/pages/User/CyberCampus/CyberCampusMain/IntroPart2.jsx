import React from "react";
import TaskCard from "./TaskCard";

const IntroPart2 = () => {
  const cards = [
    {
      id: "01",
      title: "과제",
      subtitle: "확인하기",
      //아이콘
    },
    {
      id: "02",
      title: "자료실",
      subtitle: "바로가기",
    },
    {
      id: "03",
      title: "배운 내용",
      subtitle: "복습하기",
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
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
              className="text-sm text-[#c4c4c4] px-6 py-[5px] rounded-3xl border border-[#c4c4c4]"
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroPart2;
