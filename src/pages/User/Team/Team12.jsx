import React from "react";
import TeamSection from "./TeamSection"; // 섹션 박스 컴포넌트

export default function Team12() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-1">
          <TeamSection title="대표/부대표" members={leader} />
        </div>
      </div>
      <TeamSection title="프론트엔드팀" members={frontend} />
      <TeamSection title="백엔드팀" members={backend} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TeamSection title="기획/디자인팀" members={design} />
        <TeamSection title="운영팀" members={management} />
      </div>
    </div>
  );
}

// 각 팀 멤버 데이터
const leader = [
  {
    name: "노승희",
    role: "대표",
    department: "미디어소프트웨어학과 20",
    emoji: "👊",
  },
  {
    name: "정택원",
    role: "부대표",
    department: "컴퓨터공학과 19",
    emoji: "💡",
  },
];

const design = [
  {
    name: "이원경",
    role: "파트장",
    department: "국어국문학과 22",
    emoji: "🙈",
  },
  { name: "서민주", role: "운영진", department: "관광학과 22", emoji: "❤️" },
];

const frontend = [
  {
    name: "고창준",
    role: "파트장",
    department: "컴퓨터공학과 19",
    emoji: "💻",
  },
  {
    name: "김영현",
    role: "운영진",
    department: "컴퓨터공학과 19",
    emoji: "👋",
  },
  {
    name: "신민서",
    role: "운영진",
    department: "미디어소프트웨어학과 22",
    emoji: "👍",
  },
];

const backend = [
  {
    name: "남민지",
    role: "파트장",
    department: "컴퓨터공학과 21",
    emoji: "👋",
  },
  {
    name: "문호주",
    role: "운영진",
    department: "컴퓨터공학과 19",
    emoji: "🥱",
  },
  {
    name: "한민규",
    role: "운영진",
    department: "컴퓨터공학과 21",
    emoji: "😊",
  },
];

const management = [
  {
    name: "오한솔",
    role: "운영진",
    department: "관광학과 22",
    emoji: "👋",
  },
];
