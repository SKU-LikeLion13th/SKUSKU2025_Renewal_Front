import React from "react";
import TeamSection from "./TeamSection"; // 섹션 박스 컴포넌트

export default function Team11() {
  return (
    <div className="space-y-6">
      {/* 대표/부대표 - 가운데 정렬 */}
      <div className="flex justify-center xl:justify-start">
        <div className="w-full xl:w-1/2">
          <TeamSection title="대표/부대표" members={leader} isCompact={true} />
        </div>
      </div>

      {/* 백엔드  */}
      <div className="w-full">
        <TeamSection title="백엔드팀" members={backend} />
      </div>

      {/* 프론트엔드, 기획 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TeamSection title="프론트엔드팀" members={frontend} />
        <TeamSection title="기획팀" members={design} />
      </div>
    </div>
  );
}

// 각 팀 멤버 데이터
const leader = [
  {
    name: "김현준",
    role: "대표",
    department: "산업경영공학과 17",
    img: "public/assets/images/Team/김현준.png",
    imgWidth: "130px",
    imgHeight: "130px",
  },
  {
    name: "주영민",
    role: "부대표",
    department: "미디어소프트웨어학과 17",
    img: "public/assets/images/Team/주영민.png",
    imgWidth: "160px",
    imgHeight: "160px",
  },
];

const design = [
  {
    name: "이원경",
    role: "운영진",
    department: "국어국문학과 22",
    img: "public/assets/images/Team/이원경.png",
    imgWidth: "130px",
    imgHeight: "130px",
  },
];

const frontend = [
  {
    name: "노승희",
    role: "운영진",
    department: "미디어소프트웨어학과 20",
    img: "public/assets/images/Team/노승희.png",
    imgWidth: "130px",
    imgHeight: "130px",
  },
];

const backend = [
  {
    name: "천민우",
    role: "운영진",
    department: "컴퓨터공학과 19",
    img: "public/assets/images/Team/천민우.png",
    imgWidth: "120px",
    imgHeight: "120px",
  },
  {
    name: "정택원",
    role: "운영진",
    department: "컴퓨터공학과 19",
    img: "public/assets/images/Team/정택원.png",
    imgWidth: "120px",
    imgHeight: "120px",
  },
  {
    name: "남민지",
    role: "운영진",
    department: "컴퓨터공학과 21",
    img: "public/assets/images/Team/남민지.png",
    imgWidth: "130px",
    imgHeight: "130px",
  },
];
