import React from "react";
import TeamSection from "./TeamSection";
import images from "../../../utils/images";

export default function Team13() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TeamSection title="대표/부대표" members={leader} />
        <TeamSection title="디자인(UX/UI)팀" members={design} />
      </div>

      <div className="w-full">
        <TeamSection title="프론트엔드팀" members={frontend} />
      </div>

      <div className="w-full">
        <TeamSection title="백엔드팀" members={backend} />
      </div>
    </div>
  );
}

const leader = [
  {
    name: "한민규",
    role: "대표",
    department: "컴퓨터공학과 21",
    img: `${images.한민규}`,
    imgWidth: "130px",
    imgHeight: "130px",
  },
  {
    name: "신민서",
    role: "부대표",
    department: "미디어소프트웨어학과 22",
    img: `${images.신민서}`,
    imgWidth: "130px",
    imgHeight: "130px",
  },
];

const design = [
  {
    name: "서민주",
    role: "파트장",
    department: "관광학과 22",
    img: `${images.서민주}`,
    imgWidth: "130px",
    imgHeight: "130px",
  },
  {
    name: "오한솔",
    role: "운영진",
    department: "관광학과 22",
    img: `${images.오한솔}`,
    imgWidth: "130px",
    imgHeight: "130px",
  },
];

const frontend = [
  {
    name: "최유정",
    role: "파트장",
    department: "미디어소프트웨어학과 21",
    img: `${images.최유정}`,
    imgWidth: "130px",
    imgHeight: "130px",
  },
  {
    name: "이호연",
    role: "운영진",
    department: "미디어소프트웨어학과 21",
    img: `${images.이호연}`,
    imgWidth: "130px",
    imgHeight: "130px",
  },
  {
    name: "구혜원",
    role: "운영진",
    department: "미디어소프트웨어학과 22",
    img: `${images.구혜원}`,
    imgWidth: "130px",
    imgHeight: "130px",
  },
];

const backend = [
  {
    name: "박준범",
    role: "파트장",
    department: "컴퓨터공학과 21",
    img: `${images.박준범}`,
    imgWidth: "130px",
    imgHeight: "130px",
  },
  {
    name: "권오현",
    role: "운영진",
    department: "컴퓨터공학과 23",
    img: `${images.권오현}`,
    imgWidth: "130px",
    imgHeight: "130px",
  },
  {
    name: "노주희",
    role: "운영진",
    department: "미디어소프트웨어학과 22",
    img: `${images.노주희}`,
    imgWidth: "150px",
    imgHeight: "150px",
  },
];
