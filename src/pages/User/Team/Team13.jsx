import React from "react";
import TeamSection from "./TeamSection"; // 섹션 박스 컴포넌트

export default function Team13() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TeamSection title="대표/부대표" members={leader} />
        <TeamSection title="디자인(UX/UI)팀" members={design} />
      </div>

      <TeamSection title="프론트엔드팀" members={frontend} />
      <TeamSection title="백엔드팀" members={backend} />
    </div>
  );
}

// 각 팀 멤버 데이터
const leader = [
  { name: "한민규", role: "대표", department: "컴퓨터공학과 21", emoji: "👊" },
  {
    name: "신민서",
    role: "부대표",
    department: "미디어소프트웨어학과 22",
    emoji: "💡",
  },
];

const design = [
  { name: "서민주", role: "파트장", department: "관광학과 22", emoji: "🙈" },
  { name: "오한솔", role: "운영진", department: "관광학과 22", emoji: "❤️" },
];

const frontend = [
  {
    name: "최유정",
    role: "파트장",
    department: "미디어소프트웨어학과 21",
    emoji: "💻",
  },
  {
    name: "이호연",
    role: "운영진",
    department: "미디어소프트웨어학과 21",
    emoji: "👋",
  },
  {
    name: "구혜원",
    role: "운영진",
    department: "미디어소프트웨어학과 22",
    emoji: "👍",
  },
];

const backend = [
  {
    name: "박준범",
    role: "파트장",
    department: "컴퓨터공학과 21",
    emoji: "👋",
  },
  {
    name: "권오현",
    role: "운영진",
    department: "컴퓨터공학과 23",
    emoji: "🥱",
  },
  {
    name: "노주희",
    role: "운영진",
    department: "미디어소프트웨어학과 22",
    emoji: "😊",
  },
];
