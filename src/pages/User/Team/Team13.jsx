import React from "react";
import TeamSection from "./TeamSection"; // 섹션 박스 컴포넌트

export default function Team13() {
  return (
    <div className="space-y-6">
      {/* 대표/부대표와 디자인팀 - 큰 화면에서는 나란히, 작은 화면에서는 세로로 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TeamSection title="대표/부대표" members={leader} />
        <TeamSection title="디자인(UX/UI)팀" members={design} />
      </div>

      {/* 프론트엔드팀 - 전체 너비 */}
      <div className="w-full">
        <TeamSection title="프론트엔드팀" members={frontend} />
      </div>

      {/* 백엔드팀 - 전체 너비 */}
      <div className="w-full">
        <TeamSection title="백엔드팀" members={backend} />
      </div>
    </div>
  );
}

// 각 팀 멤버 데이터
const leader = [
  {
    name: "한민규",
    role: "대표",
    department: "컴퓨터공학과 21",
    img: "public/assets/images/Team/한민규.png",
    imgWidth: "130px",
    imgHeight: "130px",
  },
  {
    name: "신민서",
    role: "부대표",
    department: "미디어소프트웨어학과 22",
    img: "public/assets/images/Team/신민서.png",
    imgWidth: "130px",
    imgHeight: "130px",
  },
];

const design = [
  {
    name: "서민주",
    role: "파트장",
    department: "관광학과 22",
    img: "public/assets/images/Team/서민주.png",
    imgWidth: "130px",
    imgHeight: "130px",
  },
  {
    name: "오한솔",
    role: "운영진",
    department: "관광학과 22",
    img: "public/assets/images/Team/오한솔.png",
    imgWidth: "130px",
    imgHeight: "130px",
  },
];

const frontend = [
  {
    name: "최유정",
    role: "파트장",
    department: "미디어소프트웨어학과 21",
    img: "public/assets/images/Team/최유정.png",
    imgWidth: "130px",
    imgHeight: "130px",
  },
  {
    name: "이호연",
    role: "운영진",
    department: "미디어소프트웨어학과 21",
    img: "public/assets/images/Team/이호연.png",
    imgWidth: "130px",
    imgHeight: "130px",
  },
  {
    name: "구혜원",
    role: "운영진",
    department: "미디어소프트웨어학과 22",
    img: "public/assets/images/Team/구혜원.png",
    imgWidth: "130px",
    imgHeight: "130px",
  },
];

const backend = [
  {
    name: "박준범",
    role: "파트장",
    department: "컴퓨터공학과 21",
    img: "public/assets/images/Team/박준범.png",
    imgWidth: "130px",
    imgHeight: "130px",
  },
  {
    name: "권오현",
    role: "운영진",
    department: "컴퓨터공학과 23",
    img: "public/assets/images/Team/권오현.png",
    imgWidth: "130px",
    imgHeight: "130px",
  },
  {
    name: "노주희",
    role: "운영진",
    department: "미디어소프트웨어학과 22",
    img: "public/assets/images/Team/노주희.png",
    imgWidth: "150px",
    imgHeight: "150px",
  },
];
