import React from "react";
import TeamSection from "./TeamSection";
import images from "../../../utils/images";

export default function Team12() {
  return (
    <div className="space-y-6">
      <div className="flex justify-center xl:justify-start">
        <div className="w-full xl:w-1/2">
          <TeamSection title="대표/부대표" members={leader} isCompact={true} />
        </div>
      </div>

      <div className="w-full">
        <TeamSection title="프론트엔드팀" members={frontend} />
      </div>

      <div className="w-full">
        <TeamSection title="백엔드팀" members={backend} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TeamSection title="기획/디자인팀" members={design} />
        <TeamSection title="운영팀" members={management} />
      </div>
    </div>
  );
}

const leader = [
  {
    name: "노승희",
    role: "대표",
    department: "미디어소프트웨어학과 20",
    img: `${images.노승희}`,
    imgWidth: "130px",
    imgHeight: "130px",
    imgMarginRight: "-18px",
  },
  {
    name: "정택원",
    role: "부대표",
    department: "컴퓨터공학과 19",
    img: `${images.정택원}`,
    imgWidth: "105px",
    imgHeight: "105px",
    imgMarginRight: "-10px",
  },
];

const design = [
  {
    name: "이원경",
    role: "파트장",
    department: "국어국문학과 22",
    img: `${images.이원경}`,
    imgWidth: "115px",
    imgHeight: "115px",
    imgMarginRight: "-10px",
  },
  {
    name: "서민주",
    role: "운영진",
    department: "관광학과 22",
    img: `${images.서민주}`,
    imgWidth: "130px",
    imgHeight: "130px",
    imgMarginRight: "-10px",
  },
];

const frontend = [
  {
    name: "고창준",
    role: "파트장",
    department: "컴퓨터공학과 19",
    img: `${images.고창준}`,
    imgWidth: "135px",
    imgHeight: "135px",
  },
  {
    name: "김영현",
    role: "운영진",
    department: "컴퓨터공학과 19",
    img: `${images.김영현}`,
    imgWidth: "130px",
    imgHeight: "130px",
    imgMarginRight: "-5px",
  },
  {
    name: "신민서",
    role: "운영진",
    department: "미디어소프트웨어학과 22",
    img: `${images.신민서}`,
    imgWidth: "150px",
    imgHeight: "150px",
    imgMarginRight: "-15px",
    imgMarginTop: "-15px",
  },
];

const backend = [
  {
    name: "남민지",
    role: "파트장",
    department: "컴퓨터공학과 21",
    img: `${images.남민지}`,
    imgWidth: "115px",
    imgHeight: "115px",
    imgMarginRight: "-15px",
  },
  {
    name: "문호주",
    role: "운영진",
    department: "컴퓨터공학과 19",
    img: `${images.문호주}`,
    imgWidth: "140px",
    imgHeight: "140px",
    imgMarginRight: "-10px",
  },
  {
    name: "한민규",
    role: "운영진",
    department: "컴퓨터공학과 21",
    img: `${images.한민규}`,
    imgWidth: "140px",
    imgHeight: "140px",
    imgMarginRight: "-10px",
    imgMarginTop: "-10px",
  },
];

const management = [
  {
    name: "오한솔",
    role: "운영진",
    department: "관광학과 22",
    img: `${images.오한솔}`,
    imgWidth: "130px",
    imgHeight: "130px",
    imgMarginRight: "-10px",
  },
];
